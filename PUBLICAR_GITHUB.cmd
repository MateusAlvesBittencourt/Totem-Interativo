@echo off
setlocal EnableExtensions DisableDelayedExpansion
chcp 65001 >nul
set "TOTEM_SOURCE=%~dp0"
set "TOTEM_REMOTE=https://github.com/MateusAlvesBittencourt/Totem-Interativo.git"
set "TOTEM_WORK=%TEMP%\totem-publicar-%RANDOM%-%RANDOM%"
echo Publicar backend e frontend em:
echo %TOTEM_REMOTE%
echo Uma copia sera preparada em uma pasta temporaria nova.
pause
where git >nul 2>nul
if errorlevel 1 goto no_git
if not exist "%TOTEM_SOURCE%backend\package.json" goto missing
if not exist "%TOTEM_SOURCE%frontend\package.json" goto missing
if exist "%TOTEM_SOURCE%backend\.git" goto nested
if exist "%TOTEM_SOURCE%frontend\.git" goto nested
if exist "%TOTEM_WORK%" goto failed
git clone --branch main "%TOTEM_REMOTE%" "%TOTEM_WORK%"
if errorlevel 1 goto failed
cd /d "%TOTEM_WORK%"
if errorlevel 1 goto failed
git config user.name "Mateus Alves Bittencourt"
if errorlevel 1 goto failed
git config user.email "mateusalvesbittencourt@gmail.com"
if errorlevel 1 goto failed
git rm -r --cached --ignore-unmatch -- backend frontend
if errorlevel 1 goto failed
robocopy "%TOTEM_SOURCE%." "%TOTEM_WORK%" /E /XD .git node_modules .next dist build out coverage /XF .env .env.local .env.development.local .env.production.local *.sqlite *.sqlite3 *.db *.log /R:1 /W:1 /NFL /NDL /NJH /NJS
if errorlevel 8 goto failed
git add --all
if errorlevel 1 goto failed
git ls-files --stage | findstr /B "160000" >nul
if not errorlevel 1 goto nested
git diff --cached --quiet
if errorlevel 2 goto failed
if not errorlevel 1 goto success
git commit -m "Corrige estrutura e adiciona arquivos do Totem Interativo"
if errorlevel 1 goto failed
git push origin main
if errorlevel 1 goto failed
:success
echo.
echo PUBLICACAO CONCLUIDA. Confira backend, frontend e README no GitHub.
echo Pasta de trabalho: %TOTEM_WORK%
echo %TOTEM_REMOTE%
pause
exit /b 0
:no_git
echo ERRO: Git nao encontrado. Instale o Git e execute novamente.
goto stop
:missing
echo ERRO: arquivos incompletos. Extraia todo o ZIP antes de executar.
goto stop
:nested
echo ERRO: foi encontrado um repositorio interno. Use uma extracao nova do ZIP corrigido.
goto stop
:failed
echo ERRO: a publicacao nao foi concluida. Envie a mensagem acima.
echo Pasta de trabalho: %TOTEM_WORK%
:stop
pause
exit /b 1
