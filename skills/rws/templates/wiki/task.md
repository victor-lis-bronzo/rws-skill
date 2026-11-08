---
title: "<Título da Task no imperativo>"
type: task
status: planned          # planned | in_progress | completed | cancelled
vertical: "<vertical>"   # ex: billing, auth, catalog, ui
priority: medium         # high | medium | low
depends_on: []           # [ "[[slug-da-task-anterior]]" ] para ordenação de roadmap
github_issue: null       # preenchido automaticamente ao sincronizar via gh CLI (ex: 42)
sources: []              # raw/ ou wiki/decisions/ que embasam esta task
related: []              # [[entidade]], [[conceito]], [[decisao]]
created: AAAA-MM-DD
updated: AAAA-MM-DD
---

# <Título da Task>

## Contexto e Objetivo
<Resumo do que precisa ser feito e por quê. Link para as decisões ou conceitos da wiki que originaram a demanda.>

## Critérios de Aceite
- [ ] Cenário 1: <condição e resultado esperado>
- [ ] Cenário 2: <condição e resultado esperado>
- [ ] Cenário 3: <condição e resultado esperado>

## Contratos e Interfaces Previstas
```typescript
// Assinaturas de tipos, funções, schemas de dados ou endpoints planejados
```

## Casos de Borda e Erros (Alvos do TDD)
- [ ] Entrada inválida ou campos faltantes devem retornar erro específico.
- [ ] Comportamento em caso de falha de serviço externo / banco.
- [ ] Idempotência ou concorrência, se aplicável.

## Arquivos Impactados Previstos
- `src/...`: <descrição da alteração>
- `tests/...`: <especificação dos testes a serem criados>
