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
        <path
          d="M14 27C21.1797 27 27 21.1797 27 14C27 6.8203 21.1797 1 14 1C6.8203 1 1 6.8203 1 14C1 21.1797 6.8203 27 14 27Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.75 14H11.5L14 8.75L16.5 19.25L20.25 14H24.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      AlgoMile
    </div>
  )
}

export default Logo;
