import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Search from "./routes/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
