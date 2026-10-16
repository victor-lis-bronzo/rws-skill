# Issue 04: Validação sintática, integridade de links e linter RWS

- **Status**: resolved
- **Assignee**: agent
- **Feature**: `distribution-packaging`

## Descrição
- Testar e validar a sintaxe JSON de todos os manifestos.
- Executar `node bin/lint-rws.js examples/demo` para garantir conformidade 100%.
- Realizar teste de instalação de `bin/install.ps1` em ambiente temporário de teste.

## Critérios de Aceite
- [x] JSONs válidos testados via Node.js / PowerShell.
- [x] `node bin/lint-rws.js examples/demo` passando com 0 erros/0 avisos.
- [x] Teste de instalação do script validado.
