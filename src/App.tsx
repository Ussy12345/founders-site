import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import FounderPage from './pages/FounderPage';
import Partnership from './pages/Partnership';
import { VenturesPage, ProjectsPage, ProjectDetail, JourneyPage, ContactPage, NotFound } from './pages/Others';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="founders/:slug" element={<FounderPage />} />
        <Route path="our-partnership" element={<Partnership />} />
        <Route path="ventures" element={<VenturesPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="journey" element={<JourneyPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
