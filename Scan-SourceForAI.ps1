#Requires -Version 5.1
<#
.SYNOPSIS
    Scan-SourceForAI.ps1

    READ-ONLY scanner. Produces a single AI-readable Markdown snapshot of a
    Vite + React + TypeScript project.

    Output:  <ProjectRoot>\srcscanresult.md

    This script NEVER modifies source files, configuration, or packages.
    The only write performed is the output Markdown file.

.PARAMETER ProjectRoot
    Project root directory. Defaults to the current working directory.

.PARAMETER MaxFileSizeMB
    Maximum size (MB) of a single embedded file. Default 5.

.PARAMETER OutputFileName
    Output file name. Default srcscanresult.md

.PARAMETER MaxTreeDepth
    Maximum directory depth shown in the repository tree. Default 12.

.EXAMPLE
    .\Scan-SourceForAI.ps1

.EXAMPLE
    .\Scan-SourceForAI.ps1 "D:\Development\Astrogyan\kundaliyatra"
#>

[CmdletBinding()]
param(
    [Parameter(Position = 0)]
    [string]$ProjectRoot,

    [ValidateRange(1, 1024)]
    [int]$MaxFileSizeMB = 5,

    [string]$OutputFileName = 'srcscanresult.md',

    [ValidateRange(1, 64)]
    [int]$MaxTreeDepth = 12
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

try { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 } catch { }

# ============================================================================
#  UNICODE CHARACTERS BUILT FROM ASCII SOURCE
#  (script file is pure ASCII; output contains real Unicode)
# ============================================================================

$U_BRANCH = [string][char]0x251C   # box drawings light vertical and right
$U_LAST   = [string][char]0x2514   # box drawings light up and right
$U_PIPE   = [string][char]0x2502   # box drawings light vertical
$U_DASH   = [string][char]0x2500   # box drawings light horizontal

$TREE_BRANCH = $U_BRANCH + $U_DASH + $U_DASH + ' '   # +-- style: actually the real glyphs
$TREE_LAST   = $U_LAST   + $U_DASH + $U_DASH + ' '
$TREE_PIPE   = $U_PIPE   + '   '

$BACKTICK    = [string][char]96
$FENCE       = $BACKTICK + $BACKTICK + $BACKTICK + $BACKTICK

# ============================================================================
#  CONFIGURATION
# ============================================================================

$script:Warnings = New-Object System.Collections.Generic.List[string]

$ExcludedDirectoryNames = @(
    'node_modules', '.git', '.hg', '.svn',
    'dist', 'build', 'out', 'coverage',
    '.vite', '.cache', '.parcel-cache', '.turbo', '.next', '.nuxt',
    '.svelte-kit', '.astro', '.output', '.vercel', '.netlify',
    'temp', 'tmp', '.tmp', '.idea', '.vs', '.vscode',
    'bower_components', 'jspm_packages', 'storybook-static'
)

$ExcludedFileNames = @(
    'srcscanresult.md',
    '.DS_Store',
    'Thumbs.db',
    'desktop.ini'
)

$ExcludedFileRegexes = @(
    '^\.env$',
    '^\.env\..+$',
    '^\.envrc$',
    '.*\.pem$',
    '.*\.key$',
    '.*\.p12$',
    '.*\.pfx$',
    '.*\.jks$',
    '.*\.keystore$',
    '.*\.ppk$',
    '^secrets\.(json|ya?ml|toml)$',
    '^\.npmrc$',
    '^\.pypirc$',
    '^\.netrc$'
)

$BinaryExtensions = @(
    '.exe','.dll','.so','.dylib','.bin','.dat','.pak','.wasm',
    '.zip','.7z','.rar','.tar','.gz','.tgz','.bz2','.xz',
    '.png','.jpg','.jpeg','.gif','.webp','.svg','.ico','.bmp',
    '.tif','.tiff','.avif','.heic','.heif',
    '.mp3','.wav','.ogg','.flac','.aac','.m4a',
    '.mp4','.mov','.avi','.mkv','.webm','.wmv','.flv','.m4v',
    '.pdf','.doc','.docx','.xls','.xlsx','.ppt','.pptx',
    '.woff','.woff2','.ttf','.otf','.eot',
    '.psd','.ai','.sketch','.fig','.xd','.blend',
    '.db','.sqlite','.sqlite3',
    '.class','.jar','.war','.ear','.pyc','.pyo',
    '.o','.obj','.a','.lib',
    '.iso','.img','.dmg','.vhd','.vhdx',
    '.apk','.ipa','.app','.msi','.deb','.rpm',
    '.bak','.swp','.swo','.orig','.rej','.pid'
)

$SourceExtensions = @(
    '.ts','.tsx','.mts','.cts',
    '.js','.jsx','.mjs','.cjs',
    '.css','.scss','.sass','.less','.styl',
    '.json','.jsonc','.json5',
    '.html','.htm','.vue','.svelte','.astro',
    '.md','.mdx','.txt',
    '.yaml','.yml','.toml',
    '.graphql','.gql'
)

$CodeExtensions = @(
    '.ts','.tsx','.mts','.cts',
    '.js','.jsx','.mjs','.cjs','.vue','.svelte','.astro'
)

$DocumentationNames = @(
    'README.md','readme.md','Readme.md',
    'ARCHITECTURE.md','CONTRIBUTING.md','CHANGELOG.md',
    'LICENSE.md','SECURITY.md','CODE_OF_CONDUCT.md',
    'AGENTS.md','CLAUDE.md','GEMINI.md','COPILOT.md','DEVELOPMENT.md','DESIGN.md'
)

$ConfigRootNames = @(
    'package.json','package-lock.json','npm-shrinkwrap.json',
    'yarn.lock','pnpm-lock.yaml','bun.lockb',

    'vite.config.ts','vite.config.js','vite.config.mjs',
    'vite.config.mts','vite.config.cjs','vite.config.cts',

    'tsconfig.json','tsconfig.app.json','tsconfig.node.json',
    'tsconfig.base.json','tsconfig.build.json','tsconfig.paths.json',
    'tsconfig.vitest.json','tsconfig.eslint.json','jsconfig.json',

    'tailwind.config.js','tailwind.config.ts','tailwind.config.cjs',
    'tailwind.config.mjs','tailwind.config.mts',

    'postcss.config.js','postcss.config.cjs','postcss.config.mjs','postcss.config.ts',

    'eslint.config.js','eslint.config.mjs','eslint.config.cjs','eslint.config.ts',
    '.eslintrc','.eslintrc.json','.eslintrc.js','.eslintrc.cjs','.eslintrc.yml','.eslintrc.yaml',

    '.prettierrc','.prettierrc.json','.prettierrc.js','.prettierrc.cjs',
    '.prettierrc.yml','.prettierrc.yaml',
    'prettier.config.js','prettier.config.cjs','prettier.config.mjs',

    'index.html',
    '.editorconfig','.gitignore','.gitattributes','.browserslistrc',
    '.nvmrc','.node-version','Dockerfile','.dockerignore',
    'docker-compose.yml','docker-compose.yaml',
    'netlify.toml','vercel.json','components.json',
    'vitest.config.ts','vitest.config.js',
    'jest.config.js','jest.config.ts',
    'playwright.config.ts','cypress.config.ts',
    'babel.config.js','.babelrc'
)

# ---- Secret redaction ------------------------------------------------------

$SecretKeyWords = @(
    'api[_-]?key','apikey','api[_-]?secret','api[_-]?token',
    'access[_-]?token','auth[_-]?token','refresh[_-]?token','id[_-]?token',
    'bearer[_-]?token','session[_-]?secret',
    'password','passwd','pwd',
    'secret','client[_-]?secret','private[_-]?key','secret[_-]?key',
    'database[_-]?url','db[_-]?url','connection[_-]?string',
    'aws[_-]?access[_-]?key[_-]?id','aws[_-]?secret[_-]?access[_-]?key',
    'azure[_-]?client[_-]?secret',
    'stripe[_-]?secret[_-]?key',
    'sendgrid[_-]?api[_-]?key',
    'smtp[_-]?password',
    'jwt[_-]?secret',
    'encryption[_-]?key',
    'signing[_-]?key'
)

$SecretKeyRegex = '(?i)\b(?:' + ($SecretKeyWords -join '|') + ')\b'

$BenignValues = @(
    'production','development','staging','testing','test','local','localhost',
    'true','false','null','undefined','none',
    'string','number','boolean','object','function','symbol',
    'password','token','secret','apikey','api_key','accesstoken',
    '[redacted]','redacted','changeme','change_me',
    'your_api_key','your-api-key','your_key_here','placeholder',
    'example','sample','dummy','foo','bar','baz','abc','test123',
    'utf-8','utf8','application/json','text/plain'
)

# Freeze lists for Set-StrictMode safety.
$script:ExcludedDirNamesList  = $ExcludedDirectoryNames
$script:ExcludedFileNamesList = $ExcludedFileNames
$script:ExcludedFileRegexList = $ExcludedFileRegexes
$script:BinaryExtList         = $BinaryExtensions
$script:BenignList            = $BenignValues
$script:SourceExtList         = $SourceExtensions
$script:CodeExtList           = $CodeExtensions
$script:ConfigNameSet         = @{}
foreach ($n in $ConfigRootNames) { $script:ConfigNameSet[$n] = $true }
$script:DocNamesList          = $DocumentationNames

# ============================================================================
#  HELPERS
# ============================================================================

function Write-Banner {
    Write-Host ''
    Write-Host '============================================================' -ForegroundColor Cyan
    Write-Host ' SOURCE REPOSITORY AI SCANNER' -ForegroundColor Cyan
    Write-Host '============================================================' -ForegroundColor Cyan
    Write-Host ''
}

function Test-ExcludedDirectoryName {
    param([string]$Name)
    return ($script:ExcludedDirNamesList -contains $Name)
}

function Test-ExcludedFileName {
    param([string]$Name)
    if ($script:ExcludedFileNamesList -contains $Name) { return $true }
    foreach ($rx in $script:ExcludedFileRegexList) {
        if ($Name -match $rx) { return $true }
    }
    return $false
}

function Test-IsEnvironmentFileName {
    param([string]$Name)
    return ($Name -match '^\.env(\..+)?$') -or ($Name -eq '.envrc')
}

function Test-IsSecretFileName {
    param([string]$Name)
    return ($Name -match '\.(pem|key|p12|pfx|jks|keystore|ppk)$') -or
           ($Name -match '^secrets\.(json|ya?ml|toml)$') -or
           ($Name -match '^\.(npmrc|pypirc|netrc)$')
}

function Test-IsBinaryFileName {
    param([string]$Name)
    $ext = [System.IO.Path]::GetExtension($Name).ToLowerInvariant()
    if ([string]::IsNullOrEmpty($ext)) { return $false }
    return ($script:BinaryExtList -contains $ext)
}

function Get-FileAnnotation {
    param([System.IO.FileInfo]$File)
    if (Test-IsEnvironmentFileName $File.Name) { return ' [environment file - not embedded]' }
    if (Test-IsSecretFileName $File.Name)      { return ' [secret file - not embedded]' }
    if (Test-IsBinaryFileName $File.Name)      { return ' [binary - not embedded]' }
    return ''
}

function Get-RelativePathFromRoot {
    param([string]$FullPath)
    $base = $script:RootFull.TrimEnd([char[]]@('\','/')) + [System.IO.Path]::DirectorySeparatorChar
    if ($FullPath.StartsWith($base, [System.StringComparison]::OrdinalIgnoreCase)) {
        return $FullPath.Substring($base.Length).Replace('\', '/')
    }
    return $FullPath.Replace('\', '/')
}

function Read-FileUtf8 {
    param(
        [System.IO.FileInfo]$File,
        [long]$MaxBytes
    )
    $r = [PSCustomObject]@{
        Ok      = $false
        Content = ''
        Reason  = ''
        TooBig  = $false
    }

    if ($File.Length -gt $MaxBytes) {
        $r.TooBig = $true
        $r.Reason = "exceeds maximum configured size ($([math]::Round($File.Length / 1MB, 2)) MB)"
        return $r
    }

    try {
        $text = [System.IO.File]::ReadAllText($File.FullName, [System.Text.Encoding]::UTF8)
        $text = $text -replace "`r`n", "`n"
        $text = $text -replace "`r", "`n"
        $r.Content = $text
        $r.Ok = $true
    }
    catch {
        $r.Reason = $_.Exception.Message
    }
    return $r
}

function Protect-Secrets {
    param([string]$Text)
    if ([string]::IsNullOrEmpty($Text)) { return $Text }

    $sq = [char]39
    $dq = [char]34
    $keyRx = $SecretKeyRegex

    $quoted = '(?im)(' + $keyRx + ')(\s*[:=]\s*)([' + $sq + $dq + '])(?!\s*(?:process\.env|import\.meta|\$\{))([^' + $sq + $dq + '\r\n]{6,})\3'

    try {
        $Text = [regex]::Replace($Text, $quoted, {
            param($m)
            $k = $m.Groups[1].Value
            $s = $m.Groups[2].Value
            $q = $m.Groups[3].Value
            $v = $m.Groups[4].Value
            if ($script:BenignList -contains $v.ToLowerInvariant()) { return $m.Value }
            if ($v -match '^(?:\*+|x+|X+|\?+|\.+|-+|_+|\s*)$') { return $m.Value }
            if ($v -match '(?i)(process\.env|import\.meta|\$\{|<[^>]+>|\{\{)') { return $m.Value }
            return "$k$s$q[REDACTED]$q"
        })
    } catch { $script:Warnings.Add("Redact (quoted) failed: $($_.Exception.Message)") }

    $unq = '(?im)^([ \t]*(?:export[ \t]+)?(?:' + $keyRx + ')[ \t]*=[ \t]*)(?!["' + $sq + $dq + '])(?!\s*(?:process\.env|import\.meta|\$\{))([^\s#' + $sq + $dq + ']{8,})([ \t]*)$'

    try {
        $Text = [regex]::Replace($Text, $unq, {
            param($m)
            $p = $m.Groups[1].Value
            $v = $m.Groups[2].Value
            $t = $m.Groups[3].Value
            if ($script:BenignList -contains $v.ToLowerInvariant()) { return $m.Value }
            if ($v -match '^(?:\*+|x+|X+|\?+|\.+|-+|_+)$') { return $m.Value }
            return "$p[REDACTED]$t"
        })
    } catch { $script:Warnings.Add("Redact (unquoted) failed: $($_.Exception.Message)") }

    return $Text
}

function Get-ImportList {
    param([string]$Content)
    $found = New-Object System.Collections.Generic.List[string]
    $patterns = @(
        '(?m)^[ \t]*import\s+(?:type\s+)?(?:[^;''"]*?\s+from\s+)?[''"]([^''"]+)[''"]',
        '(?m)^[ \t]*export\s+(?:type\s+)?(?:\*|\{[^}]*\})\s+from\s+[''"]([^''"]+)[''"]',
        '\brequire\s*\(\s*[''"]([^''"]+)[''"]\s*\)',
        '\bimport\s*\(\s*[''"]([^''"]+)[''"]\s*\)'
    )
    foreach ($p in $patterns) {
        try {
            foreach ($m in [regex]::Matches($Content, $p)) {
                $s = $m.Groups[1].Value
                if (-not [string]::IsNullOrWhiteSpace($s) -and -not $found.Contains($s)) {
                    $found.Add($s)
                }
            }
        } catch { }
    }
    return ,$found
}

function Get-ImportKind {
    param([string]$S)
    if ($S.StartsWith('.'))  { return 'local' }
    if ($S.StartsWith('/'))  { return 'local' }
    if ($S.StartsWith('@/')) { return 'local' }
    if ($S.StartsWith('~/')) { return 'local' }
    return 'external'
}

function Get-ExportList {
    param([string]$Content)
    $found = New-Object System.Collections.Generic.List[string]
    $patterns = @(
        '(?m)^[ \t]*export\s+default\s+(?:async\s+)?(?:function|class)\s+([A-Za-z_$][\w$]*)',
        '(?m)^[ \t]*export\s+default\s+([A-Za-z_$][\w$]*)',
        '(?m)^[ \t]*export\s+default\s+',
        '(?m)^[ \t]*export\s+(?:async\s+)?(?:const|let|var|function|class|enum|namespace)\s+([A-Za-z_$][\w$]*)',
        '(?m)^[ \t]*export\s+(?:interface|type)\s+([A-Za-z_$][\w$]*)',
        '(?m)^[ \t]*export\s*\{([^}]*)\}',
        '(?m)^[ \t]*export\s+\*\s+from\s+[''"]([^''"]+)[''"]'
    )
    $labels = @('default','default','default','named','type','named','re-export')
    for ($i = 0; $i -lt $patterns.Count; $i++) {
        try {
            foreach ($m in [regex]::Matches($Content, $patterns[$i])) {
                if ($m.Groups.Count -gt 1 -and $m.Groups[1].Success) {
                    $val = $m.Groups[1].Value.Trim()
                    if ($val.Length -gt 0) {
                        if ($labels[$i] -eq 'named' -and $val.Contains(',')) {
                            foreach ($piece in $val.Split(',')) {
                                $p = ($piece -replace '^\s*(?:type\s+)?', '').Trim()
                                if ($p.Length -gt 0) {
                                    $e = "$($labels[$i]): $p"
                                    if (-not $found.Contains($e)) { $found.Add($e) }
                                }
                            }
                        } else {
                            $e = "$($labels[$i]): $val"
                            if (-not $found.Contains($e)) { $found.Add($e) }
                        }
                    }
                }
                elseif ($labels[$i] -eq 'default') {
                    if (-not $found.Contains('default: (anonymous)')) {
                        $found.Add('default: (anonymous)')
                    }
                }
            }
        } catch { }
    }
    return ,$found
}

function Get-ComponentList {
    param([string]$Content, [string]$Extension)
    $ext = $Extension.ToLowerInvariant()
    $found = New-Object System.Collections.Generic.List[string]
    if ($ext -ne '.tsx' -and $ext -ne '.jsx') { return ,$found }
    $patterns = @(
        '(?m)^[ \t]*export\s+default\s+function\s+([A-Z][A-Za-z0-9_]*)\s*[(<]',
        '(?m)^[ \t]*export\s+function\s+([A-Z][A-Za-z0-9_]*)\s*[(<]',
        '(?m)^[ \t]*function\s+([A-Z][A-Za-z0-9_]*)\s*[(<]',
        '(?m)^[ \t]*(?:export\s+)?(?:default\s+)?const\s+([A-Z][A-Za-z0-9_]*)\s*(?::[^=\r\n]+)?=\s*(?:(?:React\.)?(?:memo|forwardRef)\s*\(\s*)?\(',
        '(?m)^[ \t]*(?:export\s+)?(?:default\s+)?const\s+([A-Z][A-Za-z0-9_]*)\s*:\s*(?:React\.)?(?:FC|FunctionComponent|VFC|ComponentType)\b',
        '(?m)^[ \t]*(?:export\s+)?class\s+([A-Z][A-Za-z0-9_]*)\s+extends\s+(?:React\.)?(?:Pure)?Component\b'
    )
    foreach ($p in $patterns) {
        try {
            foreach ($m in [regex]::Matches($Content, $p)) {
                if ($m.Groups.Count -gt 1 -and $m.Groups[1].Success) {
                    $n = $m.Groups[1].Value
                    if (-not $found.Contains($n)) { $found.Add($n) }
                }
            }
        } catch { }
    }
    return ,$found
}

function Get-UsedHookList {
    param([string]$Content)
    $found = New-Object System.Collections.Generic.List[string]
    $p = '\b(useState|useEffect|useMemo|useCallback|useContext|useRef|useReducer|useLayoutEffect|useImperativeHandle|useDebugValue|useId|useTransition|useDeferredValue|useSyncExternalStore|useInsertionEffect|useOptimistic|useActionState)\b'
    try {
        foreach ($m in [regex]::Matches($Content, $p)) {
            $n = $m.Groups[1].Value
            if (-not $found.Contains($n)) { $found.Add($n) }
        }
    } catch { }
    return ,$found
}

function Get-CustomHookList {
    param([string]$Content)
    $found = New-Object System.Collections.Generic.List[string]
    $p = '(?m)^[ \t]*(?:export\s+)?(?:default\s+)?(?:const|function|let|var)\s+(use[A-Z][A-Za-z0-9_]*)\b'
    try {
        foreach ($m in [regex]::Matches($Content, $p)) {
            if ($m.Groups[1].Success) {
                $n = $m.Groups[1].Value
                if (-not $found.Contains($n)) { $found.Add($n) }
            }
        }
    } catch { }
    return ,$found
}

function Get-LanguageTag {
    param([string]$Ext)
    switch ($Ext.ToLowerInvariant()) {
        '.ts'   { 'typescript' }
        '.tsx'  { 'tsx' }
        '.js'   { 'javascript' }
        '.jsx'  { 'jsx' }
        '.mjs'  { 'javascript' }
        '.cjs'  { 'javascript' }
        '.css'  { 'css' }
        '.scss' { 'scss' }
        '.sass' { 'sass' }
        '.less' { 'less' }
        '.json' { 'json' }
        '.html' { 'html' }
        '.md'   { 'markdown' }
        '.yml'  { 'yaml' }
        '.yaml' { 'yaml' }
        default { '' }
    }
}

function Escape-MdCell {
    param([AllowNull()][string]$T)
    if ($null -eq $T) { return '' }
    return ($T -replace '\|', '\|' -replace "`r?`n", ' ')
}

function Format-FileSize {
    param([int64]$Bytes)
    if ($Bytes -ge 1GB) { return ('{0:N2} GB' -f ($Bytes / 1GB)) }
    if ($Bytes -ge 1MB) { return ('{0:N2} MB' -f ($Bytes / 1MB)) }
    if ($Bytes -ge 1KB) { return ('{0:N2} KB' -f ($Bytes / 1KB)) }
    return "$Bytes bytes"
}

function Get-PackageVersion {
    param(
        [AllowNull()][object]$PackageInfo,
        [string[]]$Names
    )
    if ($null -eq $PackageInfo) { return $null }
    foreach ($section in @('dependencies','devDependencies','peerDependencies')) {
        $group = $PackageInfo.PSObject.Properties[$section]
        if ($null -eq $group) { continue }
        foreach ($n in $Names) {
            $prop = $group.Value.PSObject.Properties[$n]
            if ($null -ne $prop) {
                return [PSCustomObject]@{ Version = [string]$prop.Value; Section = $section }
            }
        }
    }
    return $null
}

# ============================================================================
#  MAIN
# ============================================================================

Write-Banner

if ([string]::IsNullOrWhiteSpace($ProjectRoot)) {
    $ProjectRoot = (Get-Location).Path
}

if (-not (Test-Path -LiteralPath $ProjectRoot -PathType Container)) {
    Write-Host "ERROR: Project root not found: $ProjectRoot" -ForegroundColor Red
    exit 1
}

$script:RootFull = (Resolve-Path -LiteralPath $ProjectRoot).ProviderPath
$script:RootFull = $script:RootFull.TrimEnd([char[]]@('\','/'))

$OutputPath = Join-Path $script:RootFull $OutputFileName
$MaxBytes   = [long]$MaxFileSizeMB * 1MB
$ProjectRootName = Split-Path $script:RootFull -Leaf

Write-Host "Project: $ProjectRootName"
Write-Host "Root:    $($script:RootFull)"
Write-Host "Max file size: $MaxFileSizeMB MB"
Write-Host ''

Write-Host 'Scanning src...' -ForegroundColor DarkGray

$script:AllFiles       = New-Object System.Collections.Generic.List[object]
$script:IncludedFiles  = New-Object System.Collections.Generic.List[object]
$script:ExcludedFiles  = New-Object System.Collections.Generic.List[object]
$script:BinaryFiles    = New-Object System.Collections.Generic.List[object]
$script:TooBigFiles    = New-Object System.Collections.Generic.List[object]
$script:ImportMap      = New-Object System.Collections.Generic.List[object]
$script:ExportMap      = New-Object System.Collections.Generic.List[object]
$script:ComponentMap   = New-Object System.Collections.Generic.List[object]
$script:HookMap        = New-Object System.Collections.Generic.List[object]
$script:CustomHookMap  = New-Object System.Collections.Generic.List[object]

$Stack = New-Object System.Collections.Stack
$Stack.Push($script:RootFull)

while ($Stack.Count -gt 0) {
    $dir = [string]$Stack.Pop()
    $entries = @()
    try {
        $entries = @(Get-ChildItem -LiteralPath $dir -Force -ErrorAction Stop)
    } catch {
        $script:Warnings.Add("Unable to enumerate directory: $(Get-RelativePathFromRoot $dir) - $($_.Exception.Message)")
        continue
    }

    foreach ($entry in $entries) {
        if ($entry.PSIsContainer) {
            if (-not (Test-ExcludedDirectoryName $entry.Name)) {
                $Stack.Push($entry.FullName)
            }
            continue
        }

        if (Test-ExcludedFileName $entry.Name) {
            $script:ExcludedFiles.Add([PSCustomObject]@{
                Path   = (Get-RelativePathFromRoot $entry.FullName)
                Reason = 'excluded'
                Size   = [int64]$entry.Length
            })
            continue
        }

        $rel = Get-RelativePathFromRoot $entry.FullName
        $ext = $entry.Extension.ToLowerInvariant()

        $rec = [PSCustomObject]@{
            FileInfo     = $entry
            FullPath     = $entry.FullName
            RelativePath = $rel
            Name         = $entry.Name
            Extension    = $ext
            Length       = [int64]$entry.Length
            IsBinary     = (Test-IsBinaryFileName $entry.Name)
            IsSource     = ($script:SourceExtList -contains $ext)
            IsCode       = ($script:CodeExtList -contains $ext)
            IsEnv        = (Test-IsEnvironmentFileName $entry.Name)
            IsSecretFile = (Test-IsSecretFileName $entry.Name)
        }
        $script:AllFiles.Add($rec)
    }
}

Write-Host 'Scanning project configuration...' -ForegroundColor DarkGray
Write-Host 'Scanning documentation...' -ForegroundColor DarkGray

foreach ($rec in $script:AllFiles) {
    $lower = $rec.RelativePath.ToLowerInvariant()

    if ($rec.IsBinary) {
        $script:BinaryFiles.Add($rec)
        continue
    }

    if ($rec.IsEnv) {
        $script:ExcludedFiles.Add([PSCustomObject]@{ Path = $rec.RelativePath; Reason = 'environment file'; Size = $rec.Length })
        continue
    }

    if ($rec.IsSecretFile) {
        $script:ExcludedFiles.Add([PSCustomObject]@{ Path = $rec.RelativePath; Reason = 'secret file'; Size = $rec.Length })
        continue
    }

    $include = $false

    if ($lower -eq 'src' -or $lower.StartsWith('src/')) {
        if ($rec.IsSource) { $include = $true }
    }
    elseif ($lower -eq 'public' -or $lower.StartsWith('public/')) {
        if ($rec.Extension -in @('.json','.html','.css','.js','.ts','.md')) { $include = $true }
    }
    elseif (($rec.RelativePath -notmatch '/') -and ($script:ConfigNameSet.ContainsKey($rec.Name))) {
        $include = $true
    }
    elseif (($rec.RelativePath -notmatch '/') -and ($script:DocNamesList -contains $rec.Name)) {
        $include = $true
    }
    elseif ($lower.StartsWith('docs/') -and $rec.Extension -eq '.md') {
        $include = $true
    }
    elseif (($rec.RelativePath -notmatch '/') -and ($rec.Extension -in @('.ts','.tsx','.js','.jsx','.mjs','.cjs','.css','.scss','.json','.html'))) {
        $include = $true
    }

    if (-not $include) { continue }

    if ($rec.Length -gt $MaxBytes) {
        $script:TooBigFiles.Add($rec)
        $script:Warnings.Add("Skipped (exceeds $MaxFileSizeMB MB): $($rec.RelativePath) ($(Format-FileSize $rec.Length))")
        continue
    }

    $script:IncludedFiles.Add($rec)
}

$Included = @($script:IncludedFiles | Sort-Object RelativePath)

# --- Build repository tree --------------------------------------------------

Write-Host 'Building repository tree...' -ForegroundColor DarkGray

function Build-TreeText {
    param(
        [System.IO.DirectoryInfo]$Dir,
        [string]$Prefix,
        [int]$Depth,
        [System.Collections.Generic.List[string]]$Out
    )

    if ($Depth -ge $MaxTreeDepth) {
        $Out.Add($Prefix + $TREE_LAST + '... (max depth reached)')
        return
    }

    $entries = @()
    try {
        $entries = @(Get-ChildItem -LiteralPath $Dir.FullName -Force -ErrorAction Stop)
    } catch {
        $Out.Add($Prefix + $TREE_LAST + '[unreadable]')
        return
    }

    $dirs  = @($entries | Where-Object { $_.PSIsContainer -and -not (Test-ExcludedDirectoryName $_.Name) } | Sort-Object Name)
    $files = @($entries | Where-Object { -not $_.PSIsContainer -and -not (Test-ExcludedFileName $_.Name) } | Sort-Object Name)

    $items = New-Object System.Collections.Generic.List[object]
    foreach ($d in $dirs)  { $items.Add($d) }
    foreach ($f in $files) { $items.Add($f) }

    for ($i = 0; $i -lt $items.Count; $i++) {
        $item = $items[$i]
        $isLast = ($i -eq $items.Count - 1)

        if ($isLast) {
            $conn = $TREE_LAST
            $childPrefix = $Prefix + '    '
        } else {
            $conn = $TREE_BRANCH
            $childPrefix = $Prefix + $TREE_PIPE
        }

        if ($item.PSIsContainer) {
            $Out.Add("$Prefix$conn$($item.Name)/")
            Build-TreeText -Dir $item -Prefix $childPrefix -Depth ($Depth + 1) -Out $Out
        } else {
            $ann = Get-FileAnnotation -File $item
            $Out.Add("$Prefix$conn$($item.Name)$ann")
        }
    }
}

$TreeLines = New-Object System.Collections.Generic.List[string]
$TreeLines.Add("$ProjectRootName/")
Build-TreeText -Dir (Get-Item -LiteralPath $script:RootFull) -Prefix '' -Depth 0 -Out $TreeLines

# --- package.json -----------------------------------------------------------

$PackageInfo = $null
$PackageRecord = $script:AllFiles | Where-Object { $_.RelativePath -eq 'package.json' } | Select-Object -First 1
if ($PackageRecord) {
    try {
        $pkgText = [System.IO.File]::ReadAllText($PackageRecord.FullPath, [System.Text.Encoding]::UTF8)
        $PackageInfo = $pkgText | ConvertFrom-Json
    } catch {
        $script:Warnings.Add("Unable to parse package.json: $($_.Exception.Message)")
    }
}

# --- Detect tech stack ------------------------------------------------------

$detections = [ordered]@{
    React         = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('react'))
    ReactDOM      = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('react-dom'))
    ReactRouter   = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('react-router','react-router-dom'))
    Vite          = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('vite'))
    TypeScript    = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('typescript'))
    Tailwind      = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('tailwindcss'))
    PostCSS       = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('postcss'))
    ESLint        = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('eslint'))
    Prettier      = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('prettier'))
    Zustand       = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('zustand'))
    ReduxTK       = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('@reduxjs/toolkit'))
    ReactRedux    = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('react-redux'))
    TanStackQuery = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('@tanstack/react-query'))
    Axios         = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('axios'))
    Zod           = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('zod'))
    ReactHookForm = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('react-hook-form'))
    FramerMotion  = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('framer-motion','motion'))
    LucideReact   = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('lucide-react'))
    Vitest        = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('vitest'))
    VitePWA       = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('vite-plugin-pwa'))
    ThreeJS       = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('three'))
    R3F           = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('@react-three/fiber'))
    Firebase      = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('firebase'))
    Supabase      = (Get-PackageVersion -PackageInfo $PackageInfo -Names @('@supabase/supabase-js'))
}

