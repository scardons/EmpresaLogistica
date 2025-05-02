import { motion } from "framer-motion"

export default function VideoSection() {
  return (
    <motion.div
      className="relative w-full"
      style={{ height: "600px" }}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <motion.img
        src={`${import.meta.env.BASE_URL}camionCarga.png`}
        alt="Camión de ServiFast"
        className="w-full h-full object-cover"
        variants={imageVariants}
      />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
    </motion.div>
  )
}

const imageVariants = {
  offscreen: {
    opacity: 0,
    y: 100,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
}
