# Convenções

## Nomes de arquivos
- `kebab-case.md`, sem acentos, sem espaços: `pagamento-recorrente.md`.
- Raw sources com data de ingestão: `raw/AAAA-MM-DD-<slug>.<ext>` (ex.: `raw/2026-10-16-reuniao-kickoff.md`).
- Versões incrementais de fonte: `raw/AAAA-MM-DD-<slug>.v2.md` (a v1 permanece intacta).
- Uma página = um conceito. Se o título precisa de "e", provavelmente são duas páginas.
- Regras e requisitos de negócio levam o ID no nome: `wiki/business/rules/br-012-<slug>.md`, `wiki/business/requirements/req-004-<slug>.md` (3 dígitos; o prefixo bate com o `id` do frontmatter). IDs **nunca são reutilizados** — regra abandonada vira `deprecated` com `superseded_by`.

## Tipos de página da wiki

| Tipo (`type`) | Pasta | Template | Quando |
|---|---|---|---|
| `overview` | `wiki/` | — | Visão geral do projeto (uma só: `overview.md`) |
| `entity` | `wiki/entities/` | [entity.md](../templates/wiki/entity.md) | Coisa concreta: módulo, serviço, tabela, pessoa, sistema externo |
| `concept` | `wiki/concepts/` | [concept.md](../templates/wiki/concept.md) | Ideia abstrata: regra de negócio, padrão de arquitetura, fluxo |
| `decision` | `wiki/decisions/` | [decision.md](../templates/wiki/decision.md) | Decisão tomada (ADR leve), geralmente vinda de `/grill` |
| `ui-spec` | `wiki/ui-specs/` | [ui-ux-spec.md](../templates/wiki/ui-ux-spec.md) | Tela/fluxo visual, vinda de `/grill-design` |
| `task` | `wiki/tasks/` | [task.md](../templates/wiki/task.md) | Plano de implementação/ajuste/fix pós-grill ou demanda direta |
| `synthesis` | `wiki/syntheses/` | [synthesis.md](../templates/wiki/synthesis.md) | Análise, comparação, resposta valiosa de Query |
| `source-summary` | `wiki/sources/` | [source-summary.md](../templates/wiki/source-summary.md) | Resumo de uma raw source |
| `business-catalog` | `wiki/business/` | [catalogo.md](../templates/wiki/business/catalogo.md) | Porta de entrada para stakeholders (uma só: `catalogo.md`) |
| `glossary` | `wiki/business/` | [glossario.md](../templates/wiki/business/glossario.md) | Termos do negócio e seus significados (uma só: `glossario.md`) |
| `actor` | `wiki/business/actors/` | [actor.md](../templates/wiki/business/actor.md) | Pessoa, papel ou organização que participa do negócio |
| `process` | `wiki/business/processes/` | [process.md](../templates/wiki/business/process.md) | Processo de negócio ponta a ponta |
| `business-rule` | `wiki/business/rules/` | [business-rule.md](../templates/wiki/business/business-rule.md) | Regra de negócio (`BR-###`), vinda de `/grill-business` |
| `requirement` | `wiki/business/requirements/` | [requirement.md](../templates/wiki/business/requirement.md) | Requisito de negócio (`REQ-###`) com critérios de aceite |
| `policy` | `wiki/business/policies/` | [policy.md](../templates/wiki/business/policy.md) | Política/diretriz que agrupa regras |

Páginas em `wiki/business/` usam **100% linguagem de negócio** (sem código, tabelas, endpoints ou jargão técnico); a lista de termos proibidos fica em `schema/business-rules.md` ([template](../templates/schema/business-rules.md)).

O `schema/schema.md` do projeto pode adicionar tipos (via `/schema:add`).

## Frontmatter obrigatório (wiki)

```yaml
---
title: Pagamento Recorrente
type: concept            # ver tabela acima (overview, entity, concept, decision, ui-spec, task, synthesis, source-summary, tipos de negócio)
status: active           # draft | active | deprecated (para conhecimento) ou planned | in_progress | completed | cancelled (para tasks)
tags: [billing, stripe]
vertical: billing        # verticalidade/domínio na wiki (obrigatório em tasks)
depends_on: []           # [ "[[task-anterior]]" ] para ordenação de roadmap (tasks)
github_issue: 42         # número da issue sincronizada no GitHub via gh CLI (tasks)
implements: [BR-012, REQ-004]  # opcional em tasks: regras/requisitos de negócio atendidos
sources:                 # raw sources ou decisões que embasam a página
  - raw/2026-10-16-reuniao-kickoff.md
related: ["[[assinatura]]", "[[stripe]]"]
created: 2026-10-16
updated: 2026-10-16
---
```

### Campos da camada de negócio

`business-rule` (`sources` obrigatório; corpo com `## Exemplos`):

```yaml
---
title: Desconto máximo por pedido
type: business-rule
id: BR-012                # igual ao prefixo do arquivo br-012-<slug>.md
rule_type: restricao      # restricao | calculo | derivacao | habilitacao | inferencia
status: active            # draft | active | deprecated
superseded_by: ""         # "[[br-031-...]]" quando deprecated
sources:
  - raw/2026-10-16-ata-comercial.md
related: ["[[req-004-aplicar-desconto]]"]
created: 2026-10-16
updated: 2026-10-16
---
```

`requirement` (corpo com `## Critérios de aceite`):

```yaml
---
title: Aplicar desconto no pedido
type: requirement
id: REQ-004               # igual ao prefixo do arquivo req-004-<slug>.md
priority: must            # must | should | could | wont
rules: ["[[br-012-desconto-maximo]]"]
status: active
sources:
  - raw/2026-10-16-ata-comercial.md
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
Em `wiki/business/`, vale também a linguagem de negócio definida em `schema/business-rules.md`: termos do `glossario.md`, sem jargão técnico.
