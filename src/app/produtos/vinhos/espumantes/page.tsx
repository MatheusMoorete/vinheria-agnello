/**
 * Página de Listagem de Espumantes
 * 
 * Esta página exibe todos os espumantes disponíveis na loja,
 * com opções de filtragem por preço, país, ano, avaliação e tipo,
 * além de ordenação por relevância, preço e avaliação.
 * 
 * Funcionalidades:
 * - Listagem de produtos com paginação
 * - Filtros por preço, país, ano, avaliação e tipo
 * - Ordenação por relevância, preço e avaliação
 * - Layout responsivo para desktop e mobile
 */

'use client' // Indica que este componente roda no cliente

import { useState } from 'react'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { 
  Filter, 
  ChevronDown, 
  X, 
  SlidersHorizontal 
} from 'lucide-react'

// Interface para a estrutura do produto
interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  slug: string;
  country: string;
  year: number;
  rating: number;
  type: string;
  isNew?: boolean;
  isBestSeller?: boolean;
}

// Interface para as opções de filtro
interface FilterOptions {
  priceRange: [number, number];
  countries: string[];
  years: number[];
  rating: number | null;
  types: string[];
}

// Interface para as opções de ordenação
interface SortOption {
  label: string;
  value: string;
}

// Imagem padrão para todos os produtos
const defaultImage = 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea';

// Dados mockados de espumantes
const sparklingWines: Product[] = [
  {
    id: '1',
    name: 'Prosecco Extra Dry',
    price: 189.90,
    oldPrice: 219.90,
    image: defaultImage,
    slug: 'prosecco-extra-dry',
    country: 'Itália',
    year: 2022,
    rating: 4.8,
    type: 'Prosecco',
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Champagne Brut',
    price: 499.90,
    image: defaultImage,
    slug: 'champagne-brut',
    country: 'França',
    year: 2023,
    rating: 4.9,
    type: 'Champagne',
    isNew: true
  },
  {
    id: '3',
    name: 'Cava Reserva',
    price: 159.90,
    oldPrice: 179.90,
    image: defaultImage,
    slug: 'cava-reserva',
    country: 'Espanha',
    year: 2022,
    rating: 4.6,
    type: 'Cava'
  },
  {
    id: '4',
    name: 'Espumante Brut Rosé',
    price: 129.90,
    image: defaultImage,
    slug: 'espumante-brut-rose',
    country: 'Brasil',
    year: 2022,
    rating: 4.5,
    type: 'Espumante Nacional'
  },
  {
    id: '5',
    name: 'Franciacorta DOCG',
    price: 299.90,
    oldPrice: 349.90,
    image: defaultImage,
    slug: 'franciacorta-docg',
    country: 'Itália',
    year: 2023,
    rating: 4.7,
    type: 'Franciacorta'
  },
  {
    id: '6',
    name: 'Crémant de Loire',
    price: 219.90,
    image: defaultImage,
    slug: 'cremant-de-loire',
    country: 'França',
    year: 2022,
    rating: 4.4,
    type: 'Crémant'
  },
  {
    id: '7',
    name: 'Asti Spumante',
    price: 149.90,
    oldPrice: 169.90,
    image: defaultImage,
    slug: 'asti-spumante',
    country: 'Itália',
    year: 2022,
    rating: 4.3,
    type: 'Asti'
  },
  {
    id: '8',
    name: 'Champagne Rosé',
    price: 599.90,
    image: defaultImage,
    slug: 'champagne-rose',
    country: 'França',
    year: 2023,
    rating: 4.9,
    type: 'Champagne Rosé',
    isNew: true
  }
];

// Países disponíveis para filtro
const availableCountries = ['França', 'Itália', 'Espanha', 'Brasil'];

// Anos disponíveis para filtro
const availableYears = [2021, 2022, 2023];

// Tipos de espumante disponíveis para filtro
const availableTypes = ['Prosecco', 'Champagne', 'Cava', 'Espumante Nacional', 'Franciacorta', 'Crémant', 'Asti', 'Champagne Rosé'];

