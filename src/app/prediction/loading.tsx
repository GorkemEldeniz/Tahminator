import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-card shadow-md rounded-lg p-6">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-6 w-full max-w-md mx-auto" />
        </div>
      </main>
    </div>
  )
}