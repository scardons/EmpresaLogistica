import { promises } from 'dns'
import {pool} from '../config/db'

export async function crearUsuario(nombre:string, email:string, password:string, rol = 'cliente') {
    const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?,?,?,?)',
        [nombre, email, password, rol]
    )
    return result
}

export async function obtenerUsuarioPorEmail(email: string): Promise<any>{
    const[rows]: any = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
    return rows[0]
}