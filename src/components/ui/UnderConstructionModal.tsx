import { Wine, Construction, X } from 'lucide-react'
import { Button } from './Button'

interface UnderConstructionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UnderConstructionModal({ isOpen, onClose }: UnderConstructionModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative animate-fadeIn">
        {/* Botão de fechar */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ícones animados */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Construction className="w-16 h-16 text-primary animate-bounce" />
            <Wine className="w-8 h-8 text-[#D4B88C] absolute -bottom-2 -right-2 animate-pulse" />
          </div>
        </div>

        {/* Título */}
        <h3 className="text-2xl font-playfair text-center text-primary mb-3">
          Conteúdo em Desenvolvimento
        </h3>

        {/* Mensagem */}
        <p className="text-center text-gray-600 mb-6">
          Estamos preparando algo especial para você! Como um bom vinho, algumas coisas precisam de tempo para atingir a excelência.
        </p>

        {/* Linha decorativa */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-[#D4B88C]/30 flex-1" />
          <Wine className="w-5 h-5 text-[#D4B88C]" />
          <div className="h-px bg-[#D4B88C]/30 flex-1" />
        </div>

        {/* Botão de voltar */}
        <Button
          onClick={onClose}
          className="w-full bg-[#D4B88C] hover:bg-[#D4B88C]/90 text-white"
        >
          Voltar ao Início
        </Button>
      </div>
    </div>
  )
} 