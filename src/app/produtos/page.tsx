/**
 * Página de Produtos
 * 
 * Esta página exibe todas as categorias de produtos disponíveis na loja,
 * permitindo ao usuário navegar facilmente entre diferentes tipos de produtos.
 * 
 * Funcionalidades:
 * - Exibe categorias de produtos em destaque
 * - Permite navegação para subcategorias
 * - Mostra promoções em destaque
 */

import Image from 'next/image'
import Link from 'next/link'

// Interface para a estrutura de categoria
interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  featured?: boolean;
}

// Imagem padrão para categorias
const defaultImage = 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea';

// Dados mockados das categorias
const categories: Category[] = [
  {
    id: '1',
    name: 'Vinhos Tintos',
    description: 'Perfeitos para acompanhar carnes vermelhas e massas',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb',
    slug: 'vinhos/tintos',
    featured: true
  },
  {
    id: '2',
    name: 'Vinhos Brancos',
    description: 'Ideais para peixes, frutos do mar e aves',
    image: 'https://images.unsplash.com/photo-1556731057-9f93c861d27d',
    slug: 'vinhos/brancos',
    featured: true
  },
  {
    id: '3',
    name: 'Vinhos Rosés',
    description: 'Versáteis e refrescantes para qualquer ocasião',
    image: 'https://images.unsplash.com/photo-1558901591-9e516a90ff11',
    slug: 'vinhos/roses',
    featured: true
  },
  {
    id: '4',
    name: 'Espumantes',
    description: 'Para celebrar momentos especiais',
    image: 'https://images.unsplash.com/photo-1578911373434-0cb395d2e9bb',
    slug: 'vinhos/espumantes',
    featured: true
  },
  {
    id: '5',
    name: 'Kits e Presentes',
    description: 'Seleções exclusivas para presentear alguém especial',
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd',
    slug: 'kits',
    featured: true
  },
  {
    id: '6',
    name: 'Acessórios',
    description: 'Tudo o que você precisa para apreciar seu vinho',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b',
    slug: 'acessorios',
    featured: false
  },
  {
    id: '7',
    name: 'Mini Vinhos',
    description: 'Versões pequenas dos seus rótulos favoritos',
    image: 'https://images.unsplash.com/photo-1578911373434-0cb395d2e9bb',
    slug: 'vinhos/mini',
    featured: false
  },
  {
    id: '8',
    name: 'Casa e Decoração',
    description: 'Complementos para sua experiência enogastronômica',
    image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf',
    slug: 'casa',
    featured: false
  }
];

export default function ProductsPage() {
  // Filtra as categorias em destaque
  const featuredCategories = categories.filter(cat => cat.featured);
  // Demais categorias
  const otherCategories = categories.filter(cat => !cat.featured);

  return (
    <main className="container mx-auto px-4 py-8 mt-[180px] md:mt-[220px]">
      {/* Título da página */}
      <h1 className="text-3xl font-bold text-center text-primary mb-6">
        Nossos Produtos
      </h1>
      
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
        Na Vinheria Agnello, oferecemos uma seleção premium de vinhos e acessórios para os verdadeiros 
        apreciadores. Navegue por nossas categorias e descubra opções que combinam qualidade, 
        tradição e exclusividade.
      </p>
      
      {/* Categorias em destaque */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-primary mb-8">Categorias em Destaque</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCategories.map((category) => (
            <Link 
              key={category.id}
              href={`/produtos/${category.slug}`}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="relative h-64">
                <Image
                  src={category.image || defaultImage}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-2">{category.name}</h3>
                  <p className="text-white/90 text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Outras categorias */}
      {otherCategories.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-8">Mais Categorias</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCategories.map((category) => (
              <Link 
                key={category.id}
                href={`/produtos/${category.slug}`}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all flex flex-col"
              >
                <div className="relative h-32 mb-4 rounded-md overflow-hidden">
                  <Image
                    src={category.image || defaultImage}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      {/* Banner promocional */}
      <section className="mt-16 mb-12">
        <div className="relative h-72 rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1423483641154-5411ec9c0ddf"
            alt="Promoção de vinhos premium"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
          <div className="absolute top-1/2 left-12 transform -translate-y-1/2 max-w-md">
            <h2 className="text-white font-bold text-3xl mb-4">
              Vinhos Premium com 15% OFF
            </h2>
            <p className="text-white/90 mb-6">
              Aproveite nossa seleção de vinhos premium com desconto especial por tempo limitado.
            </p>
            <Link 
              href="/produtos/promocoes"
              className="bg-white text-primary px-6 py-3 rounded-lg font-medium inline-block hover:bg-gray-100 transition-colors"
            >
              Ver ofertas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 