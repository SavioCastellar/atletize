'use client'
import { Container } from '@/app/[locale]/(landing-page)/components/Container'
import { Profile } from '@/app/[locale]/(users)/components/Profile'
import { Popover, Transition } from '@headlessui/react'
import { Session } from 'next-auth'
import Link from 'next/link'
import { Fragment, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { BadgePercent, Beer, BookText, BriefcaseBusiness, Glasses, HeartHandshake, Medal, PartyPopper, Rocket, Sparkles, SquareUserRound, Vote } from 'lucide-react'
import CartDrawer from '../../(store)/components/cart/cart-drawer'
import { cn } from '@/lib/utils'

interface HeaderProps {
  isDark?: boolean
  session: Session | null
  withoutMenu?: boolean
  callToActionToSaveLeads?: ReactNode
}

function MobileNavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Popover.Button as={Link} href={href} className='block w-full p-2'>
      {children}
    </Popover.Button>
  )
}

function MobileNavIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden='true'
      className='h-3.5 w-3.5 overflow-visible stroke-gray-700'
      fill='none'
      strokeWidth={2}
      strokeLinecap='round'
    >
      <path
        d='M0 1H14M0 7H14M0 13H14'
        className={twMerge(
          'origin-center transition',
          open && 'scale-90 opacity-0'
        )}
      />
      <path
        d='M2 2L12 12M12 2L2 12'
        className={twMerge(
          'origin-center transition',
          !open && 'scale-90 opacity-0'
        )}
      />
    </svg>
  )
}

