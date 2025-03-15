'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { 
  Star, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Minus, 
  Plus, 
  Facebook, 
  Twitter, 
  Share2, 
  ShoppingCart,
} from 'lucide-react'
import { formatCurrency } from '@/utils/format'

// Interfaces para tipagem dos dados
interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  slug: string;
  description: string;
  details: {
    country?: string;
    region?: string;
    winery?: string;
    grapes?: string[];
    volume?: string;
    alcohol?: string;
    temperature?: string;
    year?: number;
    foodPairing?: string[];
    ageing?: string;
    closure?: string;
  };
  stock: number;
  rating: number;
  reviews: Review[];
  relatedProducts: RelatedProduct[];
}

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  slug: string;
}

// Componente de avaliação em estrelas
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'text-yellow-400 fill-yellow-400'
              : star <= rating + 0.5
              ? 'text-yellow-400 fill-yellow-400 half-filled'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

// Componente do lado do cliente que contém a lógica interativa
export function ProductContent({ product }: { product: Product }) {
  // Estados para controlar a interação do usuário
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [openSection, setOpenSection] = useState<string>('description');
  
  // Incrementa a quantidade
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  // Decrementa a quantidade
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  // Alterna a abertura/fechamento das seções
  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection('');
    } else {
      setOpenSection(section);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 mt-[60px] md:mt-[80px]">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 flex items-center">
        <Link href="/" className="hover:text-primary">Início</Link>
        <span className="mx-2">/</span>
        <Link href="/produtos" className="hover:text-primary">Produtos</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      {/* Grid do produto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Coluna da esquerda - Imagens */}
        <div>
          <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
            <Image
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Galeria de miniaturas */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Imagem ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Coluna da direita - Informações */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          
          {/* Avaliação */}
          <div className="flex items-center gap-2 mb-6">
            <StarRating rating={product.rating} />
            <span className="text-sm text-gray-500">
              ({product.reviews.length} avaliações)
            </span>
          </div>
          
          {/* Preço */}
          <div className="mb-8">
            {product.oldPrice && (
              <span className="text-gray-500 line-through text-lg">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-sm text-green-600 font-medium">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                </span>
              )}
            </div>
          </div>
          
          {/* Seletor de quantidade e botão de compra */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="p-3 hover:bg-gray-100 disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 py-3 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                disabled={quantity >= product.stock}
                className="p-3 hover:bg-gray-100 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <Button
              variant="primary"
              className="flex-1 h-auto py-3 text-base flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Adicionar ao carrinho
            </Button>
          </div>
          
          {/* Informações de entrega e pagamento */}
          <div className="space-y-4 mb-8 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Truck className="w-5 h-5 text-green-600" />
              <span>Frete grátis para compras acima de R$ 250</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <CreditCard className="w-5 h-5 text-primary" />
              <span>Em até 6x sem juros no cartão</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span>Compra 100% segura</span>
            </div>
          </div>
          
          {/* Compartilhamento */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm text-gray-500">Compartilhar:</span>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Facebook className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Twitter className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Share2 className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Seções expansíveis */}
          <div className="space-y-4">
            {/* Descrição */}
            <div className="border-t border-gray-200">
              <button
                onClick={() => toggleSection('description')}
                className="flex items-center justify-between w-full py-4"
              >
                <span className="font-medium">Descrição</span>
                {openSection === 'description' ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openSection === 'description' && (
                <div className="pb-4 text-gray-600">
                  <p>{product.description}</p>
                </div>
              )}
            </div>
            
            {/* Detalhes */}
            <div className="border-t border-gray-200">
              <button
                onClick={() => toggleSection('details')}
                className="flex items-center justify-between w-full py-4"
              >
                <span className="font-medium">Detalhes técnicos</span>
                {openSection === 'details' ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openSection === 'details' && (
                <div className="pb-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {product.details.country && (
                      <div>
                        <dt className="text-sm text-gray-500">País</dt>
                        <dd className="text-gray-900">{product.details.country}</dd>
                      </div>
                    )}
                    {product.details.region && (
                      <div>
                        <dt className="text-sm text-gray-500">Região</dt>
                        <dd className="text-gray-900">{product.details.region}</dd>
                      </div>
                    )}
                    {product.details.winery && (
                      <div>
                        <dt className="text-sm text-gray-500">Vinícola</dt>
                        <dd className="text-gray-900">{product.details.winery}</dd>
                      </div>
                    )}
                    {product.details.grapes && (
                      <div>
                        <dt className="text-sm text-gray-500">Uvas</dt>
                        <dd className="text-gray-900">{product.details.grapes.join(', ')}</dd>
                      </div>
                    )}
                    {product.details.volume && (
                      <div>
                        <dt className="text-sm text-gray-500">Volume</dt>
                        <dd className="text-gray-900">{product.details.volume}</dd>
                      </div>
                    )}
                    {product.details.alcohol && (
                      <div>
                        <dt className="text-sm text-gray-500">Teor alcoólico</dt>
                        <dd className="text-gray-900">{product.details.alcohol}</dd>
                      </div>
                    )}
                    {product.details.temperature && (
                      <div>
                        <dt className="text-sm text-gray-500">Temperatura de serviço</dt>
                        <dd className="text-gray-900">{product.details.temperature}</dd>
                      </div>
                    )}
                    {product.details.year && (
                      <div>
                        <dt className="text-sm text-gray-500">Safra</dt>
                        <dd className="text-gray-900">{product.details.year}</dd>
                      </div>
                    )}
                  </div>
                  
                  {product.details.foodPairing && (
                    <div>
                      <dt className="text-sm text-gray-500 mb-1">Harmonização</dt>
                      <dd className="text-gray-900">
                        {product.details.foodPairing.join(', ')}
                      </dd>
                    </div>
                  )}
                  
                  {product.details.ageing && (
                    <div>
                      <dt className="text-sm text-gray-500 mb-1">Envelhecimento</dt>
                      <dd className="text-gray-900">{product.details.ageing}</dd>
                    </div>
                  )}
                  
                  {product.details.closure && (
                    <div>
                      <dt className="text-sm text-gray-500 mb-1">Fechamento</dt>
                      <dd className="text-gray-900">{product.details.closure}</dd>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Avaliações */}
            <div className="border-t border-gray-200">
              <button
                onClick={() => toggleSection('reviews')}
                className="flex items-center justify-between w-full py-4"
              >
                <span className="font-medium">Avaliações dos clientes</span>
                {openSection === 'reviews' ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
              {openSection === 'reviews' && (
                <div className="pb-4 space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{review.author}</p>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Produtos relacionados */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Produtos relacionados
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {product.relatedProducts.map((relatedProduct) => (
            <ProductCard 
              key={relatedProduct.id}
              product={relatedProduct}
            />
          ))}
        </div>
      </section>
    </main>
  );
} 