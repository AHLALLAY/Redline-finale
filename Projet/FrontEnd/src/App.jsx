import Header from './components/Home/Header'
import Carousel from './components/Home/Carousel'
import Offres from './components/Home/Offres'
import Propos from './components/Home/Propos'
import Footer from './components/Home/Footer'

function App() {
  return (
    <div className="bg-orange-50">
      <Header />
      <main className="pt-16">
        <Carousel />
        <Offres />
        <Propos />
      </main>
      <Footer />
    </div>
  )
}

export default App