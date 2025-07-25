# **DENTAL CLINIC MANAGEMENT SYSTEM - DEVELOPMENT PROMPTS**

## 🚨 **IMPORTANT FOLDER STRUCTURE NOTICE** 🚨

**ALL DEVELOPMENT MUST FOLLOW THIS FOLDER STRUCTURE:**

```
project-root/
├── frontend/          # React TypeScript application
├── backend/           # Spring Boot application  
└── ai-service/        # Python FastAPI AI service
```

**CRITICAL INSTRUCTIONS:**
- 🎯 **Total Prompts Required**: **65 Prompts** (numbered 1-65)
- 🎯 **Frontend changes**: Always create/modify files in `frontend/` folder
- 🎯 **Backend changes**: Always create/modify files in `backend/` folder  
- 🎯 **AI service changes**: Always create/modify files in `ai-service/` folder
- 🎯 **Never mix files** between these directories
- 🎯 **Use prompts sequentially** (1, 2, 3, etc.) for best results
- 🎯 **Each prompt handles ONE specific task** for efficient generation

**Example file paths:**
- ✅ `frontend/src/components/admin/UserManagement.tsx`
- ✅ `backend/src/main/java/com/dentalclinic/controller/UserController.java`
- ✅ `ai-service/app/services/medical_nlp.py`

## 📋 **PROMPT EXECUTION ORDER:**
- **Prompts 1-8**: Project Setup
- **Prompts 9-20**: Authentication & User Management
- **Prompts 21-32**: Patient Management
- **Prompts 33-44**: Appointment & Treatment Management
- **Prompts 45-56**: Advanced Features (Inventory, Billing, Analytics)
- **Prompts 57-62**: AI Integration
- **Prompts 63-65**: Production Setup

---

# **SIMPLIFIED DEVELOPMENT PROMPTS (1-65)**

## **PHASE 1: PROJECT SETUP (Prompts 1-8)**

### **Prompt 1: Create Backend Spring Boot Project**
```
Create a new Spring Boot project in backend/ folder:

- Initialize Spring Boot 3.2+ with Java 17
- Add dependencies: web, data-jpa, h2, security, validation
- Create package structure: com.dentalclinic
- Create main application class: backend/src/main/java/com/dentalclinic/DentalClinicApplication.java
- Setup basic folder structure: controller/, service/, repository/, model/, config/
```

### **Prompt 2: Backend Database Configuration**
```
Create H2 database configuration in backend/ folder:

- Create backend/src/main/resources/application.yml with H2 setup
- Configure H2 console, JWT settings, and server port 8080
- Create backend/src/main/resources/data.sql with sample data
- Add default users: admin/admin123 (ADMIN), doctor/doctor123 (DOCTOR)
```

### **Prompt 3: Create User Entity**
```
Create User entity in backend/src/main/java/com/dentalclinic/model/User.java:

- Fields: id, username, passwordHash, role (enum), firstName, lastName, active, createdAt
- JPA annotations for database mapping
- Role enum: ADMIN, DOCTOR
- Constructors, getters, setters
```

### **Prompt 4: Create Frontend React Project**
```
Create React TypeScript project in frontend/ folder:

- Initialize with Vite and TypeScript
- Install dependencies: @mui/material, @emotion/react, @emotion/styled, react-router-dom, axios
- Create basic folder structure: src/components/, src/pages/, src/services/, src/types/
- Setup package.json and tsconfig.json
```

### **Prompt 5: Frontend App Structure**
```
Create main app structure in frontend/src/:

- Create App.tsx with basic routing setup
- Create main.tsx with React 18 root
- Create index.html in frontend/public/
- Setup basic CSS reset and Corona theme colors
```

### **Prompt 6: Create TypeScript Types**
```
Create TypeScript interfaces in frontend/src/types/:

- User.ts interface matching backend User entity
- ApiResponse.ts for standard API responses
- AuthTypes.ts for login/auth related types
- Common.ts for shared types
```

### **Prompt 7: Backend Security Configuration**
```
Create JWT security setup in backend/src/main/java/com/dentalclinic/config/:

- SecurityConfig.java with JWT configuration
- JwtUtil.java for token generation/validation
- Role-based access control setup
- CORS configuration for frontend
```

### **Prompt 8: Frontend API Client Setup**
```
Create API client in frontend/src/services/api/:

- apiClient.ts with axios configuration
- Base URL setup pointing to backend:8080
- Request/response interceptors
- Error handling setup
```

## **PHASE 2: AUTHENTICATION & USER MANAGEMENT (Prompts 9-20)**

