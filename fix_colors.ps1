$pages = @('MovementOfPositivity','CenterOfExcellence','WordsBeyondBorders','NursingCollege','SocialInnovationPath','SheLeads','SkillReach','ShelterHome','DTNTLivesMatter','JobFair')
foreach ($p in $pages) {
    $f = "src\pages\$p.jsx"
    $c = Get-Content $f -Raw
    # Fix the divider line in hero to use bright orange
    $c = $c -replace 'w-12 h-1 bg-secondary shrink-0','w-12 h-1 bg-secondary-container shrink-0'
    Set-Content $f $c -NoNewline
    Write-Host "Fixed divider: $p"
}
