import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
    return nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || 587),
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

// Send OTP Email
export const sendOTPEmail = async (email, otp, purpose) => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        console.log(`[DEV MODE] Simulated email sent to ${email} with OTP: ${otp}`);
        return { success: true, messageId: 'dev-mode-simulated' };
    }
    try {
        const transporter = createTransporter();

        let subject, html;

        if (purpose === 'registration') {
            subject = 'Verify Your Email - Royal Business Machine';
            html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Royal Business Machine</h1>
            </div>
            <div class="content">
              <h2>Email Verification</h2>
              <p>Thank you for registering with Royal Business Machine. Please use the OTP below to verify your email address:</p>
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
              </div>
              <p><strong>This OTP will expire in ${process.env.OTP_EXPIRE || 5} minutes.</strong></p>
              <p>If you didn't request this verification, please ignore this email.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Royal Business Machine. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;
        } else if (purpose === 'password-reset') {
            subject = 'Reset Your Password - Royal Business Machine';
            html = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .otp-box { background: white; border: 2px dashed #667eea; padding: 20px; text-align: center; margin: 20px 0; border-radius: 8px; }
            .otp-code { font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Reset Your Password</h2>
              <p>We received a request to reset your password. Use the OTP below to proceed:</p>
              <div class="otp-box">
                <div class="otp-code">${otp}</div>
              </div>
              <p><strong>This OTP will expire in ${process.env.OTP_EXPIRE || 5} minutes.</strong></p>
              <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Royal Business Machine. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `;
        }

        const mailOptions = {
            from: `"Royal Business Machine" <${process.env.EMAIL_FROM}>`,
            to: email,
            subject,
            html
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('✅ OTP Email sent:', info.messageId);
            return { success: true, messageId: info.messageId };
        } catch (mailErr) {
            if (process.env.NODE_ENV === 'development') {
                console.log(`[DEV MODE] Simulated email sent to ${email} with OTP: ${otp}`);
                return { success: true, messageId: 'dev-mode-simulated' };
            }
            throw mailErr;
        }
    } catch (error) {
        console.error('❌ Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
};

// Send Lead Notification to Admin
export const sendLeadNotification = async (lead) => {
    try {
        const transporter = createTransporter();

        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
          .label { font-weight: bold; color: #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Lead Received!</h1>
          </div>
          <div class="content">
            <h2>Lead Details</h2>
            <div class="info-row"><span class="label">Name:</span> ${lead.name}</div>
            <div class="info-row"><span class="label">Email:</span> ${lead.email}</div>
            <div class="info-row"><span class="label">Phone:</span> ${lead.phone}</div>
            ${lead.company ? `<div class="info-row"><span class="label">Company:</span> ${lead.company}</div>` : ''}
            ${lead.service ? `<div class="info-row"><span class="label">Service:</span> ${lead.service}</div>` : ''}
            <div class="info-row"><span class="label">Message:</span> ${lead.message}</div>
            <div class="info-row"><span class="label">Received:</span> ${new Date().toLocaleString()}</div>
          </div>
        </div>
      </body>
      </html>
    `;

        const mailOptions = {
            from: `"Royal Business Machine" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_USER, // Send to admin email
            subject: `New Lead: ${lead.name} - ${lead.service || 'General Inquiry'}`,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Lead notification sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending lead notification:', error);
        // Don't throw error - lead should still be saved even if email fails
        return { success: false, error: error.message };
    }
};

// Send Contact Form Notification
export const sendContactNotification = async (contact) => {
    try {
        const transporter = createTransporter();

        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-row { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
          .label { font-weight: bold; color: #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Form Submission</h1>
          </div>
          <div class="content">
            <h2>Contact Details</h2>
            <div class="info-row"><span class="label">Name:</span> ${contact.name}</div>
            <div class="info-row"><span class="label">Email:</span> ${contact.email}</div>
            <div class="info-row"><span class="label">Phone:</span> ${contact.phone}</div>
            <div class="info-row"><span class="label">Subject:</span> ${contact.subject}</div>
            <div class="info-row"><span class="label">Message:</span> ${contact.message}</div>
            <div class="info-row"><span class="label">Received:</span> ${new Date().toLocaleString()}</div>
          </div>
        </div>
      </body>
      </html>
    `;

        const mailOptions = {
            from: `"Royal Business Machine" <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_USER,
            subject: `Contact Form: ${contact.subject}`,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Contact notification sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending contact notification:', error);
        return { success: false, error: error.message };
    }
};

// Send Payment Receipt
export const sendPaymentReceipt = async (payment, user, invoicePath) => {
    try {
        const transporter = createTransporter();

        const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .success-badge { background: #10b981; color: white; padding: 10px 20px; border-radius: 20px; display: inline-block; margin: 20px 0; }
          .info-row { margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
          .label { font-weight: bold; color: #667eea; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Payment Successful</h1>
          </div>
          <div class="content">
            <div class="success-badge">Payment Confirmed</div>
            <h2>Payment Details</h2>
            <div class="info-row"><span class="label">Amount:</span> ₹${payment.amount.toLocaleString()}</div>
            <div class="info-row"><span class="label">Order ID:</span> ${payment.orderId}</div>
            <div class="info-row"><span class="label">Payment ID:</span> ${payment.razorpayPaymentId}</div>
            <div class="info-row"><span class="label">Date:</span> ${new Date().toLocaleString()}</div>
            ${payment.description ? `<div class="info-row"><span class="label">Description:</span> ${payment.description}</div>` : ''}
            <p style="margin-top: 20px;">Thank you for your payment. Your invoice is attached to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

        const mailOptions = {
            from: `"Royal Business Machine" <${process.env.EMAIL_FROM}>`,
            to: user.email,
            subject: `Payment Receipt - Order ${payment.orderId}`,
            html,
            attachments: invoicePath ? [{
                filename: `invoice-${payment.orderId}.pdf`,
                path: invoicePath
            }] : []
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Payment receipt sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending payment receipt:', error);
        return { success: false, error: error.message };
    }
};

export default {
    sendOTPEmail,
    sendLeadNotification,
    sendContactNotification,
    sendPaymentReceipt
};
