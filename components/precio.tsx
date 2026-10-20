import { ahorro, descuento, soles } from "@/lib/guias-prueba";

export function Etiqueta({ precio, precioAntes }: { precio: number; precioAntes?: number }) {
  if (!precioAntes) return null;
  return (
    <span className="rounded-sm bg-marca-oscuro px-3 py-1 text-base font-bold text-white ring-1 ring-white/30">
      {`-${descuento(precio, precioAntes)} %`}
    </span>
  );
}

export function Precio({ precio, precioAntes, oscuro }: { precio: number; precioAntes?: number; oscuro?: boolean }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className={`text-3xl font-black ${oscuro ? "text-white" : "text-marca-oscuro"}`}>{soles(precio)}</span>
      {precioAntes && <s className={`text-lg ${oscuro ? "text-slate-300" : "text-suave"}`}>{soles(precioAntes)}</s>}
      {precioAntes && (
        <span className={`text-base font-bold ${oscuro ? "text-slate-100" : "text-marca"}`}>
          {`Ahorras ${soles(ahorro(precio, precioAntes))}`}
        </span>
      )}
    </p>
  );
}
