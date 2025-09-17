import { Usuario } from "./Usuario";

// Definimos los tipos de documentos permitidos
export type TipoDocumento = "CC" | 'CE' | 'PASAPORTE';

export class Cliente {
    public readonly id: number;
    public nombre: string;
    public tipoDocumento: TipoDocumento;
    public numeroDocumento: string;
    public readonly creado: Date;

    constructor(id: number, nombre: string, tipoDocumento: TipoDocumento, numeroDocumento: string, creado: Date) { 
        this.id = id;
        this.nombre = nombre;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.creado = creado;
    }



}