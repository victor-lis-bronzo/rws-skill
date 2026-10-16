---
name: setup-brown-space
description: >-
  /setup-brown-space — Audita uma codebase existente (brownfield), apresenta ao usuário
  o que o agente entendeu e, após aprovação, semeia raw/, wiki/ e schema/ da RWS.
  Use quando o projeto já tem código mas ainda não tem base RWS, ou quando o usuário
  pedir "entenda/audite este repositório".
---

# /setup-brown-space

**Objetivo:** transformar o conhecimento implícito de uma codebase em uma base RWS explícita,
validada pelo usuário. O agente **nunca** escreve nada antes da Fase 3.

## Fase 0 — Pré-checagem
- Se `raw/`, `wiki/` ou `schema/` já existirem: avise e pergunte se é para **complementar** (modo incremental) ou abortar.
- Pergunte (uma vez, com recomendação) se a base deve ficar na raiz ou em subpasta (ex.: `docs/rws/`). Padrão recomendado: raiz.

## Fase 1 — Descoberta (somente leitura)
Explore em largura antes de profundidade:

| Alvo | O que procurar |
|---|---|
| Raiz | README, LICENSE, CONTRIBUTING, `.env.example`, docs existentes, CLAUDE.md/AGENTS.md |
| Manifests | `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `pom.xml`, `*.csproj`, lockfiles |
| Infra | Dockerfile, docker-compose, CI (`.github/workflows`), IaC (Terraform), scripts de deploy |
| Dados | migrations, schemas ORM (Prisma, TypeORM, SQLAlchemy), seeds |
| Entrypoints | `main`, `index`, `app`, rotas/controllers, CLIs, workers, cron jobs |
| Domínio | nomes de pastas/módulos, entidades, serviços, regras de negócio em código |
| Integrações | SDKs externos, chamadas HTTP, filas, webhooks |
| Qualidade | testes (tipo e cobertura aparente), lint, tipagem, padrões repetidos |
| Histórico | `git log --oneline -n 30`, contribuidores, branches (se disponível) |

Para repositórios grandes: use subagentes/pesquisa paralela por área, se o agente suportar.

## Fase 2 — Devolutiva ao usuário (obrigatória)
Apresente um relatório **antes de gravar qualquer arquivo**, neste formato:

```markdown
# O que eu entendi de <projeto>

## Em uma frase
<propósito do sistema>

## Stack
| Camada | Tecnologia | Evidência |
|---|---|---|

## Mapa de módulos / domínios
| Módulo | Responsabilidade | Arquivos-chave |
|---|---|---|

## Fluxos principais
1. <fluxo> — `arquivo:linha` → `arquivo:linha`

## Integrações externas
## Convenções observadas (candidatas a schema)
## Riscos, dívidas e lacunas
## O que NÃO consegui inferir (perguntas para você)

## Proposta de classificação
| Interpretação | Destino | Página/arquivo |
|---|---|---|
| Snapshot da auditoria | raw | raw/AAAA-MM-DD-codebase-audit.md |
| Arquitetura geral | wiki | wiki/overview.md |
| Módulo X | wiki/entity | wiki/entities/x.md |
| Regra de negócio Y | wiki/concept | wiki/concepts/y.md |
| "Usar camelCase em DTOs" | schema | schema/schema.md#convencoes-de-codigo |
```

Regra de classificação de cada interpretação:
- **raw** → fatos literais extraídos (snapshot da auditoria, lista de dependências, árvore de pastas, docs existentes copiados). Imutável.
- **wiki** → interpretação/síntese do agente (o que o módulo faz, como os fluxos se conectam).
- **schema** → regras/convenções que devem guiar trabalho futuro.

Peça ao usuário para **corrigir, completar e aprovar**. Responda às perguntas pendentes. Itere até aprovação explícita.

## Fase 3 — Semeadura (após aprovação)
1. Criar estrutura: `raw/`, `raw/_archive/`, `wiki/{entities,concepts,decisions,ui-specs,syntheses,sources}/`, `schema/`.
2. `raw/AAAA-MM-DD-codebase-audit.md` — snapshot factual da Fase 1 (com frontmatter de [raw-source-meta](../../templates/raw/raw-source-meta.md)). Docs pré-existentes relevantes podem ser referenciados como raw (sem mover os originais).
3. `schema/schema.md` a partir de [schema-rules.md](../../templates/schema/schema-rules.md), preenchido com convenções observadas e aprovadas.
4. `wiki/overview.md`, páginas de entidades/conceitos aprovadas (via procedimento de [/wiki:add](../wiki-add/SKILL.md)).
5. `wiki/index.md` e `wiki/log.md` a partir dos templates; primeira entrada de log: `## [AAAA-MM-DD] setup | Auditoria inicial da codebase`.
6. Criar/atualizar o arquivo de agente do projeto (`CLAUDE.md` / `AGENTS.md` / `GEMINI.md`, conforme o usuário usa) com o bloco:
   ```markdown
   ## Base de conhecimento (RWS)
   Este projeto usa a skill RWS. Antes de qualquer tarefa leia `schema/schema.md` e `wiki/index.md`.
   Siga os comandos /<escopo>:<ação> e consulte o router da skill em caso de dúvida.
   ```
7. Rodar `/rws:lint` e reportar o resultado.

## Fase 4 — Encerramento
- Liste o que foi criado (links).
- Sugira próximos passos: lacunas a preencher com `/grill`, telas sem spec → `/grill-design`, fontes externas a ingerir → `/raw-source:add`.
