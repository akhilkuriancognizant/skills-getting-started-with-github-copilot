#!/usr/bin/env node

/**
 * DENTAL CLINIC PROMPT TRACKER GENERATOR
 * 
 * This script automatically creates prompt tracking files in the correct
 * category folders based on the prompt content.
 * 
 * Usage: node generate-prompt-tracker.js [prompt-number] [prompt-title]
 * Example: node generate-prompt-tracker.js 17 "Create TailAdmin Login Page"
 */

const fs = require('fs');
const path = require('path');

// Get current date in YYYY-MM-DD format
function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

// Convert title to kebab-case
function toKebabCase(title) {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/--+/g, '-')     // Replace multiple hyphens with single
        .trim();
}

// Determine category based on prompt content and title
function categorizePrompt(promptNumber, title, content = '') {
    const titleLower = title.toLowerCase();
    const contentLower = content.toLowerCase();
    
    // Frontend prompts
    if (titleLower.includes('react') || 
        titleLower.includes('component') || 
        titleLower.includes('tailadmin') ||
        titleLower.includes('frontend') ||
        titleLower.includes('ui') ||
        titleLower.includes('page') ||
        titleLower.includes('modal') ||
        titleLower.includes('chart') ||
        titleLower.includes('login') ||
        titleLower.includes('dashboard') ||
        titleLower.includes('interface') ||
        titleLower.includes('chat') ||
        contentLower.includes('frontend/') ||
        contentLower.includes('.tsx') ||
        contentLower.includes('.ts') ||
        contentLower.includes('react')) {
        return 'frontend';
    }
    
    // Backend prompts  
    if (titleLower.includes('spring') ||
        titleLower.includes('controller') ||
        titleLower.includes('service') ||
        titleLower.includes('repository') ||
        titleLower.includes('backend') ||
        titleLower.includes('entity') ||
        titleLower.includes('api') ||
        titleLower.includes('security') ||
        titleLower.includes('auth') ||
        titleLower.includes('jwt') ||
        contentLower.includes('backend/') ||
        contentLower.includes('.java') ||
        contentLower.includes('spring boot')) {
        return 'backend';
    }
    
    // AI Service prompts
    if (titleLower.includes('ai') ||
        titleLower.includes('fastapi') ||
        titleLower.includes('python') ||
        titleLower.includes('chromadb') ||
        titleLower.includes('suggestion') ||
        titleLower.includes('knowledge') ||
        contentLower.includes('ai-service/') ||
        contentLower.includes('.py') ||
        contentLower.includes('fastapi')) {
        return 'ai-service';
    }
    
    // Database prompts
    if (titleLower.includes('database') ||
        titleLower.includes('entity') ||
        titleLower.includes('schema') ||
        titleLower.includes('migration') ||
        titleLower.includes('h2') ||
        titleLower.includes('sql') ||
        contentLower.includes('database') ||
        contentLower.includes('schema') ||
        contentLower.includes('table') ||
        contentLower.includes('sql')) {
        return 'db-query';
    }
    
    // Everything else goes to other-prompts
    return 'other-prompts';
}

