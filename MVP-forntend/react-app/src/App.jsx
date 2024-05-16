{/*import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home } from './assets/components/Home';
import { About } from './assets/components/About';
import { Partner } from './assets/components/Partner';
import { Contact } from './assets/components/Contact';
import { Footer } from './assets/components/Footer';*/}

import MainDash from './assets/components/Dashboard/Account/Admin/MainDash';
import Sidebar from './assets/components/Dashboard/Sidebar';

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
	{/*<Router>
        <Routes>
          <Route exact path='/' element={<> 
          <Home /> 
          <About/>
          <Partner/>
          <Contact/>
          <Footer/> 
          </>
          }/>
        <Route path='/about' element={<About/>}/>
        </Routes>
</Router>*/}
		<MainDash/>

    </div>
  );
}
export default App;

