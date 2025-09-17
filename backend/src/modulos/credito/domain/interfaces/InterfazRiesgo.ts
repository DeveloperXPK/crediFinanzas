export interface InterfazRiesgo {
  obtenerPuntajeDeUsuario(tipo_documento: string, numero_documento: string): Promise<number | null>;
}