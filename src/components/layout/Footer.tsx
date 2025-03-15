/**
 * Rodapé da aplicação
 * 
 * Este componente define o rodapé da aplicação, que inclui:
 * - Informações da empresa
 * - Links úteis
 * - Contato  
 */

import Link from 'next/link' // Importa o componente Link do Next.js
export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Seção de Informações da Empresa */}
          <div>
            <h3 className="text-xl font-playfair mb-4">Vinheria Agnello</h3>
            <p className="text-sm">
              Sua experiência única com os melhores vinhos selecionados.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/sobre" className="text-sm hover:text-secondary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/politica-privacidade" className="text-sm hover:text-secondary transition-colors">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos" className="text-sm hover:text-secondary transition-colors">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg mb-4">Contato</h4>
            <address className="not-italic text-sm">
              <p>Email: contato@vinheriaagnello.com</p>
              <p>Tel: (11) 99999-9999</p>
              <p>Rua dos Vinhedos, 521 - Vila Madalena, São Paulo - SP</p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>© {new Date().getFullYear()} Vinheria Agnello. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}