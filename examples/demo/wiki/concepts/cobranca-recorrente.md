---
title: Cobrança recorrente
type: concept
status: active
tags: [billing]
sources:
  - raw/2026-10-16-reuniao-kickoff.md
related: ["[[assinatura]]", "[[2026-10-16-adotar-stripe]]"]
created: 2026-10-16
updated: 2026-10-16
---

# Cobrança recorrente

Toda [[assinatura]] ativa é cobrada no cartão no dia 5 de cada mês, via [[2026-10-16-adotar-stripe|Stripe]].

## Regras de negócio
| Caso | Comportamento | Fonte |
|---|---|---|
| Cobrança aprovada | Agenda próxima entrega | raw/2026-10-16-reuniao-kickoff.md |
| Cobrança recusada | Até 3 retentativas, a cada 2 dias | raw/2026-10-16-reuniao-kickoff.md |
| 3ª retentativa falha | ⚠️ Não definido — perguntar à PO | — |
