import { ahorro, descuento, soles } from "@/lib/guias-prueba";

export function Etiqueta({ precio, precioAntes }: { precio: number; precioAntes?: number }) {
  if (!precioAntes) return null;
  return (
    <span className="rounded-full bg-oferta px-3 py-1 text-base font-extrabold text-white shadow-md">
      {`-${descuento(precio, precioAntes)} %`}
    </span>
  );
}

export function Precio({ precio, precioAntes }: { precio: number; precioAntes?: number }) {
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="text-3xl font-black text-marca-oscuro">{soles(precio)}</span>
      {precioAntes && <s className="text-lg text-suave">{soles(precioAntes)}</s>}
      {precioAntes && (
        <span className="rounded-md bg-red-50 px-2 text-base font-bold text-oferta">
          {`Ahorras ${soles(ahorro(precio, precioAntes))}`}
        </span>
      )}
    </p>
  );
}
