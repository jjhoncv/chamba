import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Precio } from "@/components/precio";
import { buscarGuia, guias, soles } from "@/lib/guias-prueba";

export function generateStaticParams() {
  return guias.map((g) => ({ slug: g.slug }));
}

function Lista({ titulo, items }: { titulo: string; items: string[] }) {
  return (
    <section className="space-y-2">
      <h2 className="text-xl font-bold">{titulo}</h2>
      <ul className="list-disc space-y-1 pl-5">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </section>
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const guia = buscarGuia((await params).slug);
  if (!guia) notFound();

  return (
    <main className="pb-28">
      <div className="mx-auto max-w-2xl space-y-8 px-4 py-4">
        <Link href="/" className="inline-flex min-h-11 min-w-11 items-center font-semibold text-marca">
          ← Chamba
        </Link>
        <Image src={guia.portada} alt="" width={600} height={400} priority unoptimized className="w-full rounded-xl" />
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold">{guia.titulo}</h1>
          <Precio precio={guia.precio} precioAntes={guia.precioAntes} />
          <p className="text-lg">{guia.descripcion}</p>
        </div>
        <Lista titulo="Qué vas a lograr" items={guia.logros} />
        <Lista titulo="Para quién es" items={guia.paraQuien} />
        <Lista titulo="Qué incluye" items={guia.incluye} />
        <section className="space-y-2">
          <h2 className="text-xl font-bold">Preguntas frecuentes</h2>
          {guia.preguntas.map((p) => (
            <details key={p.pregunta} className="rounded-lg bg-white px-4 shadow-sm">
              <summary className="flex min-h-11 cursor-pointer items-center font-semibold">{p.pregunta}</summary>
              <p className="pb-3">{p.respuesta}</p>
            </details>
          ))}
        </section>
      </div>
      <div className="fixed inset-x-0 bottom-0 border-t bg-white p-3">
        <div className="mx-auto max-w-2xl">
          <Button size="lg" disabled>
            Comprar · {soles(guia.precio)}
          </Button>
        </div>
      </div>
    </main>
  );
}
