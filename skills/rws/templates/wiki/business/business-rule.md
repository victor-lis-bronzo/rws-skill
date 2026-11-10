---
title: "<Regra em uma frase curta>"
type: business-rule
id: BR-001               # BR-### (3+ dígitos, maiúsculo); igual ao prefixo do arquivo br-001-<slug>.md. Nunca reutilizar.
rule_type: restricao     # restricao | calculo | derivacao | habilitacao | inferencia
status: draft            # draft | active | deprecated
tags: [negocio]
sources:                 # OBRIGATÓRIO: pelo menos uma fonte em raw/
  - raw/AAAA-MM-DD-<slug>.md
related: ["[[catalogo]]"]
# superseded_by: "[[br-002-<slug>]]"   # apenas quando status: deprecated
created: AAAA-MM-DD
updated: AAAA-MM-DD
---

# BR-001 — <Regra em uma frase curta>

## Enunciado
<!-- Uma regra = um enunciado. Formato: "<Sujeito> deve/não pode <ação> quando <condição>."
     Use somente termos do glossário. Se precisar de "e" para juntar duas obrigações, são duas regras. -->
**<Sujeito> deve/não pode <ação> quando <condição>.**

## Motivo de negócio
<Por que esta regra existe: risco evitado, valor gerado, obrigação cumprida.>

## Origem
<!-- De onde a regra veio: reunião, contrato, lei, política. Cite a fonte. -->
- <Descrição da origem> (`raw/AAAA-MM-DD-<slug>.md#<secao>`)
- Política: [[<slug-da-politica>]] <!-- se aplicável -->

## Aplica-se a
- **Atores:** [[<slug-do-ator>]]
- **Processos:** [[<slug-do-processo>]]

## Exceções
<!-- Situações em que a regra não vale. "Nenhuma" se não houver. -->
- <Exceção>

## Exemplos
<!-- Obrigatório. Pelo menos um caminho feliz e um caso de borda, em Dado/Quando/Então,
     com valores concretos do negócio. -->

### Exemplo 1 — <caminho feliz>
- **Dado** <situação inicial com valores concretos>
- **Quando** <acontecimento>
- **Então** <resultado esperado>

### Exemplo 2 — <caso de borda>
- **Dado** <situação no limite da condição>
- **Quando** <acontecimento>
- **Então** <resultado esperado>

## Tabela de decisão
<!-- Opcional. Use quando a regra combina várias condições. Remova a seção se não se aplicar. -->
| <Condição 1> | <Condição 2> | Resultado |
|---|---|---|
| sim | sim | <resultado> |
| sim | não | <resultado> |
| não | — | <resultado> |

## Contradições e incertezas
<!-- use > [!CAUTION] Contradição e > [!WARNING] Não verificado -->
