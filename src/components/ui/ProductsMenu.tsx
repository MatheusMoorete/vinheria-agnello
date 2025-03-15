/**
 * Menu de Produtos
 * 
 * Este componente exibe um submenu com todas as categorias e subcategorias de produtos
 * disponíveis na loja. Ele é exibido quando o usuário clica ou passa o mouse sobre
 * a opção "Produtos" no menu principal.
 * 
 * Funcionalidades:
 * - Exibe categorias de produtos organizadas em colunas
 * - Cada categoria contém subcategorias clicáveis
 * - Navegação direta para páginas de produtos específicos
 * - Animação suave de entrada/saída
 */

import Link from 'next/link'

// Interface que define as propriedades recebidas pelo componente
interface ProductMenuProps {
  isOpen: boolean;     // Controla se o menu está visível ou não
  onClose?: () => void; // Função opcional para fechar o menu
}

// Dados das categorias e subcategorias de produtos
// Em um ambiente de produção, estes dados viriam de uma API ou CMS
const categorias = {
  vinhos: ['Tintos', 'Brancos', 'Rosés', 'Espumantes', 'Mini'],
  acessorios: ['Coolers', 'Acessórios para vinho', 'Wine Bags'],
  kits: ['Kits'],
  casa: ['Mesa Posta', 'Porta copos', 'Marcadores de taça', 'Guardanapos']
}

export function ProductsMenu({ isOpen, onClose }: ProductMenuProps) {
  // Função para lidar com cliques nos links das subcategorias
  const handleLinkClick = () => {
    // Se existe a função onClose, executa ela para fechar o menu
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay transparente que fecha o menu quando clicado fora */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-transparent z-40"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Container principal do menu */}
      <div 
        className={`
          absolute top-full left-0 w-full bg-white shadow-lg z-50
          transition-all duration-300 ease-in-out
          ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}
        `}
      >
        <div className="container mx-auto px-4 py-6">
          {/* Grid de categorias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {Object.entries(categorias).map(([categoria, subcategorias]) => (
              <div key={categoria} className="mb-4 md:mb-0">
                {/* Título da categoria */}
                <h3 className="text-primary font-medium mb-3 capitalize border-b border-primary/20 pb-2">
                  {categoria}
                </h3>
                {/* Lista de subcategorias */}
                <ul className="space-y-2">
                  {subcategorias.map((subcategoria) => (
                    <li key={subcategoria}>
                      <Link 
                        href={`/produtos/${categoria.toLowerCase()}/${subcategoria.toLowerCase()}`}
                        className="text-gray-600 hover:text-primary transition-colors block py-1"
                        onClick={handleLinkClick}
                      >
                        {subcategoria}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}