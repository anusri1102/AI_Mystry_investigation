import { Link } from 'react-router-dom';
export default function NotFound(){return <main className="loading-page"><div className="eyebrow">404 <i/> FILE NOT FOUND</div><h2>This case file doesn’t exist.</h2><Link to="/" className="text-link">Return to the lobby</Link></main>}
