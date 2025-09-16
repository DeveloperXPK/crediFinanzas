export interface InterfazRiesgo {
  /**
   * Obtenemos el puntaje del usuario que estamos consultando.
   * @param usuario Es el nombre del usuario ya que es unico.
   * @returns El puntaje como número, o null si no se encuentra.
   */
  obtenerPuntajeDeUsuario(usuario: string): Promise<number | null>;
}