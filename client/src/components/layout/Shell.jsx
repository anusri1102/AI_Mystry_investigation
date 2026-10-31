import { Link, NavLink } from 'react-router-dom';
import { Fingerprint, Menu, X } from 'lucide-react';
import { useState } from 'react';
export default function Shell({ children }) {
  const [open, setOpen] = useState(false);
  return <div className="app-shell antialiased"><header className="topbar"><Link to="/" className="brand"><span className="brand-mark"><Fingerprint size={20}/></span><span>THE <b>CASEFILE</b></span></Link><button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button><nav className={open ? 'nav open' : 'nav'}><NavLink onClick={() => setOpen(false)} to="/" end>Home</NavLink><NavLink onClick={() => setOpen(false)} to="/create">Create a case</NavLink><NavLink onClick={() => setOpen(false)} to="/investigations">My investigations</NavLink><a href="/#about" onClick={() => setOpen(false)}>About</a></nav><Link className="top-cta" to="/create">Open a case <span>↗</span></Link></header>{children}<footer id="about" className="footer"><div><div className="brand footer-brand"><span className="brand-mark"><Fingerprint size={18}/></span><span>THE <b>CASEFILE</b></span></div><p>Fictional mysteries. Real detective work.</p></div><div className="footer-right"><span>AN INTERACTIVE INVESTIGATION EXPERIENCE</span><span>© 2026 THE CASEFILE</span></div></footer></div>;
}
