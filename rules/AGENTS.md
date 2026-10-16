# AGENTS.md — Regras de Governança RWS (Raw Sources, Wiki & Schema)

Este projeto utiliza a metodologia **RWS (Raw Sources, Wiki & Schema)**, inspirada no padrão LLM Wiki de Andrej Karpathy.

## Instrução Principal
Antes de qualquer tarefa no projeto, consulte o sumário de decisão em `core/agent-router.md` e a skill `skills/rws/SKILL.md`.

## Regras Invioláveis
1. **`raw/` é imutável**: Somente leia e cite com fontes rastreáveis. Nunca edite ou apague diretamente fontes brutas.
2. **`wiki/` é mantida pelo agente**: Toda escrita na wiki deve obrigatoriamente registrar ou atualizar o catálogo em `wiki/index.md` e registrar a entrada temporal em `wiki/log.md`.
3. **`schema/` é protegido**: Nenhuma convenção ou regra de schema muda sem aprovação explícita do usuário.
4. **Brainstorm com Governança (`/grill` e `/grill-design`)**: Uma pergunta por vez, com a opção recomendada em primeiro lugar. Nenhuma decisão ou spec é gravada sem aprovação explícita.
5. **Ciclo TDD Rigoroso (`/implement` ou `/ticket:*`)**: Seguir as fases RED (`/ticket:tdd`), GREEN (`/ticket:code`) e REFACTOR/REVIEW (`/ticket:review`) com commits semânticos atômicos.