# --- Package manager --------------------------------------------------------

$PackageManager = 'npm'
$allRels = @($script:AllFiles | ForEach-Object { $_.RelativePath })
if     ($allRels -contains 'pnpm-lock.yaml')       { $PackageManager = 'pnpm' }
elseif ($allRels -contains 'yarn.lock')            { $PackageManager = 'Yarn' }
elseif ($allRels -contains 'bun.lockb')            { $PackageManager = 'Bun' }
elseif ($allRels -contains 'package-lock.json')    { $PackageManager = 'npm' }
elseif ($allRels -contains 'npm-shrinkwrap.json')  { $PackageManager = 'npm' }

# --- Tailwind detection -----------------------------------------------------

$tailwindEvidence = New-Object System.Collections.Generic.List[string]
$tailwindDetected = $false

if ($detections.Tailwind) {
    $tailwindDetected = $true
    $tailwindEvidence.Add('package.json declares tailwindcss')
}
foreach ($rec in ($script:AllFiles | Where-Object { $_.Name -match '^tailwind\.config\.(js|ts|cjs|mjs|mts)$' })) {
    $tailwindDetected = $true
    $tailwindEvidence.Add($rec.RelativePath)
}
foreach ($rec in ($script:IncludedFiles | Where-Object { $_.Extension -in @('.css','.scss','.sass','.less') })) {
    try {
        $t = [System.IO.File]::ReadAllText($rec.FullPath, [System.Text.Encoding]::UTF8)
        if ($t -match '(?m)@import\s+["'']tailwindcss["'']') {
            $tailwindDetected = $true
            $tailwindEvidence.Add("$($rec.RelativePath) contains @import tailwindcss")
        }
        if ($t -match '(?m)@tailwind\s+(base|components|utilities)') {
            $tailwindDetected = $true
            $tailwindEvidence.Add("$($rec.RelativePath) contains @tailwind directives")
        }
    } catch { }
}

