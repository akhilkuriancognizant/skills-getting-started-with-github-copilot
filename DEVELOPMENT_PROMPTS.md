# **DENTAL CLINIC MANAGEMENT SYSTEM - DEVELOPMENT PROMPTS**

## **SETUP PROMPTS**

### **1. Initial Project Setup**

#### **Backend Setup Prompt (Spring Boot)**
```
Create a Spring Boot dental clinic management system with the following structure:

PROJECT SETUP:
- Spring Boot 3.2+, Java 17
- Dependencies: web, data-jpa, h2, websocket, validation, security
- Package structure: com.dentalclinic
- H2 in-memory database configuration
- Two roles: ADMIN, DOCTOR

ENTITIES TO CREATE:
1. User (id, username, password, role, firstName, lastName, email, active, createdAt)
2. Patient (id, firstName, lastName, email, phone, dateOfBirth, address, assignedDoctorId)
3. Appointment (id, patientId, doctorId, appointmentTime, type, status, notes)
4. Treatment (id, patientId, doctorId, treatmentDate, symptoms, diagnosis, procedure, medications, cost)
5. Medicine (id, name, category, quantity, unitPrice, expiryDate, supplier, minStockLevel)
6. Invoice (id, patientId, invoiceDate, totalAmount, paidAmount, status, paymentMethod)
7. ChatMessage (id, doctorId, patientId, message, response, suggestionType, timestamp)

SECURITY CONFIGURATION:
- JWT authentication
- Role-based access control
- ADMIN endpoints: /api/admin/**
- DOCTOR endpoints: /api/doctor/**
- Public endpoints: /api/auth/**

SAMPLE DATA:
- Create data.sql with sample users, patients, appointments
- Default admin: admin@clinic.com / admin123
- Default doctor: doctor@clinic.com / doctor123
```

#### **Frontend Setup Prompt (React)**
```
Create a React TypeScript dental clinic management system frontend with Corona React design:

PROJECT SETUP:
- React 18 + TypeScript + Vite
- Dependencies: @mui/material, recharts, react-router-dom, axios
- Folder structure: components, pages, services, hooks, types, utils

DESIGN SYSTEM:
- Corona React inspired dark theme
- Color scheme: Primary #4c84ff (doctor), #dc3545 (admin)
- Sidebar navigation with gradient backgrounds
- Card-based layout with shadows
- Professional medical styling

AUTHENTICATION:
- Role-based login page with split design
- JWT token management
- Route protection based on roles
- Auto-redirect based on user role

ROUTING STRUCTURE:
/login - Role-based login
/admin/* - Admin dashboard and features
/doctor/* - Doctor dashboard and features
/chat - AI chat interface (doctor only)

GLOBAL STATE:
- Auth context for user management
- Theme context for role-based styling
- API service layer with interceptors
```

---

## **PHASE 1: MVP SETUP PROMPTS**

### **2. Authentication System**

#### **Backend Authentication Prompt**
```
Implement JWT authentication for dental clinic system:

CONTROLLERS TO CREATE:
1. AuthController:
   - POST /api/auth/login (username, password, role validation)
   - POST /api/auth/refresh-token
   - POST /api/auth/logout
   - GET /api/auth/me (current user profile)

2. UserController:
   - GET /api/admin/users (admin only - list all users)
   - POST /api/admin/users (admin only - create doctor account)
   - PUT /api/admin/users/{id} (admin only - update user)
   - DELETE /api/admin/users/{id} (admin only - deactivate user)

SECURITY FEATURES:
- Password encryption with BCrypt
- JWT token with 24h expiry
- Refresh token mechanism
- Role-based method security
- Input validation and sanitization

RESPONSE FORMAT:
{
  "success": true,
  "data": {...},
  "message": "Operation successful",
  "timestamp": "2024-01-15T10:30:00Z"
}

ERROR HANDLING:
- Global exception handler
- Custom exceptions for business logic
- Standardized error responses
```

