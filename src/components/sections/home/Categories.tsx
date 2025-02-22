import Image from 'next/image'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  image: string
  slug: string
  description?: string
}

interface CategoriesProps {
  categories: Category[]
}

export function Categories({ categories }: CategoriesProps) {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-playfair text-center mb-8">
        Explore Nossas Categorias
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categoria/${category.slug}`}
            className="group relative h-64 overflow-hidden rounded-lg"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 text-center">
              <h3 className="text-white text-2xl font-semibold mb-2">
                {category.name}
              </h3>
              {category.description && (
                <p className="text-white/90 text-sm">
                  {category.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
} 