module.exports = {
  mode: 'jit',
  purge: {
    content: [
      `components/**/*.{vue,js}`,
      `layouts/**/*.vue`,
      `pages/**/*.vue`,
      `plugins/**/*.{js,ts}`,
      `nuxt.config.{js,ts}`,
      'node_modules/tv-*/dist/tv-*.umd.min.js',
    ],
    safelist: [
      'bg-indigo-600',
      'bg-red-600',
      'bg-green-600',
      'bg-blue-600',
      'bg-gray-600',
      'bg-purple-600',
      'bg-pink-600',
      'hover:bg-indigo-700',
      'hover:bg-red-700',
      'hover:bg-green-700',
      'hover:bg-blue-700',
      'hover:bg-gray-700',
      'hover:bg-purple-700',
      'hover:bg-pink-700',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
