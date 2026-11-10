---
title: "Catálogo de Negócio — <nome do projeto>"
type: business-catalog
status: active
tags: [negocio]
sources: []              # raw/ que descrevem o negócio (reuniões, contratos, regimentos)
related: ["[[glossario]]"]
created: AAAA-MM-DD
updated: AAAA-MM-DD
---

# Catálogo de Negócio — <nome do projeto>

> Porta de entrada para quem é do negócio. Tudo aqui está em linguagem de negócio:
> sem termos técnicos (ver `schema/business-rules.md`). Use sempre os termos do [[glossario]].

## Objetivo do negócio
<Em 2-4 frases: que problema o negócio resolve, para quem e qual resultado se espera.>

## Escopo
### Dentro do escopo
- <O que este projeto cobre>

### Fora do escopo
- <O que explicitamente não será tratado agora>

## Atores
<!-- Uma linha por ator: - [[slug-do-ator]] — quem é, em uma frase -->
- [[<slug-do-ator>]] — <quem é e o que busca>

## Processos
<!-- Uma linha por processo: - [[slug-do-processo]] — gatilho → resultado -->
- [[<slug-do-processo>]] — <gatilho> → <resultado esperado>

## Políticas
<!-- Leis, contratos, regimentos que originam regras -->
- [[<slug-da-politica>]] — <origem e o que determina, em uma frase>

## Regras de negócio
<!-- Tipo: restricao | calculo | derivacao | habilitacao | inferencia
     Status: draft | active | deprecated. Regras deprecated permanecem na tabela. -->
| ID | Regra em uma frase | Tipo | Status |
|---|---|---|---|
| BR-001 | [[br-001-<slug>]] — <Sujeito> deve/não pode <ação> quando <condição>. | restricao | active |

## Requisitos
<!-- Prioridade: must | should | could | wont -->
| ID | Necessidade | Prioridade | Regras | Status |
|---|---|---|---|---|
| REQ-001 | [[req-001-<slug>]] — Como <ator>, preciso <x>, para <y>. | must | BR-001 | active |

## Perguntas em aberto
<!-- Dúvidas de negócio ainda sem resposta. Registre quem pode responder. -->
- [ ] <Pergunta> — responsável: <pessoa/área>
