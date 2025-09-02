// src/App.tsx

import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage.tsx';
import Header from './components/Header';
import SearchResultsPage from "./pages/SearchResultsPage.tsx";
import TvPage from "./pages/TvPage.tsx";
import Footer from "./components/Footer.tsx";
import ScrollToTopButton from "./components/ScrollToTopButton.tsx";

function App() {
    return (
        <>
            <Header/>
            <main className="container">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/search" element={<SearchResultsPage/>}/>
                    <Route path="/movie/:id" element={<DetailPage mediaType="movie"/>}/>
                    <Route path="/tv" element={<TvPage/>}/>
                    <Route path="/tv/:id" element={<DetailPage mediaType="tv"/>}/>
                </Routes>
            </main>
            <Footer/>
            <ScrollToTopButton/>
        </>
    );
}

export default App;
