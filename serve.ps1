$port = if ($env:PORT) { $env:PORT } else { 3000 }
$root = $PSScriptRoot
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port"

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.svg'  = 'image/svg+xml'
  '.ico'  = 'image/x-icon'
  '.woff2'= 'font/woff2'
}

while ($listener.IsListening) {
  $ctx  = $listener.GetContext()
  $req  = $ctx.Request
  $res  = $ctx.Response
  $path = $req.Url.LocalPath -replace '/', '\'
  $file = Join-Path $root $path
  if ((Test-Path $file -PathType Leaf) -eq $false) {
    $file = Join-Path $root 'index.html'
  }
  $ext  = [System.IO.Path]::GetExtension($file)
  $ct   = if ($mime[$ext]) { $mime[$ext] } else { 'application/octet-stream' }
  $bytes = [System.IO.File]::ReadAllBytes($file)
  $res.ContentType   = $ct
  $res.ContentLength64 = $bytes.Length
  $res.OutputStream.Write($bytes, 0, $bytes.Length)
  $res.OutputStream.Close()
}
