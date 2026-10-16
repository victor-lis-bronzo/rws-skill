---
name: raw-source-remove
description: >-
  /raw-source:remove — Retira uma fonte primária de uso, movendo-a para raw/_archive/
  (nunca apaga) e tratando as páginas da wiki que dependiam dela. Use para fontes
  erradas, duplicadas ou que perderam validade.
---

# /raw-source:remove

> Ação destrutiva: **exige confirmação explícita** do usuário.

## Passos
1. Identificar a fonte e o **motivo** (duplicada, incorreta, obsoleta, sensível/LGPD).
2. **Análise de impacto**: listar todas as páginas da wiki com essa fonte em `sources:` ou citações no corpo.
   Para cada uma, classificar:
   - ainda sustentada por outras fontes → apenas remover a referência;
   - sustentada **só** por essa fonte → marcar claims com `> [!WARNING] Fonte arquivada` ou propor `/wiki:remove`.
3. Apresentar o impacto e pedir confirmação.
4. Após confirmação:
   - mover `raw/<arquivo>` → `raw/_archive/<arquivo>`;
   - acrescentar ao frontmatter **da cópia arquivada** apenas: `archived: AAAA-MM-DD` e `archived_reason: <motivo>` (única edição permitida em raw);
   - **exceção LGPD/segredo**: se o motivo for dado sensível, o usuário pode autorizar exclusão definitiva — registrar no log sem reproduzir o conteúdo.
5. Atualizar páginas afetadas (`/wiki:increment`), mover `wiki/sources/src-<slug>.md` para `status: deprecated`.
6. Atualizar `wiki/index.md` e append em `wiki/log.md`: `## [AAAA-MM-DD] raw-source:remove | <título>` com motivo e páginas afetadas.
