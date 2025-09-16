import { Usuario } from "./Usuario";

// Definimos los tipos de documentos permitidos
export type TipoDocumento = "CC" | 'CE' | 'PASAPORTE';

export class Cliente {
    public readonly id: number;
    public nombre: string;
    public tipoDocumento: TipoDocumento;
    public numeroDocumento: string;
    public readonly creado: Date;

    // Asignamos la asociacion con el usuario
    public readonly usuarioId: number;
    public usuario?: Usuario;

    constructor(id: number, nombre: string, tipoDocumento: TipoDocumento, numeroDocumento: string, creado: Date, usuarioId: number) { 
        this.id = id;
        this.nombre = nombre;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.creado = creado;
        this.usuarioId = usuarioId;
    }



}