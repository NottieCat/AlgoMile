import { cn } from "@/lib/utils"

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center gap-2 font-headline text-xl font-bold", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="2" fill="none" />
        <path
          d="M8 14L12 18L20 10"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M6 8L10 6L14 8L18 6L22 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
      </svg>
      AlgoMile
    </div>
  )
}

export default Logo
