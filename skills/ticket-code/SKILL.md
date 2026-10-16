---
name: ticket-code
description: >-
  /ticket:code — Fase GREEN do desenvolvimento orientado a testes. Lê os testes criados em
  /ticket:tdd e as definições da wiki, escrevendo a implementação necessária no código de produção
  até que todos os testes passem (GREEN) sem causar regressões.
---

# /ticket:code

**Objetivo:** construir o código de produção que satisfaz os testes criados na fase de TDD, alcançando o estado 100% GREEN de maneira incremental e focada.

## Passos

1. **Inspecionar Testes e Contratos**:
   - Ler os arquivos de teste criados ou modificados durante o `/ticket:tdd`.
   - Ler `wiki/tasks/<slug>.md` e o `schema/schema.md` (padrões de arquitetura, injeção de dependências, tratamento de erros, lint).
   - Verificar os arquivos de código de produção indicados na seção `Arquivos Impactados Previstos`.

2. **Implementar a Lógica de Produção**:
   - Escrever a menor quantidade de código limpo necessária para transformar as falhas de teste em aprovações.
   - Respeitar estritamente as convenções de design da codebase e do `schema/`.
   - Evitar "over-engineering" ou adicionar comportamentos não cobertos por testes ou critérios de aceite.

3. **Executar os Testes e Alcançar o Estado GREEN**:
   - Rodar o runner de testes para os testes específicos da task.
   - Ajustar a implementação até que todos os novos testes passem com sucesso (**GREEN**).

4. **Verificação de Não-Regressão**:
   - Executar a suíte de testes completa do módulo ou do projeto.
   - Se algum teste preexistente quebrou, diagnosticar se a alteração foi intencional (ex.: mudança de contrato documentada) ou efeito colateral indesejado, corrigindo o código de produção.

5. **Logar**:
   - Append em `wiki/log.md`:
     `## [AAAA-MM-DD] ticket:code | <slug>`
     `- Código de produção implementado para [[<slug>]]. Todos os testes passando (GREEN).`

6. **Próximo passo sugerido**:
   - Executar [/ticket:review](../ticket-review/SKILL.md) para refatoração, linters, conventional commit e fechamento do ciclo.
