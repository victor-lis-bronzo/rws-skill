---
title: "Mensalidade cobrada no dia 5"
type: business-rule
id: BR-001
rule_type: restricao
status: active
tags: [negocio]
sources:
  - raw/2026-10-16-reuniao-kickoff.md
related: ["[[catalogo]]"]
created: 2026-11-10
updated: 2026-11-10
---

# BR-001 — Mensalidade cobrada no dia 5

## Enunciado
**A mensalidade de toda assinatura ativa deve ser cobrada no cartão do assinante no dia 5 de cada mês.**

## Motivo de negócio
Um dia fixo de cobrança dá previsibilidade ao caixa do Clube do Café e ao assinante, e garante que a entrega do mês só seja preparada com o pagamento recebido.

## Origem
- Decidido na reunião de kickoff com Ana (PO) ([fonte](../../../raw/2026-10-16-reuniao-kickoff.md#decisões)).

## Aplica-se a
- **Atores:** [[assinante]]
- **Processos:** [[cobranca-mensal]]

## Exceções
- Nenhuma registrada.

## Exemplos

### Exemplo 1 — assinatura ativa
- **Dado** que Maria tem uma assinatura ativa do plano Clássico, com mensalidade de R$ 59,90
- **Quando** chega o dia 05/11
- **Então** a mensalidade de R$ 59,90 é cobrada no cartão de Maria

### Exemplo 2 — assinatura cancelada
- **Dado** que João cancelou a assinatura em 20/10
- **Quando** chega o dia 05/11
- **Então** nenhuma mensalidade é cobrada de João

## Contradições e incertezas
> [!WARNING] Não verificado
> A fonte não diz se uma assinatura **pausada** é cobrada no dia 5. Confirmar com a PO.
