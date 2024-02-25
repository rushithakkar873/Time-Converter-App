import Header from './components/Header'
import TimeConverterContainer from './components/TimeConverterContainer'
import Footer from './components/Footer'
import './App.css'
import { useGlobalState } from './hooks/useGlobalState'

const App = () => {
  const { state } = useGlobalState();
  const themeClass = state.theme === 'light' ? 'bg-[#f5f5f5]' : 'bg-gray-300';

  return (
    <div className={`h-screen max-h-screen overflow-auto flex flex-col ${themeClass}`}>
      <Header />
      <TimeConverterContainer />
      <Footer />
    </div>
  )
}

export default App
