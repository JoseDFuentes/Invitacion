import mysql from 'mysql2/promise'

const config = {
        host: 'srv1352.hstgr.io',
        user: 'u508480104_jfuentes',
        password: 'xDq37+gNSk^mQ!;5)}\'p@W',
        database: 'u508480104_miscdata'
}


const connection = await mysql.createConnection(config);



export class db {

    static async getAll()
    {
        const [invitados] = await connection.query('SELECT Codigo, Nombres, Confirmado, Trato, Contacto FROM Invitados');

        return invitados;

    }


}