import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Precio } from "@/components/precio";
import { guias, portada, senalesDeConfianza } from "@/lib/guias-prueba";
import { leerNombreDelProyecto } from "@/lib/nombre-proyecto";

export default function Page() {
  return (
    <main>
      <header className="bg-white px-4 py-3 shadow-sm">
        <h1 className="mx-auto max-w-5xl text-xl font-extrabold text-marca">{leerNombreDelProyecto()}</h1>
      </header>

      <section className="bg-marca text-white">
        <div className="mx-auto grid max-w-5xl items-center gap-6 px-4 py-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold md:text-5xl">{portada.titular}</h2>
            <p className="text-lg">{portada.subtitulo}</p>
            <Button asChild variant="acento">
              <a href="#guias">Ver guías</a>
            </Button>
          </div>
          <Image src={portada.imagen} alt="" width={600} height={400} priority unoptimized className="w-full rounded-xl" />
        </div>
      </section>

      <ul className="mx-auto grid max-w-5xl gap-2 px-4 py-4 text-base font-medium sm:grid-cols-3">
        {senalesDeConfianza.map((s) => (
          <li key={s} className="flex items-center gap-2">
            <span aria-hidden>✓</span>
            <span>{s}</span>
          </li>
        ))}
      </ul>

      <section id="guias" className="mx-auto max-w-5xl scroll-mt-4 px-4 py-8">
        <h2 className="mb-4 text-2xl font-bold">Guías</h2>
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {guias.map((g) => (
            <li key={g.slug}>
              <Link href={`/guias/${g.slug}`} className="block overflow-hidden rounded-xl bg-white shadow">
                <Image src={g.portada} alt="" width={600} height={400} unoptimized className="w-full" />
                <span className="block space-y-1 p-4">
                  <span className="block text-lg font-semibold">{g.titulo}</span>
                  <Precio precio={g.precio} precioAntes={g.precioAntes} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
