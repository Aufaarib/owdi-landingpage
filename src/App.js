import { Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import Home from "./components/Home/Home";
import MainLayout from "./components/layout-provider/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
