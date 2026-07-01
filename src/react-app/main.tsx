import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "../index.css";
import { initWebVitals } from "../lib/webVitalsReporter";

createRoot(document.getElementById("root")!).render(<App />);

// Initialize Core Web Vitals tracking (skips /admin)
if (typeof window !== "undefined") {
  if ("requestIdleCallback" in window) {
    (window as any).requestIdleCallback(() => initWebVitals());
  } else {
    setTimeout(() => initWebVitals(), 1500);
  }
}
