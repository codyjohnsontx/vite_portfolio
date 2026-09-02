import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager';
import SiteLayout from './components/SiteLayout';
import BlogPostPage from './pages/BlogPostPage';
import CaseStudyPage from './pages/CaseStudyPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductAnalysisPage from './pages/ProductAnalysisPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProductResearchPage from './pages/ProductResearchPage';
import ProductsPage from './pages/ProductsPage';
import NotesIndexPage from './pages/NotesIndexPage';

const RideSenseWireframesPage = lazy(() => import('./pages/RideSenseWireframesPage'));
const SessionComparePage = lazy(() => import('./pages/SessionComparePage'));
const SessionCompareWireframesPage = lazy(
  () => import('./pages/SessionCompareWireframesPage'),
);
const OasisTenancyDiagramsPage = lazy(() => import('./pages/OasisTenancyDiagramsPage'));
const DiazVideoFirstPage = lazy(() => import('./pages/DiazVideoFirstPage'));
const DiazVideoFirstWireframesPage = lazy(
  () => import('./pages/DiazVideoFirstWireframesPage'),
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
          <Route
            path="/products/:slug/video-first"
            element={
              <Suspense fallback={null}>
                <DiazVideoFirstPage />
              </Suspense>
            }
          />
          <Route
            path="/products/:slug/video-first/wireframes"
            element={
              <Suspense fallback={null}>
                <DiazVideoFirstWireframesPage />
              </Suspense>
            }
          />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/notes" element={<NotesIndexPage />} />
          {/* The two indexes merged into /notes. Every item URL underneath them
              is public and stays exactly where it was, so only the two index
              paths redirect. */}
          <Route path="/case-studies" element={<Navigate to="/notes" replace />} />
          <Route path="/blog" element={<Navigate to="/notes" replace />} />
          <Route
            path="/case-studies/:slug/diagrams"
            element={
              <Suspense fallback={null}>
                <OasisTenancyDiagramsPage />
              </Suspense>
            }
          />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
