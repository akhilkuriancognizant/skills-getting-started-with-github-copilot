# 🚀 FRONTEND LOCAL DEPLOYMENT GUIDE

## 📁 **TARGET LOCATION:** `frontend/`

### **🎯 AUTOMATED DEPLOYMENT:**

**For Agents - Execute this command:**
```batch
# Run automated deployment script
local-deploy/frontend/deploy-frontend.bat
```

### **🎯 MANUAL DEPLOYMENT COMMANDS:**

```bash
# Navigate to frontend directory
cd frontend/

# Install dependencies
npm install

# Install TailAdmin specific dependencies
npm install @headlessui/react @heroicons/react recharts axios react-router-dom

# Install development dependencies
npm install -D @types/node @vitejs/plugin-react

# Start local development server
npm run dev
```

### **📋 LOCAL ENVIRONMENT REQUIREMENTS:**

#### **1. Node.js (Required):**
```bash
# Check Node.js version (Required: 18.x or higher for local development)
node --version

# If not installed, download from: https://nodejs.org/
```

#### **2. Expected Package.json Structure:**
The automated script expects this package.json structure in `frontend/` folder:
```json
{
  "name": "dental-clinic-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 3000",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "@headlessui/react": "^1.7.0",
    "@heroicons/react": "^2.0.0",
    "recharts": "^2.5.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "@vitejs/plugin-react": "^3.1.0",
    "typescript": "^4.9.0",
    "vite": "^4.1.0",
    "tailwindcss": "^3.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

#### **3. Required Vite Configuration (vite.config.ts):**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
```

### **🎨 REQUIRED TAILWIND CSS SETUP:**

#### **Expected tailwind.config.js (auto-created by prompts):**
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // TailAdmin Colors
        primary: '#3C50E0',
        secondary: '#10B981', 
        accent: '#06B6D4',
        // Medical Grade Colors
        'medical-blue': '#2E86AB',
        'medical-green': '#8FBC8F',
        'medical-red': '#FF6B6B',
        // TailAdmin Extended
        'boxdark': '#24303F',
        'bodydark': '#AEB7C0',
        'stroke': '#E2E8F0'
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
}
```

### **🔧 LOCAL DEPLOYMENT TROUBLESHOOTING:**

#### **Common Local Issues & Solutions:**

1. **Port 3000 already in use:**
   ```bash
   # Kill process using port 3000
   npx kill-port 3000
   # Or use different port
   npm run dev -- --port 3001
   ```

2. **Node modules issues:**
   ```bash
   # Clear node_modules and reinstall
   rmdir /s node_modules
   del package-lock.json
   npm install
   ```

3. **TailwindCSS not loading:**
   ```bash
   # Restart the dev server
   # Press Ctrl+C and run npm run dev again
   ```

4. **TypeScript compilation errors:**
   ```bash
   # Check for TypeScript errors
   npx tsc --noEmit
   ```

### **📊 LOCAL DEPLOYMENT VERIFICATION:**

#### **Check if Frontend is Running Successfully:**
1. ✅ Server starts on `http://localhost:3000`
2. ✅ TailAdmin styles load correctly
3. ✅ API calls reach backend at `localhost:8080`
4. ✅ Dark/Light theme toggle works
5. ✅ No console errors in browser
6. ✅ All pages route correctly

### **🌐 LOCAL ACCESS URLS:**
- **Local Development**: `http://localhost:3000`
- **Network Access**: `http://[YOUR_LOCAL_IP]:3000`

### **📝 LOCAL DEPLOYMENT LOGS:**
```bash
# View detailed Vite logs
npm run dev -- --debug

# Check for TypeScript errors
npx tsc --noEmit
```

---

**🎯 INTEGRATION NOTE:** This file is automatically referenced by deployment prompts in the main development system. Any updates to the frontend deployment process should be reflected here.