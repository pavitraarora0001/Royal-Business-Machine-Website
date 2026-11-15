import express from 'express';
import {
    getAllTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    getAllTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    getAllCareers,
    createCareer,
    updateCareer,
    deleteCareer,
    addLeadNote,
    assignLead,
    exportLeadsCsv
} from '../controllers/crmController.js';
import { protect, restrictTo, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes (for public website components with optionalAuth)
router.get('/testimonials', optionalAuth, getAllTestimonials);
router.get('/team', optionalAuth, getAllTeamMembers);
router.get('/careers', optionalAuth, getAllCareers);

// Protected routes (Admin / Super Admin / Editor / Sales)
router.use(protect);

// Testimonials management
router.post('/testimonials', restrictTo('admin', 'super_admin', 'editor'), createTestimonial);
router.put('/testimonials/:id', restrictTo('admin', 'super_admin', 'editor'), updateTestimonial);
router.delete('/testimonials/:id', restrictTo('admin', 'super_admin'), deleteTestimonial);

// Team management
router.post('/team', restrictTo('admin', 'super_admin', 'editor'), createTeamMember);
router.put('/team/:id', restrictTo('admin', 'super_admin', 'editor'), updateTeamMember);
router.delete('/team/:id', restrictTo('admin', 'super_admin'), deleteTeamMember);

// Careers management
router.post('/careers', restrictTo('admin', 'super_admin', 'editor'), createCareer);
router.put('/careers/:id', restrictTo('admin', 'super_admin', 'editor'), updateCareer);
router.delete('/careers/:id', restrictTo('admin', 'super_admin'), deleteCareer);

// CRM Inquiry extensions (Notes, Assignment, Export)
router.post('/leads/:id/notes', restrictTo('admin', 'super_admin', 'sales'), addLeadNote);
router.patch('/leads/:id/assign', restrictTo('admin', 'super_admin', 'sales'), assignLead);
router.get('/leads/export/csv', restrictTo('admin', 'super_admin', 'sales'), exportLeadsCsv);

export default router;
