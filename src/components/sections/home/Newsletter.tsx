import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export function Newsletter() {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-playfair text-white mb-4">
            Receba Ofertas Exclusivas
          </h2>
          <p className="text-white/90 text-base sm:text-lg mb-8">
            Cadastre-se para receber em primeira mão nossas novidades, dicas de harmonização e promoções especiais.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <form className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0">
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                className="
                  w-full
                  bg-white 
                  border-0 
                  h-12
                  sm:h-14
                  text-base
                  placeholder:text-gray-400
                  rounded-full
                  px-6
                  sm:pr-36
                  focus-visible:ring-[#D4B88C]
                  focus-visible:ring-offset-0
                "
              />
              <Button 
                type="submit"
                className="
                  w-full
                  sm:w-auto
                  sm:absolute 
                  sm:right-1
                  sm:top-1
                  bg-[#D4B88C] 
                  hover:bg-[#D4B88C]/90 
                  text-white 
                  rounded-full 
                  px-8
                  h-12
                  sm:h-12
                  text-base
                  font-medium
                  transition-colors
                  duration-200
                "
              >
                Cadastrar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
} 