### **Prompt 9: Create User Repository**
```
Create User repository in backend/src/main/java/com/dentalclinic/repository/UserRepository.java:

- Extend JpaRepository<User, Long>
- Add method: findByUsername(String username)
- Add method: findByRole(Role role)
- Add method: findByActiveTrue()
- Add custom query for user statistics
```

### **Prompt 10: Create Auth Controller**
```
Create authentication controller in backend/src/main/java/com/dentalclinic/controller/AuthController.java:

- POST /api/auth/login endpoint
- Login request/response DTOs
- JWT token generation
- Password validation with BCrypt
- Return user info and token
```

### **Prompt 11: Create User Service**
```
Create user service in backend/src/main/java/com/dentalclinic/service/UserService.java:

- createUser() method for admin
- updateUser() method
- getUserById() method
- getAllUsers() with pagination
- changePassword() method
```

### **Prompt 12: Create Admin Controller**
```
Create admin controller in backend/src/main/java/com/dentalclinic/controller/AdminController.java:

- GET /api/admin/users endpoint
- POST /api/admin/users endpoint (create doctor)
- PUT /api/admin/users/{id} endpoint
- PATCH /api/admin/users/{id}/status endpoint
- Admin-only access with @PreAuthorize
```

### **Prompt 13: Create Auth Context**
```
Create authentication context in frontend/src/context/AuthContext.tsx:

- User state management
- Login/logout functions
- Token storage in localStorage
- Auto-logout on token expiry
- Role-based navigation helpers
```

### **Prompt 14: Create Auth Service**
```
Create authentication service in frontend/src/services/auth/AuthService.ts:

- login() method calling backend API
- logout() method
- getCurrentUser() method
- refreshToken() method
- Token validation helpers
```

### **Prompt 15: Create Login Page**
```
Create login page in frontend/src/pages/auth/LoginPage.tsx:

- Split-screen layout with branding
- Role selector (Admin/Doctor)
- Form with username/password fields
- Loading states and error handling
- Corona React styling
```

### **Prompt 16: Create Protected Route**
```
Create protected route component in frontend/src/components/auth/ProtectedRoute.tsx:

- Check authentication status
- Role-based access control
- Redirect to login if not authenticated
- Redirect based on user role
- Loading spinner while checking auth
```

### **Prompt 17: Create User Management Page**
```
Create user management page in frontend/src/pages/admin/UserManagement.tsx:

- User list with data table
- Search and filter functionality
- Add user button
- Edit/deactivate actions
- Export functionality
```

### **Prompt 18: Create Add User Modal**
```
Create add user modal in frontend/src/components/admin/AddUserModal.tsx:

- Form for creating new doctor
- Username/password fields
- Form validation
- Role selection (Doctor only)
- Success/error handling
```

### **Prompt 19: Setup Routing**
```
Create routing setup in frontend/src/App.tsx:

- React Router configuration
- Protected routes for admin/doctor
- Public routes for login
- Role-based redirects
- 404 page handling
```

### **Prompt 20: Create Global Error Handler**
```
Create error handling in backend/src/main/java/com/dentalclinic/config/GlobalExceptionHandler.java:

- @ControllerAdvice class
- Handle validation errors
- Handle authentication errors
- Handle business logic errors
- Standardized error response format
```

## **PHASE 3: PATIENT MANAGEMENT (Prompts 21-32)**

### **Prompt 21: Create Patient Entity**
```
Create Patient entity in backend/src/main/java/com/dentalclinic/model/Patient.java:

- Fields: id, firstName, lastName, phone, dateOfBirth, address, assignedDoctorId
- Medical fields: allergies, medicalConditions, emergencyContact
- JPA annotations and relationships
- Constructors, getters, setters
```

### **Prompt 22: Create Patient Repository**
```
Create Patient repository in backend/src/main/java/com/dentalclinic/repository/PatientRepository.java:

- Extend JpaRepository<Patient, Long>
- findByAssignedDoctorId() method
- findByFirstNameContainingOrLastNameContaining() for search
- findByDateOfBirthBetween() for age filtering
- Custom query for patient statistics
```

### **Prompt 23: Create Patient Service**
```
Create Patient service in backend/src/main/java/com/dentalclinic/service/PatientService.java:

- createPatient() method
- updatePatient() method
- getPatientById() with doctor access control
- getAllPatients() with pagination and filtering
- assignPatientToDoctor() method
```

### **Prompt 24: Create Patient Controller**
```
Create Patient controller in backend/src/main/java/com/dentalclinic/controller/PatientController.java:

- GET /api/patients endpoint with pagination
- GET /api/patients/{id} endpoint
- POST /api/patients endpoint
- PUT /api/patients/{id} endpoint
- Doctor can only see assigned patients
```

