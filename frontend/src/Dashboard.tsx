"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa"

export default function Dashboard() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const opciones = [
    { label: "Registrar Transportista", path: "/registrar-transportista" },
    { label: "Registrar Envío", path: "/registrar-envio" },
    { label: "Asignar Ruta", path: "/asignar-ruta" },
    { label: "Ver Estado de Envío", path: "/ver-estado" },
    { label: "Actualizar Estado de Envío", path: "/actualizar-estado" },
    { label: "Listar Envíos", path: "/envios" },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: "0%" },
    exit: { x: "-100%" },
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.5 },
    exit: { opacity: 0 },
  }

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Botón flotante para abrir el menú */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-30 p-3 bg-neon-orange text-black rounded-full shadow-lg"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <FaBars size={24} />
      </motion.button>

      {/* Contenido principal */}
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-neon-orange mb-4">Bienvenido al Dashboard</h1>
        <p className="text-lg text-white">Aquí podrás ver tu información general.</p>
      </div>

      {/* Sidebar animado */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black z-20"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="fixed top-0 left-0 w-72 h-full bg-background p-6 flex flex-col gap-4 z-30"
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 100 }}
            >
              {/* Botón para cerrar */}
              <motion.button
                onClick={() => setIsOpen(false)}
                className="self-end mb-6 p-2 bg-neon-orange text-white rounded-full"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaTimes size={24} />
              </motion.button>

              {/* Opciones de navegación */}
              {opciones.map((opcion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleNavigation(opcion.path)}
                  className="p-3 w-full text-left bg-neon-orange text-black rounded-md font-semibold hover:text-white transition"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  {opcion.label}
                </motion.button>
              ))}

              {/* Botón de cerrar sesión */}
              <motion.button
                onClick={handleLogout}
                className="p-3 w-full text-left bg-red-600 text-white rounded-md font-bold mt-4 hover:bg-red-700 transition"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Cerrar Sesión
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
