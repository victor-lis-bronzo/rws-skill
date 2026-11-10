---
title: "Cobrança automática da mensalidade"
type: requirement
id: REQ-001
priority: must
status: active
rules: ["[[br-001-cobranca-no-dia-5]]", "[[br-002-novas-tentativas-de-cobranca]]"]
tags: [negocio]
sources:
  - raw/2026-10-16-reuniao-kickoff.md
related: ["[[catalogo]]"]
created: 2026-11-10
updated: 2026-11-10
---

# REQ-001 — Cobrança automática da mensalidade

## Necessidade
**Como** [[assinante]], **preciso** que a mensalidade seja cobrada sozinha todo mês, **para** continuar recebendo café sem precisar lembrar de pagar.

## Regras relacionadas
- [[br-001-cobranca-no-dia-5]] — a mensalidade é cobrada no dia 5.
- [[br-002-novas-tentativas-de-cobranca]] — cobrança recusada tem até 3 novas tentativas, a cada 2 dias.

## Critérios de aceite

### Critério 1 — cobrança aprovada no dia 5
- **Dado** que Maria tem uma assinatura ativa com mensalidade de R$ 59,90
- **Quando** chega o dia 05/11
- **Então** Maria é cobrada em R$ 59,90 sem precisar fazer nada

### Critério 2 — cobrança recusada e depois aprovada
- **Dado** que a cobrança de Maria foi recusada em 05/11
- **Quando** a nova tentativa de 07/11 é aprovada
- **Então** a mensalidade de novembro está paga e Maria continua recebendo café

## Fora de escopo
- O que fazer com a assinatura quando todas as novas tentativas são recusadas (pergunta em aberto no [[catalogo]]).
