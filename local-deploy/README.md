# 🚀 LOCAL DEPLOYMENT SYSTEM

## 📋 **OVERVIEW**

This folder contains comprehensive deployment guides for all components of the Dental Clinic Management System. Each service has its own dedicated deployment guide with step-by-step instructions, troubleshooting, and health checks.

## 📁 **DEPLOYMENT GUIDES**

| Service | Auto Deploy | Guide | Description | Port |
|---------|-------------|-------|-------------|------|
| **Frontend** | [`deploy-frontend.bat`](frontend/deploy-frontend.bat) | [`deploy-frontend.md`](frontend/deploy-frontend.md) | React + TailAdmin + Vite local setup | 3000 |
| **Backend** | [`deploy-backend.bat`](backend/deploy-backend.bat) | [`deploy-backend.md`](backend/deploy-backend.md) | Spring Boot + H2 local setup | 8080 |
| **AI Service** | [`deploy-ai-service.bat`](ai-service/deploy-ai-service.bat) | [`deploy-ai-service.md`](ai-service/deploy-ai-service.md) | FastAPI + ChromaDB local setup | 8000 |
| **All Services** | [`start-all-services.bat`](start-all-services.bat) | - | Start all services at once | - |

## 🎯 **QUICK START FOR AGENTS**

### **🚀 One-Click Deployment (Recommended):**
```batch
# Start all services at once
local-deploy/start-all-services.bat
```

### **📋 Individual Service Deployment:**
```batch
# Deploy individual services
local-deploy/frontend/deploy-frontend.bat
local-deploy/backend/deploy-backend.bat
local-deploy/ai-service/deploy-ai-service.bat
```

### **✅ Prerequisites Check:**
```bash
# Node.js 18+ for Frontend
node --version

# Java 17+ for Backend  
java --version

# Python 3.9+ for AI Service
python --version
```

### **🌐 Local Service URLs:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **AI Service**: http://localhost:8000/docs
- **H2 Console**: http://localhost:8080/api/h2-console

## 🔧 **COMMON LOCAL DEPLOYMENT ISSUES**

### **Port Conflicts:**
```batch
# Kill processes using ports
taskkill /f /im node.exe
taskkill /f /im java.exe
taskkill /f /im python.exe

# Or restart the respective .bat files which handle port conflicts
```

### **Service Not Starting:**
```batch
# Check if .bat files have proper permissions
# Run as Administrator if needed

# Check individual service logs in the opened command windows
```

### **Dependencies Issues:**
```batch
# For Frontend: Delete node_modules and reinstall
rmdir /s frontend\node_modules
del frontend\package-lock.json

# For AI Service: Recreate virtual environment
rmdir /s ai-service\venv
```

## 📊 **SYSTEM ARCHITECTURE**

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───▶│   Backend   │───▶│  Database   │
│ (React:3000)│    │(Spring:8080)│    │(H2/Postgres)│
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │
       │            ┌─────────────┐
       └───────────▶│ AI Service  │
                    │(FastAPI:8000)│
                    └─────────────┘
```

## 🚀 **INTEGRATION WITH DEVELOPMENT PROMPTS**

This deployment system is fully integrated with the main `DENTAL_CLINIC_DEVELOPMENT_PROMPTS.md` file:

- **Automatic References**: Key prompts automatically reference these guides
- **Agent Integration**: AI agents can use these guides when deployment issues arise
- **Live Updates**: Any changes to deployment process are reflected immediately
- **No External Tools**: Everything is self-contained in the main system

## 📝 **MAINTENANCE**

### **Update Deployment Guides:**
1. Edit the appropriate `.md` file in the respective folder
2. Changes are automatically available to all development prompts
3. No need to update multiple locations

### **Add New Services:**
1. Create new folder under `local-deploy/`
2. Add `deploy-{service}.md` file
3. Update auto-categorization rules in main prompts file
4. Add deployment reference to relevant prompts

## 🎯 **BENEFITS**

✅ **One-Stop Reference** - All deployment info in one place  
✅ **Agent-Friendly** - AI agents can resolve deployment issues independently  
✅ **Always Updated** - Single source of truth for deployment procedures  
✅ **Comprehensive** - Covers setup, troubleshooting, and health checks  
✅ **Environment-Aware** - Supports both development and production setups  

---

**🔗 INTEGRATION NOTE:** This deployment system is referenced by the main development prompts system and requires no external tools or manual intervention.