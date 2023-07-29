import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "bootstrap-icons/font/bootstrap-icons.css"

import App from "./components/App"

const root = createRoot(document.getElementById("root"))
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