#### **Frontend Authentication Prompt**
```
Create authentication system for React dental clinic app:

COMPONENTS TO CREATE:
1. LoginPage:
   - Split-screen design with medical branding
   - Role selector (Admin/Doctor) with different themes
   - Floating label inputs with icons
   - Loading states and error handling
   - Remember me functionality

2. AuthContext:
   - User state management
   - Token storage and retrieval
   - Auto-logout on token expiry
   - Role-based navigation

3. ProtectedRoute:
   - Route protection based on authentication
   - Role-based access control
   - Redirect logic for unauthorized access

SERVICES:
- AuthService for API calls
- Token interceptor for axios
- Auto-refresh token mechanism

STYLING:
- Corona React inspired design
- Gradient backgrounds: Doctor (#2e2e48 to #4c84ff), Admin (#2c3e50 to #dc3545)
- Professional medical imagery
- Smooth animations and transitions
```

### **3. User Management System**

#### **Backend User Management Prompt**
```
Create comprehensive user management for dental clinic:

USER REPOSITORY:
- findByUsername, findByRole, findActiveUsers
- Custom queries for user statistics
- Soft delete functionality

USER SERVICE:
- createDoctor(CreateUserDto) - admin only
- updateUser(id, UpdateUserDto)
- deactivateUser(id) - soft delete
- getUsersByRole(Role role)
- changePassword(ChangePasswordDto)

ADMIN CONTROLLER ENDPOINTS:
- GET /api/admin/users - paginated user list with filters
- GET /api/admin/users/{id} - user details
- POST /api/admin/users - create new doctor
- PUT /api/admin/users/{id} - update user
- PATCH /api/admin/users/{id}/status - activate/deactivate

VALIDATION:
- Email format validation
- Password strength requirements
- Unique username/email constraints
- Role validation

AUDIT LOGGING:
- Track user creation, updates, login attempts
- Store in audit_logs table
```

#### **Frontend User Management Prompt**
```
Create admin user management interface:

COMPONENTS:
1. UserManagement:
   - Data table with sorting, filtering, pagination
   - Add user modal with form validation
   - Edit user inline or modal
   - Bulk actions (activate/deactivate)
   - Export user list functionality

2. AddUserModal:
   - Form with proper validation
   - Role selection (Doctor only for admin)
   - Email/username availability check
   - Password generation option

3. UserTable:
   - Status indicators (active/inactive)
   - Last login information
   - Quick actions (edit, deactivate, reset password)
   - Role badges with colors

FEATURES:
- Real-time user status updates
- Search and filter by role, status, name
- Confirmation dialogs for destructive actions
- Success/error notifications

STYLING:
- Material-UI DataGrid or custom table
- Corona React card design
- Professional admin theme
- Responsive design for mobile
```

---

## **PHASE 2: CORE FEATURES PROMPTS**

### **4. Patient Management**

#### **Backend Patient Management Prompt**
```
Implement comprehensive patient management system:

PATIENT ENTITY ENHANCEMENTS:
- Add medical history fields (allergies, medications, conditions)
- File attachments (X-rays, documents)
- Emergency contact information
- Insurance details

PATIENT CONTROLLER:
- GET /api/patients - list with pagination and search
- GET /api/patients/{id} - detailed patient profile
- POST /api/patients - create new patient
- PUT /api/patients/{id} - update patient
- GET /api/patients/{id}/history - medical history
- GET /api/patients/{id}/appointments - patient appointments
- GET /api/patients/{id}/treatments - treatment history

DOCTOR RESTRICTIONS:
- Doctors can only see assigned patients
- Filter patients by assignedDoctorId
- Admin sees all patients

SEARCH FUNCTIONALITY:
- Search by name, email, phone
- Filter by age range, assigned doctor
- Sort by name, last visit, registration date

FILE MANAGEMENT:
- Upload patient documents (X-rays, insurance)
- File type validation (PDF, JPEG, PNG)
- Secure file storage and retrieval
```

