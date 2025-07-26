# 🚀 BACKEND LOCAL DEPLOYMENT GUIDE

## 📁 **TARGET LOCATION:** `backend/`

### **🎯 AUTOMATED DEPLOYMENT:**

**For Agents - Execute this command:**
```batch
# Run automated deployment script
local-deploy/backend/deploy-backend.bat
```

### **🎯 MANUAL DEPLOYMENT COMMANDS:**

```bash
# Navigate to backend directory
cd backend/

# Using Maven Wrapper (Recommended for local)
./mvnw clean install
./mvnw spring-boot:run

# Alternative: Using Maven (if installed globally)
mvn clean install
mvn spring-boot:run
```

### **📋 LOCAL ENVIRONMENT REQUIREMENTS:**

#### **1. Java (Required):**
```bash
# Check Java version (Required: Java 17 or higher for local development)
java --version

# Check JAVA_HOME
echo %JAVA_HOME%

# If not installed, download from: https://adoptium.net/
```

#### **2. Expected Maven Configuration (pom.xml):**
The automated script expects this structure in `backend/` folder:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
        <relativePath/>
    </parent>
    
    <groupId>com.dentalclinic</groupId>
    <artifactId>dental-clinic-backend</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>dental-clinic-backend</name>
    <description>Dental Clinic Management System Backend</description>
    
    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>
    
    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-websocket</artifactId>
        </dependency>
        
        <!-- Database -->
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>
        
        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.5</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.11.5</version>
            <scope>runtime</scope>
        </dependency>
        
        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

#### **3. Required Application Configuration (application.yml):**
Expected configuration for local development in `backend/src/main/resources/`:
```yaml
server:
  port: 8080
  servlet:
    context-path: /api

spring:
  application:
    name: dental-clinic-backend
    
  datasource:
    url: jdbc:h2:mem:dentalclinic
    driver-class-name: org.h2.Driver
    username: sa
    password: password
    
  h2:
    console:
      enabled: true
      path: /h2-console
      
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
        
jwt:
  secret: dGhlLWRlbnRhbC1jbGluaWMtc2VjcmV0LWtleS1mb3Itand0LXNpZ25pbmc=
  expiration: 86400000 # 24 hours

cors:
  allowed-origins: http://localhost:3000
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS
  allowed-headers: "*"
  
logging:
  level:
    com.dentalclinic: DEBUG
```

### **🗄️ LOCAL DATABASE SETUP:**

#### **H2 Database (Local Development):**
H2 runs embedded with Spring Boot - no separate installation needed.

**H2 Console Access:**
```
URL: http://localhost:8080/api/h2-console
JDBC URL: jdbc:h2:mem:dentalclinic
Username: sa
Password: password
```

### **🔧 LOCAL DEPLOYMENT TROUBLESHOOTING:**

#### **Common Local Issues & Solutions:**

1. **Port 8080 already in use:**
   ```bash
   # Use different port
   set SERVER_PORT=8081
   ./mvnw spring-boot:run
   ```

2. **Java version issues:**
   ```bash
   # Check Java version
   java --version
   
   # Set JAVA_HOME (Windows)
   set JAVA_HOME=C:\Program Files\Java\jdk-17
   ```

3. **H2 Database console not accessible:**
   ```bash
   # Check if application is running
   # Access: http://localhost:8080/api/h2-console
   ```

4. **Maven build failures:**
   ```bash
   # Clean and rebuild
   ./mvnw clean compile
   ./mvnw dependency:resolve
   ```

5. **Frontend connection issues:**
   ```yaml
   # Ensure CORS is configured in application.yml
   cors:
     allowed-origins: "http://localhost:3000"
   ```

### **📊 HEALTH CHECK:**

#### **Verify Deployment Success:**
1. ✅ Server starts on `http://localhost:8080`
2. ✅ Health endpoint: `http://localhost:8080/api/actuator/health`
3. ✅ H2 Console accessible: `http://localhost:8080/api/h2-console`
4. ✅ API endpoints respond correctly
5. ✅ No startup errors in logs
6. ✅ JWT authentication works

#### **API Health Endpoints:**
```bash
# Basic health check
curl http://localhost:8080/api/actuator/health

# Test authentication endpoint
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@clinic.com","password":"admin123"}'

# Test protected endpoint (with JWT token)
curl -X GET http://localhost:8080/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### **🌐 ACCESS URLS:**
- **API Base**: `http://localhost:8080/api`
- **H2 Console**: `http://localhost:8080/api/h2-console`
- **Health Check**: `http://localhost:8080/api/actuator/health`
- **API Documentation**: `http://localhost:8080/api/swagger-ui.html` (if Swagger configured)

### **📝 DEPLOYMENT LOGS:**
```bash
# View application logs
tail -f logs/spring.log

# Enable debug logging
LOGGING_LEVEL_COM_DENTALCLINIC=DEBUG ./mvnw spring-boot:run

# Profile-specific startup
./mvnw spring-boot:run -Dspring.profiles.active=dev
```

### **🔄 HOT RELOAD:**
```bash
# Enable dev tools for hot reload
# Add to pom.xml dependencies:
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
    <optional>true</optional>
</dependency>

# Run with dev profile
./mvnw spring-boot:run -Dspring.profiles.active=dev
```

### **🧪 TESTING:**
```bash
# Run all tests
./mvnw test

# Run specific test class
./mvnw test -Dtest=UserServiceTest

# Run tests with coverage
./mvnw test jacoco:report
```

---

**🎯 INTEGRATION NOTE:** This file is automatically referenced by deployment prompts in the main development system. Any updates to the backend deployment process should be reflected here.