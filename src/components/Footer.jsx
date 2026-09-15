import { Link } from 'react-router-dom';
export default function Footer(){
  return (
    <footer style={{marginTop:64, borderTop:'1px solid var(--border)', background:'var(--surface)'}}>
      <div className="container" style={{padding:'42px 0 28px', display:'grid', gridTemplateColumns:'1.2fr 1fr 1fr 1fr', gap:28}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:10, marginBottom:12}}>
            <span style={{width:36,height:36, borderRadius:10, background:'var(--accent)', color:'var(--accent-text)', display:'grid', placeItems:'center', fontWeight:900}}>N</span>
            <span style={{fontWeight:800, fontSize:18, letterSpacing:-0.8}}>NOVA</span>
          </div>
          <p style={{color:'var(--text-muted)', fontSize:14, lineHeight:1.6, maxWidth:320}}>Premium products. Simple shopping. A modern e-commerce experience crafted with attention to every detail.</p>
          <div style={{display:'flex', gap:10, marginTop:16}}>
            {['𝕏','◎','▶','in'].map(s=>(
              <span key={s} style={{width:32,height:32,borderRadius:999, background:'var(--surface-2)', border:'1px solid var(--border)', display:'grid', placeItems:'center', fontSize:12, fontWeight:700}}>{s}</span>
            ))}
          </div>
        </div>
        <div>
          <div style={{fontWeight:700, marginBottom:14}}>Shop</div>
          <div style={{display:'flex',flexDirection:'column', gap:8, color:'var(--text-muted)', fontSize:14}}>
            <Link to="/shop">All Products</Link><a href="#">Categories</a><a href="#">New Arrivals</a>
          </div>
        </div>
        <div>
          <div style={{fontWeight:700, marginBottom:14}}>Company</div>
          <div style={{display:'flex',flexDirection:'column', gap:8, color:'var(--text-muted)', fontSize:14}}>
            <a href="#">About</a><a href="#">Contact</a><a href="#">FAQ</a>
          </div>
        </div>
        <div>
          <div style={{fontWeight:700, marginBottom:14}}>Legal</div>
          <div style={{display:'flex',flexDirection:'column', gap:8, color:'var(--text-muted)', fontSize:14}}>
            <a href="#">Privacy Policy</a><a href="#">Terms & Conditions</a><a href="#">Shipping</a>
          </div>
        </div>
      </div>
      <div style={{borderTop:'1px solid var(--border)'}}>
        <div className="container" style={{padding:'18px 0', display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12, color:'var(--text-muted)', fontSize:13}}>
          <span>© {new Date().getFullYear()} NOVA. All rights reserved.</span>
          <span>Designed & built for portfolio — production-ready frontend.</span>
        </div>
      </div>
      <style>{`@media(max-width:900px){ footer .container{grid-template-columns:1fr 1fr} } @media(max-width:560px){ footer .container{grid-template-columns:1fr} }`}</style>
    </footer>
  )
}
