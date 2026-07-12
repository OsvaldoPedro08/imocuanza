import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import ExplorePage from './pages/ExplorePage';
import ViewImovelPage from './components/viewImovel/ViewImovelPage';
import ProfilePage from './pages/ProfilePage';
import ViewMyImovelPage from './pages/ViewMyImovelPage';
import PublishImovelPage from './pages/PublishImovelPage';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/explore-imoveis' element={<ExplorePage />} />
          <Route path='/explore-imoveis/detalhes-imovel' element={<ViewImovelPage />} />
          <Route path='/publicar-imovel' element={<PublishImovelPage />} />
          <Route path='/meus-imoveis' element={<ViewMyImovelPage />} />
          <Route path='/perfil' element={<ProfilePage />} />
        </Routes>
    </BrowserRouter>
  );
}
