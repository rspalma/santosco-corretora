@echo off
setlocal
chcp 65001 >nul
cd /d "%~dp0"
title Santos Co. Premium 10.3

echo ============================================================
echo   INICIANDO SANTOS CO. PREMIUM 10.3
echo ============================================================
echo.

where pnpm >nul 2>&1
if errorlevel 1 (
    echo pnpm nao foi encontrado.
    echo Execute primeiro o arquivo INSTALAR_TUDO.bat.
    echo.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo As dependencias ainda nao foram instaladas.
    echo Execute primeiro o arquivo INSTALAR_TUDO.bat.
    echo.
    pause
    exit /b 1
)

if exist "%LocalAppData%\Programs\Microsoft VS Code\Code.exe" (
    start "" "%LocalAppData%\Programs\Microsoft VS Code\Code.exe" "%~dp0"
) else if exist "%ProgramFiles%\Microsoft VS Code\Code.exe" (
    start "" "%ProgramFiles%\Microsoft VS Code\Code.exe" "%~dp0"
) else (
    where code >nul 2>&1 && start "" code "%~dp0"
)

echo O site sera aberto em http://localhost:3000
echo Para encerrar, pressione CTRL+C nesta janela.
echo.
start "" powershell.exe -NoProfile -Command "Start-Sleep -Seconds 5; Start-Process 'http://localhost:3000'"
pnpm dev

if errorlevel 1 (
    echo.
    echo O servidor foi encerrado ou ocorreu um erro.
    pause
)
