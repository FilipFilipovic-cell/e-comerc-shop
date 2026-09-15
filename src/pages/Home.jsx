import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/LoadingSkeleton';

export default function Home(){
  const [products,setProducts]=useState([]);
  const [cats,setCats]=useState([]);
  const [loading,setLoading]=useState(true);
  const [err,setErr]=useState('');

  useEffect(()=>{
    (async()=>{
      try{
        const [p,c]=await Promise.all([getProducts(), getCategories()]);
        setProducts(p.slice(0,8)); setCats(c);
      }catch(e){ setErr(e.message)} finally{setLoading(false)}
    })()
  },[]);

  const catImages = {
    "electronics":"https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80",
    "jewelery":"https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    "men's clothing":"https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400&q=80",
    "women's clothing":"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
  };

  return (
    <div>
      {/* HERO */}
      <section style={{padding:'18px 0 12px'}}>
        <div className="container">
          <div style={{display:'grid', gridTemplateColumns:'1.15fr .85fr', gap:18, alignItems:'stretch'}}>
            <div style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:24, padding:'42px 36px', display:'flex', flexDirection:'column', justifyContent:'center', overflow:'hidden', position:'relative'}}>
              <div style={{position:'absolute', inset:0, background:'radial-gradient(600px 300px at 20% 10%, rgba(0,0,0,0.04), transparent)', pointerEvents:'none'}}/>
              <div style={{display:'inline-flex', alignItems:'center', gap:8, background:'var(--surface-2)', border:'1px solid var(--border)', padding:'6px 12px', borderRadius:999, fontSize:12, fontWeight:600, width:'fit-content'}}>
                <span style={{width:8,height:8,borderRadius:999, background:'#22c55e'}}/> New Collection 2026
              </div>
              <h1 style={{fontSize:'clamp(36px, 5vw, 56px)', fontWeight:900, letterSpacing:-2.5, lineHeight:.95, marginTop:18}}>
                DISCOVER<br/>YOUR STYLE
              </h1>
              <p style={{color:'var(--text-muted)', marginTop:14, maxWidth:440, fontSize:15, lineHeight:1.6}}>Premium products. Simple shopping. Delivered to you — curated essentials for a modern lifestyle.</p>
              <div style={{display:'flex', gap:12, marginTop:22, flexWrap:'wrap'}}>
                <Link to="/shop" style={{background:'var(--accent)', color:'var(--accent-text)', padding:'13px 22px', borderRadius:999, fontWeight:800, fontSize:14}}>Shop Now →</Link>
                <Link to="/shop" style={{background:'var(--surface-2)', border:'1px solid var(--border)', padding:'13px 22px', borderRadius:999, fontWeight:700, fontSize:14}}>Explore Categories</Link>
              </div>
              <div style={{display:'flex', gap:22, marginTop:26, alignItems:'center'}}>
                <div style={{display:'flex'}}>{[1,2,3].map(i=> <img key={i} src={`https://i.pravatar.cc/100?img=${10+i}`} alt="" style={{width:32,height:32,borderRadius:999, border:'2px solid var(--surface)', marginLeft: i===1?0:-8}}/> )}</div>
                <div style={{fontSize:13}}><span style={{fontWeight:800}}>12k+ Happy</span> <span style={{color:'var(--text-muted)'}}>customers</span> <span style={{color:'#f59e0b'}}>★★★★★ 4.9</span></div>
              </div>
            </div>

            <div style={{background:'linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)', borderRadius:24, border:'1px solid var(--border)', padding:18, position:'relative', overflow:'hidden', display:'grid', placeItems:'center', minHeight:420}}
            >
              <div style={{position:'absolute', top:16, right:16, background:'white', borderRadius:16, padding:'10px 14px', display:'flex', alignItems:'center', gap:10, boxShadow:'0 8px 24px rgba(0,0,0,0.08)', fontSize:13}}>
                <span style={{width:36,height:36, borderRadius:10, background:'#0a0a0a', display:'grid', placeItems:'center', color:'white'}}>◈</span>
                <div><div style={{fontWeight:800}}>Premium Quality</div><div style={{color:'#6b7280', fontSize:12}}>Trusted by 12k+ users</div></div>
              </div>
              <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=760&q=80&auto=format" alt="Hero product" style={{width:'min(100%, 420px)', height:380, objectFit:'contain', filter:'drop-shadow(0 20px 40px rgba(0,0,0,0.12))'}}/>
              <div style={{position:'absolute', bottom:16, left:16, right:16, background:'rgba(255,255,255,0.9)', backdropFilter:'blur(10px)', borderRadius:16, padding:14, display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px solid rgba(0,0,0,0.06)'}}>
                <div>
                  <div style={{fontWeight:800}}>Starting from $19.99</div>
                  <div style={{color:'#6b7280', fontSize:12}}>Free shipping on orders over $50</div>
                </div>
                <Link to="/shop" style={{background:'#0a0a0a', color:'white', padding:'10px 16px', borderRadius:999, fontWeight:700, fontSize:13}}>Shop Now</Link>
              </div>
            </div>
          </div>
          <style>{`@media(max-width:900px){ section .container > div{grid-template-columns:1fr !important} }`}</style>
        </div>
      </section>

      {/* CATEGORIES */}
      <section style={{padding:'18px 0'}}>
        <div className="container">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom:14}}>
            <h2 style={{fontSize:22, fontWeight:800, letterSpacing:-0.6}}>Shop by Category</h2>
            <Link to="/shop" style={{fontSize:13, fontWeight:700, color:'var(--text-muted)'}}>View all →</Link>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14}}>
            {(cats.length?cats:["electronics","jewelery","men's clothing","women's clothing"]).map(c=>(
              <Link key={c} to={`/shop?category=${encodeURIComponent(c)}`} style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:18, padding:14, display:'flex', flexDirection:'column', gap:12, overflow:'hidden'}}>
                <div style={{height:120, borderRadius:14, overflow:'hidden', background:'var(--surface-2)'}}>
                  <img src={catImages[c] || catImages["electronics"]} alt={c} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span style={{fontWeight:700, textTransform:'capitalize', fontSize:14}}>{c}</span>
                  <span style={{width:28,height:28, borderRadius:999, background:'var(--accent)', color:'var(--accent-text)', display:'grid', placeItems:'center', fontSize:12}}>→</span>
                </div>
              </Link>
            ))}
          </div>
          <style>{`@media(max-width:900px){ section .container div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr) !important} }`}</style>
        </div>
      </section>

      {/* FEATURED */}
      <section style={{padding:'10px 0 24px'}}>
        <div className="container">
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'end', marginBottom:14}}>
            <h2 style={{fontSize:22, fontWeight:800, letterSpacing:-0.6}}>Featured Products</h2>
            <Link to="/shop" style={{fontSize:13, fontWeight:700, color:'var(--text-muted)'}}>View all products →</Link>
          </div>

          {loading ? (
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18}}>
              {Array.from({length:8}).map((_,i)=><ProductSkeleton key={i}/>)}
            </div>
          ) : err ? (
            <div style={{padding:32, textAlign:'center', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20}}>
              <div style={{fontWeight:800}}>Something went wrong</div>
              <p style={{color:'var(--text-muted)'}}>We couldn't load the products.</p>
              <button onClick={()=>location.reload()} style={{marginTop:12, padding:'10px 16px', borderRadius:999, border:'none', background:'var(--accent)', color:'var(--accent-text)', fontWeight:700}}>Try Again</button>
            </div>
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18}}>
              {products.map(p=> <ProductCard key={p.id} product={p}/>)}
            </div>
          )}
          <style>{`@media(max-width:1100px){ section .container div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(3,1fr) !important} } @media(max-width:760px){ section .container div[style*="repeat(4,1fr)"]{grid-template-columns:repeat(2,1fr) !important} } @media(max-width:520px){ section .container div[style*="repeat(4,1fr)"]{grid-template-columns:1fr !important} }`}</style>

          {/* benefits */}
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginTop:18}}>
            {[
              {t:'Free Shipping',d:'On orders over $50',i:'⛟'},
              {t:'Secure Payment',d:'100% secure checkout',i:'🔒'},
              {t:'Easy Returns',d:'30-day return policy',i:'↺'},
            ].map(b=>(
              <div key={b.t} style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:'16px 18px', display:'flex', gap:12, alignItems:'center'}}>
                <span style={{width:40,height:40, borderRadius:12, background:'var(--surface-2)', display:'grid', placeItems:'center'}}>{b.i}</span>
                <div><div style={{fontWeight:700, fontSize:14}}>{b.t}</div><div style={{color:'var(--text-muted)', fontSize:12}}>{b.d}</div></div>
              </div>
            ))}
          </div>
          <style>{`@media(max-width:760px){ div[style*="repeat(3,1fr)"]{grid-template-columns:1fr !important} }`}</style>
        </div>
      </section>
    </div>
  )
}
