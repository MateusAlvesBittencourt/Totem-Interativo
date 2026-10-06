# Publicar no GitHub — Windows

1. Extraia o ZIP em uma pasta nova (não misture com as tentativas anteriores).
2. Abra a pasta `Totem-Interativo` extraída.
3. Dê dois cliques em `PUBLICAR_GITHUB.cmd`.
4. Leia o destino exibido e pressione uma tecla para iniciar.
5. Se o Git abrir a autenticação, entre como MateusAlvesBittencourt.
6. Aguarde a mensagem `PUBLICACAO CONCLUIDA` e atualize a página do GitHub.

Destino: https://github.com/MateusAlvesBittencourt/Totem-Interativo

O script clona o destino em uma pasta temporária nova, substitui as referências quebradas pelas pastas com arquivos e envia um commit normal para `main`. Ele não executa push forçado nem apaga as pastas das tentativas anteriores. Também não importa os históricos dos repositórios originais do projeto.

Os commits que já existem no GitHub continuam no histórico. O novo commit corrige o conteúdo da versão atual. A pasta temporária é exibida ao final para permitir verificar o resultado.

Em caso de erro, o script para e mantém a janela aberta. Envie a mensagem exibida. Não é necessário executar `git init` ou mover pastas `.git` manualmente.

O pacote contém código-fonte, não dependências instaladas. As instruções de execução estão no README.
