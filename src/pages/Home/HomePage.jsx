
import HeroBanner from '..//..//components//HeroBanner//HeroBanner'
import {HomePageNavbar} from '../../components/Navbar/Navbar'
import About from '../../pages/About/About'
import Contact from '../../pages/Contact/Contact'

export default function Home() {
  return (
    <>
      <HomePageNavbar/>
      <HeroBanner />
      <About />
      <Contact />
    </>
  )
}