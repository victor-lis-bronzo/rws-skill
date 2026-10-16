# RWS Skill — Raw Sources, Wiki & Schema

Skill replicável para agentes de IA (**Claude Code**, **Codex**, **Antigravity**) que transforma o agente
em mantenedor disciplinado de uma base de conhecimento persistente do seu projeto, seguindo o padrão
[LLM Wiki de Andrej Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

> Em vez de redescobrir o projeto a cada conversa (RAG), o agente **compila** o conhecimento
> numa wiki interligada e a mantém atual. Cada fonte e cada pergunta deixam a base mais rica.

## As três camadas

| Camada | Pasta | Quem escreve | Natureza |
|---|---|---|---|
| Raw Sources | `raw/` | Você (curadoria) | Imutável, fonte da verdade |
| Wiki | `wiki/` | O agente | Sínteses, entidades, decisões, specs, com `index.md` e `log.md` |
| Schema | `schema/` | Você + agente | Convenções e workflows que governam o agente |

Detalhes: [core/architecture.md](./core/architecture.md).

## Comandos

Gramática: `/<escopo>:<ação>` — escopos `raw-source · wiki · schema · ticket` × ações `add · remove · increment · new · tdd · code · review`.

| Comando | O que faz |
|---|---|
| `/rws:summary` | Sumário para o agente decidir qual skill usar |
| `/setup-brown-space` | Audita uma codebase existente, mostra o que entendeu e semeia raw/wiki/schema |
| `/setup-green-space` | Define e inicializa a arquitetura RWS limpa em um projeto novo do zero |
| `/grill` · `/grill-me` | Brainstorm socrático até entender o que você quer → grava na wiki, schema e gera tasks |
| `/grill-design` | Brainstorm de UI/UX com patterns nomeados e apps de referência → `wiki/ui-specs/` + tasks de UI |
| `/ticket:new` · `:add` | Criar task na wiki + issue no GitHub (`:new`) ou exportar task existente para issue (`:add`) |
| `/ticket:tdd` · `:code` · `:review` | Ciclo TDD: testes falhando (`:tdd`), código verde (`:code`), lint/commit convencional/fechamento (`:review`) |
| `/implement` | Orquestrador de implementação guiado por ticket, verticalidade ou análise autônoma de roadmap |
| `/raw-source:add` · `:remove` · `:increment` | Ingerir, arquivar ou versionar fontes |
| `/wiki:add` · `:remove` · `:increment` | Criar, remover ou enriquecer páginas |
| `/schema:add` · `:remove` · `:increment` | Criar, remover ou evoluir regras |
| `/rws:lint` | Checagem de saúde (links, órfãs, index, log, frontmatter) |

## Estrutura do repositório

```
rws-skill/
├── SKILL.md            # instrução geral (sempre lida)
├── CLAUDE.md · AGENTS.md · GEMINI.md   # adaptadores por agente
├── core/               # arquitetura, router, convenções, index/log, ciclo de vida, catálogo de UI
├── workflows/          # um SKILL.md por comando
├── templates/          # modelos de páginas raw/wiki/schema
├── bin/lint-rws.js     # linter sem dependências (Node ≥ 18)
└── examples/demo/      # projeto de exemplo já no formato RWS
```

## Instalação

### Claude Code
```bash
# global
cp -r rws-skill ~/.claude/skills/rws
# ou por projeto
cp -r rws-skill <projeto>/.claude/skills/rws
```

### Codex
```bash
cp -r rws-skill ~/.codex/skills/rws
```
E no `AGENTS.md` do projeto: *"Este projeto usa a skill RWS. Leia schema/schema.md e wiki/index.md antes de cada tarefa."*

### Antigravity
```powershell
# por projeto
Copy-Item -Recurse rws-skill <projeto>\.agents\skills\rws
# global
Copy-Item -Recurse rws-skill $HOME\.gemini\config\skills\rws
```

> Os workflows em `workflows/*/SKILL.md` têm frontmatter próprio e podem ser descobertos como skills
> individuais por agentes que suportam skills aninhadas; os demais seguem o mapa de comandos do `SKILL.md`.

## Primeiros passos

- **Projeto novo:** `/setup-green-space` para criar a infraestrutura RWS e `/grill` para conceber os requisitos.
- **Projeto existente:** `/setup-brown-space` para auditar a codebase e semear a base.
- **Chegou material novo:** `/raw-source:add`
- **Vai desenhar telas:** `/grill-design`

## Lint

```bash
node bin/lint-rws.js <raiz-do-projeto>          # relatório
node bin/lint-rws.js <raiz-do-projeto> --json   # saída para máquinas
node bin/lint-rws.js examples/demo              # testar com o exemplo
```

Código de saída `1` se houver erros (útil em CI).

## Ferramentas recomendadas
- **Obsidian** para navegar a wiki (graph view, wikilinks, Dataview sobre o frontmatter).
- **Obsidian Web Clipper** para trazer artigos da web para `raw/`.
- **git** — a base é só markdown: histórico e branches de graça.
