import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

// Old MongoDB connection
const OLD_MONGO_URI = 'mongodb+srv://harryat5555_db_user:8H6LTAgxcuyZ9GgP@cluster0.vjjpkkd.mongodb.net/mtumrah-portal?retryWrites=true&w=majority&appName=Cluster0';

// New MongoDB connection - read from environment variable or use default
const NEW_MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://abdullah7175_db_user:4DgBRgRVQbsDB5BO@mustafa-travels.wni0vvg.mongodb.net/?retryWrites=true&w=majority&appName=mustafa-travels';

if (!process.env.MONGO_URI) {
  console.warn('⚠️  MONGO_URI not found in .env, using hardcoded connection string'.yellow);
}

// Collections to migrate
const COLLECTIONS = ['users', 'agents', 'bookings', 'inquiries', 'companies'];

async function migrateDatabase() {
  let oldClient, newClient;

  try {
    console.log('🔄 Starting database migration...'.cyan);

    // Connect to old database
    console.log('📡 Connecting to old database...'.yellow);
    oldClient = new MongoClient(OLD_MONGO_URI);
    await oldClient.connect();
    const oldDb = oldClient.db('mtumrah-portal');
    console.log('✅ Connected to old database'.green);

    // Connect to new database
    console.log('📡 Connecting to new database...'.yellow);
    newClient = new MongoClient(NEW_MONGO_URI);
    await newClient.connect();
    const newDb = newClient.db();
    console.log('✅ Connected to new database'.green);

    // Migrate each collection
    for (const collectionName of COLLECTIONS) {
      try {
        console.log(`\n📦 Migrating collection: ${collectionName}`.cyan);
        
        const oldCollection = oldDb.collection(collectionName);
        const newCollection = newDb.collection(collectionName);

        // Check if collection exists in old database
        const collections = await oldDb.listCollections({ name: collectionName }).toArray();
        
        if (collections.length === 0) {
          console.log(`⚠️  Collection ${collectionName} does not exist in old database, skipping...`.yellow);
          continue;
        }

        // Get all documents from old collection
        const documents = await oldCollection.find({}).toArray();
        console.log(`   Found ${documents.length} documents`.gray);

        if (documents.length === 0) {
          console.log(`   No documents to migrate`.gray);
          continue;
        }

        // Check if collection already has data in new database
        const existingCount = await newCollection.countDocuments();
        if (existingCount > 0) {
          console.log(`⚠️  Collection ${collectionName} already has ${existingCount} documents in new database`.yellow);
          console.log(`   Skipping to avoid duplicates. Delete existing data first if you want to re-migrate.`.yellow);
          continue;
        }

        // Insert documents into new collection
        if (documents.length > 0) {
          await newCollection.insertMany(documents, { ordered: false });
          console.log(`✅ Migrated ${documents.length} documents to ${collectionName}`.green);
        }

      } catch (error) {
        console.error(`❌ Error migrating collection ${collectionName}:`.red, error.message);
        // Continue with next collection
      }
    }

    console.log('\n✅ Database migration completed successfully!'.green.bold);
    console.log('\n📊 Summary:'.cyan);
    console.log('   Old Database: mtumrah-portal'.gray);
    console.log('   New Database: mustafa-travels'.gray);
    console.log('\n⚠️  Please verify the data in the new database before switching over.'.yellow);

  } catch (error) {
    console.error('❌ Migration failed:'.red, error.message);
    
    // Provide helpful error messages for common issues
    if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
      console.error('\n💡 Troubleshooting tips:'.yellow);
      console.error('   1. Verify your MongoDB Atlas IP whitelist:'.gray);
      console.error('      - Go to MongoDB Atlas → Network Access'.gray);
      console.error('      - Add your current IP address (or 0.0.0.0/0 for all IPs)'.gray);
      console.error('   2. Verify the username and password are correct'.gray);
      console.error('   3. Check if the database user exists in MongoDB Atlas'.gray);
      console.error('   4. Ensure the password doesn\'t contain special characters that need URL encoding'.gray);
    }
    
    if (error.stack) {
      console.error('\n📋 Full error details:'.gray);
      console.error(error.stack);
    }
    
    process.exit(1);
  } finally {
    // Close connections
    if (oldClient) {
      await oldClient.close();
      console.log('🔌 Closed old database connection'.gray);
    }
    if (newClient) {
      await newClient.close();
      console.log('🔌 Closed new database connection'.gray);
    }
    process.exit(0);
  }
}

// Run migration
migrateDatabase();
