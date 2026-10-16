# AGENTS.md — RWS Skill (Codex e agentes compatíveis)

Este repositório é a skill **RWS (Raw Sources, Wiki & Schema)**, baseada no padrão
[LLM Wiki de Andrej Karpathy](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f).

## Instrução principal
Antes de qualquer tarefa, leia [SKILL.md](./SKILL.md) e siga o *Protocolo obrigatório*.
Em dúvida sobre qual procedimento usar, consulte [core/agent-router.md](./core/agent-router.md).

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
| `rws:summary` | `core/agent-router.md` |
| `setup-brown-space` | `workflows/setup-brown-space/SKILL.md` |
| `setup-green-space` | `workflows/setup-green-space/SKILL.md` |
| `grill` / `grill-me` | `workflows/grill/SKILL.md` |
| `grill-design` | `workflows/grill-design/SKILL.md` |
| `raw-source:{add,remove,increment}` | `workflows/raw-source-{ação}/SKILL.md` |
| `wiki:{add,remove,increment}` | `workflows/wiki-{ação}/SKILL.md` |
| `schema:{add,remove,increment}` | `workflows/schema-{ação}/SKILL.md` |
| `rws:lint` | `node bin/lint-rws.js <raiz-do-projeto>` |

## Instalação no Codex
Copie esta pasta para `~/.codex/skills/rws/` (ou `.agents/skills/rws/` no projeto) e, no `AGENTS.md`
do projeto alvo, adicione: *"Este projeto usa a skill RWS. Leia schema/schema.md e wiki/index.md antes de cada tarefa."*
