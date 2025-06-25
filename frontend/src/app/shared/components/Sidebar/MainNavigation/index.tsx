'use client';

import { MainNavLinks } from './MainNavLinks';
import { BookUser, BriefcaseBusiness, LayoutDashboard, Package, PartyPopper, ScrollText, Trophy } from 'lucide-react';

export function MainNavigation() {
  const tabs = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      link: 'dashboard',
    },
    {
      title: 'Produtos',
      icon: Package,
      link: 'produtos',
    },
    {
      title: 'Pedidos',
      icon: ScrollText,
      link: 'pedidos',
    },
    {
      title: 'Gestão',
      icon: BriefcaseBusiness,
      link: 'gestao',
    },
    {
      title: 'Atletas',
      icon: BookUser,
      link: 'atletas',
    },
    {
      title: 'Modalidades',
      icon: Trophy,
      link: 'modalidades',
    },
  ]

  return (
  <>
  {
    tabs.map((tab, index) => (
      <MainNavLinks
        key={index}
        item={tab.title}
        icon={tab.icon}
        link={tab.link}
      />
    ))
  }
  </>
  )
}