### **Prompt 25: Create Patient Types**
```
Create Patient types in frontend/src/types/Patient.ts:

- Patient interface matching backend entity
- PatientCreateRequest interface
- PatientUpdateRequest interface
- PatientSearchFilters interface
- MedicalHistory interface
```

### **Prompt 26: Create Patient Service**
```
Create Patient service in frontend/src/services/api/PatientService.ts:

- getAllPatients() with pagination
- getPatientById() method
- createPatient() method
- updatePatient() method
- searchPatients() method
```

### **Prompt 27: Create Patient List Page**
```
Create Patient list page in frontend/src/pages/admin/PatientList.tsx:

- Data table with patient information
- Search and filter functionality
- Add patient button
- Quick actions (view, edit, assign doctor)
- Responsive design for mobile
```

### **Prompt 28: Create Patient Profile Component**
```
Create Patient profile in frontend/src/components/common/PatientProfile.tsx:

- Tabbed interface (Info, History, Appointments)
- Editable patient information
- Medical history display
- Emergency contact information
- Print patient summary
```

### **Prompt 29: Create Add Patient Modal**
```
Create Add Patient modal in frontend/src/components/common/AddPatientModal.tsx:

- Multi-step form (Personal, Medical, Contact)
- Date picker for date of birth
- Form validation and error handling
- Doctor assignment (admin only)
- Success/error notifications
```

### **Prompt 30: Create Patient Search Component**
```
Create Patient search in frontend/src/components/common/PatientSearch.tsx:

- Real-time search input
- Advanced filters (age, doctor, date range)
- Search suggestions
- Clear filters functionality
- Export search results
```

### **Prompt 31: Create Doctor Dashboard**
```
Create Doctor dashboard in frontend/src/pages/doctor/DoctorDashboard.tsx:

- Today's appointments widget
- My patients summary
- Quick actions (add treatment, view patient)
- Recent activities feed
- Performance metrics
```

### **Prompt 32: Create Admin Dashboard**
```
Create Admin dashboard in frontend/src/pages/admin/AdminDashboard.tsx:

- System overview metrics
- User management quick actions
- Patient statistics
- Revenue summaries
- System alerts and notifications
```

## **PHASE 4: APPOINTMENT & TREATMENT MANAGEMENT (Prompts 33-44)**

### **Prompt 33: Create Appointment Entity**
```
Create Appointment entity in backend/src/main/java/com/dentalclinic/model/Appointment.java:

- Fields: id, patientId, doctorId, appointmentTime, type, status, notes, durationMinutes
- Status enum: SCHEDULED, CONFIRMED, IN_PROGRESS, COMPLETED, CANCELLED
- JPA annotations and relationships
- Constructors, getters, setters
```

### **Prompt 34: Create Appointment Repository**
```
Create Appointment repository in backend/src/main/java/com/dentalclinic/repository/AppointmentRepository.java:

- findByDoctorIdAndAppointmentTimeBetween() method
- findByPatientId() method
- findByStatus() method
- findUpcomingAppointments() custom query
- Calendar view queries
```

### **Prompt 35: Create Appointment Service**
```
Create Appointment service in backend/src/main/java/com/dentalclinic/service/AppointmentService.java:

- scheduleAppointment() method
- updateAppointmentStatus() method
- getAvailableTimeSlots() method
- getAppointmentsByDoctor() method
- checkConflicts() method
```

### **Prompt 36: Create Appointment Controller**
```
Create Appointment controller in backend/src/main/java/com/dentalclinic/controller/AppointmentController.java:

- GET /api/appointments endpoint
- POST /api/appointments endpoint
- PUT /api/appointments/{id} endpoint
- GET /api/appointments/calendar/{doctorId} endpoint
- GET /api/appointments/available-slots endpoint
```

### **Prompt 37: Create Treatment Entity**
```
Create Treatment entity in backend/src/main/java/com/dentalclinic/model/Treatment.java:

- Fields: id, patientId, doctorId, appointmentId, treatmentDate, symptoms, diagnosis
- Fields: procedure, treatmentNotes, medications, cost, status
- JPA annotations and relationships
- Constructors, getters, setters
```

### **Prompt 38: Create Treatment Repository**
```
Create Treatment repository in backend/src/main/java/com/dentalclinic/repository/TreatmentRepository.java:

- findByPatientId() method
- findByDoctorId() method
- findByTreatmentDateBetween() method
- findByProcedureContaining() method
- Treatment statistics queries
```

