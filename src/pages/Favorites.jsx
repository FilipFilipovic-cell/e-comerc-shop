import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import EmptyState from '../components/EmptyState';

export default function Favorites(){
  const {items,remove}=useWishlist();
  const {add}=useCart();
  const {show}=useToast();

  if(items.length===0){
    return (
      <div className="container" style={{padding:'18px 0'}}>
        <h1 style={{fontSize:26, fontWeight:900, letterSpacing:-1, marginBottom:14}}>Wishlist</h1>
        <EmptyState icon="♡" title="Your wishlist is empty" desc="Save products you love and find them here later." action={<Link to="/shop" style={{padding:'12px 18px', borderRadius:999, background:'var(--accent)', color:'var(--accent-text)', fontWeight:700, display:'inline-block'}}>Explore Products</Link>} />
      </div>
    )
  }

  return (
    <div className="container" style={{padding:'18px 0'}}>
      <h1 style={{fontSize:26, fontWeight:900, letterSpacing:-1}}>Wishlist <span style={{color:'var(--text-muted)', fontWeight:600, fontSize:16}}>({items.length})</span></h1>
      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginTop:14}} className="favGrid">
        {items.map(p=>(
          <div key={p.id} style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden', display:'flex', flexDirection:'column'}}>
            <Link to={`/product/${p.id}`} style={{background:'var(--surface-2)', aspectRatio:'1', display:'grid', placeItems:'center', padding:18}}>
              <img src={p.image} alt={p.title} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
            </Link>
            <div style={{padding:14, display:'flex', flexDirection:'column', gap:8, flex:1}}>
              <div style={{fontSize:11, fontWeight:600, color:'var(--text-muted)', textTransform:'capitalize'}}>{p.category}</div>
              <Link to={`/product/${p.id}`} style={{fontWeight:700, fontSize:14, lineHeight:1.35, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{p.title}</Link>
              <div style={{fontWeight:800, fontSize:18}}>${Number(p.price).toFixed(2)}</div>
              <div style={{display:'flex', gap:8, marginTop:'auto'}}>
                <button onClick={()=>{ add(p,1); show('✓ Added to cart')}} style={{flex:1, padding:'10px', borderRadius:999, border:'none', background:'var(--accent)', color:'var(--accent-text)', fontWeight:700, fontSize:13}}>Add to Cart</button>
                <button onClick={()=>{ remove(p.id); show('Removed from wishlist')}} style={{padding:'10px 14px', borderRadius:999, border:'1px solid var(--border)', background:'var(--surface-2)', fontWeight:700}}>×</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`@media(max-width:1100px){ .favGrid{grid-template-columns:repeat(3,1fr) !important} } @media(max-width:760px){ .favGrid{grid-template-columns:repeat(2,1fr) !important} } @media(max-width:520px){ .favGrid{grid-template-columns:1fr !important} }`}</style>
    </div>
  )
}
