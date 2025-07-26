# 🚀 AI SERVICE LOCAL DEPLOYMENT GUIDE

## 📁 **TARGET LOCATION:** `ai-service/`

### **🎯 AUTOMATED DEPLOYMENT:**

**For Agents - Execute this command:**
```batch
# Run automated deployment script
project-root/local-deploy/ai-service/deploy-ai-service.bat
```

### **🎯 MANUAL DEPLOYMENT COMMANDS:**

```bash
# Navigate to ai-service directory
cd ai-service/

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Linux/macOS:
source venv/bin/activate
# Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start FastAPI server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Alternative with Python
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### **📋 REQUIRED ENVIRONMENT SETUP:**

#### **1. Python Version:**
```bash
# Check Python version (Required: Python 3.9 or higher)
python --version
python3 --version

# If not installed, download from: https://python.org/
# Or use pyenv for version management:
pyenv install 3.11.0
pyenv local 3.11.0
```

#### **2. Requirements File (requirements.txt):**
```txt
# FastAPI and Server
fastapi==0.104.1
uvicorn[standard]==0.24.0
pydantic==2.5.0
pydantic-settings==2.1.0

# AI and ML Libraries
chromadb==0.4.18
langchain==0.0.350
langchain-openai==0.0.2
openai==1.3.7
sentence-transformers==2.2.2
transformers==4.35.2
torch==2.1.1

# HTTP and Async
httpx==0.25.2
aiofiles==23.2.1
requests==2.31.0

# Data Processing
pandas==2.1.4
numpy==1.25.2
python-multipart==0.0.6

# Environment and Config
python-dotenv==1.0.0
PyYAML==6.0.1

# Development and Testing
pytest==7.4.3
pytest-asyncio==0.21.1
black==23.11.0
flake8==6.1.0
```

#### **3. Environment Configuration (.env):**
```bash
# AI Service Configuration
AI_SERVICE_HOST=0.0.0.0
AI_SERVICE_PORT=8000
AI_SERVICE_DEBUG=true

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-3.5-turbo
OPENAI_MAX_TOKENS=1000

# ChromaDB Configuration
CHROMA_DB_PATH=./data/chroma_db
CHROMA_COLLECTION_NAME=dental_knowledge
CHROMA_PERSIST_DIRECTORY=./data/chroma_persist

# Medical Knowledge Sources
MEDICAL_API_BASE_URL=https://api.medical.example.com
MEDICAL_API_KEY=your_medical_api_key_here

# Backend Integration
BACKEND_API_URL=http://localhost:8080/api
BACKEND_API_KEY=your_backend_api_key_here

# Logging
LOG_LEVEL=DEBUG
LOG_FILE=./logs/ai_service.log

# Security
SECRET_KEY=your-super-secret-key-for-ai-service
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Performance
MAX_WORKERS=4
BATCH_SIZE=10
CACHE_TTL=3600
```

#### **4. FastAPI Application Structure:**
```python
# app/main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Dental Clinic AI Service",
    description="AI-powered suggestions and knowledge base for dental clinic",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
from app.api import clinic_suggestions, web_suggestions, health

app.include_router(clinic_suggestions.router, prefix="/api/ai", tags=["clinic"])
app.include_router(web_suggestions.router, prefix="/api/ai", tags=["web"])
app.include_router(health.router, prefix="/api", tags=["health"])

@app.get("/")
async def root():
    return {"message": "Dental Clinic AI Service is running!"}

if __name__ == "__main__":
    uvicorn.run(
        "app.main:app",
        host=os.getenv("AI_SERVICE_HOST", "0.0.0.0"),
        port=int(os.getenv("AI_SERVICE_PORT", 8000)),
        reload=os.getenv("AI_SERVICE_DEBUG", "false").lower() == "true"
    )
```

### **🗄️ CHROMADB SETUP:**

#### **ChromaDB Configuration:**
```python
# app/services/chroma_service.py
import chromadb
from chromadb.config import Settings
import os
from typing import List, Dict, Any

class ChromaDBService:
    def __init__(self):
        persist_directory = os.getenv("CHROMA_PERSIST_DIRECTORY", "./data/chroma_persist")
        
        self.client = chromadb.PersistentClient(
            path=persist_directory,
            settings=Settings(
                allow_reset=True,
                anonymized_telemetry=False
            )
        )
        
        collection_name = os.getenv("CHROMA_COLLECTION_NAME", "dental_knowledge")
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine"}
        )
    
    async def add_documents(self, documents: List[str], metadata: List[Dict[str, Any]], ids: List[str]):
        """Add documents to the knowledge base"""
        self.collection.add(
            documents=documents,
            metadatas=metadata,
            ids=ids
        )
    
    async def search_similar(self, query: str, n_results: int = 5) -> List[Dict[str, Any]]:
        """Search for similar documents"""
        results = self.collection.query(
            query_texts=[query],
            n_results=n_results
        )
        return results
```

#### **Initialize ChromaDB:**
```bash
# Create data directories
mkdir -p data/chroma_persist
mkdir -p data/chroma_db
mkdir -p logs

