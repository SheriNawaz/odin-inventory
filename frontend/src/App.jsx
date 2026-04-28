import Home from "./components/Home"
import AddCar from "./components/AddCar";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import EditCar from './components/EditCar';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddCar />} />
          <Route path="/edit/:id" element={<EditCar />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App