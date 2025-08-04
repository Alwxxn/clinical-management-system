const { body } = require('express-validator');
const { validateStaffId, validateDate } = require('../../utils/validation');

exports.createAppointmentValidator = [
  body('patientId')
    .notEmpty().withMessage('Patient ID is required')
    .matches(/^PAT-\d{8}-[A-F0-9]{6}$/).withMessage('Patient ID must be in format PAT-YYYYMMDD-XXXXXX'),
  
  body('doctorId')
    .notEmpty().withMessage('Doctor ID is required')
    .custom((value) => {
      const validation = validateStaffId(value);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      if (validation.role !== 'doctor') {
        throw new Error('Doctor ID must be for a doctor role');
      }
      return true;
    }),
  
  body('date')
    .notEmpty().withMessage('Date is required')
    .custom((value) => {
      const validation = validateDate(value);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      // Check if date is not in the past
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (validation.parsedDate < today) {
        throw new Error('Appointment date cannot be in the past');
      }
      return true;
    }),
  
  body('timeSlot')
    .notEmpty().withMessage('Time slot is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time slot must be in format HH:MM-HH:MM (e.g., 10:00-10:30)')
    .custom((value) => {
      const [startTime, endTime] = value.split('-');
      const [startHour, startMin] = startTime.split(':').map(Number);
      const [endHour, endMin] = endTime.split(':').map(Number);
      
      // Check if time is within clinic hours (8 AM to 8 PM)
      if (startHour < 8 || startHour >= 20 || endHour < 8 || endHour >= 20) {
        throw new Error('Appointment time must be between 08:00 and 20:00');
      }
      
      // Check if end time is after start time
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      if (endMinutes <= startMinutes) {
        throw new Error('End time must be after start time');
      }
      
      // Check if slot duration is reasonable (15-60 minutes)
      const duration = endMinutes - startMinutes;
      if (duration < 15 || duration > 60) {
        throw new Error('Appointment slot must be between 15 and 60 minutes');
      }
      
      return true;
    }),
  
  body('createdBy')
    .isIn(['receptionist', 'patient'])
    .withMessage('createdBy must be receptionist or patient')
];

exports.updateAppointmentValidator = [
  body('date')
    .optional()
    .notEmpty().withMessage('Date is required')
    .custom((value) => {
      const validation = validateDate(value);
      if (!validation.isValid) {
        throw new Error(validation.message);
      }
      return true;
    }),
  
  body('timeSlot')
    .optional()
    .notEmpty().withMessage('Time slot is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]-([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Time slot must be in format HH:MM-HH:MM (e.g., 10:00-10:30)'),
  
  body('status')
    .optional()
    .isIn(['scheduled', 'completed', 'cancelled'])
    .withMessage('Status must be scheduled, completed, or cancelled')
]; 