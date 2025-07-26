# 🚀 DATABASE LOCAL DEPLOYMENT GUIDE

## 📁 **TARGET LOCATION:** `db/`

### **🎯 DEPLOYMENT COMMANDS:**

#### **H2 Database (Development):**
```bash
# H2 runs embedded with Spring Boot - no separate setup needed
# Access H2 Console through Spring Boot application:
# http://localhost:8080/api/h2-console

# For standalone H2 server (optional):
cd db/
java -cp h2*.jar org.h2.tools.Server -web -webAllowOthers -tcp -tcpAllowOthers -ifNotExists
```

#### **PostgreSQL Database (Production):**
```bash
# Ubuntu/Debian Installation
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS Installation (using Homebrew)
brew install postgresql
brew services start postgresql

# Windows Installation
# Download from: https://www.postgresql.org/download/windows/

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Initialize database
sudo -u postgres initdb /var/lib/postgres/data
```

### **📋 H2 DATABASE SETUP (DEVELOPMENT):**

#### **1. H2 Configuration in Spring Boot:**
```yaml
# application.yml (already configured in backend)
spring:
  datasource:
    url: jdbc:h2:mem:dentalclinic
    driver-class-name: org.h2.Driver
    username: sa
    password: password
    
  h2:
    console:
      enabled: true
      path: /h2-console
      settings:
        web-allow-others: true
        
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true
    database-platform: org.hibernate.dialect.H2Dialect
```

#### **2. H2 Database Scripts (db/h2/):**

**Initial Schema (db/h2/schema.sql):**
```sql
-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Patients Table
CREATE TABLE IF NOT EXISTS patients (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    date_of_birth DATE,
    address TEXT,
    assigned_doctor_id BIGINT,
    allergies TEXT,
    medical_conditions TEXT,
    emergency_contact VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assigned_doctor_id) REFERENCES users(id)
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    appointment_date_time TIMESTAMP NOT NULL,
    appointment_type VARCHAR(100),
    status VARCHAR(20) DEFAULT 'SCHEDULED',
    notes TEXT,
    duration_minutes INTEGER DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES users(id)
);

-- Treatments Table
CREATE TABLE IF NOT EXISTS treatments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    appointment_id BIGINT,
    treatment_date DATE NOT NULL,
    symptoms TEXT,
    diagnosis TEXT,
    procedure_name VARCHAR(255),
    treatment_notes TEXT,
    medications TEXT,
    labor_cost DECIMAL(10,2),
    material_cost DECIMAL(10,2),
    total_cost DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id) REFERENCES users(id),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);

-- Medicine Inventory Table
CREATE TABLE IF NOT EXISTS medicines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    quantity INTEGER DEFAULT 0,
    unit_price DECIMAL(10,2),
    expiry_date DATE,
    supplier VARCHAR(255),
    min_stock_level INTEGER DEFAULT 10,
    batch_number VARCHAR(100),
    manufacturer VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE,
    subtotal DECIMAL(10,2) DEFAULT 0.00,
    tax_amount DECIMAL(10,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) DEFAULT 0.00,
    paid_amount DECIMAL(10,2) DEFAULT 0.00,
    payment_method VARCHAR(50),
    payment_date DATE,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Chat Messages Table (for AI chat feature)
CREATE TABLE IF NOT EXISTS chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    patient_id BIGINT,
    message_text TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'USER', -- USER, AI, SYSTEM
    suggestion_type VARCHAR(20), -- WEB, CLINIC
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attachments TEXT, -- JSON array of file paths
    FOREIGN KEY (doctor_id) REFERENCES users(id),
    FOREIGN KEY (patient_id) REFERENCES patients(id)
);

-- Create Indexes for Performance
CREATE INDEX idx_patients_doctor ON patients(assigned_doctor_id);
CREATE INDEX idx_appointments_doctor_date ON appointments(doctor_id, appointment_date_time);
CREATE INDEX idx_appointments_patient ON appointments(patient_id);
CREATE INDEX idx_treatments_patient ON treatments(patient_id);
CREATE INDEX idx_treatments_doctor ON treatments(doctor_id);
CREATE INDEX idx_invoices_patient ON invoices(patient_id);
CREATE INDEX idx_chat_messages_doctor ON chat_messages(doctor_id);
```

