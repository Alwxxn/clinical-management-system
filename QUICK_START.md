# 🚀 Quick Start Guide

## Prerequisites Check
- ✅ Node.js installed
- ✅ MongoDB running
- ✅ Dependencies installed

## Step 1: Environment Setup

Create a `.env` file in the root directory:

```env
MONGO_URI=mongodb://localhost:27017/clinical_management_system
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

## Step 2: Start the Server

```bash
npm run dev
```

Server will start at: `http://localhost:5000`

## Step 3: Test in Postman

### Import the Collection
1. Open Postman
2. Import the file: `Clinical_Management_System.postman_collection.json`
3. Set the base URL to: `http://localhost:5000/api`

### Quick Test Sequence

1. **Create First Admin**
   - POST `{{baseUrl}}/staff/first-admin`
   - Body: See collection

2. **Login as Admin**
   - POST `{{baseUrl}}/login`
   - Save the token

3. **Create Staff Members**
   - Create Doctor, Receptionist, Pharmacist, LabTech
   - Use admin token in Authorization header

4. **Login as Each Staff Member**
   - Save tokens for each role

5. **Test Patient Workflow**
   - Register patient (as receptionist)
   - Schedule appointment (as receptionist)
   - Add consultation (as doctor)
   - Add medicine (as pharmacist)
   - Add lab result (as labtech)

## 🎯 Ready to Test!

Your Clinical Management System is now ready for end-to-end testing!

**Server Status**: ✅ Running on http://localhost:5000
**Database**: ✅ Connected to MongoDB
**API**: ✅ All routes configured

## 📋 Testing Checklist

- [ ] Create first admin
- [ ] Create all staff members
- [ ] Login as each staff member
- [ ] Register patients
- [ ] Schedule appointments
- [ ] Add consultations
- [ ] Manage medicines
- [ ] Add lab results
- [ ] Test all CRUD operations

## 🔧 Troubleshooting

**If MongoDB connection fails:**
- Ensure MongoDB is running
- Check if port 27017 is available

**If server won't start:**
- Check if port 5000 is available
- Verify .env file exists

**If API calls fail:**
- Check Authorization headers
- Verify token format: `Bearer {token}`
- Ensure correct role permissions

## 📞 Support

The system is now ready for your complete clinic workflow testing! 