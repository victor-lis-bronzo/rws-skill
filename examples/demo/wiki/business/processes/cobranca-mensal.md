---
title: "Cobrança mensal"
type: process
status: active
tags: [negocio]
sources:
  - raw/2026-10-16-reuniao-kickoff.md
related: ["[[catalogo]]", "[[cobranca-recorrente]]"]
created: 2026-11-10
updated: 2026-11-10
---

# Cobrança mensal

Todo mês o Clube do Café cobra a mensalidade de cada assinatura ativa no cartão do [[assinante]]. Termos conforme o [[glossario]].

## Gatilho
Chega o dia 5 do mês.

## Resultado esperado
A mensalidade foi recebida e a próxima entrega do assinante está garantida.

## Atores
- [[assinante]] — tem a mensalidade cobrada no cartão.

## Como deve ser
```mermaid
flowchart TD
  A[Dia 5 do mês] --> B[Clube do Café cobra a mensalidade]
  B --> C{Cobrança aprovada?}
  C -- Sim --> D[Próxima entrega garantida]
  C -- Não --> E[Nova tentativa 2 dias depois]
  E --> F{Já foram 3 novas tentativas?}
  F -- Não --> C
  F -- Sim --> G[Indefinido: perguntar à PO]
```

## Passos e regras aplicadas
| # | Passo | Quem | Regras aplicadas |
|---|---|---|---|
| 1 | Cobrar a mensalidade de cada assinatura ativa no dia 5 | Clube do Café | [[br-001-cobranca-no-dia-5]] |
| 2 | Se a cobrança for recusada, tentar de novo a cada 2 dias, até 3 vezes | Clube do Café | [[br-002-novas-tentativas-de-cobranca]] |
| 3 | Com a cobrança aprovada, garantir a próxima entrega | Clube do Café | — |

## Exceções
| Situação | O que deve acontecer | Regra |
|---|---|---|
| A 3ª nova tentativa também é recusada | ⚠️ Não definido — perguntar à PO | — |

> [!WARNING] Não verificado
> O destino da assinatura após a 3ª nova tentativa recusada não foi decidido na reunião de kickoff.