# --- Framework / language ---------------------------------------------------

$Framework = if ($detections.React) { 'React' } else { 'Not confidently detected' }
$BuildTool = if ($detections.Vite) { 'Vite' }
             elseif (@($script:AllFiles | Where-Object { $_.Name -match '^vite\.config\.' }).Count -gt 0) { 'Vite (config detected)' }
             else { 'Not confidently detected' }

$tsCount  = @($script:AllFiles | Where-Object { $_.Extension -eq '.ts' }).Count
$tsxCount = @($script:AllFiles | Where-Object { $_.Extension -eq '.tsx' }).Count

$Language = if (($tsCount + $tsxCount) -gt 0) { 'TypeScript' } else { 'JavaScript' }

# --- Static analysis --------------------------------------------------------

Write-Host 'Analyzing imports, exports, components, hooks...' -ForegroundColor DarkGray

foreach ($rec in $Included) {
    if ($rec.IsBinary -or $rec.IsEnv -or $rec.IsSecretFile) { continue }
    if ($rec.Length -gt $MaxBytes) { continue }

    $read = Read-FileUtf8 -File $rec.FileInfo -MaxBytes $MaxBytes
    if (-not $read.Ok) { continue }
    $text = $read.Content

    if ($rec.IsCode) {
        foreach ($imp in (Get-ImportList -Content $text)) {
            $script:ImportMap.Add([PSCustomObject]@{
                File   = $rec.RelativePath
                Module = $imp
                Kind   = (Get-ImportKind -S $imp)
            })
        }
        foreach ($exp in (Get-ExportList -Content $text)) {
            $script:ExportMap.Add([PSCustomObject]@{
                File   = $rec.RelativePath
                Export = $exp
            })
        }
    }

    if ($rec.Extension -in @('.tsx','.jsx')) {
        foreach ($c in (Get-ComponentList -Content $text -Extension $rec.Extension)) {
            $script:ComponentMap.Add([PSCustomObject]@{
                File      = $rec.RelativePath
                Component = $c
            })
        }
    }

    if ($rec.IsCode) {
        foreach ($h in (Get-UsedHookList -Content $text)) {
            $script:HookMap.Add([PSCustomObject]@{
                File = $rec.RelativePath
                Hook = $h
            })
        }
        foreach ($h in (Get-CustomHookList -Content $text)) {
            $script:CustomHookMap.Add([PSCustomObject]@{
                File = $rec.RelativePath
                Hook = $h
            })
        }
    }
}

