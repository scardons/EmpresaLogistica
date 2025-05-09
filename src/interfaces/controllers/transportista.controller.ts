//src/interfaces/controllers/transportista.controller.ts
import { Request, Response } from "express";
import { registrarTransportista } from "../../domain/use-cases/registrarTransportista";

export const crearTransportista = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, placa, telefono, capacidad } = req.body;
    //validacion de entrada
    if (!nombre || !placa || !telefono || !capacidad) {
      res.status(400).json({ message: "Faltan campos obligatorios" });
      return 
    }

    if (isNaN(capacidad) || capacidad <= 0) {
        res.status(400).json({ message: "La capacidad debe ser mayor a 0" });
        return 
      }

    //verificamos que la capacidad sea un numero positivo
    if (capacidad <= 0){
       res.status(400).json({message: "Faltan campos obligatorios"})
       return 
    }
    //registramos al transportista
    const transportista = await registrarTransportista({ nombre, placa, telefono, capacidad });

    res.status(201).json(transportista);
  } catch (error) {
    console.error("Error al registrar transportista:", error); 
    res.status(500).json({
        message: "Error al registrar transportista",
        error: error instanceof Error ? error.message : error
      });
   }
};
