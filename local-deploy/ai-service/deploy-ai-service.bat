@echo off
echo ===========================================
echo   DENTAL CLINIC - AI SERVICE LOCAL DEPLOY
echo ===========================================

cd /d "%~dp0"
cd ..\..\ai-service

echo [1/7] Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python not found! Please install Python 3.9+ from https://python.org/
    pause
    exit /b 1
)

echo [2/7] Creating virtual environment...
if not exist venv (
    python -m venv venv
    if %errorlevel% neq 0 (
        echo ERROR: Failed to create virtual environment!
        pause
        exit /b 1
    )
)

echo [3/7] Activating virtual environment...
call venv\Scripts\activate.bat
if %errorlevel% neq 0 (
    echo ERROR: Failed to activate virtual environment!
    pause
    exit /b 1
)

echo [4/7] Checking requirements.txt...
if not exist requirements.txt (
    echo ERROR: requirements.txt not found! Run AI service setup prompts first.
    pause
    exit /b 1
)

echo [5/7] Installing Python dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo ERROR: pip install failed!
    pause
    exit /b 1
)

echo [6/7] Checking application structure...
if not exist app\main.py (
    echo ERROR: app/main.py not found! Run AI service prompts first.
    pause
    exit /b 1
)

echo [7/7] Starting FastAPI server...
echo.
echo ==========================================
echo   AI Service starting on localhost:8000
echo   API Docs: localhost:8000/docs
echo ==========================================
echo.
echo Press Ctrl+C to stop the server
echo.

uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

pause