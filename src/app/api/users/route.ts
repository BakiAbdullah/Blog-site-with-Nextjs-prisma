import prisma from "../../../prisma";
import { connectToDb } from "@/utils"
import { NextResponse } from "next/server";

export const GET =async (req:Request) => {
  try {
    await connectToDb();
    const users = await prisma.user.findMany()
    return NextResponse.json({users}, {status: 200})
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({error: error.message}, {status:500});
  } finally {
    await prisma.$disconnect();
  }
}

