import path from "node:path"
import { defineConfig, type Connect, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Витрина лежит в public/me/index.html. На GitHub Pages адрес /me/ сразу
// открывает её, а dev-сервер Vite отдаёт по нему главную страницу.
// Это правило выравнивает поведение: /me и /me/ ведут на витрину.
const showcase: Connect.NextHandleFunction = (req, _res, next) => {
  if (req.url === "/me" || req.url === "/me/" || req.url?.startsWith("/me/?") || req.url?.startsWith("/me?")) {
    req.url = "/me/index.html"
  }
  next()
}

const showcaseRoute = (): Plugin => ({
  name: "showcase-route",
  configureServer(server) {
    server.middlewares.use(showcase)
  },
  configurePreviewServer(server) {
    server.middlewares.use(showcase)
  },
})

export default defineConfig({
  base: "/",
  plugins: [showcaseRoute(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
