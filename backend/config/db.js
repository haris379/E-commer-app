import mongoose from "mongoose";

const cached = (global._mongoose ||= { conn: null, promise: null });

const connectDB = async () => {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URL, {
      bufferCommands: false,
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
};

export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL);
//     console.log("MongoDB connected Successfully");
//   } catch (error) {
//     console.log("MongoDB not connected ");
//     console.log(`Error : ${error.message}`);
//   }
// };

// export default connectDB;
