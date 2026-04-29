import { Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager';
import SiteLayout from './components/SiteLayout';
import CaseStudyIndexPage from './pages/CaseStudyIndexPage';
import CaseStudyPage from './pages/CaseStudyPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/case-studies" element={<CaseStudyIndexPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
