import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // base: "/WorkOutApp-UpdatedTimer/",
  plugins: [react()],
  root: "src",
});
