---
name: schema-add
description: >-
  /schema:add — Adiciona uma nova regra, convenção, tipo de página, taxonomia ou workflow ao
  schema/ do projeto, com aprovação explícita do usuário. Use quando surgir uma regra que deve
  guiar todo trabalho futuro (arquitetura, código, design, manutenção da wiki).
---

# /schema:add

> O schema governa o comportamento do agente. **Nada entra sem aprovação explícita.**
> (Se veio de `/grill` ou `/grill-design`, a aprovação do gate já vale.)

## O que pertence ao schema
- Convenções de código e arquitetura (ex.: "services não acessam o banco direto").
- Tipos de página extras, campos de frontmatter, taxonomias de tags.
- Workflows específicos do projeto (ex.: "toda migration gera página em entities/").
- Regras de design system (`schema/design-system.md`).
- Preferências do usuário sobre o processo (ex.: "ingestão sempre em modo batch").

Se é **descrição do projeto** e não **regra**, vai para a wiki (`/wiki:add`).

## Passos
1. Verificar se já existe regra equivalente ou conflitante em `schema/` → se sim, propor `/schema:increment`.
2. Redigir a regra no formato:
   ```markdown
   ### <ID curto> — <título>
   - **Regra:** <imperativo claro e verificável>
   - **Motivo:** <por quê>
   - **Exemplo:** ✅ ... / ❌ ...
   - **Origem:** [[decisao-ou-pagina]] · AAAA-MM-DD
   ```
3. Escolher o arquivo: seção apropriada de `schema/schema.md`, `schema/design-system.md`, ou novo `schema/<tema>.md` (linkado a partir de `schema/schema.md`).
4. Pedir aprovação (exceto se já aprovado num gate de grill).
5. Gravar; se a regra criar novo tipo de página, criar também o template em `schema/templates/`.
6. Append em `wiki/log.md`: `## [AAAA-MM-DD] schema:add | <ID> — <título>`.
7. Se a regra exige adequar páginas existentes, listar e oferecer `/wiki:increment` em lote.
