# Clinical Management System - Setup & Testing Guide

## Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (running locally or cloud instance)
3. **Postman** (for API testing)

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory with the following content:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/clinical_management_system

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Server Configuration
PORT=5000

# Environment
NODE_ENV=development
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:
- **Windows**: Start MongoDB service
- **Mac/Linux**: `sudo systemctl start mongod`

### 4. Start the Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Postman Testing Workflow

### Step 1: Create First Admin

**POST** `http://localhost:5000/api/staff/first-admin`

```json
{
  "name": "Admin User",
  "dob": "1990-01-01",
  "gender": "Male",
  "phone": "+911234567890",
  "address": "123 Admin Street, City",
  "email": "admin@clinic.com",
  "password": "admin123"
}
```

### Step 2: Login as Admin

**POST** `http://localhost:5000/api/login`

```json
{
  "email": "admin@clinic.com",
  "password": "admin123"
}
```

**Save the token** from the response for subsequent requests.

### Step 3: Create Staff Members

**POST** `http://localhost:5000/api/staff`
*Headers: Authorization: Bearer {admin_token}*

#### Create a Doctor:
```json
{
  "name": "Dr. John Smith",
  "dob": "1985-05-15",
  "gender": "Male",
  "phone": "+911234567891",
  "address": "456 Doctor Lane, City",
  "email": "doctor@clinic.com",
  "role": "doctor",
  "specialisation": "Cardiology",
  "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  "fee": 500,
  "password": "doctor123"
}
```

#### Create a Receptionist:
```json
{
  "name": "Jane Receptionist",
  "dob": "1992-03-20",
  "gender": "Female",
  "phone": "+911234567892",
  "address": "789 Reception Ave, City",
  "email": "receptionist@clinic.com",
  "role": "receptionist",
  "password": "receptionist123"
}
```

#### Create a Pharmacist:
```json
{
  "name": "Mike Pharmacist",
  "dob": "1988-07-10",
  "gender": "Male",
  "phone": "+911234567893",
  "address": "321 Pharmacy Road, City",
  "email": "pharmacist@clinic.com",
  "role": "pharmacist",
  "password": "pharmacist123"
}
```

#### Create a Lab Technician:
```json
{
  "name": "Sarah LabTech",
  "dob": "1991-11-25",
  "gender": "Female",
  "phone": "+911234567894",
  "address": "654 Lab Street, City",
  "email": "labtech@clinic.com",
  "role": "labtech",
  "password": "labtech123"
}
```

### Step 4: Login as Receptionist

**POST** `http://localhost:5000/api/login`

```json
{
  "email": "receptionist@clinic.com",
  "password": "receptionist123"
}
```

### Step 5: Register Patients

**POST** `http://localhost:5000/api/patients`
*Headers: Authorization: Bearer {receptionist_token}*

```json
{
  "name": "Patient One",
  "dob": "1980-12-15",
  "gender": "Male",
  "phone": "+911234567895",
  "address": "123 Patient Street, City",
  "email": "patient1@email.com"
}
```

### Step 6: Schedule Appointments

**POST** `http://localhost:5000/api/appointments`
*Headers: Authorization: Bearer {receptionist_token}*

```json
{
  "patientId": "PAT-20240607-ABC123",
  "doctorId": "{doctor_user_id}",
  "date": "2024-06-10",
  "timeSlot": "10:00-10:30",
  "createdBy": "receptionist"
}
```

### Step 7: Login as Doctor

**POST** `http://localhost:5000/api/login`

```json
{
  "email": "doctor@clinic.com",
  "password": "doctor123"
}
```

### Step 8: Add Consultation Notes

**POST** `http://localhost:5000/api/consultations`
*Headers: Authorization: Bearer {doctor_token}*

```json
{
  "appointmentId": "APT-123456",
  "doctorId": "{doctor_user_id}",
  "patientId": "PAT-20240607-ABC123",
  "symptoms": "Fever, headache, fatigue",
  "diagnosis": "Common cold",
  "notes": "Patient shows symptoms of common cold. Rest and fluids recommended.",
  "prescription": "Paracetamol 500mg",
  "medicine": "Paracetamol",
  "labTest": "Blood test if symptoms persist"
}
```

### Step 9: Login as Pharmacist

