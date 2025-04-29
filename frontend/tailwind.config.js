// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0f0f0f',     // Fondo oscuro tipo cyberpunk
        'neon-orange': '#ffa420',
        'neon-green': '#39FF14',   // Verde neón
        'neon-blue': '#1D94F1',    // Azul neón
        'neon-pink': '#FF00FF',    // Rosa neón
        'primary': '#39FF14',      // Color principal (verde neón)
        'secondary': '#FF00FF',    // Color secundario (rosa neón)
        'black': '#000000 ',
      },
    },
  },
  plugins: [],
}
