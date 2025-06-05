import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostSubmit from "./pages/PostSubmit";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/thank-you/:id" element={<PostSubmit/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;
