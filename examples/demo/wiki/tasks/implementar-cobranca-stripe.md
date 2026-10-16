---
title: "Implementar Cobrança Recorrente via Stripe"
type: task
status: planned
vertical: billing
priority: high
depends_on: []
github_issue: 1
sources:
  - wiki/decisions/2026-10-16-adotar-stripe.md
related: ["[[cobranca-recorrente]]", "[[2026-10-16-adotar-stripe]]", "[[assinatura]]"]
created: 2026-10-16
updated: 2026-10-16
---

# Implementar Cobrança Recorrente via Stripe

## Contexto e Objetivo
Implementar o processamento de cobrança recorrente no dia 5 de cada mês integrando com a API do Stripe, conforme decidido em [[2026-10-16-adotar-stripe]] e especificado em [[cobranca-recorrente]].

## Critérios de Aceite
- [ ] Cobrar o valor do plano cadastrado na [[assinatura]] via Stripe API.
- [ ] Registrar cobrança com status `paga` em caso de sucesso.
- [ ] Em caso de falha (cartão recusado), agendar primeira retentativa em 2 dias (regra PAY-1).

## Contratos e Interfaces Previstas
```typescript
interface ChargeResult {
  success: boolean;
  chargeId?: string;
  nextRetryDate?: string;
}

function processRecurringCharge(subscriptionId: string): Promise<ChargeResult>;
```

## Casos de Borda e Erros (Alvos do TDD)
- [ ] Falha de conexão de rede ou timeout da API do Stripe.
- [ ] Cartão expirado ou sem limite: disparo do fluxo de retentativa.
- [ ] Idempotência: requisições duplicadas para o mesmo período não podem gerar cobrança duplicada.

## Arquivos Impactados Previstos
- `src/billing/stripe.ts`
- `tests/billing/stripe.test.ts`
