"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "24px",
            background: "#071b2c",
            color: "white",
            fontFamily: "Segoe UI, Arial, sans-serif",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <p style={{ color: "#d6b56d", fontWeight: 800 }}>
              SANTOS CO.
            </p>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: 44 }}>
              Não foi possível carregar o site.
            </h1>
            <p style={{ lineHeight: 1.7, color: "#dce4ea" }}>
              Tente novamente. Caso o problema continue, utilize os canais
              oficiais da corretora.
            </p>
            <button
              type="button"
              onClick={reset}
              style={{
                marginTop: 24,
                border: 0,
                borderRadius: 999,
                padding: "14px 24px",
                background: "#d6b56d",
                color: "#071b2c",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Tentar novamente
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
