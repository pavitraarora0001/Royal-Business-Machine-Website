# ROYAL BUSINESS MACHINE — DATABASE MIGRATION REPORT

**Database Engine:** MongoDB  
**Object-Document Mapper (ODM):** Mongoose 8.0.0  
**Current Source:** Local MongoDB Instance (`localhost:27017/royal-business-machine`) / Hostinger VPS  
**Target Destination:** MongoDB Atlas (Managed Cloud Cluster)  
**Region Recommendation:** AWS Mumbai (`ap-south-1`) for sub-20ms latency to Indian users  
**Security Standard:** Strict zero-credential disclosure policy (no passwords or URI tokens printed)

---

## 1. Existing Database Audit & Collections Inventory

An audit of the Mongoose data models in `backend/models/` reveals 7 primary collections structured as follows:

| Collection Name | Model File | Purpose / Schema Contents | Critical Data Preserved |
| :--- | :--- | :--- | :--- |
| **`users`** | `User.js` | User identity, credentials, roles (`client`, `admin`, `super_admin`), company profiles, verification status | Seeded admin, verified clients, hashed passwords, RBAC roles |
| **`contacts`** | `Contact.js` | Inbound inquiries, subject lines, budgets, customer phone, IP tracking, status (`pending`, `reviewed`) | All historical and QA-verified inquiries |
| **`leads`** | `Lead.js` | Business leads scoped by budget and service interest | Commercial opportunity pipeline records |
| **`services`** | `Service.js` | Service catalog entries, categories, feature lists, pricing estimates | Service specifications & deliverables |
| **`portfolios`** | `Portfolio.js` | Case study records (Dairy Muneem, HMS, Jaivik Desh, etc.) | Project descriptions, client names, technologies |
| **`payments`** | `Payment.js` | Razorpay order IDs, payment IDs, currency, payment statuses | Transaction audit logs |
| **`otps`** | `OTP.js` | Ephemeral OTP verification codes with TTL expiry indexes | Verification records |

---

## 2. Step-by-Step MongoDB Atlas Migration Plan

### Step 1: Create MongoDB Atlas Cluster
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster:
   - **Tier:** Shared (M0 Free Tier) for staging/preview, or M10+ for dedicated production SLAs.
   - **Cloud Provider & Region:** AWS — `ap-south-1` (Mumbai, India).
3. Under **Security → Database Access**:
   - Create a dedicated database user (e.g. `rbm_prod_user`).
   - Assign role: **Read and write to any database**.
   - Generate a strong, cryptographically secure password (save securely in a password manager).
4. Under **Security → Network Access**:
   - Add IP Access List entry: `0.0.0.0/0` (Allow access from anywhere) so that Vercel serverless and backend containers can communicate without static IP restrictions.

### Step 2: Backup Current Local / Hostinger Database
Run the standard MongoDB backup utility to extract all collections and indexes:

```bash
# Export all collections into a timestamped archive
mongodump --db=royal-business-machine --out=./rbm_db_backup_$(date +%Y%m%d)
```

### Step 3: Restore to MongoDB Atlas
Restore the exported collections and indexes to the cloud cluster:

```bash
# Restore directly into the target Atlas cluster
mongorestore --uri="mongodb+srv://<username>:<password>@<cluster-address>.mongodb.net/royal_business" --drop ./rbm_db_backup_*/royal-business-machine/
```

### Step 4: Verify Data Integrity
Verify that all document counts match 100% between source and destination:

```javascript
// Verification script in node
import mongoose from 'mongoose';
import User from './models/User.js';
import Contact from './models/Contact.js';

await mongoose.connect(process.env.MONGODB_URI);
console.log('Users in Atlas:', await User.countDocuments());
console.log('Contacts in Atlas:', await Contact.countDocuments());
```

---

## 3. Mongoose Connection Configuration for Atlas

The connection utility in [backend/config/database.js](file:///c:/Pavitra-Arora\Royal-Business-Machine-Website\backend\config\database.js) is pre-configured with production resilience parameters:

```javascript
const conn = await mongoose.connect(process.env.MONGODB_URI, {
    maxPoolSize: 10,              // Maintains up to 10 persistent sockets
    serverSelectionTimeoutMS: 5000,// Fails fast if cluster unreachable
    socketTimeoutMS: 45000,       // Prevents socket hang
});
```

---

## 4. Rollback & Data Safety Guarantees

1. **Zero Overwrite of Existing Records:** The local and Hostinger database instances remain running untouched during the entire migration.
2. **Dual-Write / Verification Window:** Both environments can remain accessible until cutover approval is given.
3. **Automated Cloud Snapshots:** Once on MongoDB Atlas, automated daily cluster snapshots provide point-in-time recovery.

---

*Report complete. Proceeding to Domain DNS Configuration Report.*
