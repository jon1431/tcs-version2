import HomePage from "./pages/Homepage/HomePage.jsx";
import RumahIbuPage from "./pages/RumahIbuPage/RumahIbuPage.jsx";
import { Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage/CategoryPage.jsx";
import BalaiPage from "./pages/BalaiPage/BalaiPage.jsx";
import DapurPage from "./pages/DapurPage/DapurPage.jsx";
import IkatPage from "./pages/IkatPage/IkatPage.jsx";
import OrnamentPage from "./pages/OrnamentPage/OrnamentPage.jsx";
import SelangPage from "./pages/SelangPage/SelangPage.jsx";
import ClimatePage from "./pages/ClimatePage/ClimatePage.jsx";
import QuizPage from "./pages/QuizPage/QuizPage.jsx";

function App() {
  return (
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path='/rumah-ibu' element={<RumahIbuPage/>} />
          <Route path='/balai' element={<BalaiPage/>} />
          <Route path='/dapur' element={<DapurPage/>} />
          <Route path='/ikat' element={<IkatPage/>} />
          <Route path='/ornament' element={<OrnamentPage/>} />
          <Route path='/selang' element={<SelangPage/>} />
          <Route path='/category' element={<CategoryPage/>} />
          <Route path='climate' element={<ClimatePage/>}/>
          <Route path='/quiz' element={<QuizPage/>}/>
      </Routes>
  )
}

export default App
