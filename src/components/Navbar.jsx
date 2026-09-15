import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';

export default function Navbar(){
  const {theme,toggle}=useTheme();
  const {count:cartCount}=useCart();
  const {count:wishCount}=useWishlist();
  const [open,setOpen]=useState(false);
  const [q,setQ]=useState('');
  const nav=useNavigate();

  const onSearch=(e)=>{
    e.preventDefault();
    if(q.trim()){ nav(`/shop?q=${encodeURIComponent(q.trim())}`); setOpen(false); }
  };

  return (
    <header style={{position:'sticky',top:0,zIndex:50, background:'var(--surface)', borderBottom:'1px solid var(--border)', backdropFilter:'saturate(180%) blur(8px)'}}>
      <div className="container" style={{height:'var(--nav-h)', display:'flex', alignItems:'center', gap:16, justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:28}}>
          <Link to="/" style={{display:'flex',alignItems:'center',gap:10}}>
            <span style={{width:36,height:36, borderRadius:10, background:'var(--accent)', color:'var(--accent-text)', display:'grid', placeItems:'center', fontWeight:900, letterSpacing:-0.5}}>N</span>
            <span style={{fontWeight:800, fontSize:20, letterSpacing:-1}}>NOVA</span>
          </Link>
          <nav className="desktop-nav" style={{display:'flex',gap:22, fontSize:14, fontWeight:500, color:'var(--text-muted)'}}>
            <NavLink to="/" style={({isActive})=> isActive?{color:'var(--text)',fontWeight:700}:{}} >Home</NavLink>
            <NavLink to="/shop" style={({isActive})=> isActive?{color:'var(--text)',fontWeight:700}:{}}>Shop</NavLink>
            <NavLink to="/favorites" style={({isActive})=> isActive?{color:'var(--text)',fontWeight:700}:{}}>Favorites</NavLink>
          </nav>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <form onSubmit={onSearch} style={{display:'flex',alignItems:'center', gap:8, background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:999, padding:'6px 12px', width:260}} className="search-form">
            <span style={{opacity:.6}}>⌕</span>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products..." aria-label="Search"
              style={{flex:1, border:'none', background:'transparent', outline:'none', color:'var(--text)', fontSize:14}}/>
            {q && <button type="button" onClick={()=>setQ('')} aria-label="Clear search" style={{border:'none',background:'var(--surface-3)',borderRadius:999,width:20,height:20,display:'grid',placeItems:'center'}}>×</button>}
          </form>

          <Link to="/favorites" aria-label={`Wishlist ${wishCount} items`} style={{position:'relative', width:40,height:40, borderRadius:999, display:'grid', placeItems:'center', border:'1px solid var(--border)', background:'var(--surface)'}}>
            <span style={{fontSize:16}}>♡</span>
            {wishCount>0 && <span style={{position:'absolute', top:-6,right:-6, background:'#ef4444', color:'white', fontSize:11, fontWeight:700, minWidth:18,height:18,borderRadius:999,display:'grid',placeItems:'center', padding:'0 4px'}}>{wishCount}</span>}
          </Link>

          <Link to="/cart" aria-label={`Cart ${cartCount} items`} style={{position:'relative', width:40,height:40, borderRadius:999, display:'grid', placeItems:'center', border:'1px solid var(--border)', background:'var(--surface)'}}>
            <span style={{fontSize:16}}>🛒</span>
            {cartCount>0 && <span style={{position:'absolute', top:-6,right:-6, background:'var(--accent)', color:'var(--accent-text)', fontSize:11, fontWeight:700, minWidth:18,height:18,borderRadius:999,display:'grid',placeItems:'center', padding:'0 4px'}}>{cartCount}</span>}
          </Link>

          <button onClick={toggle} aria-label="Toggle theme" style={{width:40,height:40, borderRadius:999, border:'1px solid var(--border)', background:'var(--surface)', display:'grid', placeItems:'center'}}>
            <span style={{fontSize:14}}>{theme==='light'?'◐':'○'}</span>
          </button>

          <button onClick={()=>setOpen(v=>!v)} aria-label="Menu" className="hamburger" style={{display:'none', width:40,height:40, borderRadius:999, border:'1px solid var(--border)', background:'var(--surface)'}}>
            <span style={{fontSize:18}}>{open?'×':'≡'}</span>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {open && (
        <div style={{borderTop:'1px solid var(--border)', background:'var(--surface)', padding:'14px 0 20px'}}>
          <div className="container" style={{display:'flex', flexDirection:'column', gap:12}}>
            <NavLink onClick={()=>setOpen(false)} to="/" style={{padding:'12px 14px', borderRadius:12, background:'var(--surface-2)', fontWeight:600}}>Home</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/shop" style={{padding:'12px 14px', borderRadius:12, background:'var(--surface-2)', fontWeight:600}}>Shop</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/favorites" style={{padding:'12px 14px', borderRadius:12, background:'var(--surface-2)', fontWeight:600}}>Favorites — {wishCount}</NavLink>
            <NavLink onClick={()=>setOpen(false)} to="/cart" style={{padding:'12px 14px', borderRadius:12, background:'var(--surface-2)', fontWeight:600}}>Cart — {cartCount}</NavLink>
            <form onSubmit={onSearch} style={{display:'flex', gap:8}}>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{flex:1, padding:'12px 14px', borderRadius:12, border:'1px solid var(--border)', background:'var(--surface-2)', color:'var(--text)'}}/>
              <button type="submit" style={{padding:'12px 18px', borderRadius:12, border:'none', background:'var(--accent)', color:'var(--accent-text)', fontWeight:700}}>Search</button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){
          .desktop-nav{display:none !important}
          .search-form{display:none !important}
          .hamburger{display:grid !important}
        }
      `}</style>
    </header>
  )
}