#### **Frontend Patient Management Prompt**
```
Create comprehensive patient management interface:

COMPONENTS:
1. PatientList:
   - Searchable data table with filters
   - Patient cards with photos and key info
   - Quick actions (view, edit, schedule appointment)
   - Add new patient button

2. PatientProfile:
   - Tabbed interface (Info, History, Appointments, Files)
   - Editable fields with form validation
   - Medical history timeline
   - File upload with drag-and-drop

3. AddPatientModal:
   - Multi-step form (Personal, Medical, Contact, Insurance)
   - Date picker for DOB
   - File upload for profile photo
   - Form validation with error messages

FEATURES:
- Advanced search with multiple criteria
- Patient photo display with placeholder
- Medical alerts for allergies/conditions
- Quick appointment scheduling
- Export patient list

DESIGN:
- Corona React card layout
- Professional medical color scheme
- Icons for different medical conditions
- Responsive grid layout for patient cards
```

### **5. Appointment Management**

#### **Backend Appointment Management Prompt**
```
Create appointment scheduling system:

APPOINTMENT ENTITY:
- Add recurring appointment support
- Appointment types (consultation, cleaning, surgery, follow-up)
- Status tracking (scheduled, confirmed, in-progress, completed, cancelled)
- Duration and room assignment

APPOINTMENT CONTROLLER:
- GET /api/appointments - list with date range filters
- GET /api/appointments/calendar/{doctorId} - calendar view
- POST /api/appointments - create appointment
- PUT /api/appointments/{id} - update appointment
- PATCH /api/appointments/{id}/status - change status
- GET /api/appointments/available-slots - available time slots

BUSINESS LOGIC:
- Prevent double booking
- Working hours validation
- Appointment reminder system
- Conflict detection and resolution

CALENDAR INTEGRATION:
- Generate calendar events
- Time zone handling
- Recurring appointment patterns
- Availability checking

NOTIFICATIONS:
- Email appointment confirmations
- SMS reminders (placeholder)
- Doctor schedule notifications
```

#### **Frontend Appointment Management Prompt**
```
Create appointment scheduling interface:

COMPONENTS:
1. AppointmentCalendar:
   - Full calendar view with month/week/day views
   - Drag-and-drop appointment rescheduling
   - Color coding by appointment type
   - Doctor-specific calendar filtering

2. ScheduleAppointment:
   - Patient selection with search
   - Doctor selection (admin) or auto-assign (doctor)
   - Date/time picker with availability checking
   - Appointment type selection
   - Notes and special instructions

3. AppointmentList:
   - Today's appointments dashboard
   - Status indicators and actions
   - Quick status updates
   - Patient contact information

FEATURES:
- Real-time availability checking
- Appointment conflict warnings
- Bulk operations (reschedule, cancel)
- Print appointment schedules
- Export calendar data

CALENDAR LIBRARY:
- FullCalendar React integration
- Custom styling to match Corona theme
- Responsive design for mobile
- Touch gestures for mobile calendars
```

---

## **PHASE 3: ADVANCED FEATURES PROMPTS**

### **6. Treatment Records**

#### **Backend Treatment Management Prompt**
```
Implement comprehensive treatment recording system:

TREATMENT ENTITY ENHANCEMENT:
- Add treatment plans and follow-up schedules
- Treatment photos (before/after)
- Multi-visit treatment tracking
- Cost breakdown and insurance claims

TREATMENT CONTROLLER:
- GET /api/treatments - list with filters
- GET /api/treatments/{id} - detailed treatment record
- POST /api/treatments - create treatment record
- PUT /api/treatments/{id} - update treatment
- GET /api/treatments/patient/{patientId} - patient treatment history
- POST /api/treatments/{id}/photos - upload treatment photos

PRESCRIPTION MANAGEMENT:
- Link treatments to prescriptions
- Drug interaction checking
- Dosage calculation helpers
- Prescription printing

TREATMENT ANALYTICS:
- Treatment success rates
- Popular procedures
- Average costs by treatment type
- Doctor performance metrics

COMPLIANCE:
- HIPAA compliance features
- Audit trail for all changes
- Data encryption for sensitive fields
- Backup and restore functionality
```