### **Prompt 39: Create Appointment Calendar Component**
```
Create Appointment calendar in frontend/src/components/common/AppointmentCalendar.tsx:

- FullCalendar integration
- Drag and drop rescheduling
- Color coding by appointment type
- Month/week/day views
- Doctor-specific filtering
```

### **Prompt 40: Create Schedule Appointment Modal**
```
Create Schedule appointment modal in frontend/src/components/common/ScheduleAppointmentModal.tsx:

- Patient selection with search
- Doctor selection (admin only)
- Date/time picker with availability
- Appointment type selection
- Notes and special instructions
```

### **Prompt 41: Create Treatment Form**
```
Create Treatment form in frontend/src/components/doctor/TreatmentForm.tsx:

- Rich text editor for treatment notes
- Procedure selection dropdown
- Symptoms and diagnosis fields
- Medication prescription
- Cost calculation
```

### **Prompt 42: Create Treatment History**
```
Create Treatment history in frontend/src/components/common/TreatmentHistory.tsx:

- Timeline view of treatments
- Expandable treatment details
- Filter by date and procedure
- Print treatment summary
- Treatment outcome tracking
```

### **Prompt 43: Create Appointment List**
```
Create Appointment list in frontend/src/components/common/AppointmentList.tsx:

- Today's appointments view
- Status indicators and actions
- Quick status updates
- Patient contact information
- Appointment notes
```

### **Prompt 44: Create Calendar Integration**
```
Create Calendar integration in frontend/src/services/api/CalendarService.ts:

- Real-time availability checking
- Appointment conflict detection
- Calendar synchronization
- Export calendar data
- Notification scheduling
```

## **PHASE 5: ADVANCED FEATURES (Prompts 45-56)**

### **Prompt 45: Create Medicine Entity**
```
Create Medicine entity in backend/src/main/java/com/dentalclinic/model/Medicine.java:

- Fields: id, name, category, quantity, unitPrice, expiryDate, supplier
- Fields: minStockLevel, batchNumber, manufacturer
- JPA annotations
- Constructors, getters, setters
```

### **Prompt 46: Create Inventory Service**
```
Create Inventory service in backend/src/main/java/com/dentalclinic/service/InventoryService.java:

- addMedicine() method
- updateStock() method
- getLowStockItems() method
- getExpiringItems() method
- generateReorderReport() method
```

### **Prompt 47: Create Invoice Entity**
```
Create Invoice entity in backend/src/main/java/com/dentalclinic/model/Invoice.java:

- Fields: id, patientId, invoiceDate, totalAmount, paidAmount, status
- Payment method enum: CASH, CHECK, BANK_TRANSFER
- Status enum: PENDING, PARTIAL, PAID, OVERDUE
- JPA annotations and relationships
```

### **Prompt 48: Create Billing Service**
```
Create Billing service in backend/src/main/java/com/dentalclinic/service/BillingService.java:

- generateInvoice() method
- recordPayment() method
- getOutstandingPayments() method
- generateFinancialReport() method
- calculateRevenue() method
```

### **Prompt 49: Create Inventory Management Page**
```
Create Inventory management in frontend/src/pages/admin/InventoryManagement.tsx:

- Medicine list with stock levels
- Low stock alerts
- Add/edit medicine modal
- Expiry date tracking
- Supplier management
```

### **Prompt 50: Create Billing Dashboard**
```
Create Billing dashboard in frontend/src/pages/admin/BillingDashboard.tsx:

- Revenue overview charts
- Outstanding payments list
- Recent transactions
- Payment method statistics
- Export financial reports
```

### **Prompt 51: Create Invoice Component**
```
Create Invoice component in frontend/src/components/common/InvoiceComponent.tsx:

- Invoice generation form
- Line items with costs
- Tax calculation
- Payment recording
- PDF invoice generation
```

### **Prompt 52: Create Analytics Service**
```
Create Analytics service in backend/src/main/java/com/dentalclinic/service/AnalyticsService.java:

- getPatientStatistics() method
- getRevenueAnalytics() method
- getDoctorPerformance() method
- getTreatmentTrends() method
- getSystemMetrics() method
```

### **Prompt 53: Create Charts Component**
```
Create Charts component in frontend/src/components/common/ChartsComponent.tsx:

- Revenue line charts
- Patient demographics pie charts
- Treatment distribution bar charts
- Doctor performance metrics
- Interactive chart filters
```

### **Prompt 54: Create Export Service**
```
Create Export service in frontend/src/services/api/ExportService.ts:

- exportToExcel() method
- exportToPDF() method
- generateReport() method
- scheduleReport() method
- downloadFile() helper
```