// Generate the markdown template
function generateTemplate(promptNumber, title, category, originalPrompt = '') {
    const date = new Date().toISOString().slice(0, 16).replace('T', ' ');
    
    return `# Prompt ${promptNumber}: ${title}

## 🎯 **PROMPT EXECUTED**
**Date:** ${date}  
**Agent Used:** [Cursor / GitHub Copilot]  
**Estimated Time:** [X] minutes  

## 📋 **ORIGINAL PROMPT**
\`\`\`
${originalPrompt || '[Paste the exact prompt given to agent here]'}
\`\`\`

## ✅ **EXECUTION RESULTS**

### **Files Created/Modified:**
- ✅ \`path/to/file1\` - Description
- ✅ \`path/to/file2\` - Description
- ❌ \`path/to/failed-file\` - Error description (if any)

### **Code Generated:**
- **Lines of Code:** [XXX]
- **Success Rate:** [XX]% (first try)
- **Iterations Needed:** [X]

### **Issues Encountered:**
- Issue 1: Description and resolution
- Issue 2: Description and resolution

### **Agent Performance:**
- **Generation Speed:** [Fast/Medium/Slow]
- **Code Quality:** [Excellent/Good/Fair/Poor]
- **Accuracy:** [XX]%

## 🔧 **TECHNICAL DETAILS**

### **Dependencies Added:**
${category === 'frontend' ? '- package.json: new-dependency@version' : 
  category === 'backend' ? '- pom.xml: spring-boot-starter-xyz' :
  category === 'ai-service' ? '- requirements.txt: new-package==version' : '- [List any new dependencies]'}

### **Configuration Changes:**
- [List configuration file changes]

### **Database Changes:** ${category === 'db-query' ? '(PRIMARY FOCUS)' : '(if applicable)'}
${category === 'db-query' ? `- Schema: [New tables/columns added]
- Data: [Sample data inserted]
- Relationships: [Foreign keys created]
- Indexes: [Performance indexes added]` : '- [Any database-related changes]'}

## 📝 **NOTES & OBSERVATIONS**

### **What Worked Well:**
- [What the agent did correctly]
- [Positive observations]

### **Areas for Improvement:**
- [What needed manual fixes]
- [Suggestions for better prompts]

### **Next Steps:**
- [Follow-up tasks]
- [Integration requirements]

## 🎨 **STYLING & UI NOTES**${category === 'frontend' ? ' (PRIMARY FOCUS)' : ''}

### **TailAdmin Integration:**
${category === 'frontend' ? `- ✅/❌ Proper theme classes applied
- ✅/❌ Medical color palette used
- ✅/❌ Responsive design implemented` : '- N/A for non-frontend prompts'}

### **Medical UI Standards:**
${category === 'frontend' ? `- ✅/❌ WCAG compliance achieved
- ✅/❌ Professional healthcare styling
- ✅/❌ Touch targets appropriate for medical gloves` : '- N/A for non-frontend prompts'}

## 🔄 **FOLLOW-UP ACTIONS**
- [ ] Test functionality
- [ ] Code review completed
- [ ] Integration testing
- [ ] Medical compliance review${category === 'db-query' ? '\n- [ ] Database performance testing\n- [ ] Data validation checks' : ''}`;
}

// Create directory structure
function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// Main function
function generatePromptTracker(promptNumber, title, originalPrompt = '') {
    const currentDate = getCurrentDate();
    const category = categorizePrompt(promptNumber, title, originalPrompt);
    const fileName = `Prompt-${promptNumber.toString().padStart(2, '0')}-${toKebabCase(title)}.md`;
    
    // Create directory path
    const dirPath = path.join('prompts-history', category, currentDate);
    ensureDirectoryExists(dirPath);
    
    // Generate file content
    const content = generateTemplate(promptNumber, title, category, originalPrompt);
    
    // Write file
    const filePath = path.join(dirPath, fileName);
    fs.writeFileSync(filePath, content);
    
    console.log(`✅ Generated prompt tracker:`);
    console.log(`   📁 Category: ${category}`);
    console.log(`   📄 File: ${filePath}`);
    console.log(`   📅 Date: ${currentDate}`);
    
    return filePath;
}

// CLI usage
if (require.main === module) {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log(`
🏥 DENTAL CLINIC PROMPT TRACKER GENERATOR

Usage: node generate-prompt-tracker.js [prompt-number] [prompt-title] [original-prompt]

Examples:
  node generate-prompt-tracker.js 1 "Create Backend Spring Boot Project"
  node generate-prompt-tracker.js 17 "Create TailAdmin Login Page"
  node generate-prompt-tracker.js 59 "Setup AI Service Project"

Categories (auto-detected):
  📱 frontend/    - React, components, TailAdmin, UI
  🔧 backend/     - Spring Boot, controllers, services
  🤖 ai-service/  - FastAPI, Python, AI features
  🗄️  db-query/   - Database, schema, entities
  📋 other-prompts/ - Configuration, themes, routing

Output: prompts-history/[category]/[date]/Prompt-[XX]-[Title].md
        `);
        process.exit(1);
    }
    
    const promptNumber = parseInt(args[0]);
    const title = args[1];
    const originalPrompt = args[2] || '';
    
    if (isNaN(promptNumber) || promptNumber < 1 || promptNumber > 100) {
        console.error('❌ Error: Prompt number must be between 1 and 100');
        process.exit(1);
    }
    
    try {
        generatePromptTracker(promptNumber, title, originalPrompt);
        console.log('\n🎉 Ready to track your prompt execution!');
        console.log('📝 Edit the file to record your results after running the prompt.');
    } catch (error) {
        console.error('❌ Error generating prompt tracker:', error.message);
        process.exit(1);
    }
}

module.exports = { generatePromptTracker, categorizePrompt, toKebabCase };