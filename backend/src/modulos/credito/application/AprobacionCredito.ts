import { InterfazAplicacion } from "../infrastructure/repositories/InterfazAplicacion";
import {
  DatosCredito,
  InterfazCreditoRegla,
} from "../domain/rules/InterfazCredito";

// Traemos nuestras reglas
import { PlazoRegla } from "../domain/rules/PlazoRegla";
import { BalanzaRegla } from "../domain/rules/BalanzaRegla";
import { RelacionCreditoBalanza } from "../domain/rules/RelacionCreditoBalanza";

export class AprobacionCredito {
  private reglasPrimaria: InterfazCreditoRegla[];
  private reglasSecundarias: InterfazCreditoRegla[];

  constructor(private readonly aplicacion: InterfazAplicacion) {
    // Reglas necesarias
    /**
     * Plazo
     * Balanza
     * Relacion Credito Balanza
     */

    this.reglasPrimaria = [new PlazoRegla(), new BalanzaRegla()];

    this.reglasSecundarias = [new RelacionCreditoBalanza()];
  }

  async ejecutarEvaluacion(
    datos: any
  ): Promise<{ aprobado: boolean; motivo: string }> {
    let datosCredito: DatosCredito = {
      ingresos: Number(datos.ingresos),
      egresos: Number(datos.egresos),
      montoSolicitado: Number(datos.montoSolicitado),
      plazoSolicitado: Number(datos.plazoSolicitado),
    };

    // Validamos las reglas primarias

    for (const regla of this.reglasPrimaria) {
      const resultado = regla.evaluar(datosCredito);

      if (!resultado.aprobado) {
        await this.aplicacion.guardar(datos, "RECHAZADO", resultado.motivo!);

        return { aprobado: false, motivo: resultado.motivo! };
      }

      if (resultado.datos) {
        datosCredito = { ...datosCredito, ...resultado.datos }; // En caso de ser true pasamos el dato de la balanza
      }


    }


    // Comparativa

  }
}
