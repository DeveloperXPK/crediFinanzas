import { Cliente } from "../Cliente";
import { Usuario } from "../Usuario";


// Definimos el DTO (Data Transfer Object) para los datos de creación
export interface CrearCliente {
  nombre: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

// Interfaz para buscar o crear clientes
export interface InterfazCliente {
  // Crea un nuevo cliente en la base de datos.
  /**
   * @param data Los datos necesarios para crear el cliente.
   * @returns El objeto Cliente recién creado.
   */
  crearUsuario(data: CrearCliente): Promise<Cliente>;
}