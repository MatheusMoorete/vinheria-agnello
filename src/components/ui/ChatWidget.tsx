/**
 * Chat de Atendimento
 * 
 * Este componente implementa um widget de chat para atendimento ao cliente
 * que é exibido no canto inferior direito da tela.
 * 
 * Funcionalidades:
 * - Abre e fecha com animação suave
 * - Interface de chat com histórico de mensagens
 * - Formulário para envio de novas mensagens
 * - Indicador de status do atendente
 */

'use client' // Indica que é um componente que roda do lado do cliente

import { useState, useRef, useEffect } from 'react'
import { X, Send, MessagesSquare } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion' // Importando framer-motion para animações

// Interface para as propriedades recebidas pelo componente
interface ChatWidgetProps {
  isOpen: boolean;        // Controla se o chat está aberto ou fechado
  onClose: () => void;    // Função para fechar o chat
}

// Interface para as mensagens do chat
interface ChatMessage {
  id: number;             // Identificador único da mensagem
  text: string;           // Conteúdo da mensagem
  isFromUser: boolean;    // Indica se a mensagem é do usuário ou do atendente
  timestamp: Date;        // Horário da mensagem
}

export function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  // Estado para armazenar as mensagens do chat
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: 'Olá! Como posso ajudar com os nossos vinhos hoje?',
      isFromUser: false,
      timestamp: new Date()
    }
  ]);
  
  // Estado para o texto que está sendo digitado
  const [newMessage, setNewMessage] = useState('');
  
  // Referência para o contêiner de mensagens (para auto-scroll)
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  // Efeito para rolar para o final quando novas mensagens são adicionadas
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Função para enviar uma nova mensagem
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === '') return;
    
    // Adiciona a mensagem do usuário
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: newMessage,
      isFromUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simula uma resposta do atendente após 1 segundo
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: messages.length + 2,
        text: 'Agradeço pelo seu contato! Um de nossos especialistas em vinhos responderá em breve. Enquanto isso, você pode explorar nossa seleção de vinhos no menu Produtos.',
        isFromUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  // Formata a hora para exibição
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Variantes de animação para o framer-motion
  const chatVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', damping: 20, stiffness: 300 }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={chatVariants}
          className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden max-h-[500px] border border-gray-200"
        >
          {/* Cabeçalho do chat */}
          <div className="bg-primary text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessagesSquare className="w-5 h-5" />
              <div>
                <h3 className="font-medium">Atendimento</h3>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Online
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10 h-8 w-8"
              onClick={onClose}
              aria-label="Fechar chat"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Área de mensagens */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 p-4 overflow-y-auto max-h-80 bg-gray-50"
          >
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-3 ${message.isFromUser ? 'text-right' : 'text-left'}`}
              >
                <div 
                  className={`inline-block max-w-[80%] rounded-lg p-3 text-sm ${
                    message.isFromUser 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Formulário para envio de mensagens */}
          <form 
            onSubmit={handleSendMessage}
            className="border-t border-gray-200 p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button
              type="submit"
              variant="primary"
              size="icon"
              className="text-white h-9 w-9 rounded-full flex items-center justify-center"
              aria-label="Enviar mensagem"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 