export class Conexion{
    private _servidor: string="http://localhost:4000";

    
    public get servidor(): string {
        return this._servidor;
    }
    public set servidor(value: string) {
        this._servidor = value;
    }
}