# --- Build Markdown ---------------------------------------------------------

Write-Host 'Generating AI context...' -ForegroundColor DarkGray
Write-Host ''

$MD = New-Object System.Text.StringBuilder

function Add-Line {
    param([string]$T = '')
    [void]$MD.AppendLine($T)
}

function Add-FileBlock {
    param(
        [System.IO.FileInfo]$FileInfo,
        [string]$RelativePath,
        [string]$Extension
    )

    $read = Read-FileUtf8 -File $FileInfo -MaxBytes $MaxBytes
    if (-not $read.Ok) {
        Add-Line '> [FILE SKIPPED - unreadable]'
        Add-Line ''
        Add-Line "Path: $RelativePath"
        Add-Line "Reason: $($read.Reason)"
        Add-Line ''
        return
    }

    $safe = Protect-Secrets -Text $read.Content
    $bar  = '============================================================'
    $lang = Get-LanguageTag -Ext $Extension

    Add-Line $bar
    Add-Line "FILE: $RelativePath"
    Add-Line $bar
    Add-Line ''
    Add-Line ($FENCE + $lang)
    [void]$MD.Append($safe)
    if (-not $safe.EndsWith("`n")) { [void]$MD.AppendLine() }
    Add-Line $FENCE
    Add-Line ''
    Add-Line $bar
    Add-Line "END FILE: $RelativePath"
    Add-Line $bar
    Add-Line ''
}

