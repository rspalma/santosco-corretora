[CmdletBinding()]
param(
    [Parameter(Mandatory = $false)]
    [string]$ProjectPath = (Split-Path -Parent (Split-Path -Parent $PSScriptRoot))
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'

$RequiredNodeMajor = 22
$RequiredPnpmVersion = '10.14.0'
$LogPath = Join-Path $ProjectPath 'instalacao-santos-co.log'

Start-Transcript -Path $LogPath -Append | Out-Null

function Write-Step {
    param([string]$Message)
    Write-Host ''
    Write-Host ('=' * 64) -ForegroundColor DarkCyan
    Write-Host $Message -ForegroundColor Cyan
    Write-Host ('=' * 64) -ForegroundColor DarkCyan
}

function Write-Ok {
    param([string]$Message)
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-WarnMessage {
    param([string]$Message)
    Write-Host "[AVISO] $Message" -ForegroundColor Yellow
}

function Refresh-ProcessPath {
    $machinePath = [Environment]::GetEnvironmentVariable('Path', 'Machine')
    $userPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    $env:Path = "$machinePath;$userPath"
}

function Get-CommandPath {
    param([string[]]$Names)

    foreach ($name in $Names) {
        $command = Get-Command $name -ErrorAction SilentlyContinue
        if ($null -ne $command) {
            return $command.Source
        }
    }

    return $null
}

function Invoke-External {
    param(
        [Parameter(Mandatory = $true)][string]$FilePath,
        [Parameter(Mandatory = $false)][string[]]$Arguments = @(),
        [Parameter(Mandatory = $false)][string]$WorkingDirectory = $ProjectPath
    )

    Push-Location $WorkingDirectory
    try {
        & $FilePath @Arguments
        if ($LASTEXITCODE -ne 0) {
            throw "O comando '$FilePath $($Arguments -join ' ')' terminou com o codigo $LASTEXITCODE."
        }
    }
    finally {
        Pop-Location
    }
}

function Install-Git {
    Write-Step '1/4 - Verificando Git'

    Refresh-ProcessPath
    $gitPath = Get-CommandPath -Names @('git.exe', 'git')
    if ($gitPath) {
        $gitVersion = (& $gitPath --version).Trim()
        Write-Ok "Git ja instalado: $gitVersion"
        return
    }

    $wingetPath = Get-CommandPath -Names @('winget.exe', 'winget')
    if (-not $wingetPath) {
        throw @"
O Gerenciador de Pacotes do Windows (winget) nao foi encontrado.
Abra a Microsoft Store, atualize ou instale o aplicativo 'Instalador de Aplicativo'
e execute novamente o INSTALAR_TUDO.bat.
"@
    }

    Write-Host 'Baixando e instalando Git pelo Gerenciador de Pacotes do Windows...'
    Invoke-External -FilePath $wingetPath -Arguments @(
        'install',
        '--id', 'Git.Git',
        '--exact',
        '--source', 'winget',
        '--silent',
        '--accept-package-agreements',
        '--accept-source-agreements',
        '--disable-interactivity'
    )

    Refresh-ProcessPath
    $gitPath = Get-CommandPath -Names @('git.exe', 'git')
    if (-not $gitPath) {
        $commonGitPath = Join-Path $env:ProgramFiles 'Git\cmd\git.exe'
        if (Test-Path $commonGitPath) {
            $gitPath = $commonGitPath
        }
    }

    if (-not $gitPath) {
        throw 'O Git foi instalado, mas nao foi localizado no PATH. Reinicie o Windows e execute novamente.'
    }

    Write-Ok ((& $gitPath --version).Trim())
}

function Get-WindowsArchitecture {
    $architecture = [System.Runtime.InteropServices.RuntimeInformation]::OSArchitecture.ToString().ToLowerInvariant()
    switch ($architecture) {
        'x64' { return 'x64' }
        'arm64' { return 'arm64' }
        'x86' { return 'x86' }
        default { throw "Arquitetura do Windows nao suportada automaticamente: $architecture" }
    }
}

function Install-Node22 {
    Write-Step '2/4 - Verificando Node.js 22'

    Refresh-ProcessPath
    $nodePath = Get-CommandPath -Names @('node.exe', 'node')
    if ($nodePath) {
        $currentVersion = (& $nodePath --version).Trim()
        $currentMajor = [int](($currentVersion -replace '^v', '').Split('.')[0])
        if ($currentMajor -eq $RequiredNodeMajor) {
            Write-Ok "Node.js correto ja instalado: $currentVersion"
            return
        }

        throw @"
Foi encontrada a versao $currentVersion do Node.js, mas este projeto exige Node.js 22.x.
Desinstale a versao atual em Configuracoes > Aplicativos > Aplicativos instalados,
depois execute novamente o INSTALAR_TUDO.bat.
"@
    }

    Write-Host 'Consultando o site oficial do Node.js para localizar a versao 22 mais recente...'
    $releaseIndex = Invoke-RestMethod -Uri 'https://nodejs.org/dist/index.json' -UseBasicParsing
    $release = $releaseIndex |
        Where-Object { $_.version -match '^v22\.' } |
        Select-Object -First 1

    if (-not $release) {
        throw 'Nao foi possivel localizar uma versao oficial do Node.js 22.'
    }

    $nodeVersion = [string]$release.version
    $architecture = Get-WindowsArchitecture
    $installerName = "node-$nodeVersion-$architecture.msi"
    $baseUrl = "https://nodejs.org/dist/$nodeVersion"
    $installerUrl = "$baseUrl/$installerName"
    $checksumsUrl = "$baseUrl/SHASUMS256.txt"
    $tempDirectory = Join-Path $env:TEMP 'santos-co-node-installer'
    $installerPath = Join-Path $tempDirectory $installerName
    $checksumsPath = Join-Path $tempDirectory 'SHASUMS256.txt'

    New-Item -ItemType Directory -Path $tempDirectory -Force | Out-Null

    Write-Host "Baixando Node.js $nodeVersion para Windows $architecture..."
    Invoke-WebRequest -Uri $installerUrl -OutFile $installerPath -UseBasicParsing
    Invoke-WebRequest -Uri $checksumsUrl -OutFile $checksumsPath -UseBasicParsing

    $checksumLine = Get-Content $checksumsPath |
        Where-Object { $_ -match "\s+$([Regex]::Escape($installerName))$" } |
        Select-Object -First 1

    if (-not $checksumLine) {
        throw 'Nao foi possivel validar o checksum do instalador do Node.js.'
    }

    $expectedHash = ($checksumLine -split '\s+')[0].ToUpperInvariant()
    $actualHash = (Get-FileHash -Path $installerPath -Algorithm SHA256).Hash.ToUpperInvariant()
    if ($actualHash -ne $expectedHash) {
        throw 'A verificacao de seguranca SHA-256 do instalador do Node.js falhou. O arquivo nao sera executado.'
    }
    Write-Ok 'Checksum SHA-256 do Node.js validado.'

    $signature = Get-AuthenticodeSignature -FilePath $installerPath
    if ($signature.Status -ne 'Valid') {
        throw "A assinatura digital do instalador do Node.js nao e valida: $($signature.Status)"
    }
    Write-Ok 'Assinatura digital do instalador do Node.js validada.'

    Write-Host 'O Windows podera pedir permissao de administrador para instalar o Node.js.'
    $process = Start-Process -FilePath 'msiexec.exe' -Verb RunAs -Wait -PassThru -ArgumentList @(
        '/i',
        "`"$installerPath`"",
        '/qn',
        '/norestart'
    )

    if ($process.ExitCode -notin @(0, 3010)) {
        throw "A instalacao do Node.js terminou com o codigo $($process.ExitCode)."
    }

    Refresh-ProcessPath
    $nodePath = Get-CommandPath -Names @('node.exe', 'node')
    if (-not $nodePath) {
        $commonNodePath = Join-Path $env:ProgramFiles 'nodejs\node.exe'
        if (Test-Path $commonNodePath) {
            $nodePath = $commonNodePath
            $env:Path = "$(Split-Path $commonNodePath);$env:Path"
        }
    }

    if (-not $nodePath) {
        throw 'O Node.js foi instalado, mas nao foi localizado. Reinicie o Windows e execute novamente.'
    }

    $installedVersion = (& $nodePath --version).Trim()
    Write-Ok "Node.js instalado: $installedVersion"
}

function Install-Pnpm {
    Write-Step '3/4 - Instalando pnpm 10.14.0'

    Refresh-ProcessPath
    $npmPath = Get-CommandPath -Names @('npm.cmd', 'npm')
    if (-not $npmPath) {
        $fallbackNpm = Join-Path $env:ProgramFiles 'nodejs\npm.cmd'
        if (Test-Path $fallbackNpm) {
            $npmPath = $fallbackNpm
        }
    }
    if (-not $npmPath) {
        throw 'O npm nao foi encontrado depois da instalacao do Node.js.'
    }

    $pnpmPath = Get-CommandPath -Names @('pnpm.cmd', 'pnpm')
    if ($pnpmPath) {
        $currentPnpmVersion = (& $pnpmPath --version).Trim()
        if ($currentPnpmVersion -eq $RequiredPnpmVersion) {
            Write-Ok "pnpm correto ja instalado: $currentPnpmVersion"
            return
        }
        Write-WarnMessage "Atualizando pnpm $currentPnpmVersion para $RequiredPnpmVersion."
    }

    Invoke-External -FilePath $npmPath -Arguments @(
        'install',
        '--global',
        "pnpm@$RequiredPnpmVersion"
    )

    Refresh-ProcessPath
    $npmGlobalBin = Join-Path $env:APPDATA 'npm'
    if (Test-Path $npmGlobalBin) {
        $env:Path = "$npmGlobalBin;$env:Path"
    }

    $pnpmPath = Get-CommandPath -Names @('pnpm.cmd', 'pnpm')
    if (-not $pnpmPath) {
        $fallbackPnpm = Join-Path $npmGlobalBin 'pnpm.cmd'
        if (Test-Path $fallbackPnpm) {
            $pnpmPath = $fallbackPnpm
        }
    }

    if (-not $pnpmPath) {
        throw 'O pnpm foi instalado, mas nao foi encontrado no PATH.'
    }

    $installedVersion = (& $pnpmPath --version).Trim()
    if ($installedVersion -ne $RequiredPnpmVersion) {
        throw "A versao do pnpm instalada foi $installedVersion, mas era esperada $RequiredPnpmVersion."
    }

    Write-Ok "pnpm instalado: $installedVersion"
}

function Install-ProjectDependencies {
    Write-Step '4/4 - Preparando o projeto Santos Co.'

    $resolvedProjectPath = (Resolve-Path $ProjectPath).Path
    $packageJsonPath = Join-Path $resolvedProjectPath 'package.json'
    $lockfilePath = Join-Path $resolvedProjectPath 'pnpm-lock.yaml'

    if (-not (Test-Path $packageJsonPath)) {
        throw "O arquivo package.json nao foi encontrado em: $resolvedProjectPath"
    }
    if (-not (Test-Path $lockfilePath)) {
        throw "O arquivo pnpm-lock.yaml nao foi encontrado em: $resolvedProjectPath"
    }

    $envExamplePath = Join-Path $resolvedProjectPath '.env.example'
    $envLocalPath = Join-Path $resolvedProjectPath '.env.local'
    if ((Test-Path $envExamplePath) -and -not (Test-Path $envLocalPath)) {
        Copy-Item -Path $envExamplePath -Destination $envLocalPath
        Write-Ok 'Arquivo .env.local criado a partir do .env.example.'
    }

    Refresh-ProcessPath
    $npmGlobalBin = Join-Path $env:APPDATA 'npm'
    if (Test-Path $npmGlobalBin) {
        $env:Path = "$npmGlobalBin;$env:Path"
    }

    $pnpmPath = Get-CommandPath -Names @('pnpm.cmd', 'pnpm')
    if (-not $pnpmPath) {
        $fallbackPnpm = Join-Path $npmGlobalBin 'pnpm.cmd'
        if (Test-Path $fallbackPnpm) {
            $pnpmPath = $fallbackPnpm
        }
    }
    if (-not $pnpmPath) {
        throw 'O pnpm nao foi localizado para instalar as dependencias do projeto.'
    }

    Write-Host 'Baixando as bibliotecas do projeto. Esta etapa depende da velocidade da internet...'
    Invoke-External -FilePath $pnpmPath -Arguments @('install', '--frozen-lockfile') -WorkingDirectory $resolvedProjectPath

    Write-Ok 'Dependencias do projeto instaladas.'

    $nodePath = Get-CommandPath -Names @('node.exe', 'node')
    $gitPath = Get-CommandPath -Names @('git.exe', 'git')
    $nodeVersion = if ($nodePath) { (& $nodePath --version).Trim() } else { 'nao localizado' }
    $pnpmVersion = (& $pnpmPath --version).Trim()
    $gitVersion = if ($gitPath) { (& $gitPath --version).Trim() } else { 'nao localizado' }

    Write-Host ''
    Write-Host 'Ambiente preparado:' -ForegroundColor White
    Write-Host "  Git:     $gitVersion"
    Write-Host "  Node.js: $nodeVersion"
    Write-Host "  pnpm:    $pnpmVersion"
    Write-Host "  Projeto: $resolvedProjectPath"
}

try {
    Write-Host 'Santos Co. Premium 10.3 - Preparacao automatica do ambiente' -ForegroundColor White
    Write-Host "Log: $LogPath" -ForegroundColor DarkGray

    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

    Install-Git
    Install-Node22
    Install-Pnpm
    Install-ProjectDependencies

    Write-Step 'INSTALACAO CONCLUIDA'
    Write-Host 'Agora execute o arquivo INICIAR_SITE.bat.' -ForegroundColor Green
    Write-Host 'Ele abrira o projeto no VS Code e iniciara o site.' -ForegroundColor Green
    Stop-Transcript | Out-Null
    exit 0
}
catch {
    Write-Host ''
    Write-Host '[ERRO] A instalacao nao foi concluida.' -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ''
    Write-Host "Consulte o log em: $LogPath" -ForegroundColor Yellow
    try { Stop-Transcript | Out-Null } catch { }
    exit 1
}
