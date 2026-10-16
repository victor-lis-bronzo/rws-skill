---
name: grill
description: >-
  /grill (alias /grill-me) — Brainstorm socrático: o agente faz perguntas, uma por vez,
  até entender completamente o que o usuário quer (feature, regra de negócio, arquitetura).
  Após aprovação explícita, registra o resultado com /wiki:add e /schema:add.
  Use para ideias vagas, novas features ou decisões técnicas.
---

# /grill

**Objetivo:** chegar a um entendimento compartilhado e sem ambiguidades, percorrendo cada
ramo da árvore de decisão, e transformar o resultado em conhecimento persistente.

## Regras de condução
1. **Uma pergunta por vez.** Nunca despeje um questionário.
2. **Toda pergunta traz sua recomendação** e o porquê (ex.: *"Recomendo X porque o módulo Y já faz Z"*).
   Ofereça 2-4 opções quando fizer sentido (use a ferramenta de pergunta múltipla escolha se o agente tiver).
3. **Se a resposta está na base ou no código, não pergunte** — leia `wiki/`, `schema/`, `raw/` e o código, e apenas confirme.
4. **Resolva dependências em ordem**: decisões que bloqueiam outras vêm primeiro.
5. Mantenha visível um **mapa de decisões** (resolvidas ✅ / pendentes ⏳) a cada ~5 perguntas.
6. Desafie premissas com educação: aponte contradições com a wiki, riscos e alternativas mais simples.
7. Pare de perguntar quando novas respostas não mudarem mais o desenho.

## Árvore de decisão (percorrer o que for relevante)

| Ramo | Perguntas típicas |
|---|---|
| **Problema** | Qual dor? Para quem? Como é resolvido hoje? Como medir sucesso? |
| **Escopo** | O que está dentro/fora do MVP? Qual o menor incremento útil? |
| **Atores e permissões** | Quem usa? Quem administra? Quem não pode ver? |
| **Domínio e dados** | Quais entidades? Relacionamentos? Ciclo de vida/estados? Fonte da verdade? |
| **Regras de negócio** | Invariantes? Casos de borda? Limites, prazos, cálculos? |
| **Fluxos** | Caminho feliz? Falhas? Concorrência? Idempotência? |
| **Integrações** | Sistemas externos? Contratos? O que acontece se caírem? |
| **Não-funcionais** | Volume, latência, segurança, LGPD, auditoria, custo |
| **Arquitetura** | Onde mora o código? Novos módulos? Padrões do schema se aplicam? |
| **Entrega** | Migração de dados? Feature flag? Rollback? Testes de aceite? |
| **UI/UX** | Se houver interface relevante → sugerir `/grill-design` em seguida |

## Síntese
Ao final, apresente:

```markdown
# Síntese do grill: <tema>

## Problema e objetivo
## Decisões
| # | Decisão | Alternativas descartadas | Motivo |
|---|---|---|---|
## Modelo de domínio (mermaid erDiagram ou classDiagram, se aplicável)
## Fluxos (mermaid sequenceDiagram/flowchart, se aplicável)
## Regras de negócio e casos de borda
## Fora de escopo
## Riscos e perguntas em aberto

## O que será gravado
| Destino | Arquivo | Ação |
|---|---|---|
| wiki | wiki/concepts/<slug>.md | /wiki:add |
| wiki | wiki/decisions/AAAA-MM-DD-<slug>.md | /wiki:add |
| wiki | wiki/entities/<x>.md | /wiki:increment |
| schema | schema/schema.md#<regra> | /schema:add |

## Plano de Implementação (Tasks / Tickets)
| Task | Vertical | Depende de | Prioridade | Ação |
|---|---|---|---|---|
| `wiki/tasks/<slug>.md` | `<vertical>` | - | `high` | /ticket:new (wiki + issue) |
```

## Aprovação explícita (gate)
Pergunte: **"Aprova a síntese, as gravações de conhecimento e a criação das tasks (+ issues no GitHub)? (sim / ajustar)"**.
Só aceite como aprovação respostas inequívocas ("sim", "aprovado", "1", "pode gravar").
Sem aprovação → **não grave nada**; continue ajustando.

## Formalização (após aprovação)
1. Execute [/wiki:add](../wiki-add/SKILL.md) para cada página nova de conceito/decisão (decisão usa [decision.md](../../templates/wiki/decision.md)).
2. Execute [/wiki:increment](../wiki-increment/SKILL.md) para páginas existentes afetadas.
3. Execute [/schema:add](../schema-add/SKILL.md) para cada regra/convenção nova (já aprovada no gate).
4. Execute [/ticket:new](../ticket-new/SKILL.md) para cada task do plano de implementação: cria o `.md` em `wiki/tasks/` com `status: planned` e abre a issue no GitHub com as labels `vertical:<nome>` e `status:planned`.
5. Opcional: salvar a transcrição resumida do grill como `raw/AAAA-MM-DD-grill-<slug>.md` (as respostas do usuário são fonte primária).
6. Append em `wiki/log.md`: `## [AAAA-MM-DD] grill | <tema>` listando os arquivos tocados e tickets criados.
7. Sugerir próximo passo: `/implement vertical:<nome>` (ou `/implement <task>`), `/grill-design`, `/rws:lint`.
