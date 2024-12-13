import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import CategoryForm from "@/components/category/category-form"

export default async function CreateCategoryPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Create Category</h1>
      <CategoryForm />
    </div>
  )
}