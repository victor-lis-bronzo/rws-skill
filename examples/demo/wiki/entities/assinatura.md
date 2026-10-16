---
title: Assinatura
type: entity
status: active
tags: [billing]
sources:
  - raw/2026-10-16-reuniao-kickoff.md
related: ["[[cobranca-recorrente]]", "[[painel-do-assinante]]"]
created: 2026-10-16
updated: 2026-10-16
---

# Assinatura

Vínculo entre um cliente e um plano mensal de café.

## Estados
```mermaid
stateDiagram-v2
    [*] --> ativa
    ativa --> pausada
    pausada --> ativa
    ativa --> cancelada
    pausada --> cancelada
```

## Regras
- É cobrada pela [[cobranca-recorrente]] ([fonte](../../raw/2026-10-16-reuniao-kickoff.md#decisões)).
- O cliente pode pausar pelo [[painel-do-assinante]].
