import { Wine } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center gap-2 text-white transition-opacity hover:opacity-90",
        className
      )}
    >
      <div className="relative">
        <Wine className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4B88C]" strokeWidth={1.5} />
      </div>
      
      {showText && (
        <div className="flex flex-col items-start leading-none">
          <span className="text-xl sm:text-2xl font-playfair">Vinheria</span>
          <span className="text-lg sm:text-xl font-playfair text-[#D4B88C]">Agnello</span>
        </div>
      )}
    </Link>
  )
} 