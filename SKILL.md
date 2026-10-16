---
name: rws
description: >-
  RWS (Raw Sources, Wiki & Schema) — arquitetura de base de conhecimento persistente
  mantida por LLM, baseada no padrão "LLM Wiki" de Andrej Karpathy. Use SEMPRE que o
  projeto contiver as pastas raw/, wiki/ ou schema/, ou quando o usuário pedir para
  auditar uma codebase, registrar conhecimento, planejar features (grill), planejar
  UI/UX (grill-design) ou executar comandos no formato /<escopo>:<ação>
  (raw-source, wiki, schema × add, remove, increment).
---

# RWS — Raw Sources, Wiki & Schema

> Instrução geral. Se esta skill está ativa, **leia este arquivo inteiro antes de qualquer ação**
> e consulte o [Router do Agente](./core/agent-router.md) sempre que precisar decidir o que fazer.

## 1. O modelo em 30 segundos

| Camada | Pasta (no projeto do usuário) | Dono | Regra de ouro |
|---|---|---|---|
| **Raw Sources** | `raw/` | Usuário | **Imutável.** O agente lê e cita, nunca edita. |
| **Wiki** | `wiki/` | Agente | O agente escreve, conecta e mantém tudo consistente. |
| **Schema** | `schema/` | Usuário + Agente | Convenções e workflows. Co-evolui com aprovação do usuário. |

Detalhes completos: [core/architecture.md](./core/architecture.md).

## 2. Protocolo obrigatório (toda sessão)

1. **Detectar o estado** do projeto:
   - Não existe `raw/`, `wiki/`, `schema/` → sugerir `/setup-green-space` (projeto novo) ou `/setup-brown-space` (codebase existente).
   - Existe → ler `schema/schema.md`, depois `wiki/index.md`, depois as últimas 5 entradas de `wiki/log.md`.
2. **Rotear a intenção** do usuário com o [agent-router.md](./core/agent-router.md).
3. **Responder perguntas a partir da wiki primeiro** (index → páginas → raw para confirmar). Citar páginas com `[[wikilinks]]` e fontes com `raw/<arquivo>#<seção>`.
4. **Toda mudança na wiki** atualiza `wiki/index.md` e adiciona uma entrada em `wiki/log.md`.
5. **Toda mudança no schema** exige aprovação explícita do usuário.
6. **Boas respostas viram páginas**: análises, comparações e sínteses relevantes são oferecidas para `/wiki:add`.

## 3. Comandos

Gramática: `/<escopo>:<ação>` — escopos `raw-source | wiki | schema | ticket`, ações `add | remove | increment | new | tdd | code | review`.

| Comando | Workflow |
|---|---|
| `/rws:summary` | [core/agent-router.md](./core/agent-router.md) — qual skill usar em cada situação |
| `/setup-brown-space` | [skills/setup-brown-space](./skills/setup-brown-space/SKILL.md) |
| `/setup-green-space` | [skills/setup-green-space](./skills/setup-green-space/SKILL.md) |
| `/grill` (`/grill-me`) | [skills/grill](./skills/grill/SKILL.md) |
| `/grill-design` | [skills/grill-design](./skills/grill-design/SKILL.md) |
| `/ticket:new` · `:add` | [new](./skills/ticket-new/SKILL.md) · [add](./skills/ticket-add/SKILL.md) |
| `/ticket:tdd` · `:code` · `:review` | [tdd](./skills/ticket-tdd/SKILL.md) · [code](./skills/ticket-code/SKILL.md) · [review](./skills/ticket-review/SKILL.md) |
| `/implement` | [skills/implement](./skills/implement/SKILL.md) — orquestrador de implementação / roadmap |
| `/raw-source:add` · `:remove` · `:increment` | [add](./skills/raw-source-add/SKILL.md) · [remove](./skills/raw-source-remove/SKILL.md) · [increment](./skills/raw-source-increment/SKILL.md) |
| `/wiki:add` · `:remove` · `:increment` | [add](./skills/wiki-add/SKILL.md) · [remove](./skills/wiki-remove/SKILL.md) · [increment](./skills/wiki-increment/SKILL.md) |
| `/schema:add` · `:remove` · `:increment` | [add](./skills/schema-add/SKILL.md) · [remove](./skills/schema-remove/SKILL.md) · [increment](./skills/schema-increment/SKILL.md) |
| `/rws:lint` | `node <skill>/bin/lint-rws.js <raiz-do-projeto>` + [core/lifecycle.md](./core/lifecycle.md#lint) |

## 4. Referências

- [core/architecture.md](./core/architecture.md) — as três camadas e por que funcionam
- [core/agent-router.md](./core/agent-router.md) — sumário de decisão
- [core/conventions.md](./core/conventions.md) — nomes, frontmatter, wikilinks
- [core/index-and-log.md](./core/index-and-log.md) — formato de `index.md` e `log.md`
- [core/lifecycle.md](./core/lifecycle.md) — Ingest, Query, Lint, Compounding
- [core/ui-patterns-catalog.md](./core/ui-patterns-catalog.md) — patterns de UI × apps de referência
- [templates/](./templates/) — modelos de página

## 5. Proibições

- ❌ Editar ou apagar arquivos em `raw/` (exceto mover para `raw/_archive/` via `/raw-source:remove` com aprovação).
- ❌ Criar página na wiki sem registrar em `index.md` e `log.md`.
- ❌ Alterar `schema/` sem aprovação explícita.
- ❌ Afirmar fatos sem fonte: toda afirmação não trivial da wiki aponta para `raw/` ou outra página.
