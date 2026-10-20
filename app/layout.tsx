import type { Metadata } from "next";
import { Pie } from "@/components/pie";
import { leerNombreDelProyecto } from "@/lib/nombre-proyecto";
import "./globals.css";

export const metadata: Metadata = {
  title: leerNombreDelProyecto(),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className="min-h-screen">
        {children}
        <Pie />
      </body>
    </html>
  );
}
