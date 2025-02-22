import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface CardProps {
  image: string
  title: string
  price: number
  oldPrice?: number
  installments?: {
    number: number
    value: number
  }
  link: string
  badges?: {
    text: string
    color: 'primary' | 'secondary' | 'accent'
  }[]
  className?: string
}

export function Card({
  image,
  title,
  price,
  oldPrice,
  installments,
  link,
  badges,
  className
}: CardProps) {
  return (
    <Link 
      href={link}
      className={cn(
        "group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300",
        className
      )}
    >
      {/* Container da imagem com proporção fixa */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Badges (Novo, Mais Vendido, etc) */}
        {badges && badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {badges.map((badge, index) => (
              <span
                key={index}
                className={cn(
                  "px-3 py-1 text-sm font-medium text-white rounded",
                  {
                    'bg-[#D4B88C]': badge.color === 'primary',
                    'bg-primary': badge.color === 'secondary',
                    'bg-green-600': badge.color === 'accent',
                  }
                )}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Informações do produto */}
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        <div className="mt-4 space-y-1">
          {/* Preço antigo */}
          {oldPrice && (
            <p className="text-sm text-gray-500 line-through">
              {oldPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}
            </p>
          )}

          {/* Preço atual */}
          <p className="text-2xl font-semibold text-primary">
            {price.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL'
            })}
          </p>

          {/* Parcelamento */}
          {installments && (
            <p className="text-sm text-gray-600">
              {installments.number}x de{' '}
              <span className="font-medium">
                {installments.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })}
              </span>{' '}
              sem juros
            </p>
          )}
        </div>
      </div>
    </Link>
  )
} 