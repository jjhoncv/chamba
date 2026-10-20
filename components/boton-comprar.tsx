"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

// En celular, el botón queda en su sitio y solo se fija abajo cuando el visitante ya lo pasó
// (así nunca tapa el título). En escritorio siempre está en su sitio. Un solo botón en el DOM.
export function BotonComprar({ texto }: { texto: string }) {
  const sitio = useRef<HTMLDivElement>(null);
  const [fijo, setFijo] = useState(false);

  useEffect(() => {
    const el = sitio.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observador = new IntersectionObserver(([e]) => setFijo(!e.isIntersecting && e.boundingClientRect.bottom < 0));
    observador.observe(el);
    return () => observador.disconnect();
  }, []);

  return (
    <div ref={sitio} className="min-h-14">
      <div
        data-fijo={fijo}
        className="data-[fijo=true]:fixed data-[fijo=true]:inset-x-0 data-[fijo=true]:bottom-0 data-[fijo=true]:z-10 data-[fijo=true]:border-t data-[fijo=true]:bg-white data-[fijo=true]:p-3 data-[fijo=true]:shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:data-[fijo=true]:static lg:data-[fijo=true]:border-0 lg:data-[fijo=true]:bg-transparent lg:data-[fijo=true]:p-0 lg:data-[fijo=true]:shadow-none"
      >
        <Button size="lg" variant="compra" type="button" aria-disabled="true">
          {texto}
        </Button>
      </div>
    </div>
  );
}
