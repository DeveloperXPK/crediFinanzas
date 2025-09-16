export class Usuario {
    public readonly id: number;
    public usuario: string;

    private password?: string;
    private last_password?: string;
    public readonly creado: Date;


    constructor(id: number, usuario: string, creado: Date, password?: string, last_password?: string) {
        this.id = id;
        this.usuario = usuario;
        this.password = password;
        this.last_password = last_password;
        this.creado = creado;
    }
}