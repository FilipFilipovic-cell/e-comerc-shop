import { Link } from 'react-router-dom';
export default function NotFound(){
  return (
    <div className="container" style={{padding:'60px 0', textAlign:'center'}}>
      <div style={{fontSize:84, fontWeight:900, letterSpacing:-4, lineHeight:1}}>404</div>
      <div style={{fontWeight:800, fontSize:22, marginTop:8}}>Looks like this page got lost.</div>
      <p style={{color:'var(--text-muted)', marginTop:6}}>The page you are looking for does not exist or was moved.</p>
      <Link to="/" style={{display:'inline-block', marginTop:18, padding:'12px 22px', borderRadius:999, background:'var(--accent)', color:'var(--accent-text)', fontWeight:800}}>Back to Home</Link>
    </div>
  )
}
