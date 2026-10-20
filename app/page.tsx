import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Descarga, Escudo, Libro, Tarjeta } from "@/components/iconos";
import { PortadaLibro } from "@/components/portada-libro";
import { Precio } from "@/components/precio";
import { guias, mediosDePago, pasos, portada, senalesDeConfianza } from "@/lib/guias-prueba";
import { leerNombreDelProyecto } from "@/lib/nombre-proyecto";

const iconosDeConfianza = [Escudo, Tarjeta, Descarga];
const iconosDePasos = [Libro, Tarjeta, Descarga];

export default function Page() {
  return (
    <main>
      <header className="bg-marca-oscuro px-4 py-4">
        <h1 className="mx-auto max-w-5xl text-2xl font-black tracking-tight text-white">{leerNombreDelProyecto()}</h1>
      </header>

      <section className="bg-gradient-to-br from-marca-oscuro via-marca to-teal-500 text-white">
        <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 pb-20 pt-10 md:grid-cols-2 md:py-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-black md:text-6xl">{portada.titular}</h2>
            <p className="text-xl text-teal-50">{portada.subtitulo}</p>
            <Button asChild variant="acento" className="px-9">
              <a href="#guias">Ver guías</a>
            </Button>
          </div>
          <Image src={portada.imagen} alt="" width={640} height={480} priority unoptimized className="mx-auto w-full max-w-md" />
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-12 max-w-5xl px-4">
        <div className="space-y-5 rounded-2xl bg-white p-5 shadow-xl ring-1 ring-black/5">
          <ul className="grid gap-4 sm:grid-cols-3">
            {senalesDeConfianza.map((s, i) => {
              const Icono = iconosDeConfianza[i];
              return (
                <li key={s} className="flex items-center gap-3 text-base font-bold">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-marca-claro text-marca-oscuro">
                    <Icono />
                  </span>
                  <span>{s}</span>
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-wrap items-center justify-center gap-3 border-t border-black/10 pt-4">
            {mediosDePago.map((m) => (
              <li key={m.nombre}>
                <Image src={m.logo} alt={m.nombre} width={96} height={40} unoptimized className="h-10 w-auto" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="guias" className="mx-auto max-w-5xl scroll-mt-4 px-4 py-16">
        <h2 className="mb-8 text-3xl font-black md:text-4xl">Guías</h2>
        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {guias.map((g) => (
            <li key={g.slug}>
              <Link href={`/guias/${g.slug}`} className="group block space-y-5 rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5 transition-shadow hover:shadow-xl">
                <PortadaLibro src={g.portada} precio={g.precio} precioAntes={g.precioAntes} />
                <span className="block space-y-2">
                  <span className="block text-xl font-extrabold">{g.titulo}</span>
                  <Precio precio={g.precio} precioAntes={g.precioAntes} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 text-3xl font-black md:text-4xl">Cómo funciona</h2>
          <ol className="grid gap-6 md:grid-cols-3">
            {pasos.map((p, i) => {
              const Icono = iconosDePasos[i];
              return (
                <li key={p.titulo} className="space-y-3 rounded-2xl bg-fondo p-6">
                  <span className="flex size-12 items-center justify-center rounded-full bg-marca text-white">
                    <Icono />
                  </span>
                  <h3 className="text-xl font-extrabold">{`${i + 1}. ${p.titulo}`}</h3>
                  <p className="text-suave">{p.texto}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    </main>
  );
}
