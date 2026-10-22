<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Store data (products, prices, checkout URL, contact) lives only in src/config/store.ts; pages read from it so edits never require page changes.
- Checkout is an external link (KAIROSS_CHECKOUT_URL); no backend/API integration until official docs exist.
