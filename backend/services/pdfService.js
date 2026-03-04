import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure invoices directory exists
const invoicesDir = path.join(process.env.UPLOAD_PATH || './uploads', 'invoices');
if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
}

// Generate Invoice Number
const generateInvoiceNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(1000 + Math.random() * 9000);
    return `RBM-${year}${month}-${random}`;
};

// Generate Invoice PDF
export const generateInvoice = async (payment, user) => {
    return new Promise((resolve, reject) => {
        try {
            const invoiceNumber = generateInvoiceNumber();
            const filename = `invoice-${payment.orderId}.pdf`;
            const filepath = path.join(invoicesDir, filename);

            // Create PDF document
            const doc = new PDFDocument({ margin: 50 });
            const stream = fs.createWriteStream(filepath);

            doc.pipe(stream);

            // Header
            doc
                .fontSize(20)
                .fillColor('#667eea')
                .text('ROYAL BUSINESS MACHINE', 50, 50);

            doc
                .fontSize(10)
                .fillColor('#666')
                .text('Premium Business Solutions', 50, 75)
                .text('Email: info@royalbusinessmachine.com', 50, 90)
                .text('Phone: +91 1234567890', 50, 105);

            // Invoice Title
            doc
                .fontSize(24)
                .fillColor('#333')
                .text('INVOICE', 400, 50);

            doc
                .fontSize(10)
                .fillColor('#666')
                .text(`Invoice #: ${invoiceNumber}`, 400, 80)
                .text(`Date: ${new Date().toLocaleDateString()}`, 400, 95)
                .text(`Order ID: ${payment.orderId}`, 400, 110);

            // Horizontal line
            doc
                .strokeColor('#667eea')
                .lineWidth(2)
                .moveTo(50, 140)
                .lineTo(550, 140)
                .stroke();

            // Bill To Section
            doc
                .fontSize(12)
                .fillColor('#333')
                .text('BILL TO:', 50, 160);

            doc
                .fontSize(10)
                .fillColor('#666')
                .text(user.name, 50, 180)
                .text(user.email, 50, 195)
                .text(user.phone, 50, 210);

            if (user.company) {
                doc.text(user.company, 50, 225);
            }

            // Payment Details Section
            doc
                .fontSize(12)
                .fillColor('#333')
                .text('PAYMENT DETAILS:', 50, 270);

            // Table Header
            const tableTop = 300;
            doc
                .fontSize(10)
                .fillColor('#fff')
                .rect(50, tableTop, 500, 25)
                .fill('#667eea');

            doc
                .fillColor('#fff')
                .text('Description', 60, tableTop + 8)
                .text('Amount', 450, tableTop + 8);

            // Table Row
            doc
                .fillColor('#333')
                .text(payment.description || 'Service Payment', 60, tableTop + 40)
                .text(`₹${payment.amount.toLocaleString()}`, 450, tableTop + 40);

            // Subtotal and Total
            const subtotalY = tableTop + 80;
            doc
                .fontSize(10)
                .fillColor('#666')
                .text('Subtotal:', 400, subtotalY)
                .text(`₹${payment.amount.toLocaleString()}`, 480, subtotalY);

            doc
                .fontSize(12)
                .fillColor('#333')
                .text('Total:', 400, subtotalY + 20)
                .text(`₹${payment.amount.toLocaleString()}`, 480, subtotalY + 20);

            // Payment Status
            const statusY = subtotalY + 60;
            doc
                .fontSize(10)
                .fillColor('#10b981')
                .text('Payment Status: PAID', 50, statusY)
                .fillColor('#666')
                .text(`Payment ID: ${payment.razorpayPaymentId}`, 50, statusY + 20)
                .text(`Payment Method: Razorpay`, 50, statusY + 35)
                .text(`Transaction Date: ${new Date().toLocaleString()}`, 50, statusY + 50);

            // Footer
            doc
                .fontSize(8)
                .fillColor('#999')
                .text(
                    'Thank you for your business! This is a computer-generated invoice.',
                    50,
                    700,
                    { align: 'center', width: 500 }
                );

            doc
                .text(
                    '© ' + new Date().getFullYear() + ' Royal Business Machine. All rights reserved.',
                    50,
                    720,
                    { align: 'center', width: 500 }
                );

            // Finalize PDF
            doc.end();

            stream.on('finish', () => {
                console.log('✅ Invoice PDF generated:', filename);
                resolve({
                    success: true,
                    invoiceNumber,
                    filename,
                    filepath
                });
            });

            stream.on('error', (error) => {
                console.error('❌ Error generating invoice PDF:', error);
                reject(new Error('Failed to generate invoice'));
            });
        } catch (error) {
            console.error('❌ Error in generateInvoice:', error);
            reject(error);
        }
    });
};

// Generate Receipt PDF (simpler version)
export const generateReceipt = async (payment, user) => {
    return new Promise((resolve, reject) => {
        try {
            const filename = `receipt-${payment.orderId}.pdf`;
            const filepath = path.join(invoicesDir, filename);

            const doc = new PDFDocument({ margin: 50 });
            const stream = fs.createWriteStream(filepath);

            doc.pipe(stream);

            // Header
            doc
                .fontSize(24)
                .fillColor('#667eea')
                .text('PAYMENT RECEIPT', { align: 'center' });

            doc.moveDown();

            // Receipt Details
            doc
                .fontSize(12)
                .fillColor('#333')
                .text(`Receipt for: ${user.name}`)
                .text(`Email: ${user.email}`)
                .text(`Order ID: ${payment.orderId}`)
                .text(`Payment ID: ${payment.razorpayPaymentId}`)
                .text(`Amount Paid: ₹${payment.amount.toLocaleString()}`)
                .text(`Date: ${new Date().toLocaleString()}`)
                .text(`Status: ${payment.status.toUpperCase()}`);

            doc.moveDown();

            doc
                .fontSize(10)
                .fillColor('#666')
                .text('Thank you for your payment!', { align: 'center' });

            doc.end();

            stream.on('finish', () => {
                console.log('✅ Receipt PDF generated:', filename);
                resolve({
                    success: true,
                    filename,
                    filepath
                });
            });

            stream.on('error', (error) => {
                console.error('❌ Error generating receipt PDF:', error);
                reject(new Error('Failed to generate receipt'));
            });
        } catch (error) {
            console.error('❌ Error in generateReceipt:', error);
            reject(error);
        }
    });
};

export default {
    generateInvoice,
    generateReceipt
};
