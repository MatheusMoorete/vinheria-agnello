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

import { Metadata } from 'next'
import { ProductContent } from './ProductContent'
import { notFound } from 'next/navigation'

// Interfaces para tipagem dos dados
interface PageProps {
  params: {
    slug: string
  }
}

// Banco de dados mockado de produtos
const products = [
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
  }
];

// Gera os metadados da página
export function generateMetadata({ params }: PageProps): Metadata {
  const product = products.find(p => p.slug === params.slug);
  
  if (!product) {
    return {
      title: 'Produto não encontrado | Vinheria Agnello',
      description: 'O produto que você está procurando não foi encontrado.'
    }
  }
  
  return {
    title: `${product.name} | Vinheria Agnello`,
    description: product.description
  }
}

// Página principal que lida com a busca do produto
export default function ProductPage({ params }: PageProps) {
  const { slug } = params;
  
  // Encontrar o produto atual pelo slug
  const product = products.find(p => p.slug === slug);
  
  // Se o produto não for encontrado, retornar 404
  if (!product) {
    notFound();
  }

  return <ProductContent product={product} />;
} 