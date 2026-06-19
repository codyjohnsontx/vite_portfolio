import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager';
import SiteLayout from './components/SiteLayout';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPostPage';
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
const SessionComparePage = lazy(() => import('./pages/SessionComparePage'));
const SessionCompareWireframesPage = lazy(
  () => import('./pages/SessionCompareWireframesPage'),
);

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
          <Route
            path="/products/:slug/session-compare"
            element={
              <Suspense fallback={null}>
                <SessionComparePage />
              </Suspense>
            }
          />
          <Route
            path="/products/:slug/session-compare/wireframes"
            element={
              <Suspense fallback={null}>
                <SessionCompareWireframesPage />
              </Suspense>
            }
          />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/case-studies" element={<CaseStudyIndexPage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/dev-mode" element={<DevModePage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
