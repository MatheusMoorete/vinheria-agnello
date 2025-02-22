//Pagina principal de contato

/** 
 * useState serve para gerenciar o estado do formulario, chamamos de estado o valor que 
 * esta sendo alterado, nesse caso o valor dos inputs do formulario.
 */
'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

/**
 * Componente de formulário de contato
 * - Campos: nome, email, telefone, mensagem
 * - Validação de campos obrigatórios
 * - Integração com reCAPTCHA
 * - Estilização consistente com o tema
 */

//Criando o formulario de contato
export function ContactForm() {
    // Estado para gerenciar os dados do formulário
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        mensagem: '',
    })
    
    /**
     * Função que lida com o envio do formulário
     * @param e - Evento do formulário
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Dados do formulário:', formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Nome */}
            <div>
                <label 
                    htmlFor="nome" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Nome completo
                </label>
                <Input
                    id="nome"
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* Campo Email */}
            <div>
                <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    E-mail
                </label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* Campo Telefone */}
            <div>
                <label 
                    htmlFor="telefone" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Telefone
                </label>
                <Input
                    id="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* Campo Mensagem */}
            <div>
                <label 
                    htmlFor="mensagem" 
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Mensagem
                </label>
                <textarea
                    id="mensagem"
                    rows={6}
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full bg-white border border-gray-300 rounded-md p-2 text-sm resize-none focus:ring-primary focus:border-primary"
                    required
                />
            </div>

            {/* reCAPTCHA */}
            <div 
                className="g-recaptcha my-4" 
                data-sitekey="SEU_SITE_KEY"
            ></div>

            {/* Botão de Envio */}
            <Button 
                type="submit"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 h-12 text-base"
            >
                Enviar
            </Button>
        </form>
    )
}
