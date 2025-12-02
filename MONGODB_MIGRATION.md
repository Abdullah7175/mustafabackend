# MongoDB Migration Guide

## New MongoDB Connection

The application has been updated to use the new MongoDB cluster for Mustafa Travel.

### New Connection String

```
mongodb+srv://abdullah7175_db_user:NpMqQZKIfnneSrJb@mustafa-travels.wni0vvg.mongodb.net/?retryWrites=true&w=majority&appName=mustafa-travels
```

### Update Environment Variable

Update your `.env` file (or create one if it doesn't exist) with:

```env
MONGO_URI=mongodb+srv://abdullah7175_db_user:NpMqQZKIfnneSrJb@mustafa-travels.wni0vvg.mongodb.net/?retryWrites=true&w=majority&appName=mustafa-travels
```

### Old Connection String (for reference)

```
mongodb+srv://harryat5555_db_user:8H6LTAgxcuyZ9GgP@cluster0.vjjpkkd.mongodb.net/mtumrah-portal?retryWrites=true&w=majority&appName=Cluster0
```

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

