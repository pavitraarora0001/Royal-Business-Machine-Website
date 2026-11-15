# CONTACT INFORMATION & INQUIRY CHANNELS — ROYAL BUSINESS MACHINE

**Document Version:** 2.0 (Verified Contact Master)  
**Entity:** ROYAL BUSINESS MACHINE (RBM)  
**Headquarters:** Bharatpur, Rajasthan, India

---

## 1. Direct Communication Channels

### Direct Phone Lines
- **Primary Operations & Business Desk:** `+91 9057287689`
- **Secondary Client & Support Line:** `+91 7727887850`
- **International / Corporate Format:** `+91-9057287689` / `+91-7727887850`

### Instant WhatsApp Connect
- **Direct WhatsApp Link 1:** [`https://wa.me/919057287689`](https://wa.me/919057287689)
- **Direct WhatsApp Link 2:** [`https://wa.me/917727887850`](https://wa.me/917727887850)
- **Pre-filled Message Prompt:** *"Hello Royal Business Machine team, I would like to inquire about your enterprise technology and business solutions."*

### Official Corporate Emails
- **Primary Business & Inquiries:** `royalbusinessmachine@gmail.com`
- **Corporate Desk:** `contact@royalbusiness.com`
- **Support & Client Desk:** `support@royalbusinessmachine.com`

---

## 2. Physical Headquarters & Operations Center

- **Registered Office:** Bharatpur, Rajasthan, India  
- **Regional Focus Areas:** Bharatpur, Karauli, Alwar, Dholpur, Sawai Madhopur, Jaipur & National Deployments  
- **Postal / Commercial Region:** 321001 / Tech District, Innovation Hub  
- **Google Maps Coordinates / Map Link:** Bharatpur, Rajasthan, India (`https://maps.google.com/?q=Bharatpur,+Rajasthan`)

---

## 3. Business Hours & Service Level Agreement (SLA)

| Day | Operating Hours | Support Channels |
| :--- | :--- | :--- |
| **Monday – Friday** | 09:00 AM – 07:00 PM IST | Phone, WhatsApp, Email, Scheduled Calls |
| **Saturday** | 10:00 AM – 05:00 PM IST | WhatsApp, Email, Urgent Technical Support |
| **Sunday** | Closed (On-Call Emergency Support) | On-Call Monitoring for Enterprise Server Deployments |

### Inquiries SLA
- **WhatsApp Inquiries:** Under 15 minutes during business hours.
- **Form Submissions & Emails:** Guaranteed response within 4 to 12 hours.
- **Enterprise RFP / Custom Quotes:** Complete scoping proposal within 24 to 48 hours.

---

## 4. Social Media Accounts & External Presences

- **LinkedIn:** `https://www.linkedin.com/company/royal-business-machine` (Corporate updates, executive hiring, tech insights)
- **Twitter / X:** `https://twitter.com/royalbizmachine` (Product updates, tech announcements)
- **Instagram:** `https://www.instagram.com/royalbusinessmachine` (Visual brand portfolios, print samples, project highlights)
- **Facebook:** `https://www.facebook.com/royalbusinessmachine` (Community outreach, regional business updates)
- **GitHub:** `https://github.com/pavitraarora0001` (Engineering repositories, open-source utilities)

---

## 5. Contact Form Data Schema & API Contract

The new enterprise contact page implements a fully functional form that hooks directly into the backend API `/api/contact` and provides client-side validation, error handling, and real-time email dispatch.

### Form Fields:
1. `name` (String, required): Full Name / Contact Person
2. `email` (String, required): Corporate or Business Email
3. `phone` (String, required): Mobile number with country code (+91 format)
4. `company` (String, optional): Organization or Institutional Name
5. `service` (Dropdown, required):
   - IT & Custom Software Development
   - Website & E-Commerce Engineering
   - Mobile App Development
   - Digital Marketing & SEO
   - Corporate Design & Brand Identity
   - Printing & Physical Collateral
   - Startup Consulting & Pitch Decks
   - Advanced AI / IoT / Institutional Solutions
6. `budget` (Dropdown, optional):
   - Under ₹50,000
   - ₹50,000 – ₹1,50,000
   - ₹1,50,000 – ₹5,00,000
   - ₹5,00,000+
7. `message` (String, required): Detailed project scope, requirements, or inquiry
8. `urgency` (Radio, optional): Immediate / Within 1 Month / Exploring Options

### Backend API Target:
- **Endpoint:** `POST /api/contact`
- **Payload:** `{ name, email, phone, subject, message }`
- **Fallback / Secondary Dispatch:** Direct email notification via SMTP + WhatsApp CTA redirection button upon successful dispatch.
