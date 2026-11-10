---
title: Índice
type: index
updated: 2026-11-10
---

# Índice

> Última atualização: 2026-11-10 · 13 páginas · 1 fonte

## Visão geral
- [[overview]] — App de assinatura mensal de café (Clube do Café).

## Negócio
- [[catalogo]] — Catálogo de negócio do Clube do Café: atores, processos, regras e requisitos.
- [[glossario]] — Termos do negócio (assinante, cobrança, mensalidade, nova tentativa…).
- [[assinante]] — Ator: cliente com assinatura que recebe café todo mês.
- [[cobranca-mensal]] — Processo: dia 5 → mensalidade recebida.
- [[br-001-cobranca-no-dia-5]] — BR-001: mensalidade cobrada no dia 5. · restricao · status: active
- [[br-002-novas-tentativas-de-cobranca]] — BR-002: até 3 novas tentativas a cada 2 dias. · restricao · status: active
- [[req-001-cobranca-automatica-da-mensalidade]] — REQ-001: cobrança automática da mensalidade. · must · status: active

## Entidades
- [[assinatura]] — Vínculo do cliente com um plano; estados ativa/pausada/cancelada. · fontes: 1

## Conceitos
- [[cobranca-recorrente]] — Cobrança no dia 5 com 3 retentativas a cada 2 dias. · fontes: 1

## Decisões
- [[2026-10-16-adotar-stripe]] — Stripe como gateway de pagamento. · status: active

## UI Specs
- [[painel-do-assinante]] — Próxima entrega, trocar café, pausar assinatura. · status: draft

## Tasks de Implementação
- [[implementar-cobranca-stripe]] — Cobrança recorrente no dia 5 via Stripe API. · vertical: billing · status: planned · issue: #1

## Sínteses

## Fontes
- [[src-2026-10-16-reuniao-kickoff]] — Kickoff com a PO.

## Lacunas
- `[[catalogo-de-cafes]]` — citado no painel, sem página própria.
