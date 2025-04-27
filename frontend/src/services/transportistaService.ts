import axios from "axios";

interface TransportistaFormData {
    nombre: string
    placa: string
    telefono: string
    capacidad: number
}

export const registrarTransportista = async (data:TransportistaFormData) => {
    const response = await axios.post('http://localhost:3000/transportistas', data)
    return response.data
}