#### **Frontend Treatment Management Prompt**
```
Create treatment recording interface:

COMPONENTS:
1. TreatmentForm:
   - Rich text editor for treatment notes
   - Procedure selection from predefined list
   - Photo upload with before/after comparison
   - Cost calculation with insurance handling

2. TreatmentHistory:
   - Timeline view of patient treatments
   - Expandable treatment details
   - Filter by date, procedure, doctor
   - Print treatment summaries

3. TreatmentPlan:
   - Multi-visit treatment planning
   - Progress tracking with visual indicators
   - Appointment scheduling integration
   - Cost estimation and approval workflow

FEATURES:
- Template-based treatment notes
- Voice-to-text for quick note taking
- Photo annotation tools
- Treatment outcome tracking
- Insurance claim generation

EDITOR:
- Rich text editor (TinyMCE or similar)
- Medical symbol insertion
- Template library for common procedures
- Auto-save functionality
```

### **7. Inventory Management**

#### **Backend Inventory Management Prompt**
```
Create medicine inventory management system:

MEDICINE ENTITY:
- Batch tracking with expiry dates
- Supplier information and purchase history
- Minimum stock levels and reorder points
- Usage tracking and consumption analytics

INVENTORY CONTROLLER:
- GET /api/inventory - list with stock status
- GET /api/inventory/low-stock - items below minimum
- GET /api/inventory/expiring - items expiring soon
- POST /api/inventory - add new medicine
- PUT /api/inventory/{id} - update stock levels
- POST /api/inventory/reorder - create purchase orders

STOCK MANAGEMENT:
- Automatic stock deduction on prescription
- Stock adjustment with reason codes
- Waste tracking for expired medicines
- Supplier management and purchase orders

REPORTING:
- Consumption reports by medicine/period
- Cost analysis and budgeting
- Expiry alerts and waste reports
- Purchase order management

ALERTS:
- Low stock notifications
- Expiry date warnings
- Automatic reorder suggestions
- Email notifications to admin
```

#### **Frontend Inventory Management Prompt**
```
Create inventory management interface:

COMPONENTS:
1. InventoryDashboard:
   - Stock level overview with gauges
   - Low stock alerts with action buttons
   - Expiry calendar with color coding
   - Quick stock adjustment interface

2. MedicineList:
   - Sortable table with stock indicators
   - Barcode scanning for quick lookup
   - Bulk update capabilities
   - Advanced filtering options

3. StockManagement:
   - Stock in/out forms with reason codes
   - Batch tracking interface
   - Supplier management
   - Purchase order creation

FEATURES:
- Real-time stock level updates
- Barcode generation and scanning
- Export reports to Excel/PDF
- Mobile-friendly stock checking
- Photo capture for stock verification

VISUALIZATION:
- Stock level charts and trends
- Consumption analytics
- Cost tracking dashboards
- Predictive reorder suggestions
```

### **8. Billing System**

#### **Backend Billing Management Prompt**
```
Implement comprehensive billing system:

BILLING ENTITIES:
- Invoice with line items and tax calculation
- Payment tracking with multiple methods
- Insurance claim processing
- Recurring billing for treatment plans

BILLING CONTROLLER:
- GET /api/billing/invoices - invoice list with filters
- POST /api/billing/invoices - create invoice
- PUT /api/billing/invoices/{id} - update invoice
- POST /api/billing/payments - record payment
- GET /api/billing/reports - financial reports

PAYMENT PROCESSING:
- Multiple payment methods (cash, card, insurance)
- Payment plan management
- Refund processing
- Late payment tracking and reminders

FINANCIAL REPORTING:
- Daily/monthly revenue reports
- Outstanding payments tracking
- Doctor commission calculations
- Tax reporting and compliance

INTEGRATION:
- Insurance claim submission
- Payment gateway integration (placeholder)
- Accounting software export
- Receipt generation and printing
```

