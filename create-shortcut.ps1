# Tomato Clock Shortcut Creator
# Run: powershell -ExecutionPolicy Bypass -File create-shortcut.ps1

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$iconPath  = Join-Path $scriptDir "tomato.ico"
$desktop   = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktop "TomatoClock.lnk"

Write-Host "Creating tomato clock shortcut..." -ForegroundColor Yellow

# Step 1: Generate tomato icon
Write-Host "  Generating icon..." -ForegroundColor Cyan

Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap(64, 64)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'HighQuality'
$g.Clear([System.Drawing.Color]::Transparent)

# Shadow
$shadowColor = [System.Drawing.Color]::FromArgb(50, 0, 0, 0)
$shadowBrush = New-Object System.Drawing.SolidBrush($shadowColor)
$g.FillEllipse($shadowBrush, 6, 8, 52, 52)
$shadowBrush.Dispose()

# Tomato body - red gradient
$topColor = [System.Drawing.Color]::FromArgb(255, 240, 80, 60)
$bottomColor = [System.Drawing.Color]::FromArgb(255, 190, 35, 25)
$rect = New-Object System.Drawing.RectangleF(4, 6, 55, 53)
$brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.PointF(32, 4)),
    (New-Object System.Drawing.PointF(32, 60)),
    $topColor, $bottomColor
)
$g.FillEllipse($brush, $rect)
$brush.Dispose()

# Highlight top-left
$hlColor = [System.Drawing.Color]::FromArgb(80, 255, 255, 255)
$hlBrush = New-Object System.Drawing.SolidBrush($hlColor)
$g.FillEllipse($hlBrush, 15, 13, 16, 14)
$hlBrush.Dispose()

# Small highlight
$hl2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 255, 255, 255))
$g.FillEllipse($hl2, 35, 17, 7, 5)
$hl2.Dispose()

# Stem
$stemColor = [System.Drawing.Color]::FromArgb(255, 55, 155, 65)
$stemPen = New-Object System.Drawing.Pen($stemColor, 4.5)
$stemPen.StartCap = 'Round'
$stemPen.EndCap = 'Round'
$g.DrawLine($stemPen, 31, 5, 27, -1)
$stemPen.Dispose()

# Leaf
$leafColor = [System.Drawing.Color]::FromArgb(255, 65, 175, 75)
$leafBrush = New-Object System.Drawing.SolidBrush($leafColor)
$points = @(
    (New-Object System.Drawing.PointF(27, 2)),
    (New-Object System.Drawing.PointF(39, -1)),
    (New-Object System.Drawing.PointF(35, 8)),
    (New-Object System.Drawing.PointF(28, 7))
)
$g.FillPolygon($leafBrush, $points)
$leafBrush.Dispose()

$g.Dispose()

# Save as .ico
$bmp.Save($iconPath, [System.Drawing.Imaging.ImageFormat]::Icon)
$bmp.Dispose()

Write-Host "  Icon saved: $iconPath" -ForegroundColor Green

# Step 2: Create desktop shortcut
Write-Host "  Creating shortcut..." -ForegroundColor Cyan

$WshShell = New-Object -ComObject WScript.Shell
$shortcut = $WshShell.CreateShortcut($shortcutPath)
$shortcut.TargetPath = Join-Path $scriptDir "start.bat"
$shortcut.WorkingDirectory = $scriptDir
$shortcut.WindowStyle = 7
$shortcut.Description = "Pomodoro Timer"
$shortcut.IconLocation = "$iconPath,0"
$shortcut.Save()

Write-Host "  Shortcut created: $shortcutPath" -ForegroundColor Green
Write-Host ""
Write-Host "Done! Double-click the shortcut on your desktop to start." -ForegroundColor Green
