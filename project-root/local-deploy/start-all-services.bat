@echo off
echo ===========================================
echo   DENTAL CLINIC - START ALL SERVICES
echo ===========================================

cd /d "%~dp0"

echo [INFO] Starting all services for local development...
echo.

echo [1/3] Starting Backend Service...
start "Backend Service" cmd /k "cd /d %~dp0backend && deploy-backend.bat"
timeout /t 3 /nobreak >nul

echo [2/3] Starting AI Service...
start "AI Service" cmd /k "cd /d %~dp0ai-service && deploy-ai-service.bat"
timeout /t 3 /nobreak >nul

echo [3/3] Starting Frontend Service...
start "Frontend Service" cmd /k "cd /d %~dp0frontend && deploy-frontend.bat"

echo.
echo ===========================================
echo   ALL SERVICES STARTING...
echo ===========================================
echo.
echo Service URLs:
echo   Frontend:  http://localhost:3000
echo   Backend:   http://localhost:8080/api
echo   AI Service: http://localhost:8000/docs
echo   H2 Console: http://localhost:8080/api/h2-console
echo.
echo Each service is running in a separate window.
echo Close individual windows to stop services.
echo.

pause