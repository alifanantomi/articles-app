import { Metadata } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import NewsTable from "@/components/news/news-table"

export const metadata: Metadata = {
  title: "News Dashboard",
  description: "Manage your news articles",
  openGraph: {
    title: "News Dashboard",
    description: "Manage your news articles",
    type: "website",
  },
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }
  
  const news = await prisma.news.findMany({
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" },
  })

  const categories = await prisma.category.findMany()

  return (
    <div className="container mx-auto py-10 px-6">
      <NewsTable news={news || []} categories={categories} />
    </div>
  )
}
