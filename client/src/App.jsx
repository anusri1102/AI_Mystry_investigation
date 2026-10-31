import { Routes, Route } from 'react-router-dom';
import Shell from './components/layout/Shell.jsx';
import Home from './pages/Home.jsx';
import Create from './pages/Create.jsx';
import Investigation from './pages/Investigation.jsx';
import Verdict from './pages/Verdict.jsx';
import History from './pages/History.jsx';
import NotFound from './pages/NotFound.jsx';
export default function App() { return <Shell><Routes><Route path="/" element={<Home/>}/><Route path="/create" element={<Create/>}/><Route path="/case/:caseId" element={<Investigation/>}/><Route path="/investigation/:investigationId/verdict" element={<Verdict/>}/><Route path="/investigations" element={<History/>}/><Route path="*" element={<NotFound/>}/></Routes></Shell>; }
