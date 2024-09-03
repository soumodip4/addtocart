import logo from './logo.svg';
import './App.css';
import Allprod from './Components/Allprod';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './Components/Home/Home';
import ProductCart from './Components/ProductCart';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path= '/cart' element = {<ProductCart/>}/>
      </Routes>
      </BrowserRouter>
      
    {/* <Allprod/> */}
    </div>
  );
}

export default App;
