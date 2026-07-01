import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#eff8fb_0%,#ffffff_100%)] px-6 py-12 text-foreground">
      <section className="flex w-full max-w-xl flex-col gap-4 rounded-3xl border border-[#2596be]/15 bg-white/90 p-8 shadow-sm">
        <span className="text-sm font-medium uppercase tracking-[0.24em] text-[#2596be]">
          SGI
        </span>
        <h1 className="text-3xl font-semibold tracking-tight">Sistema de Gestão de Importações</h1>
        <p className="text-sm leading-6 text-default-500">
          A área de empresas está disponível em uma rota dedicada para manter a navegação organizada.
        </p>
        <Link
          href="/empresa"
          className="inline-flex w-fit items-center justify-center rounded-full bg-[#2596be] px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Acessar empresas
        </Link>
      </section>
    </main>
  );
}
