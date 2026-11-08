# CLAUDE.md — RWS Skill (Claude Code)

Este repositório é a skill **RWS (Raw Sources, Wiki & Schema)**.
A instrução canônica está em [skills/rws/SKILL.md](./skills/rws/SKILL.md): **leia-a integralmente antes de agir**.

Invocação: `/rws <comando>` (ex.: `/rws grill`); no plugin do Claude Code, `/rws:rws <comando>`. Os comandos abaixo valem como argumento ou menção textual.

## Como o Claude Code deve operar
1. No início da sessão, siga o *Protocolo obrigatório* de [skills/rws/SKILL.md](./skills/rws/SKILL.md#2-protocolo-obrigatório-toda-sessão).
2. Em dúvida sobre o que fazer → [skills/rws/core/agent-router.md](./skills/rws/core/agent-router.md).
3. Ao receber um comando, abra o reference do workflow correspondente (`skills/rws/references/`) e siga-o passo a passo.

## Mapa de comandos
| Comando digitado | Arquivo a seguir |
|---|---|
| `/rws:summary` | `skills/rws/core/agent-router.md` |
| `/setup-brown-space` | `skills/rws/references/setup-brown-space.md` |
| `/setup-green-space` | `skills/rws/references/setup-green-space.md` |
| `/grill`, `/grill-me` | `skills/rws/references/grill.md` |
| `/grill-design` | `skills/rws/references/grill-design.md` |
| `/ticket:new` · `:add` | `skills/rws/references/ticket-<ação>.md` |
| `/ticket:tdd` · `:code` · `:review` | `skills/rws/references/ticket-<ação>.md` |
| `/implement` | `skills/rws/references/implement.md` |
| `/raw-source:add` · `:remove` · `:increment` | `skills/rws/references/raw-source-<ação>.md` |
| `/wiki:add` · `:remove` · `:increment` | `skills/rws/references/wiki-<ação>.md` |
| `/schema:add` · `:remove` · `:increment` | `skills/rws/references/schema-<ação>.md` |
| `/rws:lint` | `node skills/rws/bin/lint-rws.js <raiz-do-projeto>` + `skills/rws/core/lifecycle.md#lint` |

## Dicas específicas do Claude Code
- Use `AskUserQuestion` (quando disponível) nas perguntas de `/grill` e `/grill-design`, sempre com a opção recomendada primeiro.
- Use subagentes (`Task`) para varrer módulos em paralelo no `/setup-brown-space` de repositórios grandes.
- Para instalar como plugin: `claude plugin marketplace add <url>` e `claude plugin install rws@rws-skill`. Veja o [README](./README.md#install).
