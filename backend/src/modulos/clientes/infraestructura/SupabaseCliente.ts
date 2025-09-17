import { supabase } from "../../../config/supabaseCliente";
import { InterfazCliente, CrearCliente } from "../domain/interfaces/InterfazCliente";
import { Usuario } from "../domain/Usuario";
import { Cliente } from "../domain/Cliente";


export class SupabaseCliente implements InterfazCliente {
    // Definimos dos metodos:
    /**
     * 1. Busca un usuario por su nombre.
     * 2. Crear un nuevo usuario y su cliente asociado en la base de datos.
     */

    async buscarUsuario(usuario: string): Promise<Usuario | null> {
        const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('usuario', usuario)
        .single();

        if (error) {
            throw new Error(`Error al buscar usuario: ${error.message}`);
        }

        // Al encontrar el usuario, lo retornamos
        return data ? new Usuario(data.id, data.usuario, data.creado) : null ; 
    }


    async crearUsuario(data: CrearCliente): Promise<Cliente> {
        // Insertamos directamente en la tabla 'clientes' usando solo los datos necesarios
        const { data: cliente, error: errorCliente } = await supabase
        .from('clientes')
        .insert({
            nombre: data.nombre,
            tipo_documento: data.tipoDocumento,
            numero_documento: data.numeroDocumento,
        })
        .select()
        .single();

        if (errorCliente) {
            throw new Error(`Error al crear cliente: ${errorCliente.message}`);
        }

        // Retornamos el cliente creado
        // Retornamos el cliente creado. El modelo Cliente fue adaptado para no requerir usuarioId
        return new Cliente(
            cliente.id,
            cliente.nombre,
            cliente.tipo_documento,
            cliente.numero_documento,
            cliente.creado
        );
        
    }

}