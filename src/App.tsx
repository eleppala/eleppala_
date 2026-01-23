
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Topbar from './components/Topbar'
import Footer from './components/Footer'
import Background from './components/Background'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Build from './pages/Build'
import NotFound from './pages/NotFound'


function App() {
  return (
    <BrowserRouter>
      <Background />
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/build" element={<Build />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
