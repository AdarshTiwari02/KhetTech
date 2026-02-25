@echo off
echo Adding all changes to git...
git add .

echo.
echo Committing changes...
git commit -m "feat: Enhanced Smart Farmer Assistant - Added AI Chatbot, Video Tutorials, Crop Rotation Planner, Enhanced Livestock, Analytics, Live Location"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo Done! All changes pushed to GitHub.
pause
