import mongoose from "mongoose";

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // Local development without a real MongoDB: spin up an in-memory server.
    // Enable by setting USE_MEMORY_DB=true (see "dev:mem" npm script).
    if (process.env.USE_MEMORY_DB === "true") {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mem = await MongoMemoryServer.create();
      uri = mem.getUri();
      console.log("Using in-memory MongoDB for local development");
    }

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
