# MongoDB Migration Guide

## New MongoDB Connection

The application has been updated to use the new MongoDB cluster for Mustafa Travel.

### Update Environment Variable

Update your `.env` file (or create one if it doesn't exist) with:

```env
# New MongoDB connection (current)
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/?retryWrites=true&w=majority&appName=mustafa-travels

# Old MongoDB connection (for migration only - optional)
OLD_MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/<database>?retryWrites=true&w=majority&appName=Cluster0
```

**Important:** Replace `<username>`, `<password>`, `<cluster-host>`, and `<database>` with your actual MongoDB Atlas credentials. Never commit credentials to the repository.

## Data Migration

To migrate data from the old cluster to the new cluster, run:

```bash
npm run migrate
```

This script will:
1. Connect to the old MongoDB cluster
2. Connect to the new MongoDB cluster
3. Copy all collections (users, agents, bookings, inquiries, companies) to the new cluster
4. Skip collections that already have data to avoid duplicates

**Note:** Make sure to verify the migrated data before switching over completely.

## Collections Migrated

- `users` - User accounts
- `agents` - Sales agents
- `bookings` - Booking records
- `inquiries` - Customer inquiries
- `companies` - Company information

