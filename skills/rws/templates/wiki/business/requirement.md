---
title: "<Necessidade em uma frase curta>"
type: requirement
id: REQ-001              # REQ-### (3+ dígitos, maiúsculo); igual ao prefixo do arquivo req-001-<slug>.md. Nunca reutilizar.
priority: must           # must | should | could | wont
status: draft            # draft | active | deprecated
rules: ["[[br-001-<slug>]]"]   # regras de negócio que este requisito atende
tags: [negocio]
sources: []
related: ["[[catalogo]]"]
# superseded_by: "[[req-002-<slug>]]"  # apenas quando status: deprecated
created: AAAA-MM-DD
updated: AAAA-MM-DD
---

# REQ-001 — <Necessidade em uma frase curta>

## Necessidade
**Como** [[<slug-do-ator>]], **preciso** <capacidade>, **para** <benefício de negócio>.

## Regras relacionadas
- [[br-001-<slug>]] — <regra em uma frase>

## Critérios de aceite
<!-- Obrigatório. Em Dado/Quando/Então, linguagem de negócio, valores concretos. -->

### Critério 1 — <caminho principal>
- **Dado** <situação inicial>
- **Quando** <acontecimento>
- **Então** <resultado observável pelo negócio>

### Critério 2 — <variação ou caso de borda>
- **Dado** <situação inicial>
- **Quando** <acontecimento>
- **Então** <resultado observável pelo negócio>

## Fora de escopo
<!-- O que este requisito explicitamente não cobre -->
- <Item fora de escopo>
