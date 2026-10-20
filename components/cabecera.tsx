import { Logo } from "@/components/logo";
import { contacto } from "@/lib/contacto";
import { leerNombreDelProyecto } from "@/lib/nombre-proyecto";

const enlace = "inline-flex min-h-11 items-center text-base font-semibold text-slate-100 hover:text-white";

export function Cabecera({ principal }: { principal?: boolean }) {
  const Titulo = principal ? "h1" : "p";
  return (
    <header className="bg-marca-oscuro px-4">
      <div className="mx-auto flex min-h-16 max-w-5xl items-center justify-between gap-4">
        <Titulo>
          <Logo nombre={leerNombreDelProyecto()} />
        </Titulo>
        <nav aria-label="Contacto" className="flex items-center gap-4">
          <a href={contacto.whatsappUrl} className={enlace}>
            WhatsApp
          </a>
          <a href={`mailto:${contacto.correo}`} className={`${enlace} hidden sm:inline-flex`}>
            {contacto.correo}
          </a>
        </nav>
      </div>
    </header>
  );
}