# ---- Header ---------------------------------------------------------------

Add-Line '# SOURCE REPOSITORY AI CONTEXT'
Add-Line ''
Add-Line '> Generated automatically by `Scan-SourceForAI.ps1`'
Add-Line ''
Add-Line 'This document is a self-contained snapshot of the supplied repository.'
Add-Line 'It contains repository structure, configuration, documentation,'
Add-Line 'static architecture metadata, import/export relationships, and complete'
Add-Line 'contents of included textual source files.'
Add-Line ''
Add-Line '---'
Add-Line ''

# ---- 1. Project Overview --------------------------------------------------

Add-Line '# 1. PROJECT OVERVIEW'
Add-Line ''
Add-Line "Project Name: $ProjectRootName"
Add-Line "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz')"
Add-Line "Operating System: $([System.Environment]::OSVersion.VersionString)"
Add-Line "PowerShell Version: $($PSVersionTable.PSVersion)"
Add-Line "Scanner Max File Size: $MaxFileSizeMB MB"
Add-Line ''
Add-Line 'Note: local filesystem paths are intentionally omitted from this document.'
Add-Line 'All file references inside FILE/END FILE boundaries are project-relative.'
Add-Line ''
Add-Line '---'
Add-Line ''

# ---- 2. Technology Stack --------------------------------------------------

