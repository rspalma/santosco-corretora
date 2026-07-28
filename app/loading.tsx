export default function Loading() {
  return (
    <main
      aria-busy="true"
      aria-label="Carregando conteúdo"
      className="grid min-h-screen place-items-center bg-navy text-white"
    >
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-pulse rounded-full border-2 border-gold" />
        <p className="mt-5 text-sm font-semibold text-white/70">Carregando…</p>
      </div>
    </main>
  );
}
