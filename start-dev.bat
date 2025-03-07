@echo off
echo ===================================================
echo Starting Full Development Environment with PowerShell 7
echo ===================================================
echo This will start:
echo - Next.js Frontend (http://localhost:3003)
echo - Laravel Backend (http://localhost:8000)
echo - MeiliSearch (if available) (http://localhost:7700)
echo.
echo Press Ctrl+C to stop all servers when done
echo ===================================================
echo.

REM Check if PowerShell 7 is available
if exist "C:\Program Files\PowerShell\7\pwsh.exe" (
    "C:\Program Files\PowerShell\7\pwsh.exe" -File .\run-dev-ps7.ps1
) else (
    echo PowerShell 7 not found. Using default PowerShell...
    powershell -File .\run-dev-ps7.ps1
) 