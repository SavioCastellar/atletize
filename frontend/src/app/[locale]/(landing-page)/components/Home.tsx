import { Header } from './Header'
import { Hero } from './Hero'
import { Events } from './Events'
import { Functionalities } from './Functionalities'
import { Socios } from './Socios'
import { Footer } from './Footer'

export default function Home(props: any) {
  return (
    <>
      <Header {...props} />
      <Hero />
      <Events />
      <Functionalities />
      <Socios />
      <Footer />
    </>
  )
}
