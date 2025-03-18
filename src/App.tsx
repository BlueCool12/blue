import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home'
import About from './pages/\bAbout'
import NotFound from './pages/NotFound'
import Header from './components/Header'

function App() {

    return (
        <Router>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />                
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
