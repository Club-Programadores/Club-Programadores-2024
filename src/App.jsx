import './App.css'
import HeroBanner from './components/HeroBanner/HeroBanner'
import Navbar from './components/Navbar/Navbar'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'

function App() {
  return (
    <>
      <Navbar/>
      <HeroBanner />
      <About />
      <Contact />
    </>
  )
}

export default App
