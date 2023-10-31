
import HeroBanner from '..//..//components//HeroBanner//HeroBanner'
import {HomePageNavbar} from '../../components/Navbar/Navbar'
import About from '../../pages/About/About'
import Contact from '../../pages/Contact/Contact'

export default function Home() {

  window.onload = function(){
    switch(window.location.pathname){
      case "/about-us":
        document.getElementById('about-us').scrollIntoView()
        break
      case '/contact-us':
        document.getElementById('contact-us').scrollIntoView()
        break
    }
  }

  return (
    <>
      <HomePageNavbar/>
      <HeroBanner />
      <About />
      <Contact />
    </>
  )
}