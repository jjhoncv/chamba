import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
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
      <h2 className="text-2xl font-black">{titulo}</h2>
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
    <main className="pb-28 lg:pb-16">
      <div className="mx-auto max-w-5xl px-4 py-4">
        <Link href="/" className="inline-flex min-h-11 min-w-11 items-center font-bold text-marca">
          ← Chamba
        </Link>
        <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-x-14">
          <div className="rounded-3xl bg-gradient-to-br from-marca-claro to-teal-50 px-6 py-10 lg:col-start-1 lg:row-start-1">
            <PortadaLibro src={guia.portada} precio={guia.precio} precioAntes={guia.precioAntes} priority />
          </div>

          <aside className="space-y-5 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-6 lg:self-start lg:rounded-2xl lg:bg-white lg:p-6 lg:shadow-xl lg:ring-1 lg:ring-black/5">
            <h1 className="text-4xl font-black">{guia.titulo}</h1>
            <Precio precio={guia.precio} precioAntes={guia.precioAntes} />
            <p className="text-lg text-suave">{guia.descripcion}</p>
            <div className="fixed inset-x-0 bottom-0 z-10 border-t bg-white p-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] lg:static lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">
              <div className="mx-auto max-w-5xl">
                <Button size="lg" variant="compra" type="button" aria-disabled="true">
                  Comprar · {soles(guia.precio)}
                </Button>
              </div>
            </div>
          </aside>

          <div className="space-y-12 lg:col-start-1 lg:row-start-2">
            <section className="space-y-4">
              <h2 className="text-2xl font-black">Qué vas a lograr</h2>
              <ul className="grid gap-4 sm:grid-cols-3">
                {guia.logros.map((l) => (
                  <li key={l} data-testid="logro" className="space-y-3 rounded-2xl bg-white p-5 shadow-md ring-1 ring-black/5">
                    <span className="flex size-11 items-center justify-center rounded-full bg-marca text-white">
                      <Check />
                    </span>
                    <span className="block font-bold">{l}</span>
                  </li>
                ))}
              </ul>
            </section>
            <Lista titulo="Para quién es" items={guia.paraQuien} />
            <Lista titulo="Qué incluye" items={guia.incluye} />
            <section className="space-y-4">
              <h2 className="text-2xl font-black">Preguntas frecuentes</h2>
              {guia.preguntas.map((p) => (
                <details key={p.pregunta} className="rounded-xl bg-white px-5 shadow-md ring-1 ring-black/5">
                  <summary className="flex min-h-12 cursor-pointer items-center font-bold">{p.pregunta}</summary>
                  <p className="pb-4 text-suave">{p.respuesta}</p>
                </details>
              ))}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
