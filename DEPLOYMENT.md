# Deployment Guide for Mustafa Travel Backend

## Server Setup Instructions

### 1. Install Dependencies

On your server, navigate to the backend directory and install dependencies:

```bash
cd /var/www/mustafatravel/backend
npm install
```

### 2. Create Logs Directory

```bash
mkdir -p /var/www/mustafatravel/backend/logs
```

### 3. Setup PM2

#### Option A: Using Ecosystem File (Recommended)

1. Copy the ecosystem config to your server:
   ```bash
   # The ecosystem.backend.config.js should be in /var/www/mustafatravel/backend/
   ```

2. Start with PM2:
   ```bash
   pm2 start ecosystem.backend.config.js
   ```

3. Save PM2 configuration:
   ```bash
   pm2 save
   pm2 startup
   ```

#### Option B: Manual PM2 Start

```bash
cd /var/www/mustafatravel/backend
pm2 start server.js --name mustafa-backend --cwd /var/www/mustafatravel/backend
pm2 save
```

### 4. Verify Backend is Running

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs mustafa-backend

# Test if server is responding
curl http://localhost:7000/api/auth/login
```

### 5. Common Issues and Fixes

#### Issue: "Cannot find package 'express'"

**Solution:**
```bash
cd /var/www/mustafatravel/backend
npm install
pm2 restart mustafa-backend
```

#### Issue: 502 Bad Gateway

**Check:**
1. Is the backend running?
   ```bash
   pm2 status
   ```

2. Is it listening on port 7000?
   ```bash
   netstat -tlnp | grep 7000
   # or
   ss -tlnp | grep 7000
   ```

3. Check backend logs:
   ```bash
   pm2 logs mustafa-backend --lines 50
   ```

#### Issue: MongoDB Connection Failed

**Check:**
1. Verify `.env` file has correct `MONGO_URI`
2. Check MongoDB Atlas IP whitelist includes your server IP
3. Test MongoDB connection:
   ```bash
   node -e "import('mongoose').then(m => m.default.connect(process.env.MONGO_URI).then(() => console.log('Connected')).catch(e => console.error(e)))"
   ```

### 6. Environment Variables

Ensure your `.env` file in `/var/www/mustafatravel/backend/` contains:

```env
NODE_ENV=production
JWT_SECRET=yourStrongSecretKey
DEFAULT_COMPANY_ID=68ca6b8ecf042c6674756403
PORT=7000
HOST=0.0.0.0
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/?retryWrites=true&w=majority&appName=mustafa-travels
CORS_ORIGIN=https://booking.mustafatravelsandtour.com,http://booking.mustafatravelsandtour.com:7000,http://localhost:5173,http://127.0.0.1:5173
CLIENT_ORIGIN=https://booking.mustafatravelsandtour.com,http://localhost:5173
```

### 7. Nginx Configuration

Your nginx config looks correct. After fixing the backend, restart nginx:

```bash
sudo nginx -t  # Test configuration
sudo systemctl reload nginx  # Reload nginx
```

### 8. Quick Fix Commands

If backend is not working, run these in order:

```bash
# 1. Navigate to backend directory
cd /var/www/mustafatravel/backend

# 2. Install/update dependencies
npm install

# 3. Stop old PM2 process
pm2 delete mustafa-backend 2>/dev/null || true

# 4. Start backend with PM2
pm2 start ecosystem.backend.config.js --update-env

# 5. Save PM2 config
pm2 save

# 6. Check status
pm2 status
pm2 logs mustafa-backend --lines 20
```

### 9. Monitoring

```bash
# View real-time logs
pm2 logs mustafa-backend

# View process info
pm2 info mustafa-backend

# Restart backend
pm2 restart mustafa-backend

# Stop backend
pm2 stop mustafa-backend
```

