# HOSTING MIGRATION ROLLBACK & CONTINGENCY PLAN

**Project:** Royal Business Machine  
**Domain:** `royalbusinessmachine.com` / `www.royalbusinessmachine.com`  
**Rollback Time Objective (RTO):** Less than 15 Minutes  
**Recovery Point Objective (RPO):** Zero Data Loss  
**Active Migration Branch:** `redesign/premium-migration`  

---

## 1. Rollback Trigger Criteria

An immediate rollback to the existing Hostinger hosting environment must be initiated if any of the following critical conditions occur during or immediately following DNS cutover:

1. **Unresolved SSL Certificate Failure:** Vercel fails to issue an SSL certificate within 45 minutes of DNS propagation, resulting in browser security warnings.
2. **Persistent API Routing Blackout:** Inability to proxy contact inquiries or authentication requests to the backend for more than 15 minutes.
3. **Database Connectivity Failure:** MongoDB Atlas cluster becomes unreachable and fails connection retries.
4. **Catastrophic Layout / Brand Defect:** Critical functional or visual blockage reported that cannot be hotfixed within 15 minutes.

---

## 2. Immediate Step-by-Step DNS Rollback Procedure

Because DNS authority remains at Hostinger throughout the entire process, rolling back is immediate and requires updating only the `A` and `CNAME` records:

```
[ Rollback Action ]
Hostinger Control Panel ──► DNS Zone Editor ──► Restore Original Hostinger IP ──► Global DNS Reverts
```

### Action Steps:
1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com/).
2. Navigate to **Domains → royalbusinessmachine.com → DNS / Nameservers**.
3. Locate the `A` record for `@`:
   - Replace `76.76.21.21` (Vercel IP) with the **Original Hostinger Server IP Address** (noted during the pre-migration audit).
4. Locate the `CNAME` record for `www`:
   - Change target from `cname.vercel-dns.com.` back to `royalbusinessmachine.com.` (or Hostinger default).
5. Click **Save Changes**.
6. Set TTL to `300` (5 minutes) for rapid global propagation.
7. Web traffic will immediately begin flowing back to the original Hostinger server.

---

## 3. Database & Data Synchronization Safeguards

1. **No Data Lost on Hostinger:** The original Hostinger database was never deleted or overwritten during migration.
2. **Inbound Lead Reconciliation:**
   - Any new leads or contact inquiries submitted while traffic was routed to Vercel/Atlas will be extracted from MongoDB Atlas using:
     ```bash
     mongoexport --uri="mongodb+srv://.../royal_business" --collection=contacts --out=new_leads_during_migration.json
     ```
   - These records will be imported back into the Hostinger database to ensure 0 lost inquiries.

---

## 4. Git Branch & Code Isolation

- The `main` branch was left completely untouched throughout the entire migration process.
- All migration code, rewrites, and Vercel configurations reside exclusively on `redesign/premium-migration`.
- To abort code changes, simply remain on `main` branch or create a hotfix branch without modifying production Git history.

---

## 5. Emergency Incident Escalation Matrix

| Role | Contact Channel | Responsibility |
| :--- | :--- | :--- |
| **Founder & CEO (Pavitra Arora)** | Phone: `+91 9057287689` / WhatsApp | Executive cutover authorization & final rollback sign-off |
| **Lead DevOps & Cloud Engineer** | Phone: `+91 7727887850` | DNS Zone modification & database sync execution |
| **Emergency Operations Desk** | Email: `royalbusinessmachine@gmail.com` | Incident ticketing & partner notification |

---

*All 8 master migration documents are now complete and staged.*
