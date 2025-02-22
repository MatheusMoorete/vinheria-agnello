import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Configuração das fonts
const inter = Inter({
  subsets: ['latin'], // Define o conjunto de caracteres
  variable: '--font_inter', // Define o nome da fonte
  display: 'swap', // Melhora a performance da página
})

// Configuração da fonte Playfair Display
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

//Metadata para SEO
export const metadata: Metadata = {
  title: 'Vinheria Agnello',
  description: 'Os melhores vinhos selecionados para você',
}

//Configuração do layout
export default function RootLayout({
  children, //Conteúdo da página
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className={playfair.variable}>
        <div className="min-h-screen flex flex-col">
          <Header />
          {/* Adicionando margin-top para compensar o header fixo */}
          <div className="flex-1 mt-[160px]">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}