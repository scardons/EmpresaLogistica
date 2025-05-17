"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { FaBars, FaTimes, FaTruck, FaPlus, FaRoute, FaEye, FaSync, FaList, FaSignOutAlt } from "react-icons/fa"

export default function Dashboard() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const opciones = [
    { label: "Registrar Transportista", path: "/registrar-transportista", icon: <FaTruck /> },
    { label: "Registrar Envío", path: "/registrar-envio", icon: <FaPlus /> },
    { label: "Asignar Ruta", path: "/asignar-ruta", icon: <FaRoute /> },
    { label: "Ver Estado de Envío", path: "/ver-estado", icon: <FaEye /> },
    { label: "Actualizar Estado", path: "/actualizar-estado", icon: <FaSync /> },
    { label: "Listar Envíos", path: "/envios", icon: <FaList /> },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">

      {/* Botón flotante */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 left-6 z-30 p-3 bg-blue-600 text-white rounded-full shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaBars size={24} />
      </motion.button>

      {/* Contenido principal */}
      <div className="p-12 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-wide">Dashboard Corporativo</h1>
        <p className="text-lg text-gray-300">Gestiona tus envíos, transportistas y rutas de forma eficiente.</p>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 w-80 h-full bg-gray-800 p-6 flex flex-col gap-4 z-30 shadow-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <motion.button
                onClick={() => setIsOpen(false)}
                className="self-end text-gray-400 hover:text-white"
              >
                <FaTimes size={24} />
              </motion.button>

              {opciones.map((opcion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleNavigation(opcion.path)}
                  className="flex items-center gap-3 p-4 bg-gray-700 text-white rounded-lg hover:bg-blue-600 transition"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {opcion.icon}
                  <span>{opcion.label}</span>
                </motion.button>
              ))}

              <motion.button
                onClick={handleLogout}
                className="mt-auto flex items-center gap-3 p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSignOutAlt />
                <span>Cerrar Sesión</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
