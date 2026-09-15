import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export default function ProductCard({product}){
  const {isWished,toggle}=useWishlist();
  const {add}=useCart();
  const {show}=useToast();
  const wished=isWished(product.id);

  return (
    <div style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden', display:'flex', flexDirection:'column', transition:'transform .2s, box-shadow .2s', boxShadow:'var(--shadow-card)'}}
      onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='var(--shadow-hover)'}}
      onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='var(--shadow-card)'}}
    >
      <Link to={`/product/${product.id}`} style={{position:'relative', background:'var(--surface-2)', aspectRatio:'1', display:'grid', placeItems:'center', padding:22, overflow:'hidden'}}>
        <img src={product.image} alt={product.title} loading="lazy"
          style={{width:'100%', height:'100%', objectFit:'contain', mixBlendMode:'multiply', transition:'transform .35s'}}
          onError={e=> e.currentTarget.style.display='none'}
          onMouseEnter={e=> e.currentTarget.style.transform='scale(1.06)'}
          onMouseLeave={e=> e.currentTarget.style.transform='none'}
        />
        <button
          onClick={(e)=>{ e.preventDefault(); toggle(product); show(wished?'Removed from wishlist':'Added to wishlist ❤️')}}
          aria-label="Wishlist"
          style={{position:'absolute', top:12, right:12, width:36,height:36, borderRadius:999, border:'1px solid var(--border)', background: wished?'#111':'var(--surface)', color: wished?'white':'var(--text)', display:'grid', placeItems:'center', fontSize:14, boxShadow:'0 4px 16px rgba(0,0,0,0.08)'}}
        >{wished?'♥':'♡'}</button>
        <span style={{position:'absolute', left:12, top:12, background:'var(--surface)', border:'1px solid var(--border)', padding:'4px 10px', borderRadius:999, fontSize:11, fontWeight:600, color:'var(--text-muted)', textTransform:'capitalize'}}>{product.category}</span>
      </Link>

      <div style={{padding:'14px 14px 16px', display:'flex', flexDirection:'column', gap:8, flex:1}}>
        <Link to={`/product/${product.id}`} style={{fontWeight:600, fontSize:14, lineHeight:1.35, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden', minHeight:38}} title={product.title}>{product.title}</Link>
        <div style={{display:'flex', alignItems:'center', gap:6, color:'#f59e0b', fontSize:13}}>
          <span>{'★'.repeat(Math.round(product.rating?.rate||4))}<span style={{color:'var(--border-strong)'}}>{'★'.repeat(5-Math.round(product.rating?.rate||4))}</span></span>
          <span style={{color:'var(--text-muted)', fontSize:12}}>({product.rating?.count ?? 0})</span>
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:'auto', paddingTop:6}}>
          <span style={{fontWeight:800, fontSize:18, letterSpacing:-0.5}}>${Number(product.price).toFixed(2)}</span>
          <button onClick={()=>{ add(product,1); show('✓ Added to cart')}}
            style={{background:'var(--accent)', color:'var(--accent-text)', border:'none', padding:'9px 14px', borderRadius:999, fontWeight:700, fontSize:13, transition:'opacity .15s'}}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
