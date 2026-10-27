import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLanguage } from './hooks/useLanguage';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Informations from './pages/Informations';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';

export default function App() {
  const { lang, setLang } = useLanguage();
  return (
    <BrowserRouter>
      <Navbar lang={lang} setLang={setLang} />
      <Routes>
        <Route path="/"              element={<Home lang={lang} />} />
        <Route path="/informations"  element={<Informations lang={lang} />} />
        <Route path="/quiz"          element={<Quiz lang={lang} />} />
        <Route path="/leaderboard"   element={<Leaderboard lang={lang} />} />
      </Routes>
    </BrowserRouter>
  );
}
