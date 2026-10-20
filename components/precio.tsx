import { soles } from "@/lib/guias-prueba";

export function Precio({ precio, precioAntes }: { precio: number; precioAntes?: number }) {
  return (
    <p className="flex items-baseline gap-2">
      <span className="text-xl font-bold text-marca">{soles(precio)}</span>
      {precioAntes && <s className="text-base text-suave">{soles(precioAntes)}</s>}
    </p>
  );
}
