# load-env.ps1
#
# Loads environment variables from .env.local into the current PowerShell session.
# Also syncs FIGMA_API_KEY to ~/.claude/settings.json so the Figma MCP picks it up.
#
# Usage:
#   . .\scripts\load-env.ps1
#
# The leading dot (dot-source operator) is required so variables persist in your shell.
#
# This script does NOT commit anything to Git. It only reads .env.local and sets
# environment variables in memory for the current session.

$envFile = Join-Path $PSScriptRoot "..\.env.local"

if (-not (Test-Path $envFile)) {
    Write-Host "ERROR: .env.local not found. Copy .env.example to .env.local and add your credentials." -ForegroundColor Red
    Write-Host "  Copy: cp .env.example .env.local" -ForegroundColor Yellow
    Write-Host "  Then: . .\scripts\load-env.ps1" -ForegroundColor Yellow
    return
}

Write-Host "Loading credentials from .env.local..." -ForegroundColor Cyan

$figmaToken = $null
$figmaEmail = $null

Get-Content $envFile | ForEach-Object {
    $line = $_.Trim()

    # Skip empty lines and comments
    if ([string]::IsNullOrWhiteSpace($line) -or $line.StartsWith("#")) {
        return
    }

    # Parse KEY=value
    $idx = $line.IndexOf("=")
    if ($idx -gt 0) {
        $key = $line.Substring(0, $idx).Trim()
        $value = $line.Substring($idx + 1).Trim()

        # Strip surrounding quotes
        if (($value.StartsWith('"') -and $value.EndsWith('"')) -or
            ($value.StartsWith("'") -and $value.EndsWith("'"))) {
            $value = $value.Substring(1, $value.Length - 2)
        }

        # Capture Figma credentials for settings.json sync
        if ($key -eq "FIGMA_API_KEY") {
            $figmaToken = $value
        }
        if ($key -eq "FIGMA_EMAIL") {
            $figmaEmail = $value
        }

        # Only set if not already set (allow shell overrides)
        $existing = Get-Content "env:$key" -ErrorAction SilentlyContinue
        if ([string]::IsNullOrEmpty($existing)) {
            [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
            Write-Host "  SET $key" -ForegroundColor Green
        } else {
            Write-Host "  SKIP $key (already set: '$existing')" -ForegroundColor DarkGray
        }
    }
}

# Sync FIGMA_API_KEY to settings.json (non-disruptive: only updates if different)
$settingsFile = "$env:USERPROFILE\.claude\settings.json"
if ($figmaToken -and (Test-Path $settingsFile)) {
    $settingsJson = Get-Content $settingsFile -Raw | ConvertFrom-Json
    $currentToken = $null
    if ($settingsJson.env.PSObject.Properties.Name -contains "FIGMA_API_KEY") {
        $currentToken = $settingsJson.env.FIGMA_API_KEY
    }

    if ($currentToken -ne $figmaToken) {
        $settingsJson.env | Add-Member -NotePropertyName "FIGMA_API_KEY" -NotePropertyValue $figmaToken -Force -ErrorAction SilentlyContinue
        $settingsJson | ConvertTo-Json -Depth 10 | Set-Content $settingsFile -NoNewline -Encoding UTF8
        $displayEmail = if ($figmaEmail) { "($figmaEmail)" } else { "" }
        Write-Host "  SYNCED FIGMA_API_KEY -> settings.json $displayEmail" -ForegroundColor Magenta
    } else {
        Write-Host "  FIGMA_API_KEY already in sync" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "Credentials loaded. Start Claude Code:" -ForegroundColor Cyan
Write-Host "  claude" -ForegroundColor White