#### **Frontend Billing Management Prompt**
```
Create billing and invoicing interface:

COMPONENTS:
1. BillingDashboard:
   - Revenue charts and KPIs
   - Outstanding payments overview
   - Recent transactions list
   - Quick payment recording

2. InvoiceManager:
   - Invoice creation with line items
   - PDF invoice generation
   - Payment status tracking
   - Bulk invoice operations

3. PaymentProcessing:
   - Payment recording interface
   - Payment method selection
   - Receipt generation
   - Refund processing

FEATURES:
- Automated invoice generation
- Payment reminders and follow-ups
- Financial analytics and reporting
- Export to accounting software
- Mobile payment processing

REPORTING:
- Interactive financial dashboards
- Customizable report generation
- Data visualization with charts
- Export capabilities (PDF, Excel)
```

---

## **PHASE 4: AI INTEGRATION PROMPTS**

### **9. AI Service Setup**

#### **Python AI Service Prompt**
```
Create Python FastAPI AI service for dental clinic:

PROJECT SETUP:
- FastAPI with async support
- ChromaDB for vector storage
- Hugging Face transformers for NLP
- Medical knowledge base integration

ENDPOINTS TO CREATE:
1. POST /api/ai/clinic-suggestions
   - Input: symptoms, patient history, previous treatments
   - Output: similar cases, suggested treatments, confidence scores
   - Use vector similarity search in ChromaDB

2. POST /api/ai/web-suggestions
   - Input: medical query, symptoms
   - Output: web research results, medical guidelines
   - Integration with medical APIs (PubMed, medical databases)

3. POST /api/ai/train-model
   - Input: new treatment data
   - Process: add to vector database, update embeddings
   - Output: training confirmation

MEDICAL NLP:
- Extract symptoms from natural language
- Medical entity recognition
- Treatment recommendation engine
- Drug interaction checking

VECTOR DATABASE:
- Store treatment embeddings
- Patient similarity matching
- Symptom-treatment correlation
- Medical knowledge graphs

SECURITY:
- API key authentication
- Rate limiting
- Medical data privacy compliance
- Audit logging for AI decisions
```

#### **Backend AI Integration Prompt**
```
Integrate AI service with Spring Boot backend:

AI SERVICE CLIENT:
- Create AiServiceClient with RestTemplate
- Async communication with Python service
- Fallback mechanisms for service unavailability
- Response caching for common queries

CHAT CONTROLLER:
- POST /api/doctor/chat/message
- GET /api/doctor/chat/history/{patientId}
- POST /api/doctor/chat/suggestions
- PUT /api/doctor/chat/feedback/{messageId}

CHAT ENTITIES:
- ChatSession (id, doctorId, patientId, startTime, status)
- ChatMessage (id, sessionId, message, response, suggestionType, timestamp)
- AiSuggestion (id, messageId, suggestionText, confidenceScore, sourceType)

AI FEATURES:
- Treatment suggestion based on symptoms
- Similar case retrieval from history
- Drug interaction warnings
- Medical guideline references

WEBSOCKET INTEGRATION:
- Real-time chat communication
- AI suggestion streaming
- Typing indicators
- Message status updates

TRAINING DATA MANAGEMENT:
- Anonymize patient data for AI training
- Export training datasets
- Model performance tracking
- Feedback loop for AI improvement
```

### **10. AI Chat Interface**

