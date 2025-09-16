import {
  DatosCredito,
  ResultadoRegla,
  InterfazCreditoRegla,
} from "./InterfazCredito";
import { InterfazRiesgoEstrategia } from "./InterfazRiesgoEstrategia";
import { RiesgoAlto } from "./RiesgoAlto";
import { RiesgoMedio } from "./RiesgoMedio";
import { RiesgoBajo } from "./RiesgoBajo";

export class RelacionCreditoBalanza implements InterfazCreditoRegla {
  evaluar(data: DatosCredito): ResultadoRegla {
    // Verificamos la relación entre el crédito solicitado y la balanza

    if (!data.balanza || data.balanza <= 0) {
      return {
        aprobado: false,
        motivo: "La balanza debe ser un valor positivo.",
      };
    }

    if (!data.puntajeRiesgo || data.puntajeRiesgo < 0) {
      return {
        aprobado: false,
        motivo: "El puntaje de riesgo no cumple para evaluación.",
      };
    }

    const relacionCredito =
      data.montoSolicitado / data.plazoSolicitado / data.balanza;

    let nivelRiesgo: InterfazRiesgoEstrategia;

    // Determinamos el nivel de riesgo desde lo mas bajo a lo mas alto
    // Gracias a la creacion de una interfaz de riesgo el codigo esta abierto
    // a nuevas implementaciones en caso de ser necesario
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
