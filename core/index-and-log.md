# index.md e log.md

Duas páginas especiais que permitem navegar a wiki sem infraestrutura de embeddings
(funciona bem até ~100 fontes / centenas de páginas).

## wiki/index.md — orientado a conteúdo

Catálogo de **todas** as páginas, agrupado por tipo. Uma linha por página: link + resumo de uma linha + metadados.
O agente **lê o index primeiro** em toda Query e **atualiza o index em toda escrita**.

```markdown
# Índice

> Última atualização: 2026-10-16 · 24 páginas · 6 fontes

## Visão geral
- [[overview]] — O que é o projeto, para quem e como está organizado.

## Entidades
- [[api-gateway]] — Ponto de entrada HTTP; autenticação JWT. · fontes: 2
- [[tabela-pedidos]] — Schema e ciclo de vida de pedidos. · fontes: 1

## Conceitos
- [[pagamento-recorrente]] — Regras de cobrança mensal e retentativa. · fontes: 3

## Decisões
- [[2026-10-16-adotar-stripe]] — Stripe no lugar do gateway legado. · status: active

## UI Specs
- [[dashboard-financeiro]] — Visão de receita com filtros facetados.

## Tasks de Implementação
- [[implementar-webhook-stripe]] — Endpoint de webhook para confirmação de pagamento. · vertical: billing · status: planned · issue: #42

## Sínteses
- [[comparativo-filas]] — SQS vs RabbitMQ para o worker de e-mail.

## Fontes
- [[src-2026-10-16-codebase-audit]] — Auditoria inicial (setup-brown-space).

## Lacunas
- `[[observabilidade]]` — mencionado em 3 páginas, sem página própria.
```

## wiki/log.md — cronológico, append-only

Nunca edite entradas antigas. Sempre adicione ao **final**.
Cabeçalho padronizado para ser parseável com ferramentas simples:

```
## [AAAA-MM-DD] <operação> | <título>
```

Operações válidas: `setup`, `ingest`, `query`, `lint`, `grill`, `grill-design`,
`ticket:new|add|tdd|code|review`, `implement`,
`raw-source:add|remove|increment`, `wiki:add|remove|increment`, `schema:add|remove|increment`.

```markdown
## [2026-10-16] setup | Auditoria inicial da codebase
- Criado: [[overview]], [[api-gateway]], [[tabela-pedidos]]
- Fonte: raw/2026-10-16-codebase-audit.md

## [2026-10-16] wiki:increment | pagamento-recorrente
- Adicionada regra de retentativa (3x, backoff exponencial)
- Fonte: raw/2026-10-16-reuniao-kickoff.md
```

Últimas 5 entradas:

```bash
grep "^## \[" wiki/log.md | tail -5
```

```powershell
Select-String -Path wiki/log.md -Pattern '^## \[' | Select-Object -Last 5
```
