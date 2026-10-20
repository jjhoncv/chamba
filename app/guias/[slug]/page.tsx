import Link from "next/link";
import { notFound } from "next/navigation";
import { BotonComprar } from "@/components/boton-comprar";
import { Cabecera } from "@/components/cabecera";
import { Check } from "@/components/iconos";
import { PortadaLibro } from "@/components/portada-libro";
import { Precio } from "@/components/precio";
import { buscarGuia, guias, soles } from "@/lib/guias-prueba";

export function generateStaticParams() {
  return guias.map((g) => ({ slug: g.slug }));
}

function Lista({ titulo, items }: { titulo: string; items: string[] }) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-black text-marca-oscuro">{titulo}</h2>
      <ul className="space-y-3">
        {items.map((i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 size-6 shrink-0 text-marca">
              <Check />
            </span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const guia = buscarGuia((await params).slug);
  if (!guia) notFound();

  return (
    <>
      <Cabecera />
      <main className="pb-28 lg:pb-16">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <Link href="/" className="inline-flex min-h-11 min-w-11 items-center font-bold text-marca">
            ← Todas las guías
          </Link>
          <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-x-14">
            <div className="bg-marca-oscuro px-6 py-10 lg:col-start-1 lg:row-start-1">
              <PortadaLibro src={guia.portada} precio={guia.precio} precioAntes={guia.precioAntes} priority />
            </div>

            <aside className="space-y-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-6 lg:self-start lg:border lg:border-slate-200 lg:bg-white lg:p-6">
              <h1 className="text-4xl font-black text-marca-oscuro">{guia.titulo}</h1>
              <Precio precio={guia.precio} precioAntes={guia.precioAntes} />
              <p className="text-lg text-suave">{guia.descripcion}</p>
              <BotonComprar texto={`Comprar · ${soles(guia.precio)}`} />
            </aside>

            <div className="space-y-12 lg:col-start-1 lg:row-start-2">
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-marca-oscuro">Qué vas a lograr</h2>
                <ul className="divide-y divide-slate-200 border-y border-slate-200">
                  {guia.logros.map((l) => (
                    <li key={l} data-testid="logro" className="flex items-start gap-3 py-4">
                      <span className="mt-0.5 size-6 shrink-0 text-marca">
                        <Check />
                      </span>
                      <span className="font-semibold">{l}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <Lista titulo="Para quién es" items={guia.paraQuien} />
              <Lista titulo="Qué incluye" items={guia.incluye} />
              <section className="space-y-2">
                <h2 className="text-2xl font-black text-marca-oscuro">Preguntas frecuentes</h2>
                {guia.preguntas.map((p) => (
                  <details key={p.pregunta} className="border-b border-slate-200">
                    <summary className="flex min-h-12 cursor-pointer items-center font-bold">{p.pregunta}</summary>
                    <p className="pb-4 text-suave">{p.respuesta}</p>
                  </details>
                ))}
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
