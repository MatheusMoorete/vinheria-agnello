/**
 * Página de Detalhes do Produto
 * 
 * Esta página exibe informações detalhadas sobre um produto específico,
 * permitindo que o usuário visualize descrições, características, avaliações
 * e adicione o produto ao carrinho.
 * 
 * Funcionalidades:
 * - Imagens do produto com galeria
 * - Informações detalhadas do produto
 * - Seletor de quantidade
 * - Botão de adicionar ao carrinho
 * - Avaliações de outros clientes
 * - Produtos relacionados
 * - Compartilhamento em redes sociais
 */

'use client' // Indica que este componente roda no cliente

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
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
interface ProductProps {
  params: {
    slug: string
  }
}

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

// Banco de dados mockado de produtos
const products: Product[] = [
  {
    id: '1',
    name: 'Malbec Reserva 2019',
    price: 189.90,
    oldPrice: 209.90,
    image: 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6',
    images: [
      'https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6',
      'https://images.unsplash.com/photo-1560148218-1a83060f7b32',
      'https://images.unsplash.com/photo-1585676623595-e45bd8c538cd',
      'https://images.unsplash.com/photo-1568213214202-aee0a28567f1'
    ],
    slug: 'malbec-reserva-2019',
    description: 'Um Malbec argentino de alta qualidade, com notas de frutas escuras, especiarias e um toque de baunilha. Intenso e encorpado, com taninos macios e final longo. Ideal para acompanhar carnes vermelhas, queijos maturados e pratos condimentados.',
    details: {
      country: 'Argentina',
      region: 'Mendoza',
      winery: 'Bodega Agnello',
      grapes: ['Malbec'],
      volume: '750ml',
      alcohol: '14%',
      temperature: '16-18°C',
      year: 2019,
      foodPairing: ['Carnes vermelhas', 'Queijos maturados', 'Massas com molhos encorpados'],
      ageing: '12 meses em barris de carvalho francês',
      closure: 'Rolha natural'
    },
    stock: 15,
    rating: 4.7,
    reviews: [
      {
        id: '101',
        author: 'Carlos Silva',
        date: '15/03/2023',
        rating: 5,
        comment: 'Excelente vinho! Aromático e com um sabor incrível. Recomendo fortemente para os apreciadores de Malbec.'
      },
      {
        id: '102',
        author: 'Ana Beatriz',
        date: '22/01/2023',
        rating: 4,
        comment: 'Muito bom, encorpado e equilibrado. Acompanhou perfeitamente um bife de chorizo.'
      },
      {
        id: '103',
        author: 'Marcelo Costa',
        date: '05/11/2022',
        rating: 5,
        comment: 'Um dos melhores Malbecs que já experimentei. Vale cada centavo.'
      }
    ],
    relatedProducts: [
      {
        id: '2',
        name: 'Cabernet Sauvignon Premium',
        price: 249.90,
        image: 'https://images.unsplash.com/photo-1649074030539-97a4e6b85548',
        slug: 'cabernet-sauvignon-premium'
      },
      {
        id: '7',
        name: 'Carménère Gran Reserva',
        price: 199.90,
        oldPrice: 229.90,
        image: 'https://images.unsplash.com/photo-1598306442928-4d90f32c6866',
        slug: 'carmenere-gran-reserva'
      },
      {
        id: '3',
        name: 'Quinta do Vale Meão',
        price: 589.90,
        oldPrice: 689.90,
        image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3',
        slug: 'quinta-do-vale-meao'
      },
      {
        id: '8',
        name: 'Tannat Premium',
        price: 179.90,
        image: 'https://images.unsplash.com/photo-1609951651473-fc1fb12a24b6',
        slug: 'tannat-premium'
      }
    ]
  },
  // Produto com slug "malbec-reserva-2019" adicionado acima
  // Os outros produtos seriam definidos aqui de maneira similar
];

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

