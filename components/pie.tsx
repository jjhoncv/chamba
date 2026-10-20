import { leerNombreDelProyecto } from "@/lib/nombre-proyecto";

export function Pie() {
  return (
    <footer className="bg-marca-oscuro px-4 py-8 text-center text-white">
      <p className="text-xl font-black">{leerNombreDelProyecto()}</p>
      <p className="text-base text-teal-100">Guías digitales en PDF, hechas para Lima.</p>
    </footer>
  );
}
