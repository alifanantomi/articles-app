import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.news.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ error: "Failed to delete news item" }, { status: 500 })
  }
}
