# GEMINI.md — RWS Skill (Antigravity)

Este repositório é a skill **RWS (Raw Sources, Wiki & Schema)**.

- Skill mestra: [skills/rws/SKILL.md](./skills/rws/SKILL.md) (`name: rws`) — leia antes de agir.
- Router de decisão: [skills/rws/core/agent-router.md](./skills/rws/core/agent-router.md).
- Os workflows ficam em `skills/rws/references/<nome>.md`; a skill `rws` é instalada como uma única pasta autocontida (`agy plugin install <repo>` ou `scripts/install.sh --agy`). No texto da conversa, `/ticket:new` e `/ticket-new` são equivalentes.

Invocação: `/rws <comando>` (ex.: `/rws grill`); no plugin do Claude Code, `/rws:rws <comando>`. Os comandos abaixo valem como argumento ou menção textual.

## Regras
1. `raw/` imutável · `wiki/` mantida pelo agente (sempre atualizar `index.md` + `log.md`) · `schema/` só com aprovação.
2. Use a ferramenta de perguntas de múltipla escolha em `/grill` e `/grill-design`, com a opção recomendada primeiro.
3. Em `/setup-brown-space` de repositórios grandes, delegue a varredura de módulos a subagentes de pesquisa.
4. Em `/ticket:tdd` e `/ticket:code`, siga rigorosamente as fases RED e GREEN. Em `/ticket:review`, gere commits convencionais estritos.
5. Mapeamento de comandos: idêntico ao de [CLAUDE.md](./CLAUDE.md#mapa-de-comandos). Aceite indistintamente `/ticket:new` e `/ticket-new`, `/wiki:add` e `/wiki-add`, etc.