Add-Line '# 2. TECHNOLOGY STACK'
Add-Line ''
Add-Line "Framework: $Framework"
Add-Line "Build Tool: $BuildTool"
Add-Line "Language: $Language"
Add-Line "CSS Framework: $(if ($tailwindDetected) { 'Tailwind CSS detected' } else { 'Not confidently detected' })"
Add-Line "Package Manager: $PackageManager"
Add-Line ''
Add-Line 'Detected Libraries:'
$anyLib = $false
foreach ($k in $detections.Keys) {
    $d = $detections[$k]
    if ($null -ne $d) {
        Add-Line "- $k ($($d.Version)) [$($d.Section)]"
        $anyLib = $true
    }
}
if (-not $anyLib) {
    Add-Line '- No known libraries confidently detected.'
}
Add-Line ''

if ($tailwindDetected) {
    Add-Line 'Tailwind Detection Evidence:'
    foreach ($e in ($tailwindEvidence | Sort-Object -Unique)) {
        Add-Line "- $e"
    }
    Add-Line ''
    Add-Line 'Note: Tailwind may be configured CSS-first (v4-style) rather than'
    Add-Line 'with a traditional tailwind.config.* file.'
    Add-Line ''
}
Add-Line '---'
Add-Line ''

# ---- 3. Repository Structure ----------------------------------------------

Add-Line '# 3. REPOSITORY STRUCTURE'
Add-Line ''
Add-Line ($FENCE + 'text')
foreach ($l in $TreeLines) { Add-Line $l }
Add-Line $FENCE
Add-Line ''
Add-Line '---'
Add-Line ''

# ---- 4. Package Configuration ---------------------------------------------

Add-Line '# 4. PACKAGE CONFIGURATION'
Add-Line ''
if ($PackageRecord) {
    Add-Line '## package.json'
    Add-Line ''
    Add-FileBlock -FileInfo $PackageRecord.FileInfo -RelativePath $PackageRecord.RelativePath -Extension $PackageRecord.Extension
} else {
    Add-Line 'No package.json found at project root.'
    Add-Line ''
}
Add-Line '---'
Add-Line ''

# ---- 5. TypeScript Configuration ------------------------------------------

Add-Line '# 5. TYPESCRIPT CONFIGURATION'
Add-Line ''
$tsConfigs = @($Included | Where-Object { $_.Name -match '^tsconfig(\..+)?\.json$' -or $_.Name -eq 'jsconfig.json' } | Sort-Object RelativePath)
if ($tsConfigs.Count -eq 0) {
    Add-Line 'No TypeScript configuration files detected.'
    Add-Line ''
} else {
    foreach ($rec in $tsConfigs) {
        Add-Line "## $($rec.RelativePath)"
        Add-Line ''
        Add-FileBlock -FileInfo $rec.FileInfo -RelativePath $rec.RelativePath -Extension $rec.Extension
    }
}
Add-Line '---'
Add-Line ''

# ---- 6. Vite Configuration ------------------------------------------------

Add-Line '# 6. VITE CONFIGURATION'
Add-Line ''
$viteConfigs = @($Included | Where-Object { $_.Name -match '^vite\.config\.' } | Sort-Object RelativePath)
if ($viteConfigs.Count -eq 0) {
    Add-Line 'No Vite configuration file detected.'
    Add-Line ''
} else {
    foreach ($rec in $viteConfigs) {
        Add-Line "## $($rec.RelativePath)"
        Add-Line ''
        Add-FileBlock -FileInfo $rec.FileInfo -RelativePath $rec.RelativePath -Extension $rec.Extension
    }
}
Add-Line '---'
Add-Line ''

# ---- 7. Tailwind Configuration --------------------------------------------

Add-Line '# 7. TAILWIND CONFIGURATION'
Add-Line ''
$twConfigs = @($Included | Where-Object { $_.Name -match '^tailwind\.config\.' } | Sort-Object RelativePath)
if ($tailwindDetected) {
    Add-Line 'Tailwind CSS usage was detected.'
    Add-Line ''
    if ($twConfigs.Count -gt 0) {
        foreach ($rec in $twConfigs) {
            Add-Line "## $($rec.RelativePath)"
            Add-Line ''
            Add-FileBlock -FileInfo $rec.FileInfo -RelativePath $rec.RelativePath -Extension $rec.Extension
        }
    } else {
        Add-Line 'No traditional tailwind.config.* file found.'
        Add-Line 'This is expected for Tailwind v4-style CSS-first configurations.'
        Add-Line ''
    }
} else {
    Add-Line 'Tailwind CSS was not confidently detected.'
    Add-Line ''
}
Add-Line '---'
Add-Line ''

