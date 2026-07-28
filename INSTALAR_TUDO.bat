@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
title Instalador Santos Co. Premium 10.3

echo ============================================================
echo   SANTOS CO. PREMIUM 10.3 - INSTALACAO AUTOMATICA
echo ============================================================
echo.
echo Este instalador NAO reinstala o Visual Studio Code.
echo Ele instala Git, Node.js 22, pnpm 10.14.0 e as dependencias.
echo Podem aparecer confirmacoes do Windows. Clique em Sim.
echo.

powershell.exe -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\windows\instalar-ambiente.ps1" -ProjectPath "%~dp0"
set "RESULTADO=%ERRORLEVEL%"

echo.
if not "%RESULTADO%"=="0" (
    echo A instalacao encontrou um problema. Veja a mensagem acima.
    echo O log foi salvo em: %~dp0instalacao-santos-co.log
) else (
    echo Instalacao concluida com sucesso.
    echo Para trabalhar no site, execute: INICIAR_SITE.bat
)
echo.
pause
exit /b %RESULTADO%
