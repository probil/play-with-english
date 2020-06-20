module.exports = {
  plugins: {
    tailwindcss: {},
    ...(process.env.NODE_ENV === 'production' ? { 'vue-cli-plugin-tailwind/purgecss': {} } : {}),
    autoprefixer: {},
  },
};
