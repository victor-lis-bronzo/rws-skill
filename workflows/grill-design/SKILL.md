---
name: grill-design
description: >-
  /grill-design — Sessão socrática dedicada a UI e UX. O agente pergunta, uma questão por vez,
  sobre jornadas, layout, componentes, estados e acessibilidade, sempre sugerindo patterns de UI
  nomeados e aplicações de referência correlatas. Após aprovação explícita, grava a spec em
  wiki/ui-specs/ e as regras visuais em schema/design-system.md.
---

# /grill-design

**Objetivo:** definir como a aplicação deve **parecer e se comportar** para o usuário final,
apoiado em patterns consolidados e em produtos reais, e registrar isso de forma persistente.

## Preparação (silenciosa)
1. Ler `wiki/index.md`, `wiki/overview.md`, specs relacionadas em `wiki/ui-specs/` e `schema/design-system.md` (se existir).
2. Inspecionar a UI existente no código (biblioteca de componentes, tokens, Tailwind config, telas parecidas).
3. Ler o [catálogo de patterns](../../core/ui-patterns-catalog.md).
4. Se a feature não tem `/grill` prévio e as regras de negócio são incertas, sugerir rodar `/grill` antes.

## Regras de condução
1. **Uma pergunta por vez**, com **recomendação** justificada.
2. **Toda pergunta de design vem com sugestões concretas**, no formato:

   ```markdown
   **Pergunta:** Como o usuário deve navegar pelos 2.000 pedidos?

   | Opção | Pattern | Referências (o que copiar) | Prós | Contras |
   |---|---|---|---|---|
   | A ⭐ | Data table + filtros facetados + saved views | **Stripe Dashboard** (chips de filtro acima da tabela), **Linear** (views salvas na sidebar) | Escala, power users | Pior no mobile |
   | B | Master-Detail | **Gmail** (lista + leitura lado a lado) | Contexto preservado | Exige tela larga |
   | C | Cards grid | **Airbnb** (cards com foto) | Visual | Difícil comparar |

   **Recomendo A** porque o público é operacional, desktop, e compara status/valores.
   ```
3. Referências devem ser **apps reais e correlatos ao domínio** do projeto (fintech → Nubank, Stripe, Mercury; produtividade → Linear, Notion; marketplace → Airbnb, Mercado Livre; etc.). Diga **o que exatamente** copiar (um detalhe específico), não só o nome.
4. Se o agente tiver busca web, pode pesquisar exemplos (Mobbin, Page Flows, Dribbble) para enriquecer.
5. Sempre que possível, mostre um **wireframe ASCII** da opção recomendada.
6. Respeite o design system existente; só proponha mudanças nele explicitamente.

## Dimensões (percorrer o que for relevante, nesta ordem)

| # | Dimensão | Perguntas típicas | Patterns comuns a sugerir |
|---|---|---|---|
| 1 | **Público e contexto** | Quem é? Frequência de uso? Desktop/mobile? Nível técnico? | — (define o resto) |
| 2 | **Jornada / user flow** | De onde vem, qual objetivo, para onde vai? Passos? | Wizard, hub-and-spoke, linear flow |
| 3 | **Arquitetura de informação** | Quais telas? Hierarquia? Navegação? | Sidebar, tabs, bottom bar, ⌘K, breadcrumbs |
| 4 | **Layout e hierarquia visual** | Ponto focal? Densidade? Grid? Responsividade? | Master-detail, dashboard de KPI, split view |
| 5 | **Exibição de dados** | Lista, tabela, cards, gráfico? Busca/filtro/ordenação? | Data table, kanban, facetas, saved views |
| 6 | **Criação e edição** | Como cria/edita? Validação? Salvamento? | Modal, drawer, inline edit, autosave, stepper |
| 7 | **Estados** | Loading, vazio, erro, sucesso, parcial, sem permissão, offline | Skeleton, empty state educativo, undo toast, optimistic UI |
| 8 | **Feedback e micro-interações** | Confirmações, transições, hover, atalhos | Toast, inline validation, keyboard shortcuts |
| 9 | **Design system e tokens** | Biblioteca (shadcn, Radix, MUI…)? Cores semânticas, tipografia, espaçamento, dark mode | Tokens semânticos, escala 4/8px |
| 10 | **Acessibilidade** | Teclado, foco, contraste AA, leitor de tela, `prefers-reduced-motion` | Skip links, focus ring, ARIA patterns |
| 11 | **Conteúdo e tom** | Microcopy, idioma, tom de voz, mensagens de erro | — |
| 12 | **Onboarding e ativação** | Primeiro uso? Dados de exemplo? | Checklist, template gallery, sample data |

## Síntese
Apresente a spec preenchendo o template [ui-ux-spec.md](../../templates/wiki/ui-ux-spec.md), incluindo:
- tabela **Patterns adotados** (pattern → onde → referência → motivo);
- tabela **Referências** (app → o que copiar → o que evitar);
- wireframes ASCII das telas principais;
- matriz de estados por componente;
- tokens/regras novas propostas para o design system.

E a tabela de gravações:

| Destino | Arquivo | Ação |
|---|---|---|
| wiki | `wiki/ui-specs/<tela-ou-fluxo>.md` | /wiki:add |
| wiki | `wiki/concepts/<feature>.md` (link para a spec) | /wiki:increment |
| schema | `schema/design-system.md` | /schema:add (1ª vez) ou /schema:increment |

## Plano de Implementação de UI (Tasks / Tickets)
| Task | Vertical | Depende de | Prioridade | Ação |
|---|---|---|---|---|
| `wiki/tasks/<slug-da-tela>.md` | `ui` | - | `medium` | /ticket:new (wiki + issue) |

## Aprovação explícita (gate)
**"Aprova a spec de UI/UX, as gravações no design system e a criação das tasks (+ issues no GitHub)? (sim / ajustar)"** — sem aprovação inequívoca, não grave nada.

## Formalização (após aprovação)
1. [/wiki:add](../wiki-add/SKILL.md) → `wiki/ui-specs/<slug>.md` (`type: ui-spec`).
2. [/wiki:increment](../wiki-increment/SKILL.md) nas páginas de feature/entidade relacionadas.
3. [/schema:add](../schema-add/SKILL.md) ou [/schema:increment](../schema-increment/SKILL.md) → `schema/design-system.md` (template [design-system-rules.md](../../templates/schema/design-system-rules.md)).
4. Execute [/ticket:new](../ticket-new/SKILL.md) para cada task de UI planejada (componentes, telas, interações), com as labels `vertical:ui` (ou vertical da feature) e `status:planned`.
5. Append em `wiki/log.md`: `## [AAAA-MM-DD] grill-design | <tela/fluxo>` com as páginas e tasks criadas.
6. Sugerir próximos passos: `/implement <task-de-ui>`, protótipo, telas vizinhas sem spec.
