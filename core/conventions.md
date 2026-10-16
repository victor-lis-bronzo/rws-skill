# Convenções

## Nomes de arquivos
- `kebab-case.md`, sem acentos, sem espaços: `pagamento-recorrente.md`.
- Raw sources com data de ingestão: `raw/AAAA-MM-DD-<slug>.<ext>` (ex.: `raw/2026-10-16-reuniao-kickoff.md`).
- Versões incrementais de fonte: `raw/AAAA-MM-DD-<slug>.v2.md` (a v1 permanece intacta).
- Uma página = um conceito. Se o título precisa de "e", provavelmente são duas páginas.

## Tipos de página da wiki

| Tipo (`type`) | Pasta | Template | Quando |
|---|---|---|---|
| `overview` | `wiki/` | — | Visão geral do projeto (uma só: `overview.md`) |
| `entity` | `wiki/entities/` | [entity.md](../templates/wiki/entity.md) | Coisa concreta: módulo, serviço, tabela, pessoa, sistema externo |
| `concept` | `wiki/concepts/` | [concept.md](../templates/wiki/concept.md) | Ideia abstrata: regra de negócio, padrão de arquitetura, fluxo |
| `decision` | `wiki/decisions/` | [decision.md](../templates/wiki/decision.md) | Decisão tomada (ADR leve), geralmente vinda de `/grill` |
| `ui-spec` | `wiki/ui-specs/` | [ui-ux-spec.md](../templates/wiki/ui-ux-spec.md) | Tela/fluxo visual, vinda de `/grill-design` |
| `synthesis` | `wiki/syntheses/` | [synthesis.md](../templates/wiki/synthesis.md) | Análise, comparação, resposta valiosa de Query |
| `source-summary` | `wiki/sources/` | [source-summary.md](../templates/wiki/source-summary.md) | Resumo de uma raw source |

O `schema/schema.md` do projeto pode adicionar tipos (via `/schema:add`).

## Frontmatter obrigatório (wiki)

```yaml
---
title: Pagamento Recorrente
type: concept            # ver tabela acima
status: active           # draft | active | deprecated
tags: [billing, stripe]
sources:                 # raw sources que embasam a página
  - raw/2026-10-16-reuniao-kickoff.md
related: ["[[assinatura]]", "[[stripe]]"]
created: 2026-10-16
updated: 2026-10-16
---
```

## Wikilinks
- Use `[[nome-do-arquivo]]` (sem `.md`, sem pasta). Alias: `[[nome-do-arquivo|texto exibido]]`.
- Toda página tem **pelo menos 1 link de entrada** (senão é órfã) e lista relacionadas em `related`.
- Ao criar link para página inexistente, ou crie a página, ou registre em `index.md` → seção *Lacunas*.

## Citações
- Fonte bruta: `([fonte](../../raw/2026-10-16-reuniao-kickoff.md#decisoes))` ou nota de rodapé.
- Código: `src/billing/charge.ts:42-60`.
- Afirmação sem fonte → marcar `> [!WARNING] Não verificado`.

## Contradições
Nunca sobrescreva silenciosamente. Use:

```markdown
> [!CAUTION] Contradição
> [[fonte-a]] diz X (2026-09-01). [[fonte-b]] diz Y (2026-10-10). Assumindo Y por ser mais recente — confirmar com o usuário.
```

## Idioma
O idioma da wiki é definido em `schema/schema.md` (padrão: idioma do usuário). Nomes de arquivos sempre em kebab-case ASCII.
