import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

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

interface FeaturedProductsProps {
  title: string
  subtitle?: string
  products: Product[]
}

export function FeaturedProducts({ title, subtitle, products }: FeaturedProductsProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-playfair mb-3">{title}</h2>
        {subtitle && <p className="text-gray-600">{subtitle}</p>}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            title={product.name}
            price={product.price}
            oldPrice={product.oldPrice}
            link={`/produto/${product.slug}`}
            installments={{
              number: 3,
              value: product.price / 3
            }}
            badges={[
              ...(product.isNew ? [{ text: 'Novo', color: 'secondary' as const }] : []),
              ...(product.isBestSeller ? [{ text: 'Mais Vendido', color: 'primary' as const }] : [])
            ]}
          />
        ))}
      </div>

      <div className="text-center mt-10">
        <Button variant="outline" size="lg">
          Ver Todos os Produtos
        </Button>
      </div>
    </section>
  )
} 