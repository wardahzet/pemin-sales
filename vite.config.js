import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       sales: resolve(__dirname, "pages/Sales/AddSales.jsx"),
  //     },
  //   },
  // },
});
