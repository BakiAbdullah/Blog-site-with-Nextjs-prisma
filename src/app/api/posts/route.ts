import prisma from "../../../prisma";
import { connectToDb } from "@/utils"
import { NextResponse } from "next/server";

export const GET =async (req:Request) => {
  try {
    await connectToDb();
    const posts = await prisma.user.findMany()
    return NextResponse.json({posts}, {status: 200})
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({error: error.message}, {status:500});
  } finally {
    await prisma.$disconnect();
  }
}

export const POST =async (req:Request) => {
  try {
    const {title, content, userId, category, categoryId} = await req.json()
    if (!title && !content &&  !userId) {
      return NextResponse.json({ error: 'Invalid Post!'}, {status: 422})
    }
    await connectToDb();
    const existingUser = await prisma.user.findFirst({where: {id: userId}})
    if(!existingUser) {
       return NextResponse.json({message: 'Invalid user!'}, {status: 403});
    }

    const newContent = await prisma.post.create({data: {title, content, userId, category, categoryId:categoryId || undefined}})
    return NextResponse.json({newContent}, {status: 201})
  } catch (error:any) {
    console.log(error);
    return NextResponse.json({error: error.message}, {status:500});
  } finally {
    await prisma.$disconnect();
  }
}


