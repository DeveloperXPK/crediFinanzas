import { Cliente } from "../Cliente";
import { Usuario } from "../Usuario";


// Definimos el DTO (Data Transfer Object) para los datos de creación
export interface CrearCliente {
    nombre: string;
    tipoDocumento: string;
    numeroDocumento: string;
    usuario: string;
    passwordHash: string;
}

// Interfaz para buscar o crear clientes
export interface InterfazCliente {
  // Busca un usuario por su nombre, retornamos el usuario si se encuentra y en caso contrario null
  buscarUsuario(usuario: string): Promise<Usuario | null>;

  // Creamos usuarios
  /**
   * Crea un nuevo usuario y su cliente asociado en la base de datos.
   * @param data Los datos necesarios para crear el cliente y el usuario.
   * @returns El objeto Cliente recién creado.
   */

  crearUsuario(data: CrearCliente): Promise<Cliente>;
}