### **Prompt 55: Create Notification System**
```
Create Notification system in frontend/src/components/common/NotificationCenter.tsx:

- In-app notification center
- Toast notifications
- Alert badges
- Notification history
- Mark as read functionality
```

### **Prompt 56: Create File Upload Component**
```
Create File upload in frontend/src/components/common/FileUpload.tsx:

- Drag and drop file upload
- File type validation
- Progress indicators
- File preview
- Multiple file support
```

## **PHASE 6: AI INTEGRATION (Prompts 57-62)**

### **Prompt 57: Setup AI Service Project**
```
Create AI service project in ai-service/ folder:

- Initialize FastAPI project
- Setup ChromaDB for vector storage
- Create main.py with FastAPI app
- Install dependencies: fastapi, chromadb, uvicorn
- Basic project structure setup
```

### **Prompt 58: Create Clinic Suggestions API**
```
Create clinic suggestions in ai-service/app/api/clinic_suggestions.py:

- POST /api/ai/clinic-suggestions endpoint
- Vector similarity search implementation
- Patient history analysis
- Treatment recommendation logic
- Confidence scoring system
```

### **Prompt 59: Create Web Suggestions API**
```
Create web suggestions in ai-service/app/api/web_suggestions.py:

- POST /api/ai/web-suggestions endpoint
- Medical API integration
- Web scraping service
- Research paper retrieval
- Medical guideline references
```

### **Prompt 60: Create AI Chat Interface**
```
Create AI chat interface in frontend/src/pages/doctor/ChatInterface.tsx:

- Split layout design (chat + suggestions)
- Real-time messaging
- Mode toggle (Web/Clinic)
- File attachment support
- Suggestion rating system
```

### **Prompt 61: Create AI Service Integration**
```
Create AI service integration in backend/src/main/java/com/dentalclinic/service/AIService.java:

- RestTemplate client for AI service
- Async communication
- Fallback mechanisms
- Response caching
- Error handling
```

### **Prompt 62: Create Model Training Service**
```
Create model training in ai-service/app/services/model_training.py:

- Data anonymization
- Vector embedding generation
- Model retraining pipeline
- Performance metrics tracking
- Feedback incorporation
```

## **PHASE 7: PRODUCTION SETUP (Prompts 63-65)**

### **Prompt 63: Create Docker Configuration**
```
Create Docker setup for all services:

- backend/Dockerfile for Spring Boot
- frontend/Dockerfile for React
- ai-service/Dockerfile for Python
- docker-compose.yml for development
- Environment configuration files
```

### **Prompt 64: Database Migration Setup**
```
Create PostgreSQL migration configuration:

- Update backend/src/main/resources/application-prod.yml
- Create migration scripts
- Data backup/restore procedures
- Connection pooling configuration
- Performance optimization settings
```

### **Prompt 65: Production Deployment**
```
Create production deployment configuration:

- Kubernetes manifests
- CI/CD pipeline setup
- Environment variables management
- Health checks and monitoring
- SSL certificate configuration
```

---

# **🎉 CONGRATULATIONS! You now have 65 optimized prompts for efficient development!**

## **📝 USAGE INSTRUCTIONS:**

1. **Start with Prompt 1** and work sequentially through to Prompt 65
2. **Each prompt is designed** to be completed quickly by Cursor (2-5 minutes each)
3. **Copy the exact prompt text** when using with Cursor or GitHub Copilot
4. **File paths are pre-specified** - no guessing where to place files
5. **Each prompt builds on previous ones** - maintain the sequence for best results

## **⚡ EFFICIENCY BENEFITS:**

- **Small, focused tasks** - Cursor can generate code faster
- **Clear file locations** - No confusion about folder structure  
- **Sequential building** - Each prompt depends on previous ones
- **Single responsibility** - One feature per prompt
- **Complete coverage** - All 65 prompts cover entire system

## **🎯 ESTIMATED TIMELINE:**

- **Phase 1 (Prompts 1-8)**: 1-2 days - Project setup
- **Phase 2 (Prompts 9-20)**: 2-3 days - Authentication
- **Phase 3 (Prompts 21-32)**: 3-4 days - Patient management  
- **Phase 4 (Prompts 33-44)**: 3-4 days - Appointments & treatments
- **Phase 5 (Prompts 45-56)**: 4-5 days - Advanced features
- **Phase 6 (Prompts 57-62)**: 2-3 days - AI integration
- **Phase 7 (Prompts 63-65)**: 1-2 days - Production setup

**Total estimated time: 16-23 days for complete system**

Happy coding! 🚀