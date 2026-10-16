# Issue 01: Migrar/estruturar diretório `skills/` padronizado para `skills.sh` e AGY

- **Status**: resolved
- **Assignee**: agent
- **Feature**: `distribution-packaging`

## Descrição
Mover/estruturar os workflows contidos em `workflows/` para a estrutura padrão `skills/<skill-name>/SKILL.md` esperada pela convenção aberta de Agent Skills (`skills.sh`) e Antigravity.
Incluir também a skill mestra `skills/rws/SKILL.md`.

## Critérios de Aceite
- [x] Todas as 19 skills de workflows presentes em `skills/<nome>/SKILL.md`.
- [x] Skill mestra presente em `skills/rws/SKILL.md`.
- [x] Links relativos mantidos ou ajustados sem quebra (`../../core` e `../../templates`).
