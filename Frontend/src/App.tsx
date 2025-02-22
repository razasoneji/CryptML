
import SignupFormDemo from './components/SignUp'
import Login from './components/Login'
import HistoryPage from './components/History';
import LandingPage from './components/LandingPage';
import Layout from './components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          
          <Route path="/signup" element={<SignupFormDemo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/history" element= {<HistoryPage />} />
          <Route path="/" element= {<LandingPage />} />
         
        </Routes>
      </Layout>
    </Router>

  )
}

export default App