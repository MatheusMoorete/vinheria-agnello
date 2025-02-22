/**
 * Página Inicial da Vinheria Agnello
 * 
 * Esta é a landing page principal do e-commerce, focada em:
 * - Apresentar a marca e valores
 * - Mostrar produtos em destaque (mais vendidos, lançamentos, promoções)
 * - Facilitar a navegação por categorias
 * - Captar leads através da newsletter
 */

import { HeroSection } from '@/components/sections/home/HeroSection'
import { FeaturedProducts } from '@/components/sections/home/FeaturedProducts'
import { Categories } from '@/components/sections/home/Categories'
import { Newsletter } from '@/components/sections/home/Newsletter'

// Definindo a interface do produto
interface Product {
  id: string
  name: string
  price: number
  oldPrice?: number
  image: string
  slug: string
  category: string
  isNew?: boolean
  isBestSeller?: boolean
}

// Definindo a imagem padrão para todos os produtos
const defaultWineImage = 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea'

// Dados mockados para exemplo - em produção viriam de uma API
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Vinho Tinto Quinta do Vale Meão',
    price: 589.90,
    oldPrice: 689.90,
    image: defaultWineImage,
    slug: 'vinho-tinto-quinta-do-vale-meao',
    category: 'Vinhos Tintos',
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Champagne Dom Pérignon Vintage',
    price: 2899.90,
    image: defaultWineImage,
    slug: 'champagne-dom-perignon-vintage',
    category: 'Champagnes',
    isNew: true
  },
  {
    id: '3',
    name: 'Vinho Branco Chardonnay',
    price: 299.90,
    oldPrice: 359.90,
    image: defaultWineImage,
    slug: 'vinho-branco-chardonnay',
    category: 'Vinhos Brancos',
    isBestSeller: true
  },
  {
    id: '4',
    name: 'Prosecco Extra Dry',
    price: 189.90,
    image: defaultWineImage,
    slug: 'prosecco-extra-dry',
    category: 'Espumantes',
    isNew: true
  }
]

const categories = [
  {
    id: '1',
    name: 'Vinhos Tintos',
    image: defaultWineImage,
    slug: 'vinhos-tintos',
    description: 'Os melhores tintos nacionais e importados'
  },
  {
    id: '2',
    name: 'Vinhos Brancos',
    image: defaultWineImage,
    slug: 'vinhos-brancos',
    description: 'Brancos leves e aromáticos'
  },
  {
    id: '3',
    name: 'Espumantes',
    image: defaultWineImage,
    slug: 'espumantes',
    description: 'Para celebrar os melhores momentos'
  }
]

const newProducts: Product[] = [
  {
    id: '5',
    name: 'Vinho Tinto Bordeaux',
    price: 799.90,
    image: defaultWineImage,
    slug: 'vinho-tinto-bordeaux',
    category: 'Vinhos Tintos',
    isNew: true
  },
  {
    id: '6',
    name: 'Vinho Rosé Provence',
    price: 299.90,
    image: defaultWineImage,
    slug: 'vinho-rose-provence',
    category: 'Vinhos Rosé',
    isNew: true
  },
  {
    id: '7',
    name: 'Champagne Veuve Clicquot',
    price: 599.90,
    image: defaultWineImage,
    slug: 'champagne-veuve-clicquot',
    category: 'Champagnes',
    isNew: true
  },
  {
    id: '8',
    name: 'Vinho do Porto Vintage',
    price: 899.90,
    image: defaultWineImage,
    slug: 'vinho-do-porto-vintage',
    category: 'Vinhos Fortificados',
    isNew: true
  }
]

const promoProducts: Product[] = [
  {
    id: '9',
    name: 'Vinho Tinto Rioja',
    price: 199.90,
    oldPrice: 299.90,
    image: defaultWineImage,
    slug: 'vinho-tinto-rioja',
    category: 'Vinhos Tintos'
  },
  {
    id: '10',
    name: 'Prosecco Rosé',
    price: 149.90,
    oldPrice: 189.90,
    image: defaultWineImage,
    slug: 'prosecco-rose',
    category: 'Espumantes'
  },
  {
    id: '11',
    name: 'Vinho Branco Sauvignon Blanc',
    price: 129.90,
    oldPrice: 169.90,
    image: defaultWineImage,
    slug: 'vinho-branco-sauvignon-blanc',
    category: 'Vinhos Brancos'
  },
  {
    id: '12',
    name: 'Vinho Tinto Malbec',
    price: 89.90,
    oldPrice: 119.90,
    image: defaultWineImage,
    slug: 'vinho-tinto-malbec',
    category: 'Vinhos Tintos'
  }
]

export default function Home() {
  return (
    <main className="flex flex-col">
      {/* Hero Section com banner principal */}
      <HeroSection />

      {/* Produtos Mais Vendidos */}
      <FeaturedProducts
        title="Mais Vendidos"
        subtitle="Os rótulos preferidos dos nossos clientes"
        products={featuredProducts}
      />

      {/* Categorias */}
      <Categories categories={categories} />

      {/* Lançamentos */}
      <FeaturedProducts
        title="Lançamentos"
        subtitle="Confira as últimas novidades em nosso catálogo"
        products={newProducts}
      />

      {/* Promoções */}
      <FeaturedProducts
        title="Ofertas Especiais"
        subtitle="Aproveite nossos preços imperdíveis"
        products={promoProducts}
      />

      {/* Newsletter */}
      <Newsletter />
    </main>
  )
}