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

Double-check the connection string:
- Username: `abdullah7175_db_user`
- Password: `NpMqQZKIfnneSrJb`
- Cluster: `mustafa-travels.wni0vvg.mongodb.net`

### 3. Database User Permissions

Ensure the database user has the correct permissions:
1. Go to MongoDB Atlas → Database Access
2. Find the user `abdullah7175_db_user`
3. Ensure they have at least **Read and write to any database** permissions

### 4. Connection String Format

The connection string should be:
```
mongodb+srv://abdullah7175_db_user:NpMqQZKIfnneSrJb@mustafa-travels.wni0vvg.mongodb.net/?retryWrites=true&w=majority&appName=mustafa-travels
```

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
mongosh "mongodb+srv://abdullah7175_db_user:NpMqQZKIfnneSrJb@mustafa-travels.wni0vvg.mongodb.net/?retryWrites=true&w=majority&appName=mustafa-travels"
```

### 6. Alternative: Use Environment Variable

Instead of hardcoding the connection string, you can use environment variables:

1. Create/update `.env` file:
```env
OLD_MONGO_URI=mongodb+srv://harryat5555_db_user:8H6LTAgxcuyZ9GgP@cluster0.vjjpkkd.mongodb.net/mtumrah-portal?retryWrites=true&w=majority&appName=Cluster0
NEW_MONGO_URI=mongodb+srv://abdullah7175_db_user:NpMqQZKIfnneSrJb@mustafa-travels.wni0vvg.mongodb.net/?retryWrites=true&w=majority&appName=mustafa-travels
```

2. Update the migration script to read from environment variables.

## Still Having Issues?

1. Check MongoDB Atlas logs for more details
2. Verify your internet connection
3. Try connecting from a different network
4. Contact MongoDB Atlas support if the issue persists

