import { DatosCredito } from "../../domain/rules/InterfazCredito";

export interface InterfazAplicacion {
    guardar(solicitud: DatosCredito, resultado: string, motivo: string): Promise<void>;
}