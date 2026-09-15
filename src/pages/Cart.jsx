import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import EmptyState from '../components/EmptyState';

export default function Cart(){
  const {items,updateQty,remove,subtotal,shipping,total,clear}=useCart();
  const {show}=useToast();

  if(items.length===0){
    return (
      <div className="container" style={{padding:'18px 0'}}>
        <h1 style={{fontSize:26, fontWeight:900, letterSpacing:-1, marginBottom:14}}>Your Cart</h1>
        <EmptyState icon="🛒" title="Your cart is empty" desc="Looks like you haven't added anything yet. Start shopping to fill it up." action={<Link to="/shop" style={{padding:'12px 18px', borderRadius:999, background:'var(--accent)', color:'var(--accent-text)', fontWeight:700, display:'inline-block'}}>Browse Products</Link>} />
      </div>
    )
  }

  return (
    <div className="container" style={{padding:'18px 0'}}>
      <h1 style={{fontSize:26, fontWeight:900, letterSpacing:-1}}>Your Cart <span style={{color:'var(--text-muted)', fontWeight:600, fontSize:16}}>({items.length} items)</span></h1>
      <div style={{display:'grid', gridTemplateColumns:'1.6fr .9fr', gap:18, marginTop:14}} className="cartLayout">
        <div style={{display:'flex', flexDirection:'column', gap:12}}>
          {items.map(it=>(
            <div key={it.id} style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:16, padding:14, display:'flex', gap:14, alignItems:'center'}}>
              <Link to={`/product/${it.id}`} style={{width:86,height:86, background:'var(--surface-2)', borderRadius:12, display:'grid', placeItems:'center', padding:8, flexShrink:0}}>
                <img src={it.image} alt={it.title} style={{width:'100%',height:'100%',objectFit:'contain'}}/>
              </Link>
              <div style={{flex:1, minWidth:0}}>
                <Link to={`/product/${it.id}`} style={{fontWeight:700, fontSize:14, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{it.title}</Link>
                <div style={{color:'var(--text-muted)', fontSize:12, textTransform:'capitalize', marginTop:2}}>{it.category}</div>
                <div style={{fontWeight:800, marginTop:6}}>${Number(it.price).toFixed(2)}</div>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:8, background:'var(--surface-2)', border:'1px solid var(--border)', borderRadius:999, padding:4}}>
                <button onClick={()=> updateQty(it.id, it.qty-1)} style={{width:28,height:28, borderRadius:999, border:'1px solid var(--border)', background:'var(--surface)'}}>−</button>
                <span style={{minWidth:24, textAlign:'center', fontWeight:700, fontSize:14}}>{it.qty}</span>
                <button onClick={()=> updateQty(it.id, it.qty+1)} style={{width:28,height:28, borderRadius:999, border:'none', background:'var(--accent)', color:'var(--accent-text)'}}>+</button>
              </div>
              <div style={{fontWeight:800, minWidth:80, textAlign:'right'}}>${(it.price*it.qty).toFixed(2)}</div>
              <button onClick={()=>{ remove(it.id); show('Product removed')}} aria-label="Remove" style={{width:32,height:32, borderRadius:999, border:'1px solid var(--border)', background:'var(--surface)'}}>×</button>
            </div>
          ))}
          <button onClick={()=>{ clear(); show('Cart cleared')}} style={{alignSelf:'flex-start', padding:'10px 14px', borderRadius:999, border:'1px solid var(--border)', background:'var(--surface-2)', fontWeight:700, fontSize:13}}>Clear cart</button>
        </div>

        <div style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:18, padding:18, height:'fit-content', position:'sticky', top:84}}>
          <div style={{fontWeight:800, fontSize:18, marginBottom:14}}>Order Summary</div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid var(--border)', fontSize:14}}>
            <span style={{color:'var(--text-muted)'}}>Subtotal</span><span style={{fontWeight:700}}>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'10px 0', borderBottom:'1px solid var(--border)', fontSize:14}}>
            <span style={{color:'var(--text-muted)'}}>Shipping</span><span style={{fontWeight:700}}>${shipping.toFixed(2)}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', padding:'14px 0', fontWeight:900, fontSize:18}}>
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <button onClick={()=> show('Order placed! (demo) ✓')} style={{width:'100%', padding:'14px', borderRadius:999, border:'none', background:'var(--accent)', color:'var(--accent-text)', fontWeight:800, marginTop:8}}>Checkout</button>
          <Link to="/shop" style={{display:'block', textAlign:'center', marginTop:10, padding:'12px', borderRadius:999, border:'1px solid var(--border)', background:'var(--surface-2)', fontWeight:700, fontSize:14}}>Continue Shopping</Link>
          <div style={{marginTop:12, fontSize:12, color:'var(--text-muted)', textAlign:'center'}}>🔒 Secure checkout • 30-day returns</div>
        </div>
      </div>
      <style>{`@media(max-width:900px){ .cartLayout{grid-template-columns:1fr !important} }`}</style>
    </div>
  )
}
