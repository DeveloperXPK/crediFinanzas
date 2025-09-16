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
      usuario: datos.usuario,
      ingresos: Number(datos.ingresos),
      egresos: Number(datos.egresos),
      montoSolicitado: Number(datos.montoSolicitado),
      plazoSolicitado: Number(datos.plazoSolicitado),
    };

    // Validamos las reglas primarias

    for (const regla of this.reglasPrimaria) {
      // En las dos reglas primarias que asignamos ambos metodos se llaman evaluar por ellon
      // no presenta inconvenientes
      const resultado = regla.evaluar(datosCredito); 

      if (!resultado.aprobado) {
        await this.aplicacion.guardar(datos, "RECHAZADO", resultado.motivo!);

        return { aprobado: false, motivo: resultado.motivo! };
      }

      if (resultado.datos) {
        datosCredito = { ...datosCredito, ...resultado.datos }; // En caso de ser true pasamos el dato de la balanza
      }
    }


    // Evaluamos la regla secundaria, como solo tenemos una evitamos usar el for
    const resultadoReglaSecundaria =  this.reglasSecundarias[0].evaluar(datosCredito);

    if (!resultadoReglaSecundaria.aprobado) {
      await this.aplicacion.guardar(datos, "RECHAZADO", resultadoReglaSecundaria.motivo!);
      return { aprobado: false, motivo: resultadoReglaSecundaria.motivo! };
    }

    return { aprobado: true, motivo: "Crédito aprobado." };

    // Comparativa

  }
}
