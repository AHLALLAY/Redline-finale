import Carousel from './components/Home/Carousel'
import Footer from './components/Home/Footer'
import Header from './components/Home/Header'
import Offres from './components/Home/Offres'
import Propos from './components/Home/Propos'

function App() {
  return (
    <div className="bg-orange-50">
      <Header />
      <Carousel />
      <Offres />
      <Propos />
      <Footer />
    </div>
  )
}

export default App