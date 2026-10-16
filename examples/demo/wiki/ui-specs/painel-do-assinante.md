---
title: Painel do assinante
type: ui-spec
status: draft
tags: [assinante]
sources:
  - raw/2026-10-16-reuniao-kickoff.md
related: ["[[assinatura]]"]
created: 2026-10-16
updated: 2026-10-16
---

# Painel do assinante

O assinante vê a próxima entrega, troca o café do próximo envio e pausa a [[assinatura]].

## Público e contexto
| Item | Valor |
|---|---|
| Persona | Assinante final, não técnico |
| Frequência de uso | 1-2x por mês |
| Dispositivo principal | mobile |

## Patterns adotados
| Pattern | Onde | Referência | Motivo |
|---|---|---|---|
| Card de status + CTA principal | Próxima entrega | Nubank (card de fatura) | Uma informação dominante, acesso mensal |
| Bottom sheet | Trocar café | Google Maps / iFood | Escolher sem sair do contexto, mobile |
| Undo toast | Pausar | Gmail ("Desfazer") | Reversível; evita modal de confirmação |

## Referências (apps correlatos)
| App | O que copiar | O que evitar |
|---|---|---|
| Nubank | Card grande com data e valor da próxima cobrança | Excesso de atalhos na home |
| Spotify (Premium) | Tela de plano clara com "pausar" acessível | Esconder cancelamento |

## Wireframe
```
┌──────────────────────────┐
│ Olá, Ana                 │
│ ┌──────────────────────┐ │
│ │ Próxima entrega       │ │
│ │ 05/11 · Etiópia 250g  │ │
│ │ [Trocar café]         │ │
│ └──────────────────────┘ │
│ Pausar assinatura  >     │
└──────────────────────────┘
```

## Matriz de estados
| Componente | Loading | Vazio | Erro | Sucesso |
|---|---|---|---|---|
| Card próxima entrega | Skeleton | "Sua assinatura está pausada" + Retomar | Retry inline | — |
| Trocar café | Skeleton na lista | — | Toast de erro | Toast "Café trocado" |

## Perguntas em aberto
- Catálogo de cafés ainda sem página própria (ver Lacunas no index).
