$srcDir = 'C:\Users\jeyra\OneDrive\Pictures\sumantha'
$destSumantha = 'c:\Users\jeyra\Videos\Ram\birthday\frontend\public\images\sumantha'
$destWedding = 'c:\Users\jeyra\Videos\Ram\birthday\frontend\public\images\wedding'
$destMemories = 'c:\Users\jeyra\Videos\Ram\birthday\frontend\public\images\memories'
$destFunny = 'c:\Users\jeyra\Videos\Ram\birthday\frontend\public\images\funny'
$uploadedWedding = 'C:\Users\jeyra\.gemini\antigravity-ide\brain\e08f8b5e-4298-4e27-ac50-dc514f797e94\.user_uploaded\media_1789042138522.jpg'

if (!(Test-Path -Path $destSumantha)) { New-Item -ItemType Directory -Force -Path $destSumantha | Out-Null }
if (!(Test-Path -Path $destWedding)) { New-Item -ItemType Directory -Force -Path $destWedding | Out-Null }
if (!(Test-Path -Path $destMemories)) { New-Item -ItemType Directory -Force -Path $destMemories | Out-Null }
if (!(Test-Path -Path $destFunny)) { New-Item -ItemType Directory -Force -Path $destFunny | Out-Null }

$files = Get-ChildItem -Path $srcDir -Filter '*.jpeg' | Sort-Object Name
Write-Output "Found raw photos in OneDrive: $($files.Count)"

$i = 1
foreach ($f in $files) {
    $pad = $i.ToString('D2')
    Copy-Item -Path $f.FullName -Destination (Join-Path $destSumantha "photo-$pad.jpg") -Force
    $i++
}

# Copy the uploaded future wedding photo as photo-13.jpg and wedding/sumantha-future-wedding.jpg
if (Test-Path $uploadedWedding) {
    Copy-Item -Path $uploadedWedding -Destination (Join-Path $destSumantha "photo-13.jpg") -Force
    Copy-Item -Path $uploadedWedding -Destination (Join-Path $destWedding "sumantha-future-wedding.jpg") -Force
    Write-Output "Copied uploaded Korean Wedding image to photo-13.jpg and wedding/sumantha-future-wedding.jpg"
}

# Duplicate key specific roles
Copy-Item -Path (Join-Path $destSumantha "photo-01.jpg") -Destination 'c:\Users\jeyra\Videos\Ram\birthday\frontend\public\images\sumantha.jpg' -Force

# List all 22 photos
Get-ChildItem -Path $destSumantha -Filter 'photo-*.jpg' | Sort-Object Name | Select-Object Name, Length
Write-Output "Photo setup complete!"
