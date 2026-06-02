import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager';
import SiteLayout from './components/SiteLayout';
import CaseStudyIndexPage from './pages/CaseStudyIndexPage';
import CaseStudyPage from './pages/CaseStudyPage';
import DevModePage from './pages/DevModePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductAnalysisPage from './pages/ProductAnalysisPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductResearchPage from './pages/ProductResearchPage';
import ProductsPage from './pages/ProductsPage';

const RideSenseWireframesPage = lazy(() => import('./pages/RideSenseWireframesPage'));

function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug/analysis" element={<ProductAnalysisPage />} />
          <Route path="/products/:slug/research" element={<ProductResearchPage />} />
          <Route
            path="/products/:slug/wireframes"
            element={
              <Suspense fallback={null}>
                <RideSenseWireframesPage />
              </Suspense>
            }
          />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/case-studies" element={<CaseStudyIndexPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/dev-mode" element={<DevModePage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
