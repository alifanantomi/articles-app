import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const json = await req.json()
    const category = await prisma.category.create({
      data: {
        name: json.name,
      },
    })

    return NextResponse.json(category)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}