import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct, getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetails(){
  const {id}=useParams();
  const [product,setProduct]=useState(null);
  const [loading,setLoading]=useState(true);
  const [err,setErr]=useState('');
  const [qty,setQty]=useState(1);
  const [recent,setRecent]=useState([]);
  const {add}=useCart();
  const {toggle,isWished}=useWishlist();
  const {show}=useToast();
  const [related,setRelated]=useState([]);

  useEffect(()=>{
    (async()=>{
      setLoading(true); setErr('');
      try{
        const p=await getProduct(id);
        setProduct(p);
        // recently viewed
        try{
          const key='nova-recent';
          const arr=JSON.parse(localStorage.getItem(key)||'[]');
          const filtered=[p, ...arr.filter(x=>x.id!==p.id)].slice(0,6);
          localStorage.setItem(key, JSON.stringify(filtered));
          setRecent(filtered.slice(1));
        }catch{}
        const all=await getProducts();
        setRelated(all.filter(x=> x.category===p.category && x.id!==p.id).slice(0,4));
      }catch(e){ setErr(e.message)} finally{setLoading(false)}
    })()
  },[id]);

  useEffect(()=>{
    try{ const r=JSON.parse(localStorage.getItem('nova-recent')||'[]'); setRecent(r.filter(x=> String(x.id)!==String(id)).slice(0,4)) }catch{}
  },[id]);

  if(loading) return <div className="container" style={{padding:'20px 0'}}><div style={{height:420, background:'var(--surface-2)', borderRadius:20, animation:'pulse 1.2s infinite'}}/><style>{`@keyframes pulse{0%{opacity:.6}50%{opacity:1}100%{opacity:.6}}`}</style></div>
  if(err||!product) return (
    <div className="container" style={{padding:'40px 0'}}>
      <div style={{textAlign:'center', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, padding:40}}>
        <div style={{fontWeight:800, fontSize:22}}>Product not found</div>
        <p style={{color:'var(--text-muted)', marginTop:6}}>The product you are looking for does not exist.</p>
        <Link to="/shop" style={{display:'inline-block', marginTop:16, padding:'10px 18px', borderRadius:999, background:'var(--accent)', color:'var(--accent-text)', fontWeight:700}}>← Back to Shop</Link>
      </div>
    </div>
  );

  const wished=isWished(product.id);

  return (
    <div className="container" style={{padding:'18px 0 24px'}}>
      <Link to="/shop" style={{display:'inline-flex', alignItems:'center', gap:6, fontWeight:600, fontSize:13, color:'var(--text-muted)', marginBottom:14}}>← Back to Shop</Link>
      <div style={{display:'grid', gridTemplateColumns:'1.1fr .9fr', gap:18}} className="pdGrid">
        <div style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, padding:22, display:'grid', placeItems:'center'}}>
          <img src={product.image} alt={product.title} style={{width:'100%', maxHeight:460, objectFit:'contain'}}/>
        </div>
        <div style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, padding:22, display:'flex', flexDirection:'column', gap:14}}>
          <span style={{alignSelf:'flex-start', background:'var(--surface-2)', border:'1px solid var(--border)', padding:'5px 10px', borderRadius:999, fontSize:12, fontWeight:600, textTransform:'capitalize'}}>{product.category}</span>
          <h1 style={{fontSize:26, fontWeight:800, letterSpacing:-0.7, lineHeight:1.2}}>{product.title}</h1>
          <div style={{display:'flex', alignItems:'center', gap:8, color:'#f59e0b'}}>
            <span>{'★'.repeat(Math.round(product.rating?.rate||4))}<span style={{color:'var(--border-strong)'}}>{'★'.repeat(5-Math.round(product.rating?.rate||4))}</span></span>
            <span style={{color:'var(--text-muted)', fontSize:13}}>{product.rating?.rate} • {product.rating?.count} reviews</span>
          </div>
          <div style={{fontSize:28, fontWeight:900, letterSpacing:-1}}>${Number(product.price).toFixed(2)}</div>
          <p style={{color:'var(--text-muted)', fontSize:14, lineHeight:1.7}}>{product.description}</p>

          <div style={{display:'flex', alignItems:'center', gap:12, marginTop:6}}>
            <div style={{display:'flex', alignItems:'center', gap:8, background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:999, padding:6}}>
              <button onClick={()=>setQty(q=> Math.max(1,q-1))} style={{width:32,height:32, borderRadius:999, border:'1px solid var(--border)', background:'var(--surface)', fontWeight:800}}>−</button>
              <span style={{minWidth:28, textAlign:'center', fontWeight:700}}>{qty}</span>
              <button onClick={()=>setQty(q=> q+1)} style={{width:32,height:32, borderRadius:999, border:'none', background:'var(--accent)', color:'var(--accent-text)', fontWeight:800}}>+</button>
            </div>
            <span style={{fontSize:13, color:'var(--text-muted)'}}>{qty} × ${Number(product.price).toFixed(2)} = <b style={{color:'var(--text)'}}>${(qty*product.price).toFixed(2)}</b></span>
          </div>

          <div style={{display:'flex', gap:10, marginTop:4}}>
            <button onClick={()=>{ add(product,qty); show('✓ Added to cart')}} style={{flex:1, padding:'14px 18px', borderRadius:999, border:'none', background:'var(--accent)', color:'var(--accent-text)', fontWeight:800}}>Add to Cart</button>
            <button onClick={()=>{ toggle(product); show(wished?'Removed from wishlist':'Added to wishlist ❤️')}} style={{padding:'14px 18px', borderRadius:999, border:'1px solid var(--border)', background: wished?'var(--accent)':'var(--surface)', color: wished?'var(--accent-text)':'var(--text)', fontWeight:700}}>
              {wished?'♥ Wished':'♡ Wishlist'}
            </button>
          </div>

          <div style={{display:'flex', gap:10, marginTop:4, color:'var(--text-muted)', fontSize:12, flexWrap:'wrap'}}>
            <span>✓ Free shipping over $50</span><span>•</span><span>↺ 30-day returns</span><span>•</span><span>🔒 Secure checkout</span>
          </div>
        </div>
      </div>

      {related.length>0 && (
        <div style={{marginTop:22}}>
          <h3 style={{fontWeight:800, marginBottom:12}}>You may also like</h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16}} className="relGrid">
            {related.map(p=> <ProductCard key={p.id} product={p}/>)}
          </div>
        </div>
      )}

      {recent.length>0 && (
        <div style={{marginTop:22}}>
          <h3 style={{fontWeight:800, marginBottom:12}}>Recently Viewed</h3>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16}} className="relGrid">
            {recent.map(p=> <ProductCard key={p.id} product={p}/>)}
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:900px){ .pdGrid{grid-template-columns:1fr !important} .relGrid{grid-template-columns:repeat(2,1fr) !important} }
        @media(max-width:560px){ .relGrid{grid-template-columns:1fr !important} }
      `}</style>
    </div>
  )
}
