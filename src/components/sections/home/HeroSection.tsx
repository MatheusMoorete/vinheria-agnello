import Image from 'next/image'
import { Button } from '@/components/ui/Button'

export function HeroSection() {
  return (
    <section className="relative h-screen">
      <Image
        src="https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea"
        alt="Vinheria Agnello - Os melhores vinhos selecionados para você"
        fill
        className="object-cover brightness-50"
        priority
        sizes="100vw"
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white space-y-6 p-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold max-w-4xl mx-auto">
            Descubra o Prazer dos Melhores Vinhos Selecionados
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-white/90">
            Curadoria especial dos melhores rótulos nacionais e importados para sua experiência
          </p>
          <div className="mt-8 sm:mt-10">
            <Button 
              variant="primary" 
              size="lg"
              className="
                bg-transparent hover:bg-[#D4B88C] 
                text-white border-2 border-[#D4B88C] hover:border-[#D4B88C]
                transition-all duration-300 ease-in-out
                px-8 sm:px-12 py-3 sm:py-4
                text-base sm:text-lg
                rounded-full
                hover:shadow-[0_0_20px_rgba(212,184,140,0.3)]
                transform hover:scale-[1.02]
              "
            >
              Explorar Vinhos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
} 