# Validação da organização do projeto

Verificação realizada em 06/10/2026, em Linux com Node.js 24.19.0 e npm 11.9.0.

## Resultado

| Verificação | Resultado |
| --- | --- |
| Arquivos do back-end e front-end no pacote | Presentes |
| Repositórios `.git` internos no pacote | Nenhum |
| Dependências instaladas a partir dos lockfiles | Sucesso em ambas as aplicações (`npm ci --ignore-scripts --no-audit --no-fund`) |
| `npm run build` no back-end | Aprovado |
| `npm run build` no front-end | Aprovado; aviso de diretiva ESLint não utilizada em `Block.tsx` |
| `npm test -- --runInBand` no back-end | 8 suítes aprovadas, 2 falharam antes de executar; 12 testes executados passaram |
| Substituição das referências Git por arquivos | Validada em clone local: nenhum item com modo `160000` após adicionar as pastas |

## Pendências existentes nos testes

- `backend/test/src/controllers/visitors.controller.spec.ts`: chama `create`, que não existe no controller/service atual.
- `backend/test/src/services/visitors.service.spec.ts`: instancia o serviço sem o `EntityManager` exigido e chama `create`, que não existe na implementação atual.

Os testes originais foram preservados, sem exclusão, desativação ou alteração para esconder as falhas.

## Limites da verificação

A compilação não é uma validação de todos os fluxos funcionais. A API com SQLite não foi iniciada, os testes e2e não foram executados, e a integração entre interface e API não foi validada. Os scripts de instalação das dependências foram desativados nesta checagem; por isso, ela não valida a instalação nativa do SQLite no Windows.

O arquivo CMD foi revisado, mas não executado em Windows neste ambiente. As operações Git equivalentes de correção foram executadas em um clone local. Nenhum push para o GitHub foi realizado durante esta preparação; ele acontece quando o usuário executa o CMD.

## Ajustes do pacote

- Remoção dos metadados `.git` da cópia entregue, mantendo o ZIP original como versão anterior.
- Inclusão de README principal, `.gitignore`, exemplo de ambiente, guia e script de publicação.
- Atualização dos exemplos de clone nos READMEs das aplicações para a estrutura unificada.
- Código-fonte, dependências e testes originais preservados.

Os dois `package.json` ainda incluem uma dependência local apontando para o próprio pacote (`file:`). Isso não impediu a instalação nem a compilação nesta checagem; foi preservado para não ampliar a alteração de organização para manutenção de dependências.
