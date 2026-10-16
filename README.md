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
├── .claude-plugin/     # manifestos de plugin e marketplace para Claude Code
├── plugin.json         # manifesto de plugin nativo para Antigravity
├── rules/              # regras compartilhadas para agentes (AGENTS.md)
├── skills/             # catálogo padronizado de skills (skills.sh, agy, Claude Code)
├── workflows/          # workflows individuais
├── core/               # arquitetura, router, convenções, index/log, ciclo de vida, catálogo de UI
├── templates/          # modelos de páginas raw/wiki/schema
├── bin/
│   ├── install.ps1     # instalador automatizado PowerShell (Windows)
│   ├── install.sh      # instalador automatizado Bash (Linux / macOS)
│   └── lint-rws.js     # linter de saúde sem dependências (Node ≥ 18)
└── examples/demo/      # projeto de exemplo já no formato RWS
```

## Instalação

### 1. `skills.sh` (Vercel Labs / Agent Skills)
O RWS segue o padrão aberto de Agent Skills e pode ser instalado diretamente via `npx`:

```bash
# Instalar todas as skills do repositório
npx skills add <seu-usuario>/rws-skill

# Ou instalar apenas uma skill específica
npx skills add <seu-usuario>/rws-skill --skill implement
```

### 2. Claude Code (Plugins & Marketplace)
Distribuído nativamente através do sistema de plugins do Claude Code:

```bash
# 1. Adicionar o repositório como marketplace comunitário
claude plugin marketplace add https://github.com/<seu-usuario>/rws-skill.git

# 2. Instalar o plugin RWS
claude plugin install rws@rws-marketplace
```

*Instalação manual legada:*
```bash
# Global
cp -r skills/rws ~/.claude/skills/rws
# Ou no projeto local
cp -r skills/rws <projeto>/.claude/skills/rws
```

### 3. Antigravity (`agy`)

#### Via CLI do Antigravity
```bash
agy plugin install https://github.com/<seu-usuario>/rws-skill.git
```

#### Via One-Liner Remoto (Download + Registro de Slash Commands)
```powershell
# Windows (PowerShell)
irm https://raw.githubusercontent.com/<seu-usuario>/rws-skill/main/bin/install.ps1 | iex
```

```bash
# Linux / macOS (Bash)
curl -fsSL https://raw.githubusercontent.com/<seu-usuario>/rws-skill/main/bin/install.sh | bash
```

#### Via Instalador Local
Se você já clonou o repositório localmente:

```powershell
# Windows (PowerShell)
# Global (~/.gemini/config/skills):
powershell -ExecutionPolicy Bypass -File bin/install.ps1 global

# Por projeto (<projeto>/.agents/skills):
powershell -ExecutionPolicy Bypass -File bin/install.ps1 project "<caminho-do-projeto>"
```

```bash
# Linux / macOS (Bash)
# Global:
./bin/install.sh global

# Por projeto:
./bin/install.sh project "<caminho-do-projeto>"
```

> **Nota sobre Slash Commands:** Na UI do Antigravity, os comandos do menu autocomplete utilizam hífens (ex.: `/ticket-new`, `/implement`, `/grill-design`). Na conversa em texto, o modelo interpreta com total paridade tanto a sintaxe canônica com dois-pontos (`/ticket:new`, `/ticket:tdd`) quanto com hífen (`/ticket-new`, `/ticket-tdd`).

### 4. Codex
```bash
cp -r skills/rws ~/.codex/skills/rws
```
E no `AGENTS.md` do projeto: *"Este projeto usa a skill RWS. Leia schema/schema.md e wiki/index.md antes de cada tarefa."*


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
