import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useLanguage } from './hooks/useLanguage';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Informations from './pages/Informations';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import Admin from './pages/Admin';

export default function App() {
  const { lang, setLang } = useLanguage();
  return (
    <BrowserRouter>
      <Navbar lang={lang} setLang={setLang} />
      <main className="pt-20">
        <ErrorBoundary>
          <Routes>
            <Route path="/"              element={<Home lang={lang} />} />
            <Route path="/informations"  element={<Informations lang={lang} />} />
            <Route path="/quiz"          element={<Quiz lang={lang} />} />
            <Route path="/leaderboard"   element={<Leaderboard lang={lang} />} />
            <Route path="/admin"         element={<Admin lang={lang} />} />
            <Route path="*"             element={<NotFound lang={lang} />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer lang={lang} />
    </BrowserRouter>
  );
}
