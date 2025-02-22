'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, User, Search, Menu, X, MessagesSquare, Truck } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { UnderConstructionModal } from '@/components/ui/UnderConstructionModal'

// Interface para os itens do menu principal
interface MenuItem {
  label: string
  href: string
  isReady?: boolean
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const wasScrolled = latest > 30
    if (wasScrolled !== isScrolled) {
      setIsScrolled(wasScrolled)
    }
  })

  // Itens do menu principal
  const mainMenuItems: MenuItem[] = [
    { label: 'Início', href: '/', isReady: true },
    { label: 'Produtos', href: '/produtos' },
    { label: 'Contato', href: '/contato', isReady: true  },
    { label: 'Trocas e Devoluções', href: '/trocas' },
    { label: 'Perguntas Frequentes', href: '/perguntas-frequentes' },
  ]

  const handleNavigation = (href: string, isReady?: boolean) => {
    if (isReady) {
      router.push(href)
    } else {
      setIsModalOpen(true)
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="w-full fixed top-0 left-0 right-0 z-50">
        {/* Barra superior */}
        <motion.div 
          className="bg-[#D4B88C] text-primary flex justify-center items-center overflow-hidden"
          animate={{ 
            height: isScrolled ? 0 : "auto",
            opacity: isScrolled ? 0 : 1,
          }}
          initial={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="text-[10px] sm:text-xs flex items-center gap-1.5 py-1">
            <Truck className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>Frete grátis acima de R$250,00</span>
          </div>
        </motion.div>

        {/* Container principal do header */}
        <div className="bg-primary">
          <div className="container mx-auto px-3 sm:px-4 py-3 lg:py-4">
            <div className="flex flex-col md:flex-row md:items-center md:gap-8">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <Logo />

                {/* Ícones mobile */}
                <div className="flex items-center gap-2 md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                  >
                    <Search className="w-5 h-5" />
                  </Button>

                  <Link 
                    href="/carrinho"
                    className="text-white relative"
                  >
                    <ShoppingCart className="w-5 h-5 stroke-[1.5]" />
                    <span className="absolute -top-1 -right-1 bg-[#D4B88C] text-white text-[8px] rounded-full w-3.5 h-3.5 flex items-center justify-center">
                      0
                    </span>
                  </Link>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Menu principal"
                  >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              {/* Barra de busca */}
              <div className="mt-3 md:mt-0 md:flex-1 md:max-w-3xl md:ml-auto">
                <div className="relative">
                  <Input
                    type="search"
                    placeholder="O que você está buscando?"
                    className="w-full pl-4 md:pl-6 pr-10 md:pr-12 h-9 md:h-12 rounded-full bg-white text-primary placeholder:text-gray-400 border-none text-sm"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 hover:bg-transparent text-primary h-7 w-7 md:h-9 md:w-9"
                  >
                    <Search className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                </div>
              </div>

              {/* Ícones desktop */}
              <div className="hidden md:flex items-start gap-6 lg:gap-8">
                <Link 
                  href="/atendimento"
                  className="flex flex-col items-center text-white hover:text-white/90"
                >
                  <MessagesSquare className="w-6 h-6 mb-1 stroke-[1.5]"/>
                  <span className="text-xs">Atendimento</span>
                </Link>

                <Link 
                  href="/conta"
                  className="flex flex-col items-center text-white hover:text-white/90"
                >
                  <User className="w-6 h-6 mb-1 stroke-[1.5]" />
                  <span className="text-xs">Minha conta</span>
                </Link>

                <Link 
                  href="/carrinho"
                  className="flex flex-col items-center text-white hover:text-white/90 relative"
                >
                  <div className="relative">
                    <ShoppingCart className="w-6 h-6 mb-1 stroke-[1.5]" />
                    <span className="absolute -top-1 -right-1 bg-[#D4B88C] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                      0
                    </span>
                  </div>
                  <span className="text-xs">Meu carrinho</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Menu de navegação principal */}
        <nav className="bg-primary border-t border-white/10 hidden md:block">
          <div className="container mx-auto px-4">
            <ul className="flex items-center justify-center gap-8 lg:gap-12 py-3">
              {mainMenuItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleNavigation(item.href, item.isReady)}
                    className="text-white hover:text-white/80 transition-colors text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-primary z-40 pt-[140px]">
            <nav className="container mx-auto px-4">
              <div className="flex flex-col space-y-4">
                {mainMenuItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href, item.isReady)}
                    className="text-white text-base hover:text-white/80 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Modal de conteúdo em desenvolvimento */}
      <UnderConstructionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}