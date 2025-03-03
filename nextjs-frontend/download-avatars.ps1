$outputDir = "public/assets/img/profiles"

# Create directory if it doesn't exist
if (!(Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# Download avatar images
for ($i = 1; $i -le 10; $i++) {
    $url = "https://randomuser.me/api/portraits/men/$i.jpg"
    $outputFile = "$outputDir/avatar-$i.jpg"
    Write-Host "Downloading $url to $outputFile"
    Invoke-WebRequest -Uri $url -OutFile $outputFile
}

Write-Host "All avatar images downloaded successfully!" 