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
        'float': 'float 6s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      fontFamily: {
        'cyber': ['"Share Tech Mono"', 'monospace'],
        'serif-sc': ['"Noto Serif SC"', 'serif'],
        'display': ['"Playfair Display"', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}
