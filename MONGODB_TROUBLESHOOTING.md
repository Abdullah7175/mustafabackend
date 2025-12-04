# MongoDB Migration Troubleshooting

## Authentication Failed Error

If you're getting `bad auth : authentication failed`, check the following:

### 1. MongoDB Atlas IP Whitelist

**This is the most common issue!**

MongoDB Atlas blocks connections from IPs that aren't whitelisted. You need to:

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Select your cluster: `mustafa-travels`
3. Go to **Network Access** (or **IP Access List**)
4. Click **Add IP Address**
5. Either:
   - Add your current IP address (recommended for security)
   - Or add `0.0.0.0/0` to allow all IPs (for development/testing only)

**Note:** It may take 1-2 minutes for IP whitelist changes to take effect.

### 2. Verify Credentials

Double-check your connection string in the `.env` file:
- Ensure `MONGO_URI` is set correctly
- Verify the username and password are correct
- Check the cluster hostname matches your MongoDB Atlas cluster

### 3. Database User Permissions

Ensure the database user has the correct permissions:
1. Go to MongoDB Atlas → Database Access
2. Find your database user
3. Ensure they have at least **Read and write to any database** permissions

### 4. Connection String Format

The connection string format should be:
```
mongodb+srv://<username>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority&appName=<app-name>
```

**Important:** Never commit credentials to the repository. Always use environment variables.

If your password contains special characters, they may need to be URL-encoded:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- etc.

### 5. Test Connection

You can test the connection using MongoDB Compass or the MongoDB shell:

```bash
# Load environment variables first
source .env  # On Linux/Mac
# or
# Load .env manually on Windows

# Then test connection
mongosh "$MONGO_URI"
```

### 6. Environment Variables Setup

**Always use environment variables for credentials. Never hardcode them in code.**

1. Create/update `.env` file in the backend directory:
```env
# New MongoDB connection (current)
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/?retryWrites=true&w=majority&appName=mustafa-travels

# Old MongoDB connection (for migration only)
OLD_MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority&appName=Cluster0
```

2. Replace `<username>`, `<password>`, `<cluster-host>`, and `<database>` with your actual values.

3. **Important:** Add `.env` to `.gitignore` to prevent committing credentials.

## Still Having Issues?

1. Check MongoDB Atlas logs for more details
2. Verify your internet connection
3. Try connecting from a different network
4. Contact MongoDB Atlas support if the issue persists

