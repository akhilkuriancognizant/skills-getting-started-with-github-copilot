# 🚀 LOCAL DEPLOYMENT SYSTEM

## 📋 **OVERVIEW**

This folder contains comprehensive deployment guides for all components of the Dental Clinic Management System. Each service has its own dedicated deployment guide with step-by-step instructions, troubleshooting, and health checks.

## 📁 **DEPLOYMENT GUIDES**

| Service | Guide | Description | Port |
|---------|-------|-------------|------|
| **Frontend** | [`deploy-frontend.md`](frontend/deploy-frontend.md) | React + TailAdmin + Vite setup | 3000 |
| **Backend** | [`deploy-backend.md`](backend/deploy-backend.md) | Spring Boot + H2/PostgreSQL setup | 8080 |
| **AI Service** | [`deploy-ai-service.md`](ai-service/deploy-ai-service.md) | FastAPI + ChromaDB + OpenAI setup | 8000 |
| **Database** | [`deploy-database.md`](db/deploy-database.md) | H2 (dev) + PostgreSQL (prod) setup | 5432 |

## 🎯 **QUICK START**

### **1. Prerequisites Check:**
```bash
# Node.js 18+ for Frontend
node --version

# Java 17+ for Backend  
java --version

# Python 3.9+ for AI Service
python --version

# PostgreSQL (optional, for production)
psql --version
```

### **2. Sequential Deployment:**
```bash
# 1. Start Backend (Database included)
cd backend/
./mvnw spring-boot:run

# 2. Start AI Service
cd ai-service/
source venv/bin/activate
uvicorn app.main:app --reload

# 3. Start Frontend
cd frontend/
npm run dev
```

### **3. Health Check URLs:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **AI Service**: http://localhost:8000/docs
- **H2 Console**: http://localhost:8080/api/h2-console

## 🔧 **COMMON ISSUES & SOLUTIONS**

### **Port Conflicts:**
```bash
# Frontend
npm run dev -- --port 3001

# Backend
SERVER_PORT=8081 ./mvnw spring-boot:run

# AI Service
uvicorn app.main:app --port 8001
```

### **Database Issues:**
```bash
# Reset H2 Database
# Simply restart Spring Boot application

# PostgreSQL Connection
sudo systemctl restart postgresql
```

### **Node.js Issues:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
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