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
        const { data: usuario, error } = await supabase
        .from('usuarios')
        .insert({
            usuario: data.usuario,
            password: data.passwordHash,
            last_password: data.passwordHash
        })
        .select()
        .single();
        
        // Se crea primero el usuario para luego mediante este ID asociarlo a un cliente

        if (error) {
            throw new Error(`Error al crear usuario: ${error.message}`);
        }

        const { data: cliente, error: errorCliente } = await supabase
        .from('clientes')
        .insert({
            nombre: data.nombre,
            tipo_documento: data.tipoDocumento,
            numero_documento: data.numeroDocumento,
            id_usuario: usuario.id // Lo obtenemos de la insercion anterior
        })
        .select()
        .single();

        if (errorCliente) {
            throw new Error(`Error al crear cliente: ${errorCliente.message}`);
        }

        // Retornamos el cliente creado
        return new Cliente(
            cliente.id, 
            cliente.nombre, 
            cliente.tipo_documento, 
            cliente.numero_documento, 
            cliente.id_usuario,
            cliente.creado
        );
        
    }

}