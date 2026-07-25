import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import ExplorePage from './pages/ExplorePage';
import ViewImovelPage from './components/viewImovel/ViewImovelPage';
import ProfilePage from './pages/ProfilePage';
import ViewMyImovelPage from './pages/ViewMyImovelPage';
import PublishImovelPage from './pages/PublishImovelPage';
import NotFound from './components/NotFound';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registro' element={<Register />} />
          <Route path='/explore-imoveis' element={<ExplorePage />} />
          <Route path='/explore-imoveis/detalhes-imovel' element={<ViewImovelPage />} />
          <Route path='/publicar-imovel' element={<PublishImovelPage />} />
          <Route path='/meus-imoveis' element={<ViewMyImovelPage />} />
          <Route path='/perfil' element={<ProfilePage />} />

          {/* rota que captura qualquer caminho que nao foi definido acima */}
          <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
  );
}
