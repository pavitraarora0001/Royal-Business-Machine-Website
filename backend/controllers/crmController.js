import ClientTestimonial from '../models/ClientTestimonial.js';
import TeamMember from '../models/TeamMember.js';
import Career from '../models/Career.js';
import Lead from '../models/Lead.js';
import Contact from '../models/Contact.js';
import ActivityLog from '../models/ActivityLog.js';
import { NotFoundError } from '../middleware/errorHandler.js';

// ==========================================
// 1. CLIENTS & TESTIMONIALS
// ==========================================

export const getAllTestimonials = async (req, res, next) => {
    try {
        const query = req.user && ['admin', 'super_admin', 'editor'].includes(req.user.role)
            ? {}
            : { isActive: true };

        const testimonials = await ClientTestimonial.find(query).sort({ order: 1, createdAt: -1 });

        res.status(200).json({
            success: true,
            data: { testimonials }
        });
    } catch (error) {
        next(error);
    }
};

export const createTestimonial = async (req, res, next) => {
    try {
        const testimonial = await ClientTestimonial.create(req.body);

        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Admin',
            userRole: req.user?.role || 'admin',
            action: 'CREATE_TESTIMONIAL',
            module: 'Clients & Testimonials',
            targetId: testimonial._id.toString(),
            targetName: testimonial.clientName,
            ipAddress: req.ip
        });

        res.status(201).json({
            success: true,
            data: { testimonial }
        });
    } catch (error) {
        next(error);
    }
};

export const updateTestimonial = async (req, res, next) => {
    try {
        const testimonial = await ClientTestimonial.findById(req.params.id);
        if (!testimonial) return next(new NotFoundError('Testimonial not found'));

        Object.assign(testimonial, req.body);
        await testimonial.save();

        res.status(200).json({
            success: true,
            data: { testimonial }
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTestimonial = async (req, res, next) => {
    try {
        const testimonial = await ClientTestimonial.findById(req.params.id);
        if (!testimonial) return next(new NotFoundError('Testimonial not found'));

        await testimonial.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Testimonial deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// ==========================================
// 2. TEAM MEMBERS
// ==========================================

export const getAllTeamMembers = async (req, res, next) => {
    try {
        const query = req.user && ['admin', 'super_admin', 'editor'].includes(req.user.role)
            ? {}
            : { isActive: true };

        const team = await TeamMember.find(query).sort({ order: 1, createdAt: 1 });

        res.status(200).json({
            success: true,
            data: { team }
        });
    } catch (error) {
        next(error);
    }
};

export const createTeamMember = async (req, res, next) => {
    try {
        const member = await TeamMember.create(req.body);

        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Admin',
            userRole: req.user?.role || 'admin',
            action: 'CREATE_TEAM_MEMBER',
            module: 'Team Management',
            targetId: member._id.toString(),
            targetName: member.name,
            ipAddress: req.ip
        });

        res.status(201).json({
            success: true,
            data: { member }
        });
    } catch (error) {
        next(error);
    }
};

export const updateTeamMember = async (req, res, next) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) return next(new NotFoundError('Team member not found'));

        Object.assign(member, req.body);
        await member.save();

        res.status(200).json({
            success: true,
            data: { member }
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTeamMember = async (req, res, next) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (!member) return next(new NotFoundError('Team member not found'));

        await member.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Team member deleted'
        });
    } catch (error) {
        next(error);
    }
};

// ==========================================
// 3. CAREERS & POSITIONS
// ==========================================

export const getAllCareers = async (req, res, next) => {
    try {
        const query = req.user && ['admin', 'super_admin', 'editor'].includes(req.user.role)
            ? {}
            : { isActive: true };

        const careers = await Career.find(query).sort({ order: 1, createdAt: -1 });

        res.status(200).json({
            success: true,
            data: { careers }
        });
    } catch (error) {
        next(error);
    }
};

export const createCareer = async (req, res, next) => {
    try {
        const career = await Career.create(req.body);

        await ActivityLog.create({
            user: req.user?._id,
            userName: req.user?.name || 'Admin',
            userRole: req.user?.role || 'admin',
            action: 'CREATE_CAREER',
            module: 'Careers',
            targetId: career._id.toString(),
            targetName: career.title,
            ipAddress: req.ip
        });

        res.status(201).json({
            success: true,
            data: { career }
        });
    } catch (error) {
        next(error);
    }
};

export const updateCareer = async (req, res, next) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) return next(new NotFoundError('Position not found'));

        Object.assign(career, req.body);
        await career.save();

        res.status(200).json({
            success: true,
            data: { career }
        });
    } catch (error) {
        next(error);
    }
};

export const deleteCareer = async (req, res, next) => {
    try {
        const career = await Career.findById(req.params.id);
        if (!career) return next(new NotFoundError('Position not found'));

        await career.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Position deleted'
        });
    } catch (error) {
        next(error);
    }
};

// ==========================================
// 4. INQUIRIES & LEADS ADVANCED CRM
// ==========================================

export const addLeadNote = async (req, res, next) => {
    try {
        const { note } = req.body;
        const lead = await Lead.findById(req.params.id);
        if (!lead) return next(new NotFoundError('Lead not found'));

        lead.notes.push({
            note,
            addedBy: req.user?._id,
            addedAt: new Date()
        });

        await lead.save();

        res.status(200).json({
            success: true,
            message: 'Internal note added to lead record',
            data: { notes: lead.notes }
        });
    } catch (error) {
        next(error);
    }
};

export const assignLead = async (req, res, next) => {
    try {
        const { assignedTo } = req.body;
        const lead = await Lead.findById(req.params.id);
        if (!lead) return next(new NotFoundError('Lead not found'));

        lead.assignedTo = assignedTo;
        await lead.save();

        res.status(200).json({
            success: true,
            message: 'Lead assigned successfully',
            data: { lead }
        });
    } catch (error) {
        next(error);
    }
};

export const exportLeadsCsv = async (req, res, next) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 });

        let csv = 'ID,Name,Email,Phone,Company,Service,Status,Source,Date\n';
        leads.forEach(l => {
            const date = new Date(l.createdAt).toLocaleDateString('en-IN');
            const cleanMessage = (l.message || '').replace(/"/g, '""');
            csv += `"${l._id}","${l.name}","${l.email}","${l.phone}","${l.company || ''}","${l.service || ''}","${l.status}","${l.source}","${date}"\n`;
        });

        res.header('Content-Type', 'text/csv');
        res.attachment(`rbm_leads_export_${Date.now()}.csv`);
        res.send(csv);
    } catch (error) {
        next(error);
    }
};
