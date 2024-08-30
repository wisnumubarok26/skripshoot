/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F0FFF4', // Latar belakang
        form: '#A5D6A7', // Warna form
        textPrimary: '#2E7D32', // Teks utama
        textSecondary: '#4CAF50', // Teks sekunder
        accent: '#1B5E20', // Warna aksen
      },
    },
  },
  plugins: [],
}