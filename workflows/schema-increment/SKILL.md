---
name: schema-increment
description: >-
  /schema:increment — Evolui uma regra/convenção existente do schema/ (ajustar escopo,
  exemplos, campos obrigatórios, tokens de design) com aprovação explícita. Use quando a
  regra continua válida mas precisa de ajuste.
---

# /schema:increment

## Passos
1. Ler a regra atual e sua origem.
2. Mostrar ao usuário um **diff** (antes → depois) e o motivo da mudança.
3. Aguardar aprovação (exceto se já aprovado num gate de `/grill` ou `/grill-design`).
4. Aplicar a mudança, adicionando ao bloco: `- **Revisado:** AAAA-MM-DD — <resumo>`.
5. Atualizar templates afetados.
6. Se páginas existentes deixaram de obedecer à regra, listar e oferecer `/wiki:increment` em lote.
7. Append em `wiki/log.md`: `## [AAAA-MM-DD] schema:increment | <ID> — <resumo>`.
