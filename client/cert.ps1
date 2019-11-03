Write-Host "Creating https certificate"

$outPath = "./node_modules/webpack-dev-server/ssl/server.pem"

$key = Get-Content ./cert/server.pem
$key | Out-File $outPath -Encoding ASCII

Write-Host "Https certificate written to $outPath"