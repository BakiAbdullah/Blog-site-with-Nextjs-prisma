import prisma from "../../../prisma";
import { connectToDb } from "@/utils"
import { NextResponse } from "next/server";

export const POST =async (req:Request) => {
  try {
    const {name, email} = await req.json();
    if (!name && !email ) {
      return NextResponse.json({ error: 'Invalid user!'}, {status: 422})
    }
    await connectToDb();
    const existingUser = await prisma.user.findFirst({where: {email}})
    if(existingUser) {
       return NextResponse.json({message: 'User already registered, please login!'}, {status: 403});
    }
    const users = await prisma.user.create({data: {name, email}})
    return NextResponse.json({users}, {status: 200})
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({error: error.message}, {status:500});
  } finally {
    await prisma.$disconnect();
  }
}

