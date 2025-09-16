import bcrypt from 'bcrypt';
import { CrearCliente, InterfazCliente } from '../domain/InterfazCliente';
import { Cliente } from '../domain/Cliente';

export class CrearClienteServicio {
    constructor(
        private readonly clienteRepositorio: InterfazCliente
    ) {}

    async ejecutarCreacion(data: CrearCliente): Promise<Cliente> {
      // Mediante la interfaz de cliente ejecutamos el metodo para obtener un cliente
      const usuarioExistente = await this.clienteRepositorio.buscarUsuario(
        data.usuario
      );

      if (usuarioExistente) {
        throw new Error("El usuario ya existe");
      }

      const passwordHash = await bcrypt.hash(data.passwordHash, 10); // Hasheamos la contraseña asignada

      data.passwordHash = passwordHash; // Asignamos el hash a la propiedad

      // Utilizamos el metodo de crear usuario para guardar en la bd
      const nuevoCliente = await this.clienteRepositorio.crearUsuario(data);

      // Retornamos el resultado
      return nuevoCliente;
    }
}