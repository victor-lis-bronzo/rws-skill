---
title: Schema
type: schema
updated: 2026-10-16
---

# Schema do projeto Clube do Café

> Lido pelo agente no início de toda sessão. Mudanças só com aprovação (`/schema:*`).

## 1. Localização e idioma
| Item | Valor |
|---|---|
| Raiz da base | `./` |
| Idioma da wiki | pt-BR |

## 2. Tipos de página
Padrão da skill RWS.

## 5. Convenções de código e arquitetura

### PAY-1 — Toda lógica de cobrança passa pelo módulo billing
- **Regra:** Nenhum outro módulo chama a API do Stripe diretamente.
- **Motivo:** Centralizar retentativas e webhooks.
- **Exemplo:** ✅ `billing.charge(subscription)` / ❌ `stripe.charges.create()` em `orders/`
- **Origem:** [[2026-10-16-adotar-stripe]] · 2026-10-16

## 6. Outras regras
- Design system: `schema/design-system.md`
