$newPhoto = 'C:\Users\jeyra\.gemini\antigravity-ide\brain\e08f8b5e-4298-4e27-ac50-dc514f797e94\.user_uploaded\media_1789046825698.jpg'
$dest1 = 'c:\Users\jeyra\Videos\Ram\birthday\frontend\public\images\sumantha\photo-01.jpg'
$dest2 = 'c:\Users\jeyra\Videos\Ram\birthday\frontend\public\images\sumantha.jpg'
$dest3 = 'c:\Users\jeyra\Videos\Ram\birthday\frontend\public\images\sumantha\hero.jpg'

Copy-Item -Path $newPhoto -Destination $dest1 -Force
Copy-Item -Path $newPhoto -Destination $dest2 -Force
Copy-Item -Path $newPhoto -Destination $dest3 -Force

Write-Output 'Photo 01 successfully copied!'
Get-Item -Path $dest1 | Select-Object FullName, Length, LastWriteTime
