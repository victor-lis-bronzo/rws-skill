---
name: wiki-add
description: >-
  /wiki:add — Cria uma nova página na wiki (entidade, conceito, decisão, ui-spec, síntese,
  resumo de fonte) seguindo templates e convenções, com wikilinks bidirecionais, registro no
  index.md e no log.md. Use quando um assunto ainda não tem página.
---

# /wiki:add

## Passos
1. **Checar existência**: buscar no `wiki/index.md` e por nome/sinônimos em `wiki/`. Se existe → `/wiki:increment`.
2. **Escolher o tipo** e o template ([conventions.md](../../core/conventions.md#tipos-de-página-da-wiki)):
   `entity`, `concept`, `decision`, `ui-spec`, `synthesis`, `source-summary` (ou tipos extras do `schema/schema.md`).
3. **Criar** `wiki/<pasta-do-tipo>/<slug>.md` com frontmatter completo (`title`, `type`, `status`, `tags`, `sources`, `related`, `created`, `updated`).
4. **Escrever o conteúdo**:
   - começar com um resumo de 1-3 frases;
   - toda afirmação não trivial com citação (`raw/...`, `[[pagina]]`, `arquivo:linha`);
   - usar mermaid quando um diagrama explicar melhor.
5. **Conectar (bidirecional)**:
   - adicionar `[[novo-slug]]` nas páginas relacionadas (`related:` e/ou no corpo) — via `/wiki:increment` leve;
   - garantir que a nova página tenha pelo menos 1 link de entrada.
6. **Indexar**: adicionar linha em `wiki/index.md` na seção do tipo (`- [[slug]] — resumo de uma linha · fontes: N`). Se estava listada em *Lacunas*, remover de lá.
7. **Logar**: append em `wiki/log.md` → `## [AAAA-MM-DD] wiki:add | <título>` com a lista de páginas tocadas.
8. Se `wiki/overview.md` ficou desatualizado com a nova página, atualizá-lo.
