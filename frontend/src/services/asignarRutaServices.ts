import axios from 'axios'

interface AsignarRutaFormData {
    envioId: number
    rutaId: number
    transportistaId: number
}

export const asignarRuta = async (data: AsignarRutaFormData) => {
    const response = await axios.post('http://localhost:3000/envios/asignar-ruta', data)
    return response.data
}