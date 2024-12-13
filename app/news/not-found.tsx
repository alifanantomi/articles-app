import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NewsNotFound() {
  return (
    <div className="container mx-auto py-10 text-center">
      <h2 className="text-2xl font-bold mb-4">News Not Found</h2>
      <p className="text-muted-foreground mb-6">
        The news article you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}