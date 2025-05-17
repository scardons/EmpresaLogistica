"use client"

import { useRef } from "react"
import { motion, useScroll } from "framer-motion"

export default function ScrollLinked() {
  const ref = useRef<HTMLUListElement>(null)
  useScroll({ container: ref })

  const scrollLeft = () => {
    if (ref.current) ref.current.scrollBy({ left: -300, behavior: 'smooth' })
  }

  const scrollRight = () => {
    if (ref.current) ref.current.scrollBy({ left: 300, behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-10 px-6 text-white w-full overflow-hidden">
      <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-blue-500 text-center mb-10">Nuestras soluciones de pago</h2>

      <div className="relative flex items-center">
        {/* Botón Izquierda */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 z-10 bg-black bg-opacity-70 text-white px-2 py-2 rounded-full"
        >
          ◀
        </button>

        {/* Lista scrollable */}
        <motion.ul
          ref={ref}
          className="flex gap-6 overflow-x-auto no-scrollbar px-6 w-full"
        >
          {[
            { color: "#ff0088", text: "Pago con Datáfono 💳" },
            { color: "#dd00ee", text: "Logística para Cobro 📦" },
            { color: "#9911ff", text: "Contraentrega E-Commerce 🛒" },
            { color: "#0d63f8", text: "Pagos recurrentes 💰" },
            { color: "#0cdcf7", text: "QR y pagos móviles 📲" },
            { color: "#8df0cc", text: "Transferencias bancarias 🏦" }
          ].map(({ color, text }, idx) => (
            <li key={idx} className="min-w-[200px] h-[150px] rounded-xl flex items-center justify-center text-black font-bold text-center px-4" style={{ background: color }}>
              {text}
            </li>
          ))}
        </motion.ul>

        {/* Botón Derecha */}
        <button
          onClick={scrollRight}
          className="absolute right-0 z-10 bg-black bg-opacity-70 text-white px-2 py-2 rounded-full"
        >
          ▶
        </button>
      </div>
    </section>
  )
}
