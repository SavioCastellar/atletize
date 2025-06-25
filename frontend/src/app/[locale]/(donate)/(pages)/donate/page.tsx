'use client'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Eye, Heart, ShieldCheck } from 'lucide-react'
import DonationForm from '../../components/DonationForm'
import { TbReceiptTax } from "react-icons/tb"

export default function Home() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
            <Heart className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Faça a diferença hoje
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sua doação nos ajuda a continuar nossa missão de crescer o esporte universitário.
            Toda contribuição, não importa o tamanho, cria mudanças positivas duradouras.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <DonationForm />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className='flex items-center mb-2 gap-2'>
              <Eye className="w-8 h-8 text-black" />
              <h3 className="text-lg font-semibold text-gray-900">
                Transparência
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              100% da sua doação vai direto para nossas causas, com relatório detalhado do impacto da campanha.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className='flex items-center mb-2 gap-2'>
              <ShieldCheck className="w-8 h-8 text-black" />
              <h3 className="text-lg font-semibold text-gray-900">
                Pagamento Seguro
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Sua transação é protegida com criptografia e segurança líderes do setor.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className='flex items-center mb-2 gap-2'>
              <TbReceiptTax size={32} />
              <h3 className="text-lg font-semibold text-gray-900">
                Dedução Fiscal
              </h3>
            </div>
            <p className="text-gray-600 text-sm">
              Receba um recibo fiscal para dedução de impostos em todas as suas doações.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
