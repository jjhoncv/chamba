// Logo de marcador: marca (maletín simple) + nombre. Se reemplaza por el definitivo.
export function Logo({ nombre }: { nombre: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-2xl font-black tracking-tight text-white">
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden>
        <rect width="28" height="28" rx="6" fill="#c2410c" />
        <path d="M8 12h12v8H8zM11 12v-2h6v2" stroke="#fff" strokeWidth="2" fill="none" strokeLinejoin="round" />
      </svg>
      {nombre}
    </span>
  );
}
