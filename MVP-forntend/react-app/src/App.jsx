import './App.css'
import { Home } from './assets/components/Home';
import { About } from './assets/components/About';
import { Partner } from './assets/components/Partner';

import { Contact } from './assets/components/Contact';
import { Footer }  from './assets/components/Footer';


function App(){
  return(
    <>
    <div className='App'>
      <Home />
      <About />
      <Partner />
      <Contact />
      <Footer />
    </div>
    </>
  );
}
export default App;

