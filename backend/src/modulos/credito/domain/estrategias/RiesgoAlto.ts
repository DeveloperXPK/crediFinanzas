import { InterfazRiesgoEstrategia } from "../interfaces/InterfazRiesgoEstrategia";

// Estrategia de riesgo alto
// La llamaremos cuando la relacion de credito a balanza sea alta ( 0.7 - 0.95 )
export class RiesgoAlto implements InterfazRiesgoEstrategia {
    evaluarRiesgo(puntaje: number): boolean {
        return puntaje >= 800; // Riesgo alto
    }
}