const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["CUSTOMER", "ADMIN"], default: "CUSTOMER" },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function migrate() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("Connected.");

    const dataPath = path.join(__dirname, '..', 'data.json');
    if (!fs.existsSync(dataPath)) {
      console.log("No data.json found. Skipping migration.");
      return;
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log(`Found ${data.users.length} users in data.json.`);

    for (const u of data.users) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        // Remove the string id from data.json to let MongoDB generate its own
        const { id, ...userData } = u;
        await User.create(userData);
        console.log(`Migrated user: ${u.email}`);
      } else {
        console.log(`User already exists: ${u.email}`);
      }
    }

    console.log("Migration complete.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await mongoose.disconnect();
  }
}

migrate();