# Initialize with sample medical data
python scripts/init_knowledge_base.py
```

### **🤖 OPENAI SETUP:**

#### **OpenAI Service Configuration:**
```python
# app/services/openai_service.py
import openai
import os
from typing import List, Dict, Any
from dotenv import load_dotenv

load_dotenv()

class OpenAIService:
    def __init__(self):
        openai.api_key = os.getenv("OPENAI_API_KEY")
        self.model = os.getenv("OPENAI_MODEL", "gpt-3.5-turbo")
        self.max_tokens = int(os.getenv("OPENAI_MAX_TOKENS", 1000))
    
    async def generate_suggestions(self, prompt: str, context: List[str] = None) -> str:
        """Generate AI suggestions based on prompt and context"""
        try:
            messages = [
                {"role": "system", "content": "You are a medical AI assistant for dental clinic management."},
                {"role": "user", "content": prompt}
            ]
            
            if context:
                context_str = "\n".join(context)
                messages.insert(1, {"role": "system", "content": f"Context: {context_str}"})
            
            response = await openai.ChatCompletion.acreate(
                model=self.model,
                messages=messages,
                max_tokens=self.max_tokens,
                temperature=0.7
            )
            
            return response.choices[0].message.content
            
        except Exception as e:
            raise HTTPException(status_code=500, f"OpenAI API error: {str(e)}")
```

### **🔧 TROUBLESHOOTING:**

#### **Common Issues & Solutions:**

1. **Python version compatibility:**
   ```bash
   # Check Python version
   python --version
   
   # Use specific Python version
   python3.9 -m venv venv
   ```

2. **ChromaDB installation issues:**
   ```bash
   # Install with specific versions
   pip install chromadb==0.4.18 --no-cache-dir
   
   # Clear pip cache if needed
   pip cache purge
   ```

3. **OpenAI API key issues:**
   ```bash
   # Verify API key is set
   echo $OPENAI_API_KEY
   
   # Test API key
   curl -H "Authorization: Bearer $OPENAI_API_KEY" https://api.openai.com/v1/models
   ```

4. **Port conflicts:**
   ```bash
   # Use different port
   uvicorn app.main:app --port 8001
   
   # Kill process on port
   lsof -ti:8000 | xargs kill -9
   ```

5. **Memory issues with ML models:**
   ```bash
   # Increase virtual memory (Linux)
   sudo sysctl vm.max_map_count=262144
   
   # Use smaller models
   export TRANSFORMERS_CACHE=./models/cache
   ```

### **📊 HEALTH CHECK:**

#### **Verify Deployment Success:**
1. ✅ Server starts on `http://localhost:8000`
2. ✅ FastAPI docs accessible: `http://localhost:8000/docs`
3. ✅ ChromaDB initializes successfully
4. ✅ OpenAI API connection works
5. ✅ No startup errors in logs
6. ✅ API endpoints respond correctly

#### **API Health Endpoints:**
```bash
# Basic health check
curl http://localhost:8000/api/health

# Test clinic suggestions
curl -X POST http://localhost:8000/api/ai/clinic-suggestions \
  -H "Content-Type: application/json" \
  -d '{"query":"tooth pain treatment","patient_id":"123"}'

# Test web suggestions
curl -X POST http://localhost:8000/api/ai/web-suggestions \
  -H "Content-Type: application/json" \
  -d '{"query":"dental crown procedure"}'

# Check ChromaDB status
curl http://localhost:8000/api/ai/knowledge-base/status
```

### **🌐 ACCESS URLS:**
- **API Base**: `http://localhost:8000`
- **API Documentation**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`
- **Health Check**: `http://localhost:8000/api/health`

### **📝 DEPLOYMENT LOGS:**
```bash
# View application logs
tail -f logs/ai_service.log

# Enable debug logging
LOG_LEVEL=DEBUG uvicorn app.main:app --reload

# Monitor ChromaDB logs
tail -f data/chroma_persist/chroma.log
```

### **🔄 HOT RELOAD:**
```bash
# Enable auto-reload for development
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Watch for file changes
watchmedo auto-restart --patterns="*.py" --recursive uvicorn app.main:app
```

### **🧪 TESTING:**
```bash
# Run all tests
pytest

# Run specific test file
pytest tests/test_clinic_suggestions.py

# Run tests with coverage
pytest --cov=app tests/

# Load test the API
ab -n 100 -c 10 http://localhost:8000/api/health
```

### **📚 KNOWLEDGE BASE MANAGEMENT:**
```bash
# Initialize knowledge base with medical data
python scripts/init_knowledge_base.py

# Update knowledge base
python scripts/update_knowledge_base.py

# Backup knowledge base
python scripts/backup_knowledge_base.py

# Import external medical data
python scripts/import_medical_data.py --source="medical_guidelines.json"
```

### **🔐 SECURITY CONSIDERATIONS:**
```bash
# Generate secure secret key
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Set up API key authentication
export AI_SERVICE_API_KEY="your-secure-api-key"

# Enable HTTPS for production
uvicorn app.main:app --ssl-keyfile=./ssl/key.pem --ssl-certfile=./ssl/cert.pem
```

---

**🎯 INTEGRATION NOTE:** This file is automatically referenced by deployment prompts in the main development system. Any updates to the AI service deployment process should be reflected here.