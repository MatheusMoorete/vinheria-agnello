// É um componente específico para produtos
// Será reutilizado em várias páginas que mostram produtos
// Mantém a organização por domínio

import Image from 'next/image' // Importa o componente Image do Next.js
import Link from 'next/link' // Importa o componente Link do Next.js
import { formatCurrency } from '@/utils/format'

// Interface que define a estrutura dos dados necessários para o card
interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    oldPrice?: number // Opcional, usado para mostrar descontos
    image: string
    slug: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  // Calcula o desconto se houver um oldPrice
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0

  return (
    // Container do card com efeito hover
    <Link 
      href={`/produto/${product.slug}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Container da imagem com posicionamento relativo para o badge de desconto */}
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
        
        {/* Badge de desconto, só aparece se houver oldPrice */}
        {discount > 0 && (
          <span className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
            -{discount}%
          </span>
        )}
      </div>

      {/* Informações do produto */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-bold text-primary">
            {formatCurrency(product.price)}
          </span>
          
          {product.oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              {formatCurrency(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}