**Sample Data (db/h2/data.sql):**
```sql
-- Insert Sample Users
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@clinic.com', '$2a$10$8YhZ7d7.7FN8h9K9v9C9Ku9v9v9v9v9v9v9v9v9v9v9v9v9v9v9', 'Admin', 'User', 'ADMIN'),
('dr.smith@clinic.com', '$2a$10$8YhZ7d7.7FN8h9K9v9C9Ku9v9v9v9v9v9v9v9v9v9v9v9v9v9v9', 'John', 'Smith', 'DOCTOR'),
('dr.johnson@clinic.com', '$2a$10$8YhZ7d7.7FN8h9K9v9C9Ku9v9v9v9v9v9v9v9v9v9v9v9v9v9v9', 'Sarah', 'Johnson', 'DOCTOR');

-- Insert Sample Patients
INSERT INTO patients (first_name, last_name, email, phone, date_of_birth, assigned_doctor_id, allergies) VALUES
('Jane', 'Doe', 'jane.doe@email.com', '+1234567890', '1985-06-15', 2, 'Penicillin'),
('Bob', 'Wilson', 'bob.wilson@email.com', '+1234567891', '1990-03-22', 2, 'None'),
('Alice', 'Brown', 'alice.brown@email.com', '+1234567892', '1978-11-08', 3, 'Latex');

-- Insert Sample Appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date_time, appointment_type, status) VALUES
(1, 2, '2024-01-15 09:00:00', 'Checkup', 'SCHEDULED'),
(2, 2, '2024-01-15 10:30:00', 'Cleaning', 'CONFIRMED'),
(3, 3, '2024-01-16 14:00:00', 'Root Canal', 'SCHEDULED');

-- Insert Sample Medicines
INSERT INTO medicines (name, category, quantity, unit_price, expiry_date, supplier, min_stock_level) VALUES
('Amoxicillin 500mg', 'ANTIBIOTIC', 100, 0.50, '2024-12-31', 'PharmaCorp', 20),
('Ibuprofen 200mg', 'PAINKILLER', 200, 0.25, '2025-06-30', 'MediSupply', 50),
('Lidocaine 2%', 'ANESTHETIC', 50, 2.00, '2024-08-15', 'DentalMeds', 10);
```

### **📋 POSTGRESQL SETUP (PRODUCTION):**

#### **1. Database Creation:**
```bash
# Connect to PostgreSQL as superuser
sudo -u postgres psql

# Create database and user
CREATE DATABASE dentalclinic;
CREATE USER dental_user WITH PASSWORD 'dental_password';
GRANT ALL PRIVILEGES ON DATABASE dentalclinic TO dental_user;

# Grant additional permissions
\c dentalclinic;
GRANT ALL ON SCHEMA public TO dental_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dental_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO dental_user;

\q
```

#### **2. PostgreSQL Configuration:**
```yaml
# application-prod.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/dentalclinic
    username: dental_user
    password: dental_password
    driver-class-name: org.postgresql.Driver
    
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    properties:
      hibernate:
        default_schema: public
```

#### **3. PostgreSQL Scripts (db/postgresql/):**

**Schema Migration (db/postgresql/001_initial_schema.sql):**
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'DOCTOR')),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Continue with other tables similar to H2 but with PostgreSQL specific types...
```

### **🔧 DATABASE MANAGEMENT:**

#### **H2 Database Management:**
```bash
# Access H2 Console
open http://localhost:8080/api/h2-console

# Backup H2 Database (if using file-based)
cp ~/dentalclinic.mv.db ~/backup/dentalclinic_$(date +%Y%m%d).mv.db

