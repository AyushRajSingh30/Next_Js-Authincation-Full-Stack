//MongoDB connect required in each file who connect with mongoDB in express We call only one time 
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";  //res, req  of express NextResponse, NextRequest for Next js
import bcryptjs from "bcryptjs";  //similar like bcryptjs 
import { sendEmail } from "@/helpers/mailer";

connect();

//router function name always declear with http request, POST, GET, PATCH, .. etc

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody; //validation apply like apply on Backend
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({ error: "User alrady exist" }, { status: 400 });
    }

    //bcrypt.js and bcrypt both work same like encoaded and decoded password we used bcrypt method also
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    //newUser.save() work is same User.create()  for creat collectionin mongodb✔️

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    //newUser.save() work is same User.create()  for creat collectionin mongodb✔️
    const savedUser = await newUser.save();
    console.log(savedUser);

    //User.create() work properly ✔️
    // const savedUser = await User.create({
    //   username,
    //   email,
    //   password:hashedPassword
    // });
    //send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "User register successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
