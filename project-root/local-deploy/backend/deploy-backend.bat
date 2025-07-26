@echo off
echo ===========================================
echo   DENTAL CLINIC - BACKEND LOCAL DEPLOY
echo ===========================================

cd /d "%~dp0"
cd ..\..\backend

echo [1/6] Checking Java installation...
java --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java not found! Please install Java 17+ from https://adoptium.net/
    pause
    exit /b 1
)

echo [2/6] Checking Maven wrapper...
if not exist mvnw.cmd (
    echo ERROR: Maven wrapper not found! Run backend setup prompts first.
    pause
    exit /b 1
)

echo [3/6] Cleaning previous build...
call mvnw.cmd clean
if %errorlevel% neq 0 (
    echo ERROR: Maven clean failed!
    pause
    exit /b 1
)

echo [4/6] Installing dependencies and building...
call mvnw.cmd install -DskipTests
if %errorlevel% neq 0 (
    echo ERROR: Maven install failed!
    pause
    exit /b 1
)

echo [5/6] Checking application configuration...
if not exist src\main\resources\application.yml (
    echo ERROR: application.yml not found! Run backend configuration prompts first.
    pause
    exit /b 1
)

echo [6/6] Starting Spring Boot application...
echo.
echo ==========================================
echo   Backend starting on localhost:8080
echo   H2 Console: localhost:8080/api/h2-console
echo ==========================================
echo.
echo Press Ctrl+C to stop the server
echo.

call mvnw.cmd spring-boot:run

pause