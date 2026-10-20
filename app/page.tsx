import Image from "next/image";
import Link from "next/link";
import { Cabecera } from "@/components/cabecera";
import { Button } from "@/components/ui/button";
import { Descarga, Escudo, Tarjeta } from "@/components/iconos";
import { PortadaLibro } from "@/components/portada-libro";
import { Precio } from "@/components/precio";
import { guias, mediosDePago, pasos, portada, senalesDeConfianza } from "@/lib/guias-prueba";

const iconosDeConfianza = [Escudo, Tarjeta, Descarga];

export default function Page() {
  return (
    <>
      <Cabecera principal />
      <main>
        {/* Oscuro */}
        <section className="bg-marca-oscuro text-white">
          <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 py-14 md:grid-cols-2 md:py-20">
            <div className="space-y-6">
              <h2 className="text-4xl font-black md:text-6xl">{portada.titular}</h2>
              <p className="text-xl text-slate-200">{portada.subtitulo}</p>
              <Button asChild variant="contorno" className="px-9">
                <a href="#guias">Ver guías</a>
              </Button>
            </div>
            <div className="flex justify-center gap-4" aria-hidden>
              {guias.map((g, i) => (
                <div key={g.slug} className={`w-1/2 max-w-48 ${i === 1 ? "mt-10" : ""}`}>
                  <PortadaLibro src={g.portada} precio={g.precio} precioAntes={g.precioAntes} etiqueta={false} priority />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Claro */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
            <ul className="grid gap-3 sm:grid-cols-3">
              {senalesDeConfianza.map((s, i) => {
                const Icono = iconosDeConfianza[i];
                return (
                  <li key={s} className="flex items-center gap-3 font-semibold text-marca-oscuro">
                    <span className="shrink-0 text-marca">
                      <Icono />
                    </span>
                    <span>{s}</span>
                  </li>
                );
              })}
            </ul>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-200 pt-5">
              {mediosDePago.map((m) => (
                <li key={m.nombre}>
                  <Image src={m.logo} alt={m.nombre} width={96} height={40} unoptimized className="h-9 w-auto" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Claro */}
        <section id="guias" className="mx-auto max-w-5xl scroll-mt-4 px-4 py-16">
          <h2 className="mb-10 text-3xl font-black text-marca-oscuro md:text-4xl">Guías</h2>
          <ul className="grid gap-12 lg:grid-cols-2">
            {guias.map((g) => (
              <li key={g.slug}>
                <Link href={`/guias/${g.slug}`} className="group grid items-center gap-6 sm:grid-cols-[10rem_1fr]">
                  <div className="w-40 max-w-full">
                    <PortadaLibro src={g.portada} precio={g.precio} precioAntes={g.precioAntes} />
                  </div>
                  <span className="block space-y-3">
                    <span className="block text-2xl font-extrabold text-marca-oscuro group-hover:underline">{g.titulo}</span>
                    <Precio precio={g.precio} precioAntes={g.precioAntes} />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Oscuro */}
        <section id="como-funciona" className="scroll-mt-4 bg-marca text-white">
          <div className="mx-auto max-w-5xl px-4 py-16">
            <h2 className="mb-10 text-3xl font-black md:text-4xl">Cómo funciona</h2>
            <ol className="grid gap-10 md:grid-cols-3">
              {pasos.map((p, i) => (
                <li key={p.titulo} className="border-t-2 border-white/30 pt-5">
                  <h3 className="mb-2 text-xl font-extrabold">{`${i + 1}. ${p.titulo}`}</h3>
                  <p className="text-slate-200">{p.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </>
  );
}
