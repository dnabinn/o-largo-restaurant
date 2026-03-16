#!/usr/bin/env bash
PORT=${PORT:-3000}
DIR="$(cd "$(dirname "$0")" && pwd)"
WIN_DIR="$(cygpath -w "$DIR")"
exec powershell.exe -ExecutionPolicy Bypass -Command "
\$port = $PORT
\$root = '$WIN_DIR'
\$listener = [System.Net.HttpListener]::new()
\$listener.Prefixes.Add('http://localhost:' + \$port + '/')
\$listener.Start()
Write-Output \"Server running on http://localhost:\$port\"
[Console]::Out.Flush()
\$mime = @{ '.html'='text/html; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.js'='application/javascript; charset=utf-8'; '.png'='image/png'; '.jpg'='image/jpeg'; '.svg'='image/svg+xml'; '.ico'='image/x-icon' }
while (\$listener.IsListening) {
  \$ctx = \$listener.GetContext()
  \$req = \$ctx.Request
  \$res = \$ctx.Response
  \$path = \$req.Url.LocalPath -replace '/', '\\'
  \$file = Join-Path \$root \$path
  if (-not (Test-Path \$file -PathType Leaf)) { \$file = Join-Path \$root 'index.html' }
  \$ext = [System.IO.Path]::GetExtension(\$file)
  \$ct = if (\$mime[\$ext]) { \$mime[\$ext] } else { 'application/octet-stream' }
  \$bytes = [System.IO.File]::ReadAllBytes(\$file)
  \$res.ContentType = \$ct
  \$res.ContentLength64 = \$bytes.Length
  \$res.OutputStream.Write(\$bytes, 0, \$bytes.Length)
  \$res.OutputStream.Close()
}
"
