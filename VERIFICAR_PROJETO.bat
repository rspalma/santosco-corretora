@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
title Verificacao Santos Co. Premium 10.3

where pnpm >nul 2>&1
if errorlevel 1 (
    echo pnpm nao foi encontrado. Execute INSTALAR_TUDO.bat primeiro.
    pause
    exit /b 1
)

echo Executando lint, TypeScript, testes e build de producao...
echo.
pnpm check
set "RESULTADO=%ERRORLEVEL%"
echo.
if "%RESULTADO%"=="0" (
    echo Projeto validado com sucesso.
) else (
    echo A verificacao encontrou erros. Leia as mensagens acima.
)
pause
exit /b %RESULTADO%
