
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Table from "./Table";
import Ahome from "./Ahome";

import './s.css';
const MainDash = () => {
  return (
    <>
    <div className="AppGlass">
      <div className="MainDash">
        <h1>Compass</h1>
        <Router>
          <Routes>
            <Route exact path='/' element={<Ahome/>}/>
            <Route path='/discount' element={<Table />}/>
          </Routes>
        </Router>
      </div>
    </div>
    </>
  );
};

export default MainDash;