#### **Frontend AI Chat Prompt**
```
Create AI-powered chat interface for doctors:

COMPONENTS:
1. ChatInterface:
   - Split layout: chat area (70%) + suggestions panel (30%)
   - Real-time messaging with WebSocket
   - Message typing indicators
   - File attachment support (X-rays, documents)

2. SuggestionPanel:
   - Toggle between "Web Suggestions" and "Clinic History"
   - Confidence score indicators
   - Source attribution (guidelines, similar cases)
   - Suggestion rating and feedback

3. ChatHistory:
   - Searchable conversation history
   - Filter by date, patient, suggestion type
   - Export conversation summaries
   - Bookmark important suggestions

CHAT FEATURES:
- Voice-to-text input
- Medical symbol keyboard
- Quick response templates
- Auto-save draft messages

AI INTEGRATION:
- Real-time suggestion generation
- Confidence score visualization
- Source linking for suggestions
- Feedback collection for AI improvement

DESIGN:
- WhatsApp-like chat interface
- Medical-themed color coding
- Professional typography
- Mobile-responsive design

WEBSOCKET:
- Real-time message delivery
- Typing indicators
- Online status
- Message read receipts
```

### **11. AI Model Training**

#### **AI Training Data Pipeline Prompt**
```
Create AI training data pipeline:

DATA PROCESSING:
- Patient data anonymization
- Treatment outcome labeling
- Medical text preprocessing
- Symptom-treatment correlation analysis

TRAINING PIPELINE:
- Automated model retraining
- Performance metric tracking
- A/B testing for model versions
- Feedback incorporation system

FEATURES:
1. Treatment Prediction:
   - Symptom -> Treatment mapping
   - Success rate prediction
   - Cost estimation
   - Duration forecasting

2. Similar Case Retrieval:
   - Vector similarity search
   - Patient matching algorithms
   - Treatment outcome comparison
   - Risk factor analysis

3. Medical Knowledge Integration:
   - Guideline compliance checking
   - Drug interaction detection
   - Allergy considerations
   - Age/condition-specific recommendations

MODEL MANAGEMENT:
- Version control for models
- Rollback capabilities
- Performance monitoring
- Continuous learning from feedback

EVALUATION METRICS:
- Suggestion accuracy
- Doctor adoption rate
- Patient outcome improvement
- Time savings quantification
```

---

## **PHASE 5: PRODUCTION READY PROMPTS**

### **12. Database Migration**

#### **PostgreSQL Migration Prompt**
```
Migrate from H2 to PostgreSQL:

DATABASE SETUP:
- PostgreSQL configuration
- Connection pooling
- Migration scripts from H2 schema
- Data backup and restore procedures

CONFIGURATION CHANGES:
- Update application.yml for production
- Environment-specific configurations
- Database connection security
- SSL configuration

MIGRATION STRATEGY:
- Zero-downtime migration approach
- Data validation and integrity checks
- Rollback procedures
- Performance optimization

PRODUCTION FEATURES:
- Database monitoring
- Automated backups
- Query optimization
- Index management

DATA MIGRATION:
- Export H2 data to SQL scripts
- Transform data for PostgreSQL
- Validate data integrity
- Performance testing with production data volume
```

### **13. Security Hardening**

#### **Security Implementation Prompt**
```
Implement production-grade security:

AUTHENTICATION:
- JWT token security hardening
- Token rotation and blacklisting
- Multi-factor authentication
- Session management

AUTHORIZATION:
- Fine-grained role-based access control
- API endpoint security
- Method-level security
- Resource-based permissions

DATA PROTECTION:
- Data encryption at rest and in transit
- PII data anonymization
- HIPAA compliance measures
- Audit trail implementation

API SECURITY:
- Rate limiting and throttling
- Input validation and sanitization
- SQL injection prevention
- XSS protection

MONITORING:
- Security event logging
- Intrusion detection
- Failed login monitoring
- Suspicious activity alerts

COMPLIANCE:
- GDPR compliance features
- Data retention policies
- Right to deletion
- Consent management
```

### **14. Performance Optimization**

