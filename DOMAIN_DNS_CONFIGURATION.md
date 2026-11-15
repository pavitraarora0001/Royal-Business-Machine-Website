# DOMAIN & DNS CONFIGURATION REPORT

**Domain Name:** `royalbusinessmachine.com`  
**WWW Variant:** `www.royalbusinessmachine.com`  
**Current Registrar:** Hostinger  
**DNS Zone Manager:** Hostinger DNS Zone Editor  
**Target Hosting:** Vercel Global Edge Network  
**Cutover Policy:** **DO NOT APPLY DNS CHANGES UNTIL VERCEL PREVIEW IS FULLY APPROVED**

---

## 1. Executive DNS Strategy & Safety Rules

To ensure **zero downtime for corporate email** and a seamless web cutover:
1. **Keep Nameservers at Hostinger:** Do NOT change domain nameservers away from Hostinger. This keeps your domain registration, DNS management, and SSL renewal unified in one place.
2. **Preserve All Mail Records:** Do NOT delete or modify existing `MX`, `TXT` (SPF/DKIM/DMARC), or mail-related records. Your corporate email (`royalbusinessmachine@gmail.com` / Hostinger webmail) will experience zero disruption.
3. **Only Update Web Records:** You will only update the root (`@`) `A` record and the `www` `CNAME` record.

---

## 2. Target Vercel DNS Records Table

When ready for domain cutover (after Vercel preview testing passes), configure these two records in your **Hostinger DNS Zone Editor**:

| Record Type | Name / Host | Target / Value | TTL | Purpose |
| :---: | :---: | :--- | :---: | :--- |
| **`A`** | `@` (or leave empty) | `76.76.21.21` | `3600` (1 Hour) | Points root domain `royalbusinessmachine.com` to Vercel's Edge IP |
| **`CNAME`** | `www` | `cname.vercel-dns.com.` | `3600` (1 Hour) | Points `www.royalbusinessmachine.com` to Vercel and auto-redirects to root |

*(Optional for Decoupled Backend API Subdomain)*:
| Record Type | Name / Host | Target / Value | TTL | Purpose |
| :---: | :---: | :--- | :---: | :--- |
| **`CNAME`** | `api` | `<your-backend-service-address>` | `3600` | Points `api.royalbusinessmachine.com` to backend container host |

---

## 3. Preserved Records (DO NOT MODIFY OR DELETE)

The following existing Hostinger DNS records must remain completely untouched:

| Record Type | Host | Typical Value | Critical Function |
| :---: | :---: | :--- | :--- |
| **`MX`** | `@` | `mx1.hostinger.com` (Priority 5) | Receives incoming business emails |
| **`MX`** | `@` | `mx2.hostinger.com` (Priority 10) | Secondary backup mail server |
| **`TXT`** | `@` | `v=spf1 include:_spf.mail.hostinger.com ~all` | SPF email spoofing protection |
| **`TXT`** | `default._domainkey` | `v=DKIM1; k=rsa; p=...` | DKIM email cryptographic signing |
| **`TXT`** | `_dmarc` | `v=DMARC1; p=none; ...` | DMARC deliverability policy |

---

## 4. Step-by-Step DNS Cutover Instructions (In Hostinger Panel)

1. Log in to your [Hostinger Control Panel](https://hpanel.hostinger.com/).
2. Navigate to **Domains → royalbusinessmachine.com → DNS / Nameservers**.
3. Under **DNS Records**, locate the existing `A` record for `@`:
   - Note down the existing Hostinger IP address (for rollback safety).
   - Edit the record and update the IP to: `76.76.21.21`.
4. Locate the existing `CNAME` record for `www`:
   - Edit and update target to: `cname.vercel-dns.com.`.
5. Click **Save Changes**.
6. In **Vercel Dashboard → Project Settings → Domains**:
   - Add `royalbusinessmachine.com`.
   - Add `www.royalbusinessmachine.com` (set to redirect to `royalbusinessmachine.com`).
   - Vercel will automatically provision a free, auto-renewing **Let's Encrypt Wildcard SSL Certificate** within 5 to 15 minutes of DNS propagation.

---

## 5. Verification Commands

To verify that the DNS cutover has propagated correctly across global DNS resolvers, run the following commands in your terminal:

```bash
# Check Apex domain A record
nslookup royalbusinessmachine.com

# Expected output contains:
# Address: 76.76.21.21

# Check WWW CNAME record
nslookup www.royalbusinessmachine.com

# Expected output contains:
# Canonical name = cname.vercel-dns.com
```

---

*Report complete. Proceeding to Pre-Deployment QA Checklist.*
