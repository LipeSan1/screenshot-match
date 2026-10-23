export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Esta página não carregou</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: radial-gradient(ellipse at 70% 20%, rgba(8, 123, 255, .24), transparent 60%), radial-gradient(ellipse at 10% 90%, rgba(0, 217, 245, .12), transparent 55%), #06102E; color: #F5FCFF; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; background: #071B49; border: 1px solid rgba(0, 217, 245, .3); border-radius: 1.25rem; box-shadow: 0 8px 30px -8px rgba(0, 217, 245, .3); }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #B8F7FF; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 9999px; font: inherit; font-weight: 700; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: linear-gradient(120deg, #00D9F5, #087BFF 55%, #1239D8); color: #06102E; }
      .secondary { background: #071B49; color: #B8F7FF; border-color: rgba(0, 217, 245, .55); }
      a:focus-visible, button:focus-visible { outline: 2px solid #00D9F5; outline-offset: 3px; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Esta página não carregou</h1>
      <p>Algo deu errado. Você pode atualizar a página ou voltar ao início.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Tentar novamente</button>
        <a class="secondary" href="/">Voltar ao início</a>
      </div>
    </div>
  </body>
</html>`;
}

