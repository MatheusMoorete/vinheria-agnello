/**
 * Cabeçalho da aplicação
 * 
 * Este componente define o cabeçalho da aplicação, que inclui:
 * - Barra superior com informações de frete  
 * - Logo e ícones de navegação
 * - Barra de busca
 * - Ícones de navegação para desktop
 * - Menu mobile
 * - Submenu de produtos
 * - Chat de atendimento
 */

'use client' // Indica que é um componente que roda do lado do cliente

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingCart, User, Search, Menu, X, MessagesSquare, Truck, ChevronDown } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/ui/Logo'
import { UnderConstructionModal } from '@/components/ui/UnderConstructionModal'
import { ProductsMenu } from '@/components/ui/ProductsMenu'
import { ChatWidget } from '@/components/ui/ChatWidget'

// Interface para os itens do menu principal
interface MenuItem {
  label: string
  href: string
  isReady?: boolean
  icon?: React.ReactNode // Ícone opcional para o item
}

// Componente principal do cabeçalho
export default function Header() {
  // Estados para controle dos diferentes elementos do cabeçalho
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Estado para o menu mobile  
  const [isScrolled, setIsScrolled] = useState(false) // Estado para a barra de busca
  const [isModalOpen, setIsModalOpen] = useState(false) // Estado para o modal de conteúdo em desenvolvimento
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false) // Estado para o menu de produtos
  const [isChatOpen, setIsChatOpen] = useState(false) // Estado para o chat de atendimento
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false) // Estado para mensagens não lidas
  
  const router = useRouter() // Hook de roteamento do Next.js
  const { scrollY } = useScroll() // Hook para monitorar o scroll da página
  const productsButtonRef = useRef<HTMLButtonElement>(null); // Referência para o botão de produtos

  // Função para verificar se o cabeçalho foi rolado
  useMotionValueEvent(scrollY, "change", (latest) => {
    const wasScrolled = latest > 30 // Verifica se o cabeçalho foi rolado mais de 30px
    if (wasScrolled !== isScrolled) { // Se o estado mudou
      setIsScrolled(wasScrolled) // Atualiza o estado
    }
  })

  // Efeito para fechar o menu de produtos quando clicar fora dele
  useEffect(() => {
    // Função que verifica se o clique foi fora do menu e do botão
    const handleClickOutside = (event: MouseEvent) => {
      // Se o menu estiver aberto e o clique não for no botão de produtos
      if (
        isProductsMenuOpen && 
        productsButtonRef.current && 
        !productsButtonRef.current.contains(event.target as Node)
      ) {
        // Não fechamos aqui porque o ProductsMenu tem seu próprio overlay para isso
      }
    };

    // Adiciona o evento de clique ao documento
    document.addEventListener('mousedown', handleClickOutside);
    
    // Remove o evento quando o componente for desmontado
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProductsMenuOpen]); // Executa novamente quando o estado do menu mudar

  // Efeito para simular uma nova mensagem após 30 segundos se o chat estiver fechado
  useEffect(() => {
    // Se o chat estiver fechado, simulamos uma nova mensagem após 30 segundos
    let timer: NodeJS.Timeout;
    
    if (!isChatOpen) {
      timer = setTimeout(() => {
        setHasUnreadMessages(true);
      }, 30000); // 30 segundos
    } else {
      // Se o chat for aberto, resetamos o indicador de mensagens não lidas
      setHasUnreadMessages(false);
    }
    
    // Limpeza do timer quando o componente for desmontado ou o estado mudar
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isChatOpen]);

  // Itens do menu principal
  const mainMenuItems: MenuItem[] = [
    { 
      label: 'Início', 
      href: '/', 
      isReady: true 
    },
    { 
      label: 'Produtos', 
      href: '/produtos',
      icon: <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
    },
    { 
      label: 'Contato', 
      href: '/contato', 
      isReady: true  
    },
    { 
      label: 'Trocas e Devoluções', 
      href: '/trocas' 
    },
    { 
      label: 'Perguntas Frequentes', 
      href: '/perguntas-frequentes' 
    },
  ]

  // Função para lidar com a navegação quando um item do menu é clicado
  const handleNavigation = (href: string, isReady?: boolean, isProductsItem: boolean = false) => {
    // Se for o item de produtos
    if (isProductsItem) {
      // Abre/fecha o menu de produtos ao clicar no botão
      // Comportamento toggle: se estiver aberto, fecha; se estiver fechado, abre
      setIsProductsMenuOpen(!isProductsMenuOpen);
      return; // Não navegamos, apenas abrimos/fechamos o menu
    }
    
    // Se a página estiver pronta, navega para ela
    if (isReady) {
      router.push(href);
    } else {
      // Se não estiver pronta, abre o modal de conteúdo em desenvolvimento
      setIsModalOpen(true);
    }
    
    // Fecha o menu mobile se estiver aberto
    setIsMobileMenuOpen(false);
    // Fecha o menu de produtos se estiver aberto
    setIsProductsMenuOpen(false);
  }

  // Função para abrir o chat e limpar as notificações
  const handleOpenChat = () => {
    setIsChatOpen(true);
    setHasUnreadMessages(false);
  };

  return (
    <>
      <header className="w-full fixed top-0 left-0 right-0 z-50">
        {/* Barra superior com informação de frete */}
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
                <button 
                  onClick={handleOpenChat}
                  className="flex flex-col items-center text-white hover:text-white/90 bg-transparent border-0 relative"
                >
                  <MessagesSquare className="w-6 h-6 mb-1 stroke-[1.5]"/>
                  <span className="text-xs">Atendimento</span>
                  {/* Indicador de novas mensagens */}
                  {hasUnreadMessages && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                      1
                    </span>
                  )}
                </button>

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
                    ref={item.label === 'Produtos' ? productsButtonRef : undefined}
                    onClick={() => handleNavigation(
                      item.href, 
                      item.isReady, 
                      item.label === 'Produtos'
                    )}
                    className="text-white hover:text-white/80 transition-colors text-sm whitespace-nowrap flex items-center gap-1"
                  >
                    {item.label}
                    {item.icon && item.icon}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Submenu de produtos que é exibido quando o usuário clica em "Produtos" */}
        <ProductsMenu 
          isOpen={isProductsMenuOpen} 
          onClose={() => setIsProductsMenuOpen(false)} 
        />

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-primary z-40 pt-[140px]">
            <nav className="container mx-auto px-4">
              <div className="flex flex-col space-y-4">
                {mainMenuItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(
                      item.href, 
                      item.isReady, 
                      item.label === 'Produtos'
                    )}
                    className="text-white text-base hover:text-white/80 transition-colors text-left flex items-center gap-2"
                  >
                    {item.label}
                    {item.label === 'Produtos' && 
                      <ChevronDown className={`w-4 h-4 transition-transform ${isProductsMenuOpen ? 'rotate-180' : ''}`} />
                    }
                  </button>
                ))}
                {/* Botão de atendimento para o menu mobile */}
                <button
                  onClick={() => {
                    handleOpenChat();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white text-base hover:text-white/80 transition-colors text-left flex items-center gap-2 relative"
                >
                  <MessagesSquare className="w-4 h-4 mr-1" />
                  Atendimento
                  {/* Indicador de novas mensagens no mobile */}
                  {hasUnreadMessages && (
                    <span className="ml-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                      1
                    </span>
                  )}
                </button>
              </div>
              
              {/* Submenu de produtos no mobile */}
              {isProductsMenuOpen && isMobileMenuOpen && (
                <div className="pl-4 mt-2 border-l border-white/20">
                  {Object.entries(categorias).map(([categoria, subcategorias]) => (
                    <div key={categoria} className="mb-4">
                      <h3 className="text-[#D4B88C] text-sm font-medium mb-2 capitalize">
                        {categoria}
                      </h3>
                      <ul className="space-y-2">
                        {subcategorias.map((subcategoria) => (
                          <li key={subcategoria}>
                            <Link 
                              href={`/produtos/${categoria.toLowerCase()}/${subcategoria.toLowerCase()}`}
                              className="text-white/80 text-sm hover:text-white transition-colors block py-1"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {subcategoria}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Modal de conteúdo em desenvolvimento */}
      <UnderConstructionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Chat de atendimento */}
      <ChatWidget 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  )
}

// Categorias de produtos (mesmas do ProductsMenu para uso no menu mobile)
const categorias = {
  vinhos: ['Tintos', 'Brancos', 'Rosés', 'Espumantes', 'Mini'],
  acessorios: ['Coolers', 'Acessórios para vinho', 'Wine Bags'],
  kits: ['Kits'],
  casa: ['Mesa Posta', 'Porta copos', 'Marcadores de taça', 'Guardanapos']
}