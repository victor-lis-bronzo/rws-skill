---
title: Schema
type: schema
updated: AAAA-MM-DD
---

# Schema do projeto <nome>

> Lido pelo agente no início de toda sessão. Mudanças só com aprovação do usuário (`/schema:*`).
> Base: skill RWS — Raw Sources, Wiki & Schema.

## 1. Localização e idioma
| Item | Valor |
|---|---|
| Raiz da base | `./` (raw/, wiki/, schema/) |
| Idioma da wiki | pt-BR |
| Ferramenta de leitura | Obsidian / VS Code / GitHub |

## 2. Tipos de página
Padrão da skill: `overview`, `entity`, `concept`, `decision`, `ui-spec`, `synthesis`, `source-summary`.

| Tipo extra | Pasta | Template | Quando usar |
|---|---|---|---|

## 3. Taxonomia de tags
| Tag | Significado |
|---|---|

## 4. Workflows do projeto
- Ingestão: um a um com discussão (padrão) / batch
- Lint: a cada ~10 ingestões
- Ao concluir uma feature: `/wiki:increment` na spec e na decisão com o estado real

## 5. Convenções de código e arquitetura
<!-- Regras no formato:
### <ID> — <título>
- **Regra:**
- **Motivo:**
- **Exemplo:** ✅ / ❌
- **Origem:** [[pagina]] · AAAA-MM-DD
-->

## 6. Outras regras
- Design system: `schema/design-system.md`
