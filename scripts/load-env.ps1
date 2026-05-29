# load-env.ps1
#
# Loads environment variables from .env.local into the current PowerShell session.
# Safe: ignores comments and empty lines, trims whitespace, handles quoted values.
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

Write-Host ""
Write-Host "Credentials loaded. Start Claude Code:" -ForegroundColor Cyan
Write-Host "  claude" -ForegroundColor White
