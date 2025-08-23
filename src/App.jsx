// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./Signin";
import Home from "./Home";
import Layout from "./Layout";
import MovieDetails from"./api/MovieDetails";
import MoviesPage from "./api/MoviesPage";
import Booking from "./api/Booking";
import About from './About';
import Scan from './final';
import Watch from "./api/Watchlist"; // Import WatchlistPage if needed


function App() {
  return (
    <Router>
      <Routes>
      
        <Route element={<Layout />}>
          <Route path="watchlist" element={<Watch/>}/>
          
          <Route path="/movies" element={<MoviesPage />}/>
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/movie/:id/book" element={<Booking/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path ="/scan" element ={<Scan/>}/>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/sign" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
