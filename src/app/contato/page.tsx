/**
 * Página de Contato da Vinheria Agnello
 * 
 * Esta página contém:
 * - Informações de contato (telefone, email, endereço)
 * - Formulário de contato
 * - Layout responsivo em grid
 */

import { ContactForm } from '@/components/sections/contato/ContactForm'
import { ContactInfo } from '@/components/sections/contato/ContactInfo'

export default function ContatoPage() {
  return (
    <main className="w-full py-8">
      <div className="container mx-auto px-4">
        {/* Grid com 2 colunas em desktop e 1 em mobile */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Coluna da esquerda - Informações de contato */}
          <div className="lg:pr-8 lg:border-r border-gray-200">
            <ContactInfo />
          </div>

          {/* Coluna da direita - Formulário */}
          <div className="lg:pl-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  )
}