export default function ProductPage({ params }: ProductProps) {
  const { slug } = params;
  
  // Encontrar o produto atual pelo slug
  const product = products.find(p => p.slug === slug);
  
  // Se o produto não for encontrado, retornar 404
  if (!product) {
    notFound();
  }
  
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
    <main className="container mx-auto px-4 py-8 mt-[180px] md:mt-[220px]">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-8 flex items-center">
        <Link href="/" className="hover:text-primary">Início</Link>
        <span className="mx-2">/</span>
        <Link href="/produtos" className="hover:text-primary">Produtos</Link>
        <span className="mx-2">/</span>
        <Link href="/produtos/vinhos/tintos" className="hover:text-primary">Vinhos Tintos</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>
      
      {/* Produto principal - imagem e detalhes */}
      <div className="flex flex-col lg:flex-row gap-8 mb-16">
        {/* Galeria de imagens */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4">
            <Image
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
            {product.oldPrice && (
              <span className="absolute top-4 right-4 bg-primary text-white text-sm font-medium px-2 py-1 rounded-full">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>
          
          {/* Miniaturas */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 flex-shrink-0 border-2 rounded-md overflow-hidden ${
                    selectedImage === index ? 'border-primary' : 'border-gray-200'
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
        
        {/* Informações do produto */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center">
              <StarRating rating={product.rating} />
              <span className="ml-2 text-sm text-gray-600">
                ({product.reviews.length} avaliações)
              </span>
            </div>
            <span className="text-green-600 text-sm">Em estoque</span>
          </div>
          
          <div className="flex items-baseline gap-3 mb-6">
            {product.oldPrice && (
              <span className="text-gray-500 line-through text-lg">
                {formatCurrency(product.oldPrice)}
              </span>
            )}
            <span className="text-3xl font-bold text-primary">
              {formatCurrency(product.price)}
            </span>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-700 mb-4">
              {product.description}
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              {product.details.country && (
                <div>
                  <span className="font-medium text-gray-700">País:</span>{' '}
                  <span>{product.details.country}</span>
                </div>
              )}
              {product.details.region && (
                <div>
                  <span className="font-medium text-gray-700">Região:</span>{' '}
                  <span>{product.details.region}</span>
                </div>
              )}
              {product.details.year && (
                <div>
                  <span className="font-medium text-gray-700">Safra:</span>{' '}
                  <span>{product.details.year}</span>
                </div>
              )}
              {product.details.alcohol && (
                <div>
                  <span className="font-medium text-gray-700">Teor alcoólico:</span>{' '}
                  <span>{product.details.alcohol}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Seletor de quantidade e botão de compra */}
          <div className="mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center">
                <span className="mr-3 text-gray-700">Quantidade:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center">{quantity}</span>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                {product.stock} unidades disponíveis
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                className="py-3 px-8 text-base flex-1 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Adicionar ao carrinho
              </Button>
              
              <Button
                variant="outline"
                className="py-3 px-8 text-base flex-1 flex items-center justify-center gap-2 border-primary text-primary"
              >
                Comprar agora
              </Button>
            </div>
          </div>
          
          {/* Informações extras */}
          <div className="flex flex-col divide-y border-t border-b border-gray-200">
            <button
              onClick={() => toggleSection('shipping')}
              className="flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Opções de entrega</span>
              </div>
              {openSection === 'shipping' ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {openSection === 'shipping' && (
              <div className="py-4 px-4 text-gray-700 text-sm">
                <p className="mb-2">
                  <span className="font-medium">Frete grátis:</span> Para compras acima de R$250,00
                </p>
                <p className="mb-2">
                  <span className="font-medium">Prazo de entrega:</span> 3-7 dias úteis, dependendo da região
                </p>
                <p>
                  <span className="font-medium">Embalagem segura:</span> Seus vinhos são enviados em embalagens 
                  especiais para garantir que cheguem perfeitos à sua casa.
                </p>
              </div>
            )}
            
            <button
              onClick={() => toggleSection('payment')}
              className="flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Formas de pagamento</span>
              </div>
              {openSection === 'payment' ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {openSection === 'payment' && (
              <div className="py-4 px-4 text-gray-700 text-sm">
                <p className="mb-2">
                  <span className="font-medium">Cartão de crédito:</span> Até 6x sem juros
                </p>
                <p className="mb-2">
                  <span className="font-medium">Boleto bancário:</span> 5% de desconto
                </p>
                <p className="mb-2">
                  <span className="font-medium">Pix:</span> 10% de desconto
                </p>
              </div>
            )}
            
            <button
              onClick={() => toggleSection('guarantee')}
              className="flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-gray-600" />
                <span className="font-medium">Garantia de qualidade</span>
              </div>
              {openSection === 'guarantee' ? (
                <ChevronUp className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-600" />
              )}
            </button>
            
            {openSection === 'guarantee' && (
              <div className="py-4 px-4 text-gray-700 text-sm">
                <p className="mb-2">
                  Se você não ficar satisfeito com a qualidade do vinho, oferecemos garantia de 
                  devolução em até 7 dias após o recebimento.
                </p>
                <p>
                  Todos os nossos vinhos são armazenados em condições ideais de temperatura e 
                  umidade para garantir a melhor experiência.
                </p>
              </div>
            )}
          </div>
          
          {/* Compartilhar */}
          <div className="mt-8">
            <p className="text-gray-700 font-medium mb-3">Compartilhar:</p>
            <div className="flex gap-3">
              <button className="text-gray-600 hover:text-primary">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-primary">
                <Twitter className="w-5 h-5" />
              </button>
              <button className="text-gray-600 hover:text-primary">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Detalhes do produto */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Detalhes do produto</h2>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => toggleSection('description')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  openSection === 'description'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Descrição
              </button>
              <button
                onClick={() => toggleSection('characteristics')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  openSection === 'characteristics'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Características
              </button>
              <button
                onClick={() => toggleSection('reviews')}
                className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${
                  openSection === 'reviews'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Avaliações ({product.reviews.length})
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {openSection === 'description' && (
              <div>
                <p className="text-gray-700 mb-4">
                  {product.description}
                </p>
                <p className="text-gray-700">
                  Este {product.name} da {product.details.winery} é produzido na região de {product.details.region}, {product.details.country}. 
                  Com {product.details.alcohol} de teor alcoólico, é um vinho que expressa toda a tipicidade da 
                  uva {product.details.grapes?.join(', ')} cultivada em um dos melhores terroirs do mundo.
                </p>
              </div>
            )}
            
            {openSection === 'characteristics' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(product.details).map(([key, value]) => {
                  // Pular se não houver valor
                  if (!value) return null;
                  
                  // Formatar o nome da característica
                  let formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
                  formattedKey = formattedKey.replace(/([A-Z])/g, ' $1').trim();
                  
                  return (
                    <div key={key}>
                      <span className="font-medium text-gray-700">{formattedKey}:</span>{' '}
                      <span className="text-gray-600">
                        {Array.isArray(value) ? value.join(', ') : value}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            
            {openSection === 'reviews' && (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-gray-900">{product.rating.toFixed(1)}</div>
                    <div className="flex justify-center my-1">
                      <StarRating rating={product.rating} />
                    </div>
                    <div className="text-sm text-gray-500">
                      {product.reviews.length} avaliações
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <Button variant="outline" className="w-full">
                      Escreva uma avaliação
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{review.author}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                      <div className="flex items-center mb-3">
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Produtos relacionados */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Você também pode gostar</h2>
        
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