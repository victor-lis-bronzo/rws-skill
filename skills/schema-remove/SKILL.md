---
name: schema-remove
description: >-
  /schema:remove — Remove ou deprecia uma regra/convenção do schema/ com aprovação explícita,
  avaliando o impacto em páginas e templates. Use quando uma convenção foi abandonada.
---

# /schema:remove

> Ação destrutiva sobre governança: **aprovação explícita obrigatória**.

## Passos
1. Localizar a regra (por ID ou título) em `schema/`.
2. Análise de impacto: templates, tipos de página e páginas da wiki que dependem dela.
3. Propor estratégia:
   - **Depreciar** (recomendado se houve uso real): manter com `~~riscado~~` + `**Deprecated em AAAA-MM-DD:** <motivo> → substituída por <ID>`.
   - **Remover**: apagar o bloco (o histórico fica no git e no log).
4. Aguardar aprovação.
5. Aplicar; ajustar templates afetados.
6. Se a regra originou uma decisão na wiki, `/wiki:increment` nela marcando como revogada.
7. Append em `wiki/log.md`: `## [AAAA-MM-DD] schema:remove | <ID> — <título>` com motivo.
