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
| `/setup-brown-space` | `skills/setup-brown-space/SKILL.md` |
| `/setup-green-space` | `skills/setup-green-space/SKILL.md` |
| `/grill`, `/grill-me` | `skills/grill/SKILL.md` |
| `/grill-design` | `skills/grill-design/SKILL.md` |
| `/ticket:new` · `:add` | `skills/ticket-<ação>/SKILL.md` |
| `/ticket:tdd` · `:code` · `:review` | `skills/ticket-<ação>/SKILL.md` |
| `/implement` | `skills/implement/SKILL.md` |
| `/raw-source:add` · `:remove` · `:increment` | `skills/raw-source-<ação>/SKILL.md` |
| `/wiki:add` · `:remove` · `:increment` | `skills/wiki-<ação>/SKILL.md` |
| `/schema:add` · `:remove` · `:increment` | `skills/schema-<ação>/SKILL.md` |
| `/rws:lint` | `node bin/lint-rws.js <raiz-do-projeto>` + `core/lifecycle.md#lint` |

## Dicas específicas do Claude Code
- Use `AskUserQuestion` (quando disponível) nas perguntas de `/grill` e `/grill-design`, sempre com a opção recomendada primeiro.
- Use subagentes (`Task`) para varrer módulos em paralelo no `/setup-brown-space` de repositórios grandes.
- Para instalar como plugin: `claude plugin marketplace add <url>` e `claude plugin install rws@rws-marketplace`. Veja o [README](./README.md#instalação).
