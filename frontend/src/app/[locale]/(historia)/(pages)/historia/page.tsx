import { Footer, Header } from '@/app/[locale]/(landing-page)/components'
import Hero from '../../components/Hero'
import History from '../../components/History'
import Identity from '../../components/Identity'

export default function Home() {
  return (
    <main className="bg-neutral-950">
      <Header session={null}/>
      <Hero />
      <Identity />
      <History />
      <Footer />
    </main>
  )
}
