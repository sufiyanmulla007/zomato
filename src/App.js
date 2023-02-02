import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardDetails from "./Components/CardDetails";
import Header from "./Components/Header";
import Home from "./Components/home";

function App() {
  return (
    
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/CardDetails/:id" element={<CardDetails/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
