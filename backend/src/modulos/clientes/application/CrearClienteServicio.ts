import { CrearCliente, InterfazCliente } from '../domain/interfaces/InterfazCliente';
import { Cliente } from '../domain/Cliente';

export class CrearClienteServicio {
    constructor(
        private readonly clienteRepositorio: InterfazCliente
    ) {}

    async ejecutarCreacion(data: CrearCliente): Promise<Cliente> {
      // Ahora la creación no usa usuario ni password, simplemente delegamos al repositorio
      const nuevoCliente = await this.clienteRepositorio.crearUsuario(data as any);

      return nuevoCliente;
    }
}