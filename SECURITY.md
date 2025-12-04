# Security Guidelines

## ⚠️ Important: Never Commit Credentials

**All MongoDB credentials and secrets must be stored in environment variables, never in code files.**

## Environment Variables

All sensitive credentials should be stored in a `.env` file in the backend directory. This file is already in `.gitignore` and will not be committed to the repository.

### Required Environment Variables

Create a `.env` file in `mtumrah-backend-final/` with the following:

```env
# MongoDB Connection (REQUIRED)
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/?retryWrites=true&w=majority&appName=mustafa-travels

# Old MongoDB Connection (for migration only - OPTIONAL)
OLD_MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority&appName=Cluster0

# JWT Secret (REQUIRED)
JWT_SECRET=your_strong_secret_key_here

# Server Configuration
PORT=7000
HOST=0.0.0.0
NODE_ENV=production

# CORS Origins
CORS_ORIGIN=https://booking.mustafatravelsandtour.com,http://localhost:5173
CLIENT_ORIGIN=https://booking.mustafatravelsandtour.com,http://localhost:5173
```

### Migration Script

The migration script (`scripts/migrate-database.js`) now requires both connection strings to be provided via environment variables:

- `OLD_MONGO_URI` - Connection string for the old database
- `MONGO_URI` or `NEW_MONGO_URI` - Connection string for the new database

**The script will exit with an error if these are not provided.**

## Files Updated

The following files have been updated to remove hardcoded credentials:

1. ✅ `scripts/migrate-database.js` - Now requires environment variables
2. ✅ `MONGODB_MIGRATION.md` - Credentials replaced with placeholders
3. ✅ `MONGODB_TROUBLESHOOTING.md` - Credentials replaced with placeholders
4. ✅ `DEPLOYMENT.md` - Credentials replaced with placeholders
5. ✅ `MIGRATION_SUMMARY.md` - Credentials replaced with placeholders
6. ✅ `mongo.txt` - Deleted (contained exposed credentials)

## Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use `.env.example`** - Template file with placeholders (no real credentials)
3. **Rotate credentials** - If credentials were exposed, rotate them immediately in MongoDB Atlas
4. **Use environment variables** - All sensitive data should come from environment variables
5. **Review commits** - Before pushing, ensure no credentials are in the code

## If Credentials Were Exposed

If credentials were committed to the repository:

1. **Immediately rotate the credentials** in MongoDB Atlas:
   - Go to Database Access
   - Change the password for the affected user
   - Or create a new user and delete the old one

2. **Remove from git history** (if needed):
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch path/to/file" \
     --prune-empty --tag-name-filter cat -- --all
   ```

3. **Update all environments** with new credentials

4. **Verify `.gitignore`** includes `.env` and sensitive files

