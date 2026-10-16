# GEMINI.md — RWS Skill (Antigravity)

Este repositório é a skill **RWS (Raw Sources, Wiki & Schema)**.

- Skill mestra: [SKILL.md](./SKILL.md) (`name: rws`) — leia antes de agir.
- Router de decisão: [core/agent-router.md](./core/agent-router.md).
- Cada workflow em `workflows/<nome>/` é instalado como skill individual em `.agents/skills/<nome>/` (projeto) ou `~/.gemini/config/skills/<nome>/` (global) via `bin/install.ps1`, registrando os slash commands correspondentes (`/implement`, `/ticket-new`, `/ticket-tdd`, `/ticket-code`, `/ticket-review`, `/grill`, `/grill-design`, etc.) no menu da UI.

## Regras
1. `raw/` imutável · `wiki/` mantida pelo agente (sempre atualizar `index.md` + `log.md`) · `schema/` só com aprovação.
2. Use a ferramenta de perguntas de múltipla escolha em `/grill` e `/grill-design`, com a opção recomendada primeiro.
3. Em `/setup-brown-space` de repositórios grandes, delegue a varredura de módulos a subagentes de pesquisa.
4. Em `/ticket:tdd` e `/ticket:code`, siga rigorosamente as fases RED e GREEN. Em `/ticket:review`, gere commits convencionais estritos.
5. Mapeamento de comandos: idêntico ao de [CLAUDE.md](./CLAUDE.md#mapa-de-comandos). Aceite indistintamente `/ticket:new` e `/ticket-new`, `/wiki:add` e `/wiki-add`, etc.