#### **Performance Tuning Prompt**
```
Optimize application performance:

BACKEND OPTIMIZATION:
- Database query optimization
- Connection pooling configuration
- Caching strategies (Redis)
- Async processing implementation

FRONTEND OPTIMIZATION:
- Code splitting and lazy loading
- Image optimization and compression
- Bundle size reduction
- CDN implementation

API OPTIMIZATION:
- Response compression
- Pagination implementation
- GraphQL for efficient data fetching
- API response caching

MONITORING:
- Application performance monitoring
- Database performance tracking
- User experience monitoring
- Error tracking and reporting

SCALABILITY:
- Horizontal scaling preparation
- Load balancing configuration
- Database sharding strategies
- Microservices architecture planning
```

### **15. Deployment Setup**

#### **Production Deployment Prompt**
```
Create production deployment configuration:

CONTAINERIZATION:
- Docker containers for all services
- Multi-stage builds for optimization
- Health checks and monitoring
- Resource limits and scaling

ORCHESTRATION:
- Docker Compose for local development
- Kubernetes manifests for production
- Service discovery and load balancing
- Auto-scaling configuration

CI/CD PIPELINE:
- GitHub Actions or GitLab CI
- Automated testing and deployment
- Blue-green deployment strategy
- Rollback mechanisms

MONITORING:
- Application monitoring (Prometheus/Grafana)
- Log aggregation (ELK stack)
- Health checks and alerts
- Performance metrics tracking

BACKUP AND RECOVERY:
- Automated database backups
- File storage backup
- Disaster recovery procedures
- Data restoration testing

ENVIRONMENT MANAGEMENT:
- Development, staging, production environments
- Environment-specific configurations
- Secret management
- SSL certificate management
```

---

## **INTEGRATION PROMPTS**

### **16. Frontend-Backend Sync Prompt**
```
Ensure frontend and backend are perfectly synchronized:

API CONTRACT:
- OpenAPI/Swagger documentation
- Consistent response formats
- Error handling standards
- Version management

TYPE SAFETY:
- Generate TypeScript types from backend DTOs
- API client generation
- Runtime type validation
- Mock data generation

REAL-TIME FEATURES:
- WebSocket integration for chat
- Server-sent events for notifications
- Real-time data updates
- Offline capability

TESTING:
- End-to-end testing with Cypress
- API integration testing
- Component testing with React Testing Library
- Performance testing

DEVELOPMENT WORKFLOW:
- Hot reloading for development
- Proxy configuration for API calls
- Environment variable management
- Debug configuration
```

### **17. Final Integration Prompt**
```
Complete system integration and final testing:

SYSTEM TESTING:
- User acceptance testing scenarios
- Role-based workflow testing
- Data flow validation
- Security penetration testing

DEMO PREPARATION:
- Sample data creation
- Demo user accounts
- Feature showcase scenarios
- Performance benchmarking

DOCUMENTATION:
- User manuals for admin and doctors
- API documentation
- Deployment guides
- Troubleshooting guides

LAUNCH PREPARATION:
- Production environment setup
- Monitoring and alerting configuration
- Backup procedures validation
- Support process documentation

MAINTENANCE:
- Update procedures
- Bug tracking and resolution
- Feature request management
- Performance monitoring
```

---

## **PROMPT USAGE GUIDELINES**

### **For Cursor:**
1. Use specific prompts for individual features
2. Provide context about existing code structure
3. Ask for implementation with error handling
4. Request proper TypeScript types
5. Ensure responsive design compliance

### **For GitHub Copilot:**
1. Use prompts as comments in your code
2. Break down complex features into smaller functions
3. Request test cases along with implementation
4. Ask for documentation and examples
5. Ensure code follows project conventions

### **Development Order:**
1. Start with backend entity and repository
2. Create corresponding frontend types
3. Implement backend controller and service
4. Create frontend components and services
5. Test integration between frontend and backend
6. Add error handling and validation
7. Implement responsive design and styling

This comprehensive guide ensures your frontend and backend development stays synchronized throughout the entire development process!