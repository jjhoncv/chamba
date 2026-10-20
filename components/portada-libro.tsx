import Image from "next/image";
import { Etiqueta } from "@/components/precio";

type Props = { src: string; precio: number; precioAntes?: number; priority?: boolean; etiqueta?: boolean };

// Portada de ebook con lomo, sombra de libro y un leve giro 3D.
export function PortadaLibro({ src, precio, precioAntes, priority, etiqueta = true }: Props) {
  return (
    <div className="relative mx-auto w-full max-w-64">
      <div className="relative overflow-hidden rounded-l-sm rounded-r-md shadow-[10px_16px_32px_-6px_rgba(0,0,0,0.55)] transition-transform [transform:perspective(900px)_rotateY(-7deg)] group-hover:[transform:perspective(900px)_rotateY(0deg)]">
        <Image src={src} alt="" width={480} height={640} priority={priority} unoptimized className="block w-full" />
        <span aria-hidden className="absolute inset-y-0 left-0 w-4 bg-gradient-to-r from-black/35 via-white/10 to-transparent" />
        <span aria-hidden className="absolute inset-y-0 right-0 w-1 bg-white/25" />
      </div>
      {etiqueta && (
        <div className="absolute -right-2 -top-3">
          <Etiqueta precio={precio} precioAntes={precioAntes} />
        </div>
      )}
    </div>
  );
}
