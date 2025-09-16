import { InterfazRiesgoEstrategia } from "../interfaces/InterfazRiesgoEstrategia";

// Estrategia de riesgo bajo
// La llamaremos cuando la relacion de credito a balanza sea baja ( relacion < 0.4 )
export class RiesgoBajo implements InterfazRiesgoEstrategia {
    evaluarRiesgo(puntaje: number): boolean {
        return puntaje >= 400; // Riesgo bajo
    }
}