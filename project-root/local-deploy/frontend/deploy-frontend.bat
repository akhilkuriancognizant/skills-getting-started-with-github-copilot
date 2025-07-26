@echo off
echo ===========================================
echo   DENTAL CLINIC - FRONTEND LOCAL DEPLOY
echo ===========================================

cd /d "%~dp0"
cd ..\..\frontend

echo [1/6] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found! Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo [2/6] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo [3/6] Installing TailAdmin dependencies...
call npm install @headlessui/react @heroicons/react recharts axios react-router-dom
if %errorlevel% neq 0 (
    echo ERROR: TailAdmin dependencies installation failed!
    pause
    exit /b 1
)

echo [4/6] Installing development dependencies...
call npm install -D @types/node @vitejs/plugin-react
if %errorlevel% neq 0 (
    echo ERROR: Dev dependencies installation failed!
    pause
    exit /b 1
)

echo [5/6] Checking package.json configuration...
if not exist package.json (
    echo ERROR: package.json not found! Run frontend prompts first.
    pause
    exit /b 1
)

echo [6/6] Starting development server...
echo.
echo ========================================
echo   Frontend starting on localhost:3000
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause