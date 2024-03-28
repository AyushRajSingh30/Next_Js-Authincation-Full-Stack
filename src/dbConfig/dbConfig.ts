import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
  try {
    /*Mongoose.connect error show due to type sefty because we take variable process.env.MONGO_URI have string data type or not
    we know 100% variable hold some string data that time we write ! other than we take variable and cheak process.env.MONGO_URI have
    data that time pass variable in mongo.connection other than pass empty sting*/  
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    //connection event provide by connection for connected
    
    connection.on("connected", () => {
      console.log("MongoDB Connected");
    });

    //connection event for error
    connection.on("error", () => {
      console.log("MongoDB Connection error:", error);
      process.exit();
    });
  } catch (error) {
    console.log("Somthing went wrong in connection to DB");
    console.log(error);
  }
}
