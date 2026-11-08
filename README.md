# RWS — Raw Sources, Wiki & Schema

> Turn your agent into the disciplined maintainer of a persistent project knowledge base.

`rws` is an agent skill for **Claude Code**, **Google Antigravity (`agy`)** and **Codex**, based on Andrej Karpathy's [LLM Wiki](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) pattern. Instead of rediscovering the project in every conversation (RAG), the agent **compiles** knowledge into an interlinked wiki and keeps it current.

The skill content (workflows, templates, wiki output) is written in Brazilian Portuguese.

## The three layers

| Layer | Folder | Written by | Nature |
|---|---|---|---|
| Raw Sources | `raw/` | You (curation) | Immutable source of truth |
| Wiki | `wiki/` | The agent | Syntheses, entities, decisions, specs, with `index.md` and `log.md` |
| Schema | `schema/` | You + agent | Conventions and workflows that govern the agent |

Details: [skills/rws/core/architecture.md](skills/rws/core/architecture.md).

## Install

Pick one.

### 1. `npx skills` (Claude Code + Antigravity in one go)

```bash
npx skills add victor-lis-bronzo/rws-skill --skill rws -g -a claude-code -a antigravity-cli -y
```

Drop `-g` to install into the current project instead. Add `-a antigravity` for the Antigravity IDE, or `--copy` to copy files rather than symlink.

### 2. Claude Code plugin

```bash
claude plugin marketplace add victor-lis-bronzo/rws-skill
claude plugin install rws@rws-skill
```

Plugin skills are namespaced: invoke as `/rws:rws`.

### 3. Antigravity plugin

```bash
git clone https://github.com/victor-lis-bronzo/rws-skill
agy plugin install ./rws-skill
```

Run `agy plugin list` to see the exact name.

### 4. Install script

```bash
# macOS / Linux / Git Bash
git clone https://github.com/victor-lis-bronzo/rws-skill; cd rws-skill
./scripts/install.sh                     # global, Claude + Antigravity
./scripts/install.sh --claude
./scripts/install.sh --agy
./scripts/install.sh --project ~/code/my-app
./scripts/install.sh --link              # symlink: `git pull` updates the skill
./scripts/install.sh --uninstall
```

```powershell
# Windows (PowerShell)
./scripts/install.ps1                    # global, Claude + Antigravity
./scripts/install.ps1 -Claude
./scripts/install.ps1 -Agy
./scripts/install.ps1 -Project C:\path\to\repo
./scripts/install.ps1 -Link
./scripts/install.ps1 -Uninstall
```

### Manual

Copy `skills/rws/` (the whole folder, it is self-contained) to:

| Where | Claude Code | Antigravity | Codex |
|---|---|---|---|
| Global | `~/.claude/skills/rws` | `~/.gemini/config/skills/rws` | `~/.codex/skills/rws` |
| Project | `.claude/skills/rws` | `.agents/skills/rws` | `.agents/skills/rws` |

For Codex, also add to the project's `AGENTS.md`: *"This project uses the RWS skill. Read schema/schema.md and wiki/index.md before every task."*

Manual, script and `npx skills` installs invoke as plain `/rws`.

## Commands

The whole skill is one entry point (`rws`). Individual commands are **not** separate skills, so they do not show up in the autocomplete menu: type them as text and the skill routes to the right workflow in `skills/rws/references/`. Both `/ticket:new` and `/ticket-new` are understood.

Grammar: `/<scope>:<action>` with scopes `raw-source · wiki · schema · ticket` and actions `add · remove · increment · new · tdd · code · review`.

| Command | What it does |
|---|---|
| `/rws:summary` | Summary so the agent can decide which workflow to use |
| `/setup-brown-space` | Audits an existing codebase, shows what it understood, seeds raw/wiki/schema |
| `/setup-green-space` | Defines and initializes a clean RWS architecture in a new project |
| `/grill` · `/grill-me` | Socratic brainstorm until it understands what you want → writes wiki, schema and tasks |
| `/grill-design` | UI/UX brainstorm with named patterns and reference apps → `wiki/ui-specs/` + UI tasks |
| `/ticket:new` · `:add` | Create a wiki task + GitHub issue, or export an existing task to an issue |
| `/ticket:tdd` · `:code` · `:review` | TDD cycle: failing tests, green code, lint/conventional commit/closure |
| `/implement` | Implementation orchestrator driven by ticket, vertical or autonomous roadmap analysis |
| `/raw-source:add` · `:remove` · `:increment` | Ingest, archive or version sources |
| `/wiki:add` · `:remove` · `:increment` | Create, remove or enrich pages |
| `/schema:add` · `:remove` · `:increment` | Create, remove or evolve rules |
| `/rws:lint` | Health check (links, orphans, index, log, frontmatter) |

### Getting started

- **New project:** `/setup-green-space`, then `/grill` to shape the requirements.
- **Existing project:** `/setup-brown-space` to audit the codebase and seed the base.
- **New material arrived:** `/raw-source:add`
- **About to design screens:** `/grill-design`

## Repository layout

```
rws-skill/
├── .claude-plugin/      # Claude Code plugin + marketplace manifests
├── plugin.json          # Antigravity plugin manifest
├── scripts/             # install.sh, install.ps1, check-links.js
├── skills/rws/          # the skill: self-contained, this is what gets installed
│   ├── SKILL.md
│   ├── core/            # architecture, router, conventions, lifecycle, UI patterns
│   ├── templates/       # raw / wiki / schema page templates
│   ├── references/      # one file per workflow
│   └── bin/lint-rws.js  # dependency-free linter (Node >= 18)
├── examples/demo/       # sample project already in RWS format
└── AGENTS.md · CLAUDE.md · GEMINI.md   # thin agent adapters
```

## Lint

```bash
node skills/rws/bin/lint-rws.js <project-root>          # report
node skills/rws/bin/lint-rws.js <project-root> --json   # machine-readable
node skills/rws/bin/lint-rws.js examples/demo           # try it on the example
node scripts/check-links.js                             # validate the skill's relative links
```

Exit code `1` on errors (useful in CI). An installed skill has the linter at `<skills-dir>/rws/bin/lint-rws.js`.

## Recommended tools

- **Obsidian** to browse the wiki (graph view, wikilinks, Dataview over frontmatter).
- **Obsidian Web Clipper** to bring web articles into `raw/`.
- **git**: the base is plain markdown, so history and branches come for free.

## Releasing

The version lives in both `plugin.json` (repo root, for agy) and `.claude-plugin/plugin.json` (Claude). Bump both.

## License

MIT
