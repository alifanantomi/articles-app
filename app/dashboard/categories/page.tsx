import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import CategoriesTable from "@/components/category/categories-table"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function CategoriesPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/auth/signin")
  }

  const categories = await prisma.category.findMany()

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button asChild>
          <Link href="/dashboard/categories/create">Create Category</Link>
        </Button>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  )
}