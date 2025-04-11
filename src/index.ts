import express from 'express'
import {pool} from './config/db'

const app = express()
const PORT = 3000

app.use(express.json())

app.get('/', async (req, res) => {
    try{
        const[rows] = await pool.query('SELECT 1+1 AS resultado')
        res.json(rows)
    } catch (error){
        res.status(500).json({message: "Error en la conexion bd"})
    }
})

app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`)
})