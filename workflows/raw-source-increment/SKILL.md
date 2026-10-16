---
name: raw-source-increment
description: >-
  /raw-source:increment — Adiciona uma nova versão ou adendo a uma fonte primária existente
  sem alterar a original (ex.: transcrição da 2ª reunião, versão revisada de um documento,
  novo snapshot da codebase). Propaga as diferenças para a wiki.
---

# /raw-source:increment

## Passos
1. Localizar a fonte original em `raw/` (confirmar com o usuário se houver ambiguidade).
2. Decidir o tipo:
   - **Nova versão** (substitui conteúdo) → `raw/<slug-original>.v<N>.md`, frontmatter com `supersedes: raw/<original>`.
   - **Adendo** (complementa) → `raw/AAAA-MM-DD-<slug-original>-addendum-<n>.md`, frontmatter com `extends: raw/<original>`.
3. **Nunca editar a original.**
4. **Diff semântico**: comparar com a versão anterior e listar o que é novo, o que mudou e o que foi removido.
5. Apresentar o diff ao usuário; após ok, propagar:
   - `/wiki:increment` nas páginas afetadas (atualizar `sources:` e `updated:`);
   - claims contraditos → bloco de contradição resolvido em favor da versão mais nova (citar ambas);
   - `wiki/sources/src-<slug>.md` → adicionar seção "Versões".
6. Atualizar `wiki/index.md` e append em `wiki/log.md`: `## [AAAA-MM-DD] raw-source:increment | <título> v<N>`.
