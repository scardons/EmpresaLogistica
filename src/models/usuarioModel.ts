import {pool} from '../config/db'

export async function crearUsuario(nombre:string, email:string, password:string, rol = 'cliente') {
    const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?,?,?,?)',
        [nombre, email, password, rol]
    )
    return result
}