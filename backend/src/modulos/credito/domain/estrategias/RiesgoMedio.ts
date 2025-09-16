import { InterfazRiesgoEstrategia } from "../interfaces/InterfazRiesgoEstrategia";

// Estrategia de riesgo medio
// La llamaremos cuando la relacion de credito a balanza sea media ( 0.4 - 0.7 )
export class RiesgoMedio implements InterfazRiesgoEstrategia {
    evaluarRiesgo(puntaje: number): boolean {
        return puntaje >= 600; // Riesgo medio
    }
}