# ---- 8. Other Configuration -----------------------------------------------

Add-Line '# 8. OTHER CONFIGURATION'
Add-Line ''
$otherConfigs = @(
    $Included |
    Where-Object {
        $_.RelativePath -notmatch '/' -and
        $_.Name -notmatch '^vite\.config\.' -and
        $_.Name -notmatch '^tsconfig(\..+)?\.json$' -and
        $_.Name -notmatch '^tailwind\.config\.' -and
        $_.Name -ne 'package.json' -and
        $_.Extension -in @('.js','.cjs','.mjs','.ts','.json','.html','.toml','.yaml','.yml') -and
        -not ($script:DocNamesList -contains $_.Name)
    } |
    Sort-Object RelativePath
)
if ($otherConfigs.Count -eq 0) {
    Add-Line 'No additional recognized configuration files detected.'
    Add-Line ''
} else {
    foreach ($rec in $otherConfigs) {
        Add-Line "## $($rec.RelativePath)"
        Add-Line ''
        Add-FileBlock -FileInfo $rec.FileInfo -RelativePath $rec.RelativePath -Extension $rec.Extension
    }
}
Add-Line '---'
Add-Line ''

# ---- 9. Documentation -----------------------------------------------------

Add-Line '# 9. DOCUMENTATION'
Add-Line ''
$docs = @(
    $Included |
    Where-Object {
        ($script:DocNamesList -contains $_.Name) -or
        $_.RelativePath.ToLowerInvariant().StartsWith('docs/')
    } |
    Where-Object { $_.Extension -eq '.md' } |
    Sort-Object RelativePath
)
if ($docs.Count -eq 0) {
    Add-Line 'No documentation files included.'
    Add-Line ''
} else {
    foreach ($rec in $docs) {
        Add-Line "## $($rec.RelativePath)"
        Add-Line ''
        Add-FileBlock -FileInfo $rec.FileInfo -RelativePath $rec.RelativePath -Extension $rec.Extension
    }
}
Add-Line '---'
Add-Line ''

# ---- 10. Source Architecture ----------------------------------------------

Add-Line '# 10. SOURCE ARCHITECTURE'
Add-Line ''
Add-Line '## Detected Source Directories'
Add-Line ''

$archDirs = New-Object System.Collections.Generic.List[string]
foreach ($rec in $script:AllFiles) {
    if ($rec.RelativePath -notlike 'src/*') { continue }
    $parts = $rec.RelativePath -split '/'
    if ($parts.Count -ge 2) { $archDirs.Add("src/$($parts[1])") }
    if ($parts.Count -ge 3) { $archDirs.Add("src/$($parts[1])/$($parts[2])") }
}
$archDirs = @($archDirs | Sort-Object -Unique)

if ($archDirs.Count -eq 0) {
    Add-Line 'No src directories detected.'
} else {
    foreach ($d in $archDirs) { Add-Line "- ``$d``" }
}
Add-Line ''

Add-Line '## React Components'
Add-Line ''
if ($script:ComponentMap.Count -eq 0) {
    Add-Line 'No React components detected.'
} else {
    foreach ($g in ($script:ComponentMap | Group-Object File | Sort-Object Name)) {
        Add-Line "- ``$($g.Name)``"
        foreach ($c in ($g.Group | Sort-Object Component -Unique)) {
            Add-Line "  - component: ``$($c.Component)``"
        }
    }
}
Add-Line ''

Add-Line '## Custom Hooks'
Add-Line ''
if ($script:CustomHookMap.Count -eq 0) {
    Add-Line 'No custom hooks detected.'
} else {
    foreach ($g in ($script:CustomHookMap | Group-Object File | Sort-Object Name)) {
        Add-Line "- ``$($g.Name)``"
        foreach ($h in ($g.Group | Sort-Object Hook -Unique)) {
            Add-Line "  - ``$($h.Hook)``"
        }
    }
}
Add-Line ''

Add-Line '## Standard React Hooks Used'
Add-Line ''
if ($script:HookMap.Count -eq 0) {
    Add-Line 'No standard hooks detected.'
} else {
    foreach ($g in ($script:HookMap | Group-Object File | Sort-Object Name)) {
        $hooks = @($g.Group | Sort-Object Hook -Unique | ForEach-Object { $_.Hook })
        Add-Line "- ``$($g.Name)``: $($hooks -join ', ')"
    }
}
Add-Line ''
Add-Line '---'
Add-Line ''

# ---- 11. Source Files -----------------------------------------------------

Add-Line '# 11. SOURCE FILES'
Add-Line ''
Add-Line 'Complete contents of included source files.'
Add-Line 'Source is never summarized or replaced with placeholders.'
Add-Line ''

$sourceRecords = @($Included | Where-Object { $_.RelativePath.ToLowerInvariant().StartsWith('src/') } | Sort-Object RelativePath)
if ($sourceRecords.Count -eq 0) {
    Add-Line 'No source files found under src/.'
    Add-Line ''
} else {
    foreach ($rec in $sourceRecords) {
        Add-Line "## $($rec.RelativePath)"
        Add-Line ''
        Add-FileBlock -FileInfo $rec.FileInfo -RelativePath $rec.RelativePath -Extension $rec.Extension
    }
}
Add-Line '---'
Add-Line ''

# ---- 12. Import Map -------------------------------------------------------

Add-Line '# 12. IMPORT MAP'
Add-Line ''
Add-Line 'Lightweight static import analysis.'
Add-Line ''
$groupedImports = @($script:ImportMap | Group-Object File | Sort-Object Name)
if ($groupedImports.Count -eq 0) {
    Add-Line 'No imports detected.'
    Add-Line ''
} else {
    foreach ($g in $groupedImports) {
        Add-Line "### $($g.Name)"
        Add-Line ''
        foreach ($item in ($g.Group | Sort-Object Kind, Module -Unique)) {
            Add-Line "- ``$($item.Module)`` [$($item.Kind)]"
        }
        Add-Line ''
    }
}
Add-Line '---'
Add-Line ''

# ---- 13. Export Map -------------------------------------------------------

Add-Line '# 13. EXPORT MAP'
Add-Line ''
Add-Line 'Lightweight static export analysis.'
Add-Line ''
$groupedExports = @($script:ExportMap | Group-Object File | Sort-Object Name)
if ($groupedExports.Count -eq 0) {
    Add-Line 'No exports detected.'
    Add-Line ''
} else {
    foreach ($g in $groupedExports) {
        Add-Line "### $($g.Name)"
        Add-Line ''
        foreach ($item in ($g.Group | Sort-Object Export -Unique)) {
            Add-Line "- $($item.Export)"
        }
        Add-Line ''
    }
}
Add-Line '---'
Add-Line ''

# ---- 14. Statistics -------------------------------------------------------

$stats = [ordered]@{
    TotalFiles    = $script:AllFiles.Count
    IncludedFiles = $script:IncludedFiles.Count
    ExcludedFiles = $script:ExcludedFiles.Count
    BinaryFiles   = $script:BinaryFiles.Count
    TooBigFiles   = $script:TooBigFiles.Count
    Ts            = 0
    Tsx           = 0
    Js            = 0
    Jsx           = 0
    Css           = 0
    Scss          = 0
    Json          = 0
    Md            = 0
    Lines         = [int64]0
    Chars         = [int64]0
    Words         = [int64]0
}

