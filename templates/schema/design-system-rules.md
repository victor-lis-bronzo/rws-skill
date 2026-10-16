---
title: Design System
type: schema
updated: AAAA-MM-DD
---

# Design System — <projeto>

> Regras visuais e de interação. Gerado/evoluído por `/grill-design` via `/schema:add|increment`.

## 1. Fundamentos
| Item | Decisão |
|---|---|
| Biblioteca de componentes | ex.: shadcn/ui + Radix |
| Estilização | ex.: Tailwind CSS |
| Ícones | ex.: lucide |
| Dark mode | sim / não / automático |
| Plataformas | desktop / mobile / ambos |

## 2. Tokens
### Cores semânticas
| Token | Uso | Light | Dark |
|---|---|---|---|
| `--primary` | Ação principal | | |
| `--destructive` | Ações destrutivas | | |
| `--muted` | Texto secundário | | |

### Tipografia
| Token | Tamanho / peso | Uso |
|---|---|---|

### Espaçamento e raio
- Escala: 4px (4, 8, 12, 16, 24, 32, 48)
- Raio: 

## 3. Patterns padrão do projeto
| Problema | Pattern adotado | Referência |
|---|---|---|
| Listas grandes | | |
| Edição | | |
| Confirmação destrutiva | | |
| Loading | | |
| Empty state | | |

## 4. Regras
<!--
### DS-<n> — <título>
- **Regra:**
- **Motivo:**
- **Exemplo:** ✅ / ❌
- **Origem:** [[ui-spec]] · AAAA-MM-DD
-->

## 5. Acessibilidade (mínimo)
- Contraste WCAG AA
- Todo elemento interativo acessível por teclado com foco visível
- Respeitar `prefers-reduced-motion`
