# 🚀 FRONTEND LOCAL DEPLOYMENT GUIDE

## 📁 **TARGET LOCATION:** `frontend/`

### **🎯 DEPLOYMENT COMMANDS:**

```bash
# Navigate to frontend directory
cd frontend/

# Install dependencies
npm install

# Install TailAdmin specific dependencies
npm install @headlessui/react @heroicons/react recharts axios react-router-dom

# Install development dependencies
npm install -D @types/node @vitejs/plugin-react

# Start development server
npm run dev

# Build for production (optional)
npm run build

# Preview production build (optional)
npm run preview
```

### **📋 REQUIRED ENVIRONMENT SETUP:**

#### **1. Node.js Version:**
```bash
# Check Node.js version (Required: 18.x or higher)
node --version

# If not installed, download from: https://nodejs.org/
```

#### **2. Package.json Verification:**
```json
{
  "name": "dental-clinic-frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 3000",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview --port 3000"
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
    "@typescript-eslint/eslint-plugin": "^5.0.0",
    "@typescript-eslint/parser": "^5.0.0",
    "@vitejs/plugin-react": "^3.1.0",
    "typescript": "^4.9.0",
    "vite": "^4.1.0",
    "tailwindcss": "^3.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

#### **3. Vite Configuration (vite.config.ts):**
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
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### **🎨 TAILWIND CSS SETUP:**

#### **tailwind.config.js:**
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

### **🔧 TROUBLESHOOTING:**

#### **Common Issues & Solutions:**

1. **Port 3000 already in use:**
   ```bash
   # Use different port
   npm run dev -- --port 3001
   ```

2. **Module not found errors:**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TailwindCSS not working:**
   ```bash
   # Ensure Tailwind is properly configured
   npx tailwindcss init -p
   ```

4. **TypeScript errors:**
   ```bash
   # Check TypeScript configuration
   npx tsc --noEmit
   ```

### **📊 HEALTH CHECK:**

#### **Verify Deployment Success:**
1. ✅ Server starts on `http://localhost:3000`
2. ✅ TailAdmin styles load correctly
3. ✅ API calls reach backend at `localhost:8080`
4. ✅ Dark/Light theme toggle works
5. ✅ No console errors in browser
6. ✅ All pages route correctly

#### **Performance Checks:**
```bash
# Bundle size analysis
npm run build
npx vite-bundle-analyzer dist

# Development server performance
npm run dev -- --debug
```

### **🌐 ACCESS URLS:**
- **Development**: `http://localhost:3000`
- **Production Preview**: `http://localhost:3000` (after `npm run preview`)
- **Network Access**: `http://[YOUR_IP]:3000`

### **📝 DEPLOYMENT LOGS:**
```bash
# Enable verbose logging
DEBUG=vite:* npm run dev

# Check build output
npm run build 2>&1 | tee build.log
```

---

**🎯 INTEGRATION NOTE:** This file is automatically referenced by deployment prompts in the main development system. Any updates to the frontend deployment process should be reflected here.