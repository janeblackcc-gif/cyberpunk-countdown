/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,jsx}", // 支持根目录的组件文件
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 3s linear infinite',
      },
      fontFamily: {
        'cyber': ['"Share Tech Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
