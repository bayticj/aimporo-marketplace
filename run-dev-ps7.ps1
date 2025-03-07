# PowerShell script to run the development server
# This script checks the PowerShell version and uses the appropriate syntax

# Check PowerShell version
if ($PSVersionTable.PSVersion.Major -ge 7) {
    # PowerShell 7+ supports the && operator
    Write-Host "Using PowerShell 7+ with parallel execution" -ForegroundColor Green
    
    # Function to start the Next.js frontend
    function Start-Frontend {
        Write-Host "Starting Next.js frontend..." -ForegroundColor Cyan
        Set-Location -Path nextjs-frontend
        npm run dev
    }
    
    # Function to start the Laravel backend
    function Start-Backend {
        Write-Host "Starting Laravel backend..." -ForegroundColor Magenta
        Set-Location -Path laravel-app
        php artisan serve --port=8000
    }
    
    # Function to start MeiliSearch if needed
    function Start-MeiliSearch {
        Write-Host "Starting MeiliSearch..." -ForegroundColor Yellow
        Start-Process -FilePath ".\meilisearch.exe" -ArgumentList "--http-addr 127.0.0.1:7700"
    }
    
    # Function to find an available port
    function Find-AvailablePort {
        param (
            [int]$StartPort
        )
        $port = $StartPort
        $maxPort = $StartPort + 10
        
        while ($port -lt $maxPort) {
            $tcpConnection = New-Object System.Net.Sockets.TcpClient
            try {
                $tcpConnection.Connect("127.0.0.1", $port)
                # Port is in use, try the next one
                $port++
            } catch {
                # Port is available
                return $port
            } finally {
                $tcpConnection.Dispose()
            }
        }
        
        # If we get here, no ports in range were available
        return $StartPort
    }
    
    # Find available ports
    $frontendPort = Find-AvailablePort -StartPort 3003
    $backendPort = Find-AvailablePort -StartPort 8000
    $meiliPort = Find-AvailablePort -StartPort 7700
    
    # Start services in parallel using jobs
    $frontendJob = Start-Job -ScriptBlock { 
        Set-Location $using:PWD
        cd nextjs-frontend
        # Pass the port as an argument to server.js
        node server.js $using:frontendPort
    }
    
    $backendJob = Start-Job -ScriptBlock { 
        Set-Location $using:PWD
        cd laravel-app
        php artisan serve --port=$using:backendPort
    }
    
    # Start MeiliSearch in the background if it exists and is needed
    if (Test-Path ".\meilisearch.exe") {
        Start-Process -FilePath ".\meilisearch.exe" -ArgumentList "--http-addr 127.0.0.1:$meiliPort" -WindowStyle Minimized
    }
    
    # Display output from jobs in real-time
    try {
        Write-Host "Development servers started. Press Ctrl+C to stop all servers." -ForegroundColor Green
        Write-Host "Frontend: http://localhost:$frontendPort" -ForegroundColor Cyan
        Write-Host "Backend: http://localhost:$backendPort" -ForegroundColor Magenta
        if (Test-Path ".\meilisearch.exe") {
            Write-Host "MeiliSearch: http://localhost:$meiliPort" -ForegroundColor Yellow
        }
        
        # Keep the script running and show output
        while ($true) {
            Receive-Job -Job $frontendJob
            Receive-Job -Job $backendJob
            Start-Sleep -Seconds 1
        }
    }
    finally {
        # Clean up jobs when script is terminated
        Stop-Job -Job $frontendJob, $backendJob
        Remove-Job -Job $frontendJob, $backendJob
        
        # Find and stop the MeiliSearch process if it was started
        $meiliProcess = Get-Process -Name "meilisearch" -ErrorAction SilentlyContinue
        if ($meiliProcess) {
            Stop-Process -Id $meiliProcess.Id -Force
        }
        
        Write-Host "Development servers stopped." -ForegroundColor Red
    }
} else {
    # PowerShell 5 doesn't support the same job functionality, use a simpler approach
    Write-Host "Using PowerShell 5 - for best experience, please upgrade to PowerShell 7+" -ForegroundColor Yellow
    Write-Host "Starting Next.js frontend only. You'll need to start the Laravel backend separately." -ForegroundColor Yellow
    cd nextjs-frontend
    npm run dev
} 