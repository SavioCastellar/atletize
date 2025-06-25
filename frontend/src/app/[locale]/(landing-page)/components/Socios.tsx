'use client'

import React, { useEffect, useState } from 'react'
import { Container } from './Container'
import { motion } from 'framer-motion'
import { supabase } from '@/app/api/auth/supabase/client'
import DonationGoal from './DonationGoal'
import { Crown, Gem, Star } from 'lucide-react'
import MembershipCard from './MembershipCard'

const memberships = [
  {
    title: "Bronze",
    icon: <Crown className="w-6 h-6" color='#b87333' />,
    price: "R$20",
    period: "/mês",
    features: ["Priority Support", "Custom Themes", "API Access", "Analytics Dashboard"],
    gradient: "from-gray-800 via-gray-700 to-gray-800",
    shadowColor: "shadow-gray-900/50",
    buttonGradient: "from-gray-700 to-gray-800",
    borderGradient: "from-gray-700 via-gray-600 to-gray-700",
  },
  {
    title: "Prata",
    icon: <Crown className="w-6 h-6" color='#CCCCCC' />,
    price: "R$50",
    period: "/mês",
    features: ["24/7 Support", "Advanced Security", "Custom Integration", "Team Management"],
    gradient: "from-gray-700 via-gray-600 to-gray-700",
    shadowColor: "shadow-gray-900/50",
    buttonGradient: "from-gray-600 to-gray-700",
    borderGradient: "from-gray-600 via-gray-500 to-gray-600",
    featured: true
  },
  {
    title: "Ouro",
    icon: <Crown className="w-6 h-6" color='#B89C54' />,
    price: "R$100",
    period: "/mês",
    features: ["Dedicated Support", "Custom Solutions", "SLA Agreement", "Priority Features"],
    gradient: "from-gray-800 via-gray-700 to-gray-800",
    shadowColor: "shadow-gray-900/50",
    buttonGradient: "from-gray-700 to-gray-800",
    borderGradient: "from-gray-700 via-gray-600 to-gray-700"
  }
]

export function Socios() {
  const [donors, setDonors] = useState<null | any[]>(null)
  const [totalAmount, setTotalAmount] = useState<number>(0)

  useEffect(() => {
    fetchDonors()
    fetchTotalDonations()
  }, [])

  const fetchDonors = async () => {
    const { data: donors, error } = await supabase
      .from('donations')
      .select('name, amount, message')
      .order('created_at', { ascending: false })
      .range(0, 2)
    if (error) console.error('Error fetching donors:', error.message)
    setDonors(donors)
  }

  // fetch total amount of donations
  const fetchTotalDonations = async () => {
    const { data: amount, error } = await supabase
      .from('donations')
      .select('amount')
    if (error) console.error('Error fetching total donations:', error.message)
    if (amount) {
      const totalAmount = amount.reduce((acc, donation) => acc + donation.amount, 0)
      setTotalAmount(totalAmount)
    }
  }

  return (
    <Container className="flex flex-col my-14 mx-20 gap-4">
      <motion.h1
        className="text-3xl font-normal"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Planos de Sócios & Doações
      </motion.h1>
      <p className='text-lg mb-4'>Junte-se a nós como sócio ou faça uma doação para apoiar nossa atlética e contribuir para o crescimento e sucesso dos nossos atletas! Sua participação faz a diferença!</p>
      <div className='grid grid-cols-2 items-center'>
        <div className="py-12 flex items-center justify-center">
          <div className="flex -ml-8">
            {memberships.map((membership, index) => (
              <MembershipCard key={index} {...membership} />
            ))}
          </div>
        </div>
        <div className='flex flex-col gap-8'>
          {/* <DonationCard /> */}
          <DonationGoal
            currentAmount={totalAmount / 100}
            goalAmount={10000}
            currency="R$"
            recentDonors={donors || []}
          />
        </div>
      </div>
    </Container>
  )
}
