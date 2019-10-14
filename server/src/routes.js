const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')

const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

const routes = express.Router();
const upload = multer(uploadConfig);

// Session
routes.post('/sessions', SessionController.store);

// Spot
routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

// Dashboard
routes.get('/dashboard', DashboardController.show);

// Booking
routes.post('/spots/:spot_id/bookings', BookingController.store);
routes.post('/bookings/:booking_id/approvals', ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', RejectionController.store)

module.exports = routes;