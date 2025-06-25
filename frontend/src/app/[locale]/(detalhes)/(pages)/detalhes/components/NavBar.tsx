import CartDrawer from '@/app/[locale]/(store)/components/cart/cart-drawer'
import { Contact, Home, Store } from 'lucide-react'
import { Session } from "next-auth"
import { useRouter } from 'next/navigation'

interface NavBarProps {
    session: Session | null
}

export default function NavBar({ session }: NavBarProps) {
    const router = useRouter()
    
    return (
        <div className="absolute bottom-1/2 -left-[1px] h-48 w-9 bg-theme-bg rounded-r-3xl py-2 pl-1.5 flex flex-col justify-center gap-5">
            <div className="absolute -top-4 left-[1px] h-4 w-4 bg-transparent rounded-bl-2xl shadow-mini-custom-bl-bg" />
            <div className="absolute -bottom-4 left-[1px] h-4 w-4 bg-transparent rounded-tl-2xl shadow-mini-custom-tl-bg" />
            <Home
                className="relative size-6 hover:scale-90 transition-all duration-200 text-black cursor-pointer"
                onClick={() => router.push('/')}
            />
            <CartDrawer userId={session?.user?.id!} />
            <Store
                className="relative size-6 hover:scale-90 transition-all duration-200 text-black cursor-pointer"
                onClick={() => router.push('/loja')}
            />
            <Contact
                className="relative size-6 hover:scale-90 transition-all duration-200 text-black cursor-pointer"
                onClick={() => router.push('/socios')}
            />
        </div>
    )
}