import { Skeleton } from "@/components/ui/skeleton"


export default function Loading() {
  return (
    <div className="bg-background flex flex-col my-4">
      <main className="flex-grow w-full mx-auto">
        <div className="bg-card shadow-md rounded-lg overflow-hidden">
          <div className="p-4 flex justify-between items-center bg-muted">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-8 w-32" />
          </div>
          <div className="p-4">
            <div className="grid grid-cols-5 gap-4 mb-4 text-sm font-medium text-muted-foreground">
              <div>RANK</div>
              <div>NAME</div>
              <div>PREDICTIONS</div>
              <div>TOTAL SCORE</div>
              <div>POINT</div>
            </div>
            {[...Array(10)].map((_, index) => (
              <div key={index} className={`grid grid-cols-5 gap-4 py-2 ${index % 2 === 0 ? 'bg-muted/50' : ''}`}>
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}