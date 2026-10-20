import Link from "next/link";
import { contacto } from "@/lib/contacto";
import { guias } from "@/lib/guias-prueba";
import { leerNombreDelProyecto } from "@/lib/nombre-proyecto";

const enlace = "inline-flex min-h-11 items-center text-slate-200 hover:text-white";

function Columna({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-base font-bold uppercase tracking-wider text-white">{titulo}</h2>
      <ul>{children}</ul>
    </div>
  );
}

export function Pie() {
  return (
    <footer className="border-t border-white/10 bg-tinta px-4 py-12 text-slate-200">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-4">
        <div className="space-y-2">
          <p className="text-2xl font-black text-white">{leerNombreDelProyecto()}</p>
          <p>Guías digitales en PDF, hechas para Lima.</p>
        </div>
        <Columna titulo="Guías">
          {guias.map((g) => (
            <li key={g.slug}>
              <Link href={`/guias/${g.slug}`} className={enlace}>
                {g.titulo}
              </Link>
            </li>
          ))}
        </Columna>
        <Columna titulo="Ayuda">
          <li>
            <Link href="/#como-funciona" className={enlace}>
              Cómo comprar
            </Link>
          </li>
          <li>
            <Link href="/#guias" className={enlace}>
              Ver todas las guías
            </Link>
          </li>
        </Columna>
        <Columna titulo="Contacto">
          <li>
            <a href={`mailto:${contacto.correo}`} className={enlace}>
              {contacto.correo}
            </a>
          </li>
          <li>
            <a href={contacto.whatsappUrl} className={enlace}>
              WhatsApp {contacto.whatsapp}
            </a>
          </li>
        </Columna>
      </div>
    </footer>
  );
}
