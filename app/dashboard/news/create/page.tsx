import { Metadata } from "next"
import NewsForm from "@/components/news/news-forms"

export const metadata: Metadata = {
  title: "Create News",
  description: "Create a new news article"
}

export default function CreateNewsPage() {
  return (
    <div className="container mx-auto py-10 px-6">
      <NewsForm news={undefined} />
    </div>
  )
}