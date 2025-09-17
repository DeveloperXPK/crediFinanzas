import { InterfazAplicacion } from "../domain/interfaces/InterfazAplicacion";
import {
  DatosCredito,
  InterfazCreditoRegla,
} from "../domain/interfaces/InterfazCredito";

// Traemos nuestras reglas
import { PlazoRegla } from "../domain/rules/PlazoRegla";
import { BalanzaRegla } from "../domain/rules/BalanzaRegla";
import { RelacionCreditoBalanza } from "../domain/rules/RelacionCreditoBalanza";
import { InterfazRiesgo } from "../domain/interfaces/InterfazRiesgo";

export class AprobacionCredito {
  private reglasPrimaria: InterfazCreditoRegla[];
  private reglasSecundarias: InterfazCreditoRegla[];

  constructor(
    private readonly aplicacion: InterfazAplicacion,
    private readonly riesgo: InterfazRiesgo
  ) {
    // Reglas necesarias
    /**
     * Plazo
     * Balanza
     * Relacion Credito Balanza
     */

    this.reglasPrimaria = [new PlazoRegla(), new BalanzaRegla()];

    this.reglasSecundarias = [new RelacionCreditoBalanza()];
  }

  async ejecutarEvaluacion(datos: any): Promise<{ aprobado: boolean; motivo: string }> {
    let datosCredito: DatosCredito = {
      tipoDocumento: datos.tipoDocumento,
      numeroDocumento: datos.numeroDocumento,
      ingresos: Number(datos.ingresos),
      egresos: Number(datos.egresos),
      montoSolicitado: Number(datos.montoSolicitado),
      plazoSolicitado: Number(datos.plazoSolicitado),
    };

    console.log("Datos de crédito:", datosCredito);
    // Validamos las reglas primarias

    for (const regla of this.reglasPrimaria) {
      // En las dos reglas primarias que asignamos ambos metodos se llaman evaluar por ellon
      // no presenta inconvenientes
      const resultado = regla.evaluar(datosCredito);
      console.log("Resultado de la regla primaria:", resultado);

      if (!resultado.aprobado) {
        await this.aplicacion.guardar(datos, "RECHAZADO", resultado.motivo!);

        return { aprobado: false, motivo: resultado.motivo! };
      }

      if (resultado.datos) {
        datosCredito = { ...datosCredito, ...resultado.datos }; // En caso de ser true pasamos el dato de la balanza
      }
    }

    try {
      // Obtenemos el puntaje de riesgo del usuario para poder enviarlo dentro de los valores y evaluar el riesgo
      const puntaje = await this.riesgo.obtenerPuntajeDeUsuario(
        datosCredito.tipoDocumento,
        datosCredito.numeroDocumento
      );

      console.log("Puntaje de riesgo:", puntaje);

      if (puntaje !== null) {
        datosCredito = { ...datosCredito, puntajeRiesgo: puntaje };
      }

    } catch (error) {
      console.error("Error al obtener puntaje de riesgo:", error);
      return { aprobado: false, motivo: "Error al obtener puntaje de riesgo." };
    }

    // Evaluamos la regla secundaria, como solo tenemos una evitamos usar el for
    const resultadoReglaSecundaria = this.reglasSecundarias[0].evaluar(
      datosCredito
    );

    console.log("Resultado de la regla secundaria:", resultadoReglaSecundaria);

    if (!resultadoReglaSecundaria.aprobado) {
      await this.aplicacion.guardar(
        datos,
        "RECHAZADO",
        resultadoReglaSecundaria.motivo!
      );
      return { aprobado: false, motivo: resultadoReglaSecundaria.motivo! };
    }

    // Guardamos registro en la bd
    await this.aplicacion.guardar(datos, "APROBADO", "Crédito aprobado.");

    return { aprobado: true, motivo: "Crédito aprobado." };
  }
}
