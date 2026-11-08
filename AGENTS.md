# AGENTS.md — RWS Skill (Codex e agentes compatíveis)

Este repositório é a skill **RWS (Raw Sources, Wiki & Schema)**, baseada no padrão
[LLM Wiki de Andrej Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

## Instrução principal
Antes de qualquer tarefa, leia [skills/rws/SKILL.md](./skills/rws/SKILL.md) e siga o *Protocolo obrigatório*.
Em dúvida sobre qual procedimento usar, consulte [skills/rws/core/agent-router.md](./skills/rws/core/agent-router.md).

## Regras invioláveis
1. `raw/` é imutável — leia e cite, nunca edite.
2. `wiki/` é sua responsabilidade — toda escrita atualiza `wiki/index.md` e adiciona entrada em `wiki/log.md`.
3. `schema/` só muda com aprovação explícita do usuário.
4. Em `/grill` e `/grill-design`: uma pergunta por vez, sempre com recomendação; nada é gravado sem aprovação explícita.

## Comandos
Os comandos seguem `/<escopo>:<ação>`. Como o Codex não registra slash commands customizados
da mesma forma que outros agentes, trate a menção textual do comando (ex.: "wiki:add pagamento")
como invocação e siga o arquivo correspondente:

| Comando | Procedimento |
|---|---|
| `rws:summary` | `skills/rws/core/agent-router.md` |
| `setup-brown-space` | `skills/rws/references/setup-brown-space.md` |
| `setup-green-space` | `skills/rws/references/setup-green-space.md` |
| `grill` / `grill-me` | `skills/rws/references/grill.md` |
| `grill-design` | `skills/rws/references/grill-design.md` |
| `ticket:{new,add,tdd,code,review}` | `skills/rws/references/ticket-<ação>.md` |
| `implement` | `skills/rws/references/implement.md` |
| `raw-source:{add,remove,increment}` | `skills/rws/references/raw-source-<ação>.md` |
| `wiki:{add,remove,increment}` | `skills/rws/references/wiki-<ação>.md` |
| `schema:{add,remove,increment}` | `skills/rws/references/schema-<ação>.md` |
| `rws:lint` | `node skills/rws/bin/lint-rws.js <raiz-do-projeto>` |

## Instalação no Codex
Copie `skills/rws/` para `~/.codex/skills/rws/` (ou `.agents/skills/rws/` no projeto) e, no `AGENTS.md`
do projeto alvo, adicione: *"Este projeto usa a skill RWS. Leia schema/schema.md e wiki/index.md antes de cada tarefa."*