# Reset H2 Database
# Simply restart the Spring Boot application
```

#### **PostgreSQL Database Management:**
```bash
# Connect to database
psql -h localhost -d dentalclinic -U dental_user

# Backup database
pg_dump -h localhost -U dental_user dentalclinic > backup_$(date +%Y%m%d).sql

# Restore database
psql -h localhost -U dental_user dentalclinic < backup_20240115.sql

# Check database size
psql -h localhost -U dental_user -c "SELECT pg_size_pretty(pg_database_size('dentalclinic'))"

# View active connections
psql -h localhost -U dental_user -c "SELECT * FROM pg_stat_activity WHERE datname = 'dentalclinic'"
```

### **🔧 TROUBLESHOOTING:**

#### **H2 Issues:**
1. **H2 Console not accessible:**
   ```bash
   # Check if H2 console is enabled in application.yml
   spring.h2.console.enabled=true
   
   # Access via: http://localhost:8080/api/h2-console
   ```

2. **Data not persisting:**
   ```bash
   # Change from memory to file-based (optional)
   spring.datasource.url=jdbc:h2:file:./data/dentalclinic
   ```

#### **PostgreSQL Issues:**
1. **Connection refused:**
   ```bash
   # Check if PostgreSQL is running
   sudo systemctl status postgresql
   
   # Start PostgreSQL
   sudo systemctl start postgresql
   ```

2. **Authentication failed:**
   ```bash
   # Reset password
   sudo -u postgres psql
   ALTER USER dental_user PASSWORD 'new_password';
   ```

3. **Permission denied:**
   ```bash
   # Grant permissions
   sudo -u postgres psql -d dentalclinic
   GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO dental_user;
   ```

### **📊 HEALTH CHECK:**

#### **Database Health Verification:**
```bash
# H2 Health Check
curl http://localhost:8080/api/h2-console

# PostgreSQL Health Check
psql -h localhost -U dental_user -d dentalclinic -c "SELECT 1"

# Test database connectivity from Spring Boot
curl http://localhost:8080/api/actuator/health

# Check table creation
curl http://localhost:8080/api/users
```

### **🌐 ACCESS URLS:**
- **H2 Console**: `http://localhost:8080/api/h2-console`
- **PostgreSQL**: `psql -h localhost -U dental_user -d dentalclinic`

### **📝 DATABASE LOGS:**
```bash
# PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-*.log

# H2 logs (embedded in Spring Boot)
tail -f logs/spring.log | grep -i h2
```

### **🔄 MIGRATION SCRIPTS:**

#### **Database Migration Tool:**
```bash
# Using Flyway (integrated with Spring Boot)
# Place migration files in: src/main/resources/db/migration/
# V1__Initial_schema.sql
# V2__Add_chat_tables.sql

# Run migrations
./mvnw flyway:migrate

# Check migration status
./mvnw flyway:info
```

### **🔐 SECURITY CONSIDERATIONS:**
```bash
# PostgreSQL Security
# Edit pg_hba.conf for authentication methods
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Change default passwords
ALTER USER postgres PASSWORD 'strong_password';
ALTER USER dental_user PASSWORD 'strong_password';

# Enable SSL (production)
ssl = on
ssl_cert_file = 'server.crt'
ssl_key_file = 'server.key'
```

### **📈 PERFORMANCE OPTIMIZATION:**
```sql
-- Create additional indexes for performance
CREATE INDEX CONCURRENTLY idx_appointments_date_status ON appointments(appointment_date_time, status);
CREATE INDEX CONCURRENTLY idx_patients_name ON patients(last_name, first_name);
CREATE INDEX CONCURRENTLY idx_treatments_date ON treatments(treatment_date);

-- Analyze table statistics
ANALYZE;

-- Vacuum (PostgreSQL)
VACUUM ANALYZE;
```

---

**🎯 INTEGRATION NOTE:** This file is automatically referenced by deployment prompts in the main development system. Any updates to the database deployment process should be reflected here.