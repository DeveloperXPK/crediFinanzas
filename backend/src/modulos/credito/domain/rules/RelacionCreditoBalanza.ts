import {
  DatosCredito,
  ResultadoRegla,
  InterfazCreditoRegla,
} from "../interfaces/InterfazCredito";
import { InterfazRiesgoEstrategia } from "../interfaces/InterfazRiesgoEstrategia";
import { RiesgoAlto } from "../estrategias/RiesgoAlto";
import { RiesgoMedio } from "../estrategias/RiesgoMedio";
import { RiesgoBajo } from "../estrategias/RiesgoBajo";

export class RelacionCreditoBalanza implements InterfazCreditoRegla {
  evaluar(data: DatosCredito): ResultadoRegla {
    // Verificamos la relación entre el crédito solicitado y la balanza

    // console.log("Evaluando relación entre crédito y balanza...");
    // console.log("Monto solicitado:", data.montoSolicitado);
    // console.log("Plazo solicitado:", data.plazoSolicitado);
    // console.log("Balanza:", data.balanza);

    if (!data.balanza || data.balanza <= 0) {
      return {
        aprobado: false,
        motivo: "La balanza debe ser un valor positivo.",
      };
    }

    // console.log("Puntaje de riesgo:", data.puntajeRiesgo);

    if (!data.puntajeRiesgo || data.puntajeRiesgo < 0) {
      return {
        aprobado: false,
        motivo: "El puntaje de riesgo no cumple para evaluación.",
      };
    }

    const relacionCredito =
      data.montoSolicitado / data.plazoSolicitado / data.balanza;

    let nivelRiesgo: InterfazRiesgoEstrategia;

    // Elegimos que metodo de riesgo aplicar
    if (relacionCredito < 0.4) {
      nivelRiesgo = new RiesgoBajo();
    } else if (relacionCredito < 0.7) {
      nivelRiesgo = new RiesgoMedio();
    } else if (relacionCredito < 0.95) {
      nivelRiesgo = new RiesgoAlto();    
    } else {
      return {
        aprobado: false,
        motivo:
          "La relación entre el crédito solicitado y la balanza es muy alta.",
      };
    }

    // Efectuamos la evaluación del riesgo
    const aprobado = nivelRiesgo.evaluarRiesgo(data.puntajeRiesgo);

    if (aprobado) {
        return {
            aprobado: true,
        };
    } else {
        return {
            aprobado: false,
            motivo: "El puntaje de riesgo no cumple para evaluación.",
        };
    }
  }
}