// Opções de ordenação
const sortOptions: SortOption[] = [
  { label: 'Relevância', value: 'relevance' },
  { label: 'Preço: Menor para Maior', value: 'price_asc' },
  { label: 'Preço: Maior para Menor', value: 'price_desc' },
  { label: 'Avaliação: Maior para Menor', value: 'rating_desc' },
  { label: 'Mais Recentes', value: 'newest' }
];

export default function SparklingWinesPage() {
  // Estado para controlar a visibilidade do filtro em dispositivos móveis
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Estado para as opções de filtro
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000],
    countries: [],
    years: [],
    rating: null,
    types: []
  });
  
  // Estado para a opção de ordenação selecionada
  const [sortBy, setSortBy] = useState('relevance');
  
  // Função para alternar a visibilidade dos filtros em dispositivos móveis
  const toggleMobileFilters = () => {
    setMobileFiltersOpen(!mobileFiltersOpen);
  };
  
  // Função para atualizar os filtros
  const handleFilterChange = (filterType: keyof FilterOptions, value: unknown) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'countries' || filterType === 'types') {
        if (Array.isArray(newFilters[filterType])) {
          const array = newFilters[filterType] as string[];
          
          if (array.includes(value as string)) {
            newFilters[filterType] = array.filter(item => item !== value) as string[];
          } else {
            newFilters[filterType] = [...array, value as string];
          }
        }
      } else if (filterType === 'years') {
        if (Array.isArray(newFilters[filterType])) {
          const array = newFilters[filterType] as number[];
          
          if (array.includes(value as number)) {
            newFilters[filterType] = array.filter(item => item !== value) as number[];
          } else {
            newFilters[filterType] = [...array, value as number];
          }
        }
      } else if (filterType === 'rating') {
        newFilters.rating = newFilters.rating === value ? null : value as number | null;
      } else {
        newFilters[filterType] = value as [number, number];
      }
      
      return newFilters;
    });
  };
  
  // Função para limpar todos os filtros
  const clearAllFilters = () => {
    setFilters({
      priceRange: [0, 1000],
      countries: [],
      years: [],
      rating: null,
      types: []
    });
  };
  
  // Função para atualizar a ordenação
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  
  // Filtra os produtos com base nos filtros selecionados
  const filteredProducts = sparklingWines.filter(product => {
    // Filtro por preço
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
      return false;
    }
    
    // Filtro por país
    if (filters.countries.length > 0 && !filters.countries.includes(product.country)) {
      return false;
    }
    
    // Filtro por ano
    if (filters.years.length > 0 && !filters.years.includes(product.year)) {
      return false;
    }
    
    // Filtro por avaliação
    if (filters.rating !== null && product.rating < filters.rating) {
      return false;
    }
    
    // Filtro por tipo
    if (filters.types.length > 0 && !filters.types.includes(product.type)) {
      return false;
    }
    
    return true;
  });
  
  // Ordena os produtos com base na opção selecionada
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price_asc':
        return a.price - b.price;
      case 'price_desc':
        return b.price - a.price;
      case 'rating_desc':
        return b.rating - a.rating;
      case 'newest':
        return b.year - a.year;
      default:
        // Relevância (padrão)
        return 0;
    }
  });

  return (
    <main className="container mx-auto px-4 py-8 mt-[60px] md:mt-[80px]">
      {/* Cabeçalho da página */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Espumantes</h1>
        <p className="text-gray-600">
          Descubra nossa seleção premium de espumantes, desde o prestigioso Champagne francês até os refrescantes Proseccos italianos.
        </p>
      </div>
      
      {/* Barra de filtros e ordenação */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={toggleMobileFilters}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
          
          {/* Indicador de filtros ativos */}
          {(filters.countries.length > 0 || 
            filters.years.length > 0 || 
            filters.rating !== null || 
            filters.types.length > 0) && (
            <Button
              variant="ghost"
              className="text-primary"
              onClick={clearAllFilters}
            >
              Limpar filtros
              <X className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
        
        {/* Seletor de ordenação */}
        <div className="flex items-center gap-2">
          <span className="text-gray-700 whitespace-nowrap">Ordenar por:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
        </div>
      </div>
      
      {/* Contagem de resultados */}
      <div className="mb-6">
        <p className="text-gray-600">
          {sortedProducts.length} {sortedProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </p>
      </div>
      
      {/* Layout principal: filtros (desktop) + produtos */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros para desktop (sempre visíveis em desktop, escondidos em mobile) */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-medium text-lg">Filtros</h2>
              <Button
                variant="ghost"
                className="text-sm text-primary p-0"
                onClick={clearAllFilters}
              >
                Limpar
              </Button>
            </div>
            
            {/* Filtro por preço */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Preço</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">R$ {filters.priceRange[0]}</span>
                <span className="text-sm text-gray-600">R$ {filters.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-primary"
              />
            </div>
            
            {/* Filtro por país */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">País</h3>
              <div className="space-y-2">
                {availableCountries.map((country) => (
                  <label key={country} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.countries.includes(country)}
                      onChange={() => handleFilterChange('countries', country)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-gray-700">{country}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Filtro por ano */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Safra</h3>
              <div className="space-y-2">
                {availableYears.map((year) => (
                  <label key={year} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.years.includes(year)}
                      onChange={() => handleFilterChange('years', year)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-gray-700">{year}</span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Filtro por avaliação */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Avaliação</h3>
              <div className="space-y-2">
                {[4, 3, 2].map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.rating === rating}
                      onChange={() => handleFilterChange('rating', rating)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="ml-2 flex items-center text-gray-700">
                      {rating}+ <span className="text-yellow-400 ml-1">★</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            
            {/* Filtro por tipo */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Tipo</h3>
              <div className="space-y-2">
                {availableTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={() => handleFilterChange('types', type)}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <span className="ml-2 text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Filtros para mobile (visíveis apenas quando mobileFiltersOpen é true) */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            {/* Overlay escuro */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-25"
              onClick={toggleMobileFilters}
            />
            
            {/* Painel de filtros */}
            <div className="relative w-full max-w-xs bg-white h-full overflow-y-auto p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-medium text-lg">Filtros</h2>
                <button onClick={toggleMobileFilters}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Filtro por preço */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Preço</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">R$ {filters.priceRange[0]}</span>
                  <span className="text-sm text-gray-600">R$ {filters.priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-primary"
                />
              </div>
              
              {/* Filtro por país */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">País</h3>
                <div className="space-y-2">
                  {availableCountries.map((country) => (
                    <label key={country} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.countries.includes(country)}
                        onChange={() => handleFilterChange('countries', country)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-gray-700">{country}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Filtro por ano */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Safra</h3>
                <div className="space-y-2">
                  {availableYears.map((year) => (
                    <label key={year} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.years.includes(year)}
                        onChange={() => handleFilterChange('years', year)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-gray-700">{year}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Filtro por avaliação */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Avaliação</h3>
                <div className="space-y-2">
                  {[4, 3, 2].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.rating === rating}
                        onChange={() => handleFilterChange('rating', rating)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="ml-2 flex items-center text-gray-700">
                        {rating}+ <span className="text-yellow-400 ml-1">★</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Filtro por tipo */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Tipo</h3>
                <div className="space-y-2">
                  {availableTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes(type)}
                        onChange={() => handleFilterChange('types', type)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Botões de ação */}
              <div className="mt-8 flex gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={clearAllFilters}
                >
                  Limpar
                </Button>
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={toggleMobileFilters}
                >
                  Aplicar
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Grade de produtos */}
        <div className="flex-1">
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <SlidersHorizontal className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-600 mb-4">
                Tente ajustar seus filtros para encontrar o que está procurando.
              </p>
              <Button
                variant="outline"
                onClick={clearAllFilters}
              >
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 