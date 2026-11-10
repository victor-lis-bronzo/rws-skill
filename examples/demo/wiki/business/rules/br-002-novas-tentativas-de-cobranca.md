---
title: "Novas tentativas de cobrança recusada"
type: business-rule
id: BR-002
rule_type: restricao
status: active
tags: [negocio]
sources:
  - raw/2026-10-16-reuniao-kickoff.md
related: ["[[catalogo]]", "[[br-001-cobranca-no-dia-5]]"]
created: 2026-11-10
updated: 2026-11-10
---

# BR-002 — Novas tentativas de cobrança recusada

## Enunciado
**Uma cobrança recusada deve ser tentada de novo até 3 vezes, com intervalo de 2 dias entre as tentativas.**

## Motivo de negócio
Recusas costumam ser temporárias (limite do cartão, por exemplo). Tentar de novo evita perder o assinante por um problema passageiro.

## Origem
- Decidido na reunião de kickoff com Ana (PO) ([fonte](../../../raw/2026-10-16-reuniao-kickoff.md#decisões)).

## Aplica-se a
- **Atores:** [[assinante]]
- **Processos:** [[cobranca-mensal]]

## Exceções
- Nenhuma registrada.

## Exemplos

### Exemplo 1 — aprovada na segunda tentativa
- **Dado** que a cobrança de Maria foi recusada em 05/11
- **Quando** a nova tentativa de 07/11 é aprovada
- **Então** a mensalidade está paga e não há outras tentativas

### Exemplo 2 — todas as tentativas recusadas
- **Dado** que a cobrança de João foi recusada em 05/11
- **Quando** as novas tentativas de 07/11, 09/11 e 11/11 também são recusadas
- **Então** não é feita nenhuma outra tentativa depois de 11/11

## Tabela de decisão
| Cobrança recusada? | Novas tentativas já feitas | Resultado |
|---|---|---|
| não | — | Mensalidade paga |
| sim | menos de 3 | Nova tentativa 2 dias depois |
| sim | 3 | Parar de tentar (próximo passo indefinido) |

## Contradições e incertezas
> [!WARNING] Não verificado
> O que acontece com a assinatura depois da 3ª nova tentativa recusada não foi definido. Perguntar à PO.