function MobileNavigation({
  session,
  callToActionToSaveLeads,
}: HeaderProps) {
  return (
    <Popover>
      <Popover.Button
        className='ui-not-focus-visible:outline-none relative z-10 flex h-8 w-8 items-center justify-center'
        aria-label='Toggle Navigation'
      >
        {({ open }) => <MobileNavIcon open={open} />}
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='duration-150 ease-in'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Overlay className='fixed inset-0 bg-gray-500/50' />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter='duration-150 ease-out'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='duration-100 ease-in'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <Popover.Panel
            as='div'
            className='absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-gray-900 shadow-xl ring-1 ring-gray-900/5'
          >
            <MobileNavLink href='#features'>Teste</MobileNavLink>
            <MobileNavLink href='#testimonials'>Teste</MobileNavLink>
            <MobileNavLink href='#doubts'>Teste</MobileNavLink>
            <MobileNavLink href='#pricing'>Teste</MobileNavLink>
            <hr className='m-2 border-gray-500/40' />
            {session ? (
              <>
                <MobileNavLink href='/home'>
                  Teste
                </MobileNavLink>
              </>
            ) : !callToActionToSaveLeads ? (
              <MobileNavLink href='/signin'>
                Teste
              </MobileNavLink>
            ) : (
              callToActionToSaveLeads
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export function Header({
  isDark,
  session,
  withoutMenu,
  callToActionToSaveLeads,
}: HeaderProps) {
  return (
    <>
      <header className={`py-2 ${isDark ? 'text-white bg-black/70' : 'bg-background '}`}>
        <Container className='lg:px-14'>
          <nav className='flex justify-end gap-14'>
            <div className='flex items-center'>
              <div className='w-[100px]'>
                <CartDrawer userId={session?.user?.id!} />
              </div>
              {withoutMenu ? (
                <></>
              ) : (
                <div className="hidden lg:flex lg:gap-x-6 items-center">
                  <NavigationMenu>
                    <NavigationMenuList>
                      {/* Atividades Menu */}
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), isDark ? 'bg-black/70 hover:bg-neutral-800 data-[active]:bg-neutral-800/50 data-[state=open]:bg-neutral-800/50 hover:text-white' : 'bg-background data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:bg-accent')}>
                          Atividades
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="min-w-[600px] p-6 space-y-4">
                            {/* Modalidades */}
                            <Link href="/detalhes?tab=modalidades" passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <Medal className="mr-4" strokeWidth={1} size={36} />
                                  <div>
                                    <h3 className="text-lg font-semibold">Modalidades</h3>
                                    <p className="text-sm text-gray-600">Explore diferentes modalidades esportivas.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>

                            {/* Eventos */}
                            <Link href="/eventos" passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <PartyPopper className="mr-4" strokeWidth={1} size={36} />
                                  <div>
                                    <h3 className="text-lg font-semibold">Eventos</h3>
                                    <p className="text-sm text-gray-600">Fique por dentro dos próximos eventos.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>

                            {/* Votação */}
                            <Link href="/votacao" passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <Vote className="mr-4" strokeWidth={1} size={36} />
                                  <div>
                                    <h3 className="text-lg font-semibold">Votação</h3>
                                    <p className="text-sm text-gray-600">Participe da votação dos craques do período.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      {/* Loja Menu */}
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), isDark ? 'bg-black/70 hover:bg-neutral-800 data-[active]:bg-neutral-800/50 data-[state=open]:bg-neutral-800/50 hover:text-white' : 'bg-background data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:bg-accent')}>
                          Loja
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="min-w-[600px] p-6 grid grid-cols-2 gap-4">

                            {/* Lançamentos */}
                            <Link href="/loja" passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <Rocket className="mr-4" strokeWidth={1} size={36}/>
                                  <div>
                                    <h3 className="text-lg font-semibold">Lançamentos</h3>
                                    <p className="text-sm text-gray-600">Confira os novos produtos em nossa loja.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>

                            {/* Promoção */}
                            <Link href="/promocao" passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <BadgePercent className="mr-4" strokeWidth={1} size={36}/>
                                  <div>
                                    <h3 className="text-lg font-semibold">Promoção</h3>
                                    <p className="text-sm text-gray-600">Aproveite as ofertas imperdíveis.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>

                            {/* Acessórios */}
                            <Link href="/acessorios" passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <Glasses className="mr-4" strokeWidth={1} size={36}/>
                                  <div>
                                    <h3 className="text-lg font-semibold">Acessórios</h3>
                                    <p className="text-sm text-gray-600">Encontre os melhores acessórios.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>

                            {/* Kits */}
                            <Link href="/kits" passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <Beer className="mr-4" strokeWidth={1} size={36}/>
                                  <div>
                                    <h3 className="text-lg font-semibold">Kits</h3>
                                    <p className="text-sm text-gray-600">Confira nossos kits especiais.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      {/* Parcerias Menu */}
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), isDark ? 'bg-black/70 hover:bg-neutral-800 data-[active]:bg-neutral-800/50 data-[state=open]:bg-neutral-800/50 hover:text-white' : 'bg-background data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:bg-accent')}>
                          Parcerias
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="min-w-[600px] p-6 space-y-4">

                            {/* Seja Sócio */}
                            <Link href="/socios" passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <SquareUserRound className="mr-4" strokeWidth={1} size={36}/>
                                  <div>
                                    <h3 className="text-lg font-semibold">Seja Sócio</h3>
                                    <p className="text-sm text-gray-600">Junte-se a nós e aproveite os benefícios.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>

                            {/* Patrocinadores */}
                            <Link href="/patrocinadores" passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <HeartHandshake className="mr-4" strokeWidth={1} size={36}/>
                                  <div>
                                    <h3 className="text-lg font-semibold">Patrocinadores</h3>
                                    <p className="text-sm text-gray-600">Conheça nossos parceiros e patrocinadores.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>

                      {/* Sobre Nós Menu */}
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className={cn(navigationMenuTriggerStyle(), isDark ? 'bg-black/70 hover:bg-neutral-800 data-[active]:bg-neutral-800/50 data-[state=open]:bg-neutral-800/50 hover:text-white' : 'bg-background data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 hover:bg-accent')}>
                          Sobre Nós
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="min-w-[600px] p-6 grid grid-cols-1 gap-4">

                            {/* Nossa História */}
                            <Link href="/historia" passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <BookText className="mr-4" strokeWidth={1} size={36} />
                                  <div>
                                    <h3 className="text-lg font-semibold">Nossa História</h3>
                                    <p className="text-sm text-gray-600">Saiba mais sobre nossa trajetória.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>

                            {/* Gestão */}
                            <Link href="/detalhes?tab=gestao" passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <BriefcaseBusiness className="mr-4" strokeWidth={1} size={36} />
                                  <div>
                                    <h3 className="text-lg font-semibold">Gestão</h3>
                                    <p className="text-sm text-gray-600">Conheça nossa equipe de gestão.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>

                            {/* Hall da Fama */}
                            <Link href='/detalhes?tab=hall-da-fama' passHref legacyBehavior>
                              <NavigationMenuLink className="block p-4 rounded-lg hover:bg-zinc-100">
                                <div className="flex items-center">
                                  <Sparkles className="mr-4" strokeWidth={1} size={36} />
                                  <div>
                                    <h3 className="text-lg font-semibold">Hall da Fama</h3>
                                    <p className="text-sm text-gray-600">Confira quem fez história conosco.</p>
                                  </div>
                                </div>
                              </NavigationMenuLink>
                            </Link>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                      <NavigationMenuIndicator />
                    </NavigationMenuList>
                    <NavigationMenuViewport />
                  </NavigationMenu>
                </div>
              )}
            </div>
            {session && session.user?.email && session.user?.name ? (
              <div className='flex items-center gap-x-5 md:gap-x-8 text-white'>
                <div className='hidden md:block'>
                  <Profile
                    email={session.user?.email}
                    name={session.user?.name}
                    dark={isDark}
                  />
                </div>
                {withoutMenu ? (
                  <></>
                ) : (
                  <div className='-mr-1 lg:hidden'>
                    <MobileNavigation
                      session={session}
                      callToActionToSaveLeads={callToActionToSaveLeads}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className='flex items-center gap-7'>
                <>
                  {/* Social Media Icons */}
                  <img className='size-5' src={'/facebook.svg'} alt='Facebook' />
                  <img className='size-5' src={'/instagram.svg'} alt='Instagram' />
                  <img className='size-5' src={'/whatsapp.svg'} alt='WhatsApp' />
                </>

                {withoutMenu ? (
                  <></>
                ) : (
                  <div className='-mr-1 lg:hidden'>
                    <MobileNavigation session={session} />
                  </div>
                )}
              </div>
            )}
          </nav>
        </Container>
      </header>
    </>
  )
}
