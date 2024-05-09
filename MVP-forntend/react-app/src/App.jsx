import './App.css'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from './assets/components/Home';
import { About } from './assets/components/About';
import { Partner } from './assets/components/Partner';
import { Contact } from './assets/components/Contact';
import { Footer } from './assets/components/Footer';

import Aos from "aos";
import 'aos/dist/aos.css'
import { useEffect } from 'react';

function App(){
  useEffect(()=>{
    Aos.init({})
},
[])
  return( 
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<> 
          <Home /> 
          <About/>
          <Partner/>
          <Contact/>
          <Footer/> 
          </>
          }/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;

