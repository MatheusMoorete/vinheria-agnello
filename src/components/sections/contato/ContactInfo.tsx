'use client'

import { MapPin, Phone, Mail, Instagram } from 'lucide-react'

/**
 * Componente que exibe as informações de contato da Vinheria
 * - Redes sociais
 * - Telefone
 * - Email
 * - Endereço
 */

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-playfair text-primary">Contato</h2>
      
      <div className="space-y-4">
        {/* Instagram */}
        <div className="flex items-center gap-2 text-gray-600">
          <Instagram className="w-5 h-5 text-primary" />
          <a 
            href="https://instagram.com/vinneloja" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            @agnello.vinhos
          </a>
        </div>

        {/* WhatsApp/Telefone */}
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-5 h-5 text-primary" />
          <a 
            href="tel:5531971200357" 
            className="hover:text-primary transition-colors"
          >
             (11) 99999-9999
          </a>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-5 h-5 text-primary" />
          <a 
            href="mailto:contato@vinheriaagnello.com" 
            className="hover:text-primary transition-colors"
          >
            contato@vinheriaagnello.com
          </a>
        </div>

        {/* Endereço */}
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5 text-primary" />
          <address className="not-italic">
            Rua dos Vinhedos, 521 - Vila Madalena, São Paulo - SP
          </address>
        </div>
      </div>
    </div>
  )
}