"use client"

import { Button } from "@/components/ui/button"
import { Calendar, Trophy, Users, Award, History, UserPlus, Menu, ChevronRight, Instagram, Facebook, Apple as WhatsApp, Store, Medal, LucideIcon, Contact, User, CircleUser, Crown, Heart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { NOME_ATLETICA_ABREVIADO, NOME_ATLETICA_COMPLETO } from "@/app/constants"
import CartDrawer from "../../(store)/components/cart/cart-drawer"
import { motion } from "framer-motion"
import { FeatureCard } from "./FeatureCard"
import { supabase } from "@/app/api/auth/supabase/client"
import DonationGoal from "./DonationGoal"

type CardItem = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

const CARD_ITEMS: CardItem[] = [
  {
    title: "Hall da Fama",
    description: "Conheça os atletas que fizeram história na nossa atlética.",
    icon: Trophy,
    href: "/hall-da-fama"
  },
  {
    title: "Modalidades",
    description: "Explore todas as modalidades esportivas disponíveis.",
    icon: Medal,
    href: "/modalidades"
  },
  {
    title: "Gestão",
    description: "Conheça nossa equipe de gestão e diretoria.",
    icon: Users,
    href: "/gestao"
  },
  {
    title: "História",
    description: "Descubra a trajetória e história da nossa atlética.",
    icon: History,
    href: "/historia"
  },
  {
    title: "Loja",
    description: "Adquira produtos oficiais da atlética.",
    icon: Store,
    href: "/loja"
  },
  {
    title: "Seja Sócio",
    description: "Torne-se um sócio e aproveite benefícios exclusivos.",
    icon: UserPlus,
    href: "/socio"
  }
]

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

export default function HomeMobile(props: any) {
  const { session } = props
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [donors, setDonors] = useState<null | any[]>(null)
  const [totalAmount, setTotalAmount] = useState<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    setMounted(true)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  // useEffect(() => {
  //   fetchDonors()
  //   fetchTotalDonations()
  // }, [])

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}>
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-4xl text-center font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primaria to-primaria-light bg-clip-text text-transparent">
              {NOME_ATLETICA_ABREVIADO}
            </h1>
          </div>

          <div className="flex justify-center items-center gap-6">
            <CartDrawer userId={session?.user?.id!} />
            <CircleUser className="relative size-6 hover:scale-90 transition-all duration-200 text-black cursor-pointer" />
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" className="md:hidden">
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col space-y-4 mt-6">
                  {[
                    { icon: Trophy, label: "Hall da Fama" },
                    { icon: Users, label: "Modalidades" },
                    { icon: Award, label: "Gestão" },
                    { icon: History, label: "História" },
                    { icon: UserPlus, label: "Seja Sócio" }
                  ].map(({ icon: Icon, label }) => (
                    <Link
                      key={label}
                      href="#"
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {["Hall da Fama", "Modalidades", "Gestão", "Eventos", "História", "Seja Sócio"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm font-medium relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full px-4 py-1 text-sm font-medium border-2 border-black">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Entrar em contato
              </span>
            </div>

            <h2 className="text-4xl text-center font-bold tracking-tighter sm:text-5xl md:text-6xl md:text-start bg-gradient-to-r from-primaria to-primaria-light bg-clip-text text-transparent">
              {NOME_ATLETICA_COMPLETO}
            </h2>

          </div>
          <div className="flex justify-center">
            <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] animate-float">
              <Image
                src="/logo.png"
                alt="MED-UFV Logo"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>
          <a className='h-[100px] w-full -left-[2px] -bottom-[2px] flex justify-center items-center pt-3 pr-3' href='/carteirinha'>
            <div className='border-2 border-black rounded-xl w-full h-full flex justify-between overflow-hidden shadow-md'>
              <div className='flex flex-col justify-center ml-4'>
                <h3 className='text-md'>Já é sócio? Acesse sua</h3>
                <h1 className='text-2xl font-medium'>carteirinha digital</h1>
              </div>
              <a className="relative w-16 border-l-2 border-black cursor-pointer">
                <img className="h-full" src="/theme-bg.png" alt="BG" />
                <Contact className="absolute inset-0 w-10 h-10 m-auto" strokeWidth={1.2} color={'background'} />
              </a>
            </div>
          </a>
        </div>
      </section>

      <section className="container px-4 md:py-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {CARD_ITEMS.map((item) => (
            <FeatureCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section className="container px-4 py-16 md:py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Próximos Eventos e Competições
            </h2>
            <p className="text-gray-500 max-w-[600px]">
              Fique por dentro de todos os eventos e não perca nenhuma competição da nossa atlética.
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex">
            <Calendar className="mr-2 h-4 w-4" />
            Calendário completo
          </Button>
        </div>
        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event, i) => (
            <Card key={i} className="group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="text-sm font-medium text-emerald-600 mb-2">
                  {event.date}
                </div>
                <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {event.description}
                </p>
                <Button variant="ghost" className="w-full group">
                  Saiba mais
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div> */}
        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            Calendário completo
          </Button>
        </div>
      </section>

      {/* <section className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos de Sócios & Doações</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Junte-se a nós como sócio ou faça uma doação para apoiar nossa atlética e contribuir para o crescimento e
              sucesso dos nossos atletas! Sua participação faz a diferença!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div className="relative flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:pb-0">
              {memberships.map((plan) => (
                <div
                  key={plan.title}
                  className="min-w-[250px] md:min-w-0 flex-shrink-0 relative bg-black rounded-xl p-6 text-white"
                >
                  {plan.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-[#2F9E44] text-white px-3 py-1 rounded-full text-sm">Popular</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-yellow-500">👑</span>
                    <h3 className="text-xl font-semibold">{plan.title}</h3>
                  </div>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">R${plan.price}</span>
                    <span className="text-gray-400">/mês</span>
                  </div>
                  <ul className="space-y-4 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#2F9E44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2 transition-colors">
                    Escolher Plano
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}
      <section className="py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Planos de Sócios & Doações</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Junte-se a nós como sócio ou faça uma doação para apoiar nossa atlética e contribuir para o crescimento e
              sucesso dos nossos atletas! Sua participação faz a diferença!
            </p>
          </div>

          <div className="md:grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Pricing Plans */}
            <div className="md:col-span-3">
              <div className="flex overflow-x-auto pb-4 md:grid md:grid-cols-3 md:gap-8 lg:gap-12 md:overflow-visible md:pb-0 snap-x snap-mandatory space-x-4 pl-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {memberships.map((plan) => (
                  <div
                    key={plan.title}
                    className="snap-start w-[85vw] md:w-auto flex-none relative bg-black rounded-xl p-6 text-white md:flex-1 md:min-w-0"
                  >
                    {plan.featured && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-[#2F9E44] text-white px-3 py-1 rounded-full text-sm">Popular</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-yellow-500">👑</span>
                      <h3 className="text-xl font-semibold">{plan.title}</h3>
                    </div>
                    <div className="mb-6">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-gray-400">/mês</span>
                    </div>
                    <ul className="space-y-4 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-[#2F9E44]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2 transition-colors">
                      Escolher Plano
                    </button>
                  </div>
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
        </div>
      </section>
    </div>
  )
}
