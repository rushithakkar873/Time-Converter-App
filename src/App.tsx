import Header from './components/Header'
import TimeConverterContainer from './components/TimeConverterContainer'
import Footer from './components/Footer'
import './App.css'
import GlobalStateProvider from './context/GlobalStateProvider'

function App() {

  return (
    <GlobalStateProvider>
      <div className='h-screen max-h-screen flex flex-col'>
        <Header />
        <TimeConverterContainer />
        <Footer />
      </div>
    </GlobalStateProvider>
  )
}

export default App
