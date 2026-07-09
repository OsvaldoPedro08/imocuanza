import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import ExplorePage from './pages/ExplorePage';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/explore-imoveis' element={<ExplorePage />} />
        </Routes>
    </BrowserRouter>
  );
}