**POST** `http://localhost:5000/api/login`

```json
{
  "email": "pharmacist@clinic.com",
  "password": "pharmacist123"
}
```

### Step 10: Add Medicines

**POST** `http://localhost:5000/api/medicines`
*Headers: Authorization: Bearer {pharmacist_token}*

```json
{
  "name": "Paracetamol",
  "genericName": "Acetaminophen",
  "strength": "500mg",
  "expiry": "2025-12-31",
  "dosage": "1 tablet every 6 hours"
}
```

### Step 11: Manage Medicine Inventory

**POST** `http://localhost:5000/api/medicine-inventory`
*Headers: Authorization: Bearer {pharmacist_token}*

```json
{
  "medicineId": "{medicine_id}",
  "quantity": 100,
  "lowStock": false
}
```

### Step 12: Login as Lab Technician

**POST** `http://localhost:5000/api/login`

```json
{
  "email": "labtech@clinic.com",
  "password": "labtech123"
}
```

### Step 13: Add Lab Test Results

**POST** `http://localhost:5000/api/lab-test-results`
*Headers: Authorization: Bearer {labtech_token}*

```json
{
  "appointmentId": "APT-123456",
  "patientId": "PAT-20240607-ABC123",
  "testName": "Blood Test",
  "testResult": "Normal",
  "testDate": "2024-06-10",
  "notes": "All parameters within normal range"
}
```

## API Endpoints Summary

### Admin Routes
- `POST /api/staff/first-admin` - Create first admin
- `POST /api/staff` - Create staff members
- `GET /api/staff` - List all staff
- `GET /api/staff/:staffId` - Get staff by ID
- `PUT /api/staff/:staffId` - Update staff
- `PATCH /api/staff/:staffId/deactivate` - Deactivate staff

### Authentication
- `POST /api/login` - Staff login
- `POST /api/change-password` - Change password

### Patient Management
- `POST /api/patients` - Register patient
- `GET /api/patients` - List all patients
- `GET /api/patients/:patientId` - Get patient by ID
- `PUT /api/patients/:patientId` - Update patient
- `PATCH /api/patients/:patientId/deactivate` - Deactivate patient

### Appointment Management
- `POST /api/appointments` - Schedule appointment
- `GET /api/appointments` - List appointments by date
- `GET /api/appointments/:appointmentId` - Get appointment by ID
- `PUT /api/appointments/:appointmentId` - Update appointment
- `PATCH /api/appointments/:appointmentId/cancel` - Cancel appointment

### Consultation Management
- `POST /api/consultations` - Add consultation
- `GET /api/consultations/appointment/:appointmentId` - Get consultation by appointment
- `PUT /api/consultations/:consultationId` - Update consultation

### Medicine Management
- `POST /api/medicines` - Add medicine
- `GET /api/medicines` - List all medicines
- `PUT /api/medicines/:medicineId` - Update medicine

### Inventory Management
- `POST /api/medicine-inventory` - Add inventory
- `GET /api/medicine-inventory` - List inventory
- `PUT /api/medicine-inventory/:inventoryId` - Update inventory

### Lab Test Results
- `POST /api/lab-test-results` - Add test result
- `GET /api/lab-test-results` - List test results
- `GET /api/lab-test-results/:resultId` - Get test result by ID

## Testing Tips

1. **Save tokens**: After each login, save the JWT token for subsequent requests
2. **Use IDs**: Save the IDs returned from create operations for update/delete operations
3. **Check responses**: Always verify the response status and data
4. **Test error cases**: Try invalid data to test validation
5. **Test permissions**: Try accessing routes with different user roles

## Common Issues & Solutions

1. **MongoDB Connection Error**: Ensure MongoDB is running
2. **JWT Token Error**: Check if token is valid and not expired
3. **Validation Errors**: Check the request body format
4. **Permission Denied**: Ensure user has the required role for the endpoint

## Complete Clinic Workflow Test

1. Create admin → Login as admin
2. Create staff (doctor, receptionist, pharmacist, labtech) → Login as each
3. Register patients → Schedule appointments
4. Add consultations → Prescribe medicines/tests
5. Manage pharmacy inventory → Process prescriptions
6. Add lab test results → Complete patient care cycle

This workflow simulates a complete patient journey through the clinic system! 