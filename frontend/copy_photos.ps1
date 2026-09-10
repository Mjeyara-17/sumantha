$src = 'C:\Users\jeyra\OneDrive\Pictures\sumantha'
$destBase = 'c:\Users\jeyra\Videos\Ram\birthday\frontend\public\images'
$destSumantha = Join-Path $destBase 'sumantha'
$destMemories = Join-Path $destBase 'memories'
$destFunny = Join-Path $destBase 'funny'
$destWedding = Join-Path $destBase 'wedding'

if (!(Test-Path -Path $destSumantha)) { New-Item -ItemType Directory -Force -Path $destSumantha | Out-Null }
if (!(Test-Path -Path $destMemories)) { New-Item -ItemType Directory -Force -Path $destMemories | Out-Null }
if (!(Test-Path -Path $destFunny)) { New-Item -ItemType Directory -Force -Path $destFunny | Out-Null }
if (!(Test-Path -Path $destWedding)) { New-Item -ItemType Directory -Force -Path $destWedding | Out-Null }

$files = Get-ChildItem -Path $src -Filter '*.jpeg' | Sort-Object Name
Write-Output "Found $($files.Count) photos in $src"

$i = 1
foreach ($f in $files) {
    $pad = $i.ToString('D2')
    Copy-Item -Path $f.FullName -Destination (Join-Path $destSumantha "photo-$pad.jpg") -Force
    Copy-Item -Path $f.FullName -Destination (Join-Path $destSumantha $f.Name) -Force
    $i++
}

# Key designated images
Copy-Item -Path $files[0].FullName -Destination (Join-Path $destBase 'sumantha.jpg') -Force
Copy-Item -Path $files[0].FullName -Destination (Join-Path $destSumantha 'hero.jpg') -Force
Copy-Item -Path $files[1].FullName -Destination (Join-Path $destSumantha 'puzzle-photo.jpg') -Force
Copy-Item -Path $files[2].FullName -Destination (Join-Path $destSumantha 'then-photo.jpg') -Force
Copy-Item -Path $files[3].FullName -Destination (Join-Path $destSumantha 'now-photo.jpg') -Force

# Memory polaroids 1..6
for ($m = 1; $m -le 6; $m++) {
    $idx = ($m * 2) % $files.Count
    $pad = $m.ToString('D2')
    Copy-Item -Path $files[$idx].FullName -Destination (Join-Path $destMemories "memory-$pad.jpg") -Force
    Copy-Item -Path $files[$idx].FullName -Destination (Join-Path $destMemories "memory$m.jpg") -Force
    Copy-Item -Path $files[$idx].FullName -Destination (Join-Path $destBase "memory$m.jpg") -Force
}

# Fun & thematic
Copy-Item -Path $files[4].FullName -Destination (Join-Path $destFunny 'caught-in-4k.jpg') -Force
Copy-Item -Path $files[5].FullName -Destination (Join-Path $destFunny 'meme-01.jpg') -Force
Copy-Item -Path $files[6].FullName -Destination (Join-Path $destFunny 'meme-02.jpg') -Force
Copy-Item -Path $files[7].FullName -Destination (Join-Path $destMemories 'food-run.jpg') -Force
Copy-Item -Path $files[8].FullName -Destination (Join-Path $destMemories 'bts-stars.jpg') -Force
Copy-Item -Path $files[9].FullName -Destination (Join-Path $destMemories 'first-chat.jpg') -Force
Copy-Item -Path $files[10].FullName -Destination (Join-Path $destWedding 'sumantha-future-wedding.jpg') -Force

Write-Output "Successfully organized Sumantha photos across project!"
