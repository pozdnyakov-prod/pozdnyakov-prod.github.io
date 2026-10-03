import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App"

// Временно: ?accent=cobalt | emerald | raspberry для сравнения акцентных цветов.
const accent = new URLSearchParams(window.location.search).get("accent")
if (accent) document.documentElement.dataset.accent = accent

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
