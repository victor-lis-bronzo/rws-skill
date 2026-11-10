---
title: "Catálogo de Negócio — Clube do Café"
type: business-catalog
status: active
tags: [negocio]
sources:
  - raw/2026-10-16-reuniao-kickoff.md
related: ["[[glossario]]", "[[overview]]"]
created: 2026-11-10
updated: 2026-11-10
---

# Catálogo de Negócio — Clube do Café

> Porta de entrada para quem é do negócio. Tudo aqui está em linguagem de negócio:
> sem termos técnicos. Use sempre os termos do [[glossario]].

## Objetivo do negócio
O Clube do Café vende assinaturas mensais de café: o assinante escolhe um plano e recebe grãos em casa todo mês.
O negócio depende de receber a mensalidade em dia para manter as entregas sem interrupção.

## Escopo
### Dentro do escopo
- Cobrança mensal da assinatura e novas tentativas quando a cobrança é recusada.

### Fora do escopo
- Escolha e troca de café do catálogo de produtos.
- Regras de entrega (prazos, endereços, frete).

## Atores
- [[assinante]] — Cliente que mantém uma assinatura ativa e quer receber café todo mês.

## Processos
- [[cobranca-mensal]] — Chega o dia 5 → mensalidade recebida e próxima entrega garantida.

## Políticas
<!-- Nenhuma política formal registrada até o momento. -->

## Regras de negócio
| ID | Regra em uma frase | Tipo | Status |
|---|---|---|---|
| [[br-001-cobranca-no-dia-5\|BR-001]] | A mensalidade de toda assinatura ativa deve ser cobrada no cartão do assinante no dia 5 de cada mês. | restricao | active |
| [[br-002-novas-tentativas-de-cobranca\|BR-002]] | Uma cobrança recusada deve ser tentada de novo até 3 vezes, com intervalo de 2 dias entre as tentativas. | restricao | active |

## Requisitos
| ID | Necessidade | Prioridade | Regras | Status |
|---|---|---|---|---|
| [[req-001-cobranca-automatica-da-mensalidade\|REQ-001]] | Como assinante, preciso que a mensalidade seja cobrada sozinha todo mês, para não ficar sem café. | must | BR-001, BR-002 | active |

## Perguntas em aberto
- [ ] O que acontece com a assinatura quando a 3ª nova tentativa também é recusada? — responsável: Ana (PO)
