/**
 * Componente de Card de Produto
 * 
 * Este componente exibe informações básicas de um produto em formato de card,
 * sendo utilizado em listagens de produtos, recomendações e carroséis.
 * 
 * Funcionalidades:
 * - Exibe imagem do produto
 * - Mostra nome, preço e desconto (quando aplicável)
 * - Proporciona navegação para a página detalhada do produto
 * - Exibe badges (opcional) para indicar promoções ou destaques
 */

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
    isNew?: boolean
    isBestSeller?: boolean
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
        
        {/* Badge de novo produto */}
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-sm">
            Novo
          </span>
        )}
        
        {/* Badge de mais vendido */}
        {product.isBestSeller && (
          <span className="absolute top-2 left-2 bg-[#D4B88C] text-white px-2 py-1 rounded-full text-sm">
            Mais Vendido
          </span>
        )}
      </div>

      {/* Informações do produto */}
      <div className="p-4">
        <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
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