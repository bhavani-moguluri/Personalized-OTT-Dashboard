import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import MyList from "./pages/MyList";
import SearchMovies from "./pages/SearchMovies";
import Subscription from "./pages/Subscription";
import History from "./pages/History";
import Recommendations from "./pages/Recommendations";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/search" element={<SearchMovies />} />
      <Route path="/mylist" element={<MyList />} />
      <Route path="/subscription" element={<Subscription />} />
<Route path="/history" element={<History />} />
<Route path="/recommendations" element={<Recommendations />}/>
    </Routes>
  );
}

export default App;