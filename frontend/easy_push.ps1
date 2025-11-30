# Automated Push Script
Write-Host "Initializing Git Repository..."
git init
git add .
git commit -m "Initial commit"
git branch -M main

Write-Host "Adding Remote origin..."
# Remove existing origin if it exists to avoid errors
git remote remove origin 2>$null
git remote add origin https://github.com/sanssamuel-source/ombudsman-frontend

Write-Host "Pushing to GitHub..."
git push -u origin main

Write-Host "Done! Press Enter to close."
Read-Host