foreach ($rec in $Included) {
    switch ($rec.Extension) {
        '.ts'   { $stats.Ts++ }
        '.tsx'  { $stats.Tsx++ }
        '.js'   { $stats.Js++ }
        '.jsx'  { $stats.Jsx++ }
        '.css'  { $stats.Css++ }
        '.scss' { $stats.Scss++ }
        '.json' { $stats.Json++ }
        '.md'   { $stats.Md++ }
    }
    $read = Read-FileUtf8 -File $rec.FileInfo -MaxBytes $MaxBytes
    if (-not $read.Ok) { continue }
    $stats.Chars += $read.Content.Length
    if ($read.Content.Length -gt 0) {
        $stats.Lines += ([regex]::Matches($read.Content, "`n")).Count + 1
        $stats.Words += ([regex]::Matches($read.Content, '\S+')).Count
    }
}

Add-Line '# 14. PROJECT STATISTICS'
Add-Line ''
Add-Line "Total files: $($stats.TotalFiles)"
Add-Line "Included files: $($stats.IncludedFiles)"
Add-Line "Excluded files: $($stats.ExcludedFiles)"
Add-Line "Binary files represented but not embedded: $($stats.BinaryFiles)"
Add-Line "Files skipped for size: $($stats.TooBigFiles)"
Add-Line ''
Add-Line "TypeScript files: $($stats.Ts)"
Add-Line "TSX files: $($stats.Tsx)"
Add-Line "JavaScript files: $($stats.Js)"
Add-Line "JSX files: $($stats.Jsx)"
Add-Line "CSS files: $($stats.Css)"
Add-Line "SCSS files: $($stats.Scss)"
Add-Line "JSON files: $($stats.Json)"
Add-Line "Markdown files: $($stats.Md)"
Add-Line ''
Add-Line "Approximate lines: $($stats.Lines)"
Add-Line "Approximate characters: $($stats.Chars)"
Add-Line "Approximate words: $($stats.Words)"
Add-Line ''
Add-Line '---'
Add-Line ''

# ---- 15. Warnings ---------------------------------------------------------

Add-Line '# 15. WARNINGS'
Add-Line ''
if ($script:Warnings.Count -eq 0) {
    Add-Line 'No warnings generated.'
} else {
    foreach ($w in ($script:Warnings | Sort-Object -Unique)) {
        Add-Line "- WARNING: $w"
    }
}
Add-Line ''

if ($script:TooBigFiles.Count -gt 0) {
    Add-Line '## Files Skipped (Size)'
    Add-Line ''
    foreach ($r in ($script:TooBigFiles | Sort-Object RelativePath)) {
        Add-Line "- ``$($r.RelativePath)`` - $(Format-FileSize $r.Length)"
    }
    Add-Line ''
}

if ($script:BinaryFiles.Count -gt 0) {
    Add-Line '## Binary Files (not embedded)'
    Add-Line ''
    foreach ($r in ($script:BinaryFiles | Sort-Object RelativePath)) {
        Add-Line "- ``$($r.RelativePath)`` - $(Format-FileSize $r.Length)"
    }
    Add-Line ''
}
Add-Line '---'
Add-Line ''

# ---- 16. AI Instructions --------------------------------------------------

Add-Line '# 16. AI PROJECT UNDERSTANDING INSTRUCTIONS'
Add-Line ''
Add-Line 'This document represents a snapshot of the repository at the time it was generated.'
Add-Line ''
Add-Line 'Use the information in this document as the authoritative representation'
Add-Line 'of the provided project. Do not assume that files or functionality exist'
Add-Line 'outside what is represented here.'
Add-Line ''
Add-Line 'Before suggesting or changing code:'
Add-Line ''
Add-Line '1. Understand the existing architecture.'
Add-Line '2. Search the supplied source context for existing functionality.'
Add-Line '3. Do not create duplicate components, hooks, services, utilities, or types.'
Add-Line '4. Respect existing naming conventions.'
Add-Line '5. Respect existing folder organization unless there is a strong reason to change it.'
Add-Line '6. Trace imports and dependencies before modifying code.'
Add-Line '7. Consider TypeScript types and compiler configuration.'
Add-Line '8. Consider React rendering behavior.'
Add-Line '9. Consider hooks and state dependencies.'
Add-Line '10. Consider Vite configuration and aliases.'
Add-Line '11. Consider Tailwind configuration and conventions.'
Add-Line '12. Consider runtime behavior.'
Add-Line '13. Consider build-time behavior.'
Add-Line '14. Consider responsive behavior.'
Add-Line '15. Consider accessibility.'
Add-Line '16. Consider security.'
Add-Line '17. Consider performance.'
Add-Line '18. Consider maintainability.'
Add-Line ''
Add-Line 'When identifying a problem:'
Add-Line ''
Add-Line '- identify the exact file'
Add-Line '- identify the relevant code'
Add-Line '- explain why it is a problem'
Add-Line '- distinguish confirmed problems from likely problems'
Add-Line '- explain downstream effects'
Add-Line '- propose the smallest appropriate fix first'
Add-Line '- consider whether related files are affected'
Add-Line ''
Add-Line 'Do not invent project behavior.'
Add-Line ''
Add-Line 'Do not assume a library is installed unless it appears in the supplied'
Add-Line 'project information.'
Add-Line ''
Add-Line 'Do not assume a file exists unless it appears in the repository snapshot.'
Add-Line ''
Add-Line 'When the user asks to continue development, use this repository snapshot'
Add-Line 'to understand the existing implementation before proposing new architecture.'
Add-Line ''
Add-Line '### Source Interpretation Rules'
Add-Line ''
Add-Line '- FILE boundaries are authoritative.'
Add-Line '- File paths inside FILE/END FILE boundaries are project-relative.'
Add-Line '- Static import/export/component analysis is advisory metadata, not compiler output.'
Add-Line '- A detected import does not guarantee runtime resolution.'
Add-Line '- Binary assets are known to exist but their binary contents are unavailable.'
Add-Line '- Environment files and obvious secrets are intentionally omitted/redacted.'
Add-Line '- Files exceeding the configured size limit are listed in the warnings section.'
Add-Line ''

# ---- Finalize -------------------------------------------------------------

$markdown = $MD.ToString()
if (-not $markdown.EndsWith("`n")) { $markdown += "`n" }

try {
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($OutputPath, $markdown, $utf8NoBom)
} catch {
    Write-Host ''
    Write-Host 'ERROR: Unable to write output file.' -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    exit 1
}

Write-Host ''
Write-Host '============================================================' -ForegroundColor Green
Write-Host ' SCAN COMPLETE' -ForegroundColor Green
Write-Host '============================================================' -ForegroundColor Green
Write-Host ''
Write-Host ('Files discovered:       {0}' -f $stats.TotalFiles)
Write-Host ('Files included:         {0}' -f $stats.IncludedFiles)
Write-Host ('Files excluded:         {0}' -f $stats.ExcludedFiles)
Write-Host ('Binary files:           {0}' -f $stats.BinaryFiles)
Write-Host ('Large files skipped:    {0}' -f $stats.TooBigFiles)
Write-Host ('Warnings:               {0}' -f $script:Warnings.Count)
Write-Host ''
Write-Host 'Output:' -ForegroundColor White
Write-Host $OutputPath -ForegroundColor Cyan
Write-Host ''
Write-Host '============================================================' -ForegroundColor Green
Write-Host ''