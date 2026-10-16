# CLAUDE.md — RWS Skill (Claude Code)

Este repositório é a skill **RWS (Raw Sources, Wiki & Schema)**.
A instrução canônica está em [SKILL.md](./SKILL.md): **leia-a integralmente antes de agir**.

## Como o Claude Code deve operar
1. No início da sessão, siga o *Protocolo obrigatório* de [SKILL.md](./SKILL.md#2-protocolo-obrigatório-toda-sessão).
2. Em dúvida sobre o que fazer → [core/agent-router.md](./core/agent-router.md).
3. Ao receber um comando, abra o `SKILL.md` do workflow correspondente e siga-o passo a passo.

## Mapa de comandos
| Comando digitado | Arquivo a seguir |
|---|---|
| `/rws:summary` | `core/agent-router.md` |
| `/setup-brown-space` | `workflows/setup-brown-space/SKILL.md` |
| `/setup-green-space` | `workflows/setup-green-space/SKILL.md` |
| `/grill`, `/grill-me` | `workflows/grill/SKILL.md` |
| `/grill-design` | `workflows/grill-design/SKILL.md` |
| `/ticket:new` · `:add` | `workflows/ticket-<ação>/SKILL.md` |
| `/ticket:tdd` · `:code` · `:review` | `workflows/ticket-<ação>/SKILL.md` |
| `/implement` | `workflows/implement/SKILL.md` |
| `/raw-source:add` · `:remove` · `:increment` | `workflows/raw-source-<ação>/SKILL.md` |
| `/wiki:add` · `:remove` · `:increment` | `workflows/wiki-<ação>/SKILL.md` |
| `/schema:add` · `:remove` · `:increment` | `workflows/schema-<ação>/SKILL.md` |
| `/rws:lint` | `node bin/lint-rws.js <raiz-do-projeto>` + `core/lifecycle.md#lint` |

## Dicas específicas do Claude Code
- Use `AskUserQuestion` (quando disponível) nas perguntas de `/grill` e `/grill-design`, sempre com a opção recomendada primeiro.
- Use subagentes (`Task`) para varrer módulos em paralelo no `/setup-brown-space` de repositórios grandes.
- Para registrar como skill: copie esta pasta para `~/.claude/skills/rws/` (global) ou `.claude/skills/rws/` (projeto). Veja o [README](./README.md#instalação).
