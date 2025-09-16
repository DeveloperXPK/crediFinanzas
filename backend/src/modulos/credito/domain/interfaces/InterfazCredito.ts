export interface DatosCredito {
    usuario: string; // Requerimos el usuario para hacer el seguimiento y consulta a central de riesgo
    ingresos: number;
    egresos: number;
    montoSolicitado: number;
    plazoSolicitado: number;
    puntajeRiesgo?: number; // Puntaje de riesgo opcional para los que no tienen
    balanza?: number // Puede guardar o iniciar el resultado de la balanza
}

export interface ResultadoRegla {
    aprobado: boolean;
    motivo?: string;
    datos?: {
        [key: string]: number; // Utilizamos para guardar datos adicionales y reutilizarlos en otras clases
    }
}

export interface InterfazCreditoRegla {
    evaluar(data: DatosCredito): ResultadoRegla;
}