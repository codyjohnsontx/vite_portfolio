import { Route, Routes } from 'react-router-dom';
import ScrollManager from './components/ScrollManager';
import SiteLayout from './components/SiteLayout';
import CaseStudyPage from './pages/CaseStudyPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ResumePage from './pages/ResumePage';

function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-studies/:slug" element={<CaseStudyPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
