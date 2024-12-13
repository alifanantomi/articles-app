import { Metadata } from "next"
import NewsForm from "@/components/news/news-forms"
import prisma from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Create News",
  description: "Create a new news article"
}

const categories = await prisma.category.findMany()

export default function CreateNewsPage() {
  return (
    <div className="container mx-auto py-10 px-6">
      <NewsForm news={undefined} categories={categories} />
    </div>
  )
}