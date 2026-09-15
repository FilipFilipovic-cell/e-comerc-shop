import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCategories, getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import { ProductSkeleton } from '../components/LoadingSkeleton';
import EmptyState from '../components/EmptyState';

export default function Shop(){
  const [params,setParams]=useSearchParams();
  const [products,setProducts]=useState([]);
  const [cats,setCats]=useState([]);
  const [loading,setLoading]=useState(true);
  const [err,setErr]=useState('');

  const [search,setSearch]=useState(params.get('q')||'');
  const [category,setCategory]=useState(params.get('category')||'all');
  const [minPrice,setMinPrice]=useState(params.get('min')||'');
  const [maxPrice,setMaxPrice]=useState(params.get('max')||'');
  const [minRating,setMinRating]=useState(Number(params.get('rating')||0));
  const [sort,setSort]=useState(params.get('sort')||'featured');
  const [showFilters,setShowFilters]=useState(false);

  useEffect(()=>{ setSearch(params.get('q')||'') },[params]);

  useEffect(()=>{
    (async()=>{
      try{ const [p,c]=await Promise.all([getProducts(), getCategories()]); setProducts(p); setCats(c)}
      catch(e){ setErr(e.message)} finally{setLoading(false)}
    })()
  },[]);

  // sync url
  useEffect(()=>{
    const sp=new URLSearchParams();
    if(search) sp.set('q',search);
    if(category!=='all') sp.set('category',category);
    if(minPrice) sp.set('min',minPrice);
    if(maxPrice) sp.set('max',maxPrice);
    if(minRating) sp.set('rating',String(minRating));
    if(sort!=='featured') sp.set('sort',sort);
    setParams(sp, {replace:true});
  },[search,category,minPrice,maxPrice,minRating,sort]);

  const filtered = useMemo(()=>{
    let out=[...products];
    if(search){
      const s=search.toLowerCase();
      out=out.filter(p=> p.title.toLowerCase().includes(s) || p.category.toLowerCase().includes(s));
    }
    if(category!=='all') out=out.filter(p=> p.category===category);
    if(minPrice) out=out.filter(p=> p.price >= Number(minPrice));
    if(maxPrice) out=out.filter(p=> p.price <= Number(maxPrice));
    if(minRating) out=out.filter(p=> (p.rating?.rate||0) >= minRating);
    if(sort==='price-asc') out.sort((a,b)=>a.price-b.price);
    else if(sort==='price-desc') out.sort((a,b)=>b.price-a.price);
    else if(sort==='rating') out.sort((a,b)=> (b.rating?.rate||0)-(a.rating?.rate||0));
    else if(sort==='name') out.sort((a,b)=> a.title.localeCompare(b.title));
    return out;
  },[products,search,category,minPrice,maxPrice,minRating,sort]);

  const clearFilters=()=>{
    setCategory('all'); setMinPrice(''); setMaxPrice(''); setMinRating(0); setSort('featured'); setSearch('');
  };

  return (
    <div className="container" style={{padding:'18px 0 24px'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', gap:12, flexWrap:'wrap'}}>
        <h1 style={{fontSize:26, fontWeight:900, letterSpacing:-1}}>Shop</h1>
        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <div style={{fontSize:13, color:'var(--text-muted)'}}>{!loading && `${filtered.length} products`}</div>
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{padding:'10px 14px', borderRadius:999, border:'1px solid var(--border)', background:'var(--surface)', fontWeight:600, fontSize:13}}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Rating</option>
            <option value="name">Name: A → Z</option>
          </select>
          <button onClick={()=>setShowFilters(v=>!v)} style={{display:'none', padding:'10px 14px', borderRadius:999, border:'1px solid var(--border)', background:'var(--surface)', fontWeight:700}} className="filterBtn">Filters</button>
        </div>
      </div>

      {/* search bar mobile + desktop */}
      <div style={{marginTop:14, display:'flex', gap:12, alignItems:'center'}}>
        <div style={{flex:1, display:'flex', alignItems:'center', gap:8, background:'var(--surface)', border:'1px solid var(--border)', borderRadius:999, padding:'10px 14px'}}>
          <span>⌕</span>
          <input value={search} onChange={e=> setSearch(e.target.value)} placeholder="Search by name or category..." style={{flex:1, border:'none', outline:'none', background:'transparent', color:'var(--text)'}}/>
          {search && <button onClick={()=>setSearch('')} style={{border:'none', background:'var(--surface-2)', borderRadius:999, width:22,height:22}}>×</button>}
        </div>
        {(category!=='all'||minPrice||maxPrice||minRating||search) && (
          <button onClick={clearFilters} style={{padding:'10px 14px', borderRadius:999, border:'1px solid var(--border)', background:'var(--surface-2)', fontWeight:700, fontSize:13}}>Clear</button>
        )}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'270px 1fr', gap:18, marginTop:16}} className="shopLayout">
        {/* sidebar */}
        <aside style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:18, padding:16, height:'fit-content', position:'sticky', top:84}} className="sidebar">
          <div style={{fontWeight:800, marginBottom:12}}>Filters</div>

          <div style={{marginBottom:16}}>
            <div style={{fontWeight:700, fontSize:13, marginBottom:8}}>Category</div>
            <div style={{display:'flex', flexDirection:'column', gap:6}}>
              <label style={{display:'flex', gap:8, alignItems:'center', fontSize:14, cursor:'pointer'}}>
                <input type="radio" checked={category==='all'} onChange={()=>setCategory('all')}/> All
              </label>
              {cats.map(c=>(
                <label key={c} style={{display:'flex', gap:8, alignItems:'center', fontSize:14, textTransform:'capitalize', cursor:'pointer'}}>
                  <input type="radio" checked={category===c} onChange={()=>setCategory(c)}/> {c}
                </label>
              ))}
            </div>
          </div>

          <div style={{marginBottom:16}}>
            <div style={{fontWeight:700, fontSize:13, marginBottom:8}}>Price Range</div>
            <div style={{display:'flex', gap:8}}>
              <input type="number" placeholder="Min" value={minPrice} onChange={e=>setMinPrice(e.target.value)} style={{width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface-2)', color:'var(--text)'}}/>
              <input type="number" placeholder="Max" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} style={{width:'100%', padding:'10px 12px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface-2)', color:'var(--text)'}}/>
            </div>
            <input type="range" min="0" max="1000" value={maxPrice||1000} onChange={e=>setMaxPrice(e.target.value)} style={{width:'100%', marginTop:10}}/>
          </div>

          <div>
            <div style={{fontWeight:700, fontSize:13, marginBottom:8}}>Rating</div>
            <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
              {[0,3,4,4.5].map(r=>(
                <button key={r} onClick={()=>setMinRating(r)} style={{padding:'7px 12px', borderRadius:999, border:'1px solid var(--border)', background: minRating===r?'var(--accent)':'var(--surface-2)', color: minRating===r?'var(--accent-text)':'var(--text)', fontWeight:700, fontSize:12}}>
                  {r===0?'Any':`★ ${r}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* mobile drawer */}
        {showFilters && (
          <div style={{position:'fixed', inset:0, zIndex:40, background:'rgba(0,0,0,0.4)', display:'grid', placeItems:'center', padding:16}} onClick={()=>setShowFilters(false)}>
            <div onClick={e=>e.stopPropagation()} style={{background:'var(--surface)', borderRadius:18, padding:16, width:'min(420px, 100%)', maxHeight:'85vh', overflow:'auto'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12}}>
                <span style={{fontWeight:800}}>Filters</span><button onClick={()=>setShowFilters(false)} style={{width:32,height:32, borderRadius:999, border:'1px solid var(--border)', background:'var(--surface-2)'}}>×</button>
              </div>
              {/* reuse same filters inside */}
              <div style={{display:'flex', flexDirection:'column', gap:16}}>
                <div>
                  <div style={{fontWeight:700, fontSize:13, marginBottom:8}}>Category</div>
                  <div style={{display:'flex', flexDirection:'column', gap:6}}>
                    <label><input type="radio" checked={category==='all'} onChange={()=>setCategory('all')}/> All</label>
                    {cats.map(c=> <label key={c} style={{textTransform:'capitalize'}}><input type="radio" checked={category===c} onChange={()=>setCategory(c)}/> {c}</label>)}
                  </div>
                </div>
                <div style={{display:'flex', gap:8}}>
                  <input type="number" placeholder="Min" value={minPrice} onChange={e=>setMinPrice(e.target.value)} style={{flex:1, padding:'10px 12px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface-2)'}}/>
                  <input type="number" placeholder="Max" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} style={{flex:1, padding:'10px 12px', borderRadius:10, border:'1px solid var(--border)', background:'var(--surface-2)'}}/>
                </div>
                <div style={{display:'flex', gap:6}}>
                  {[0,3,4,4.5].map(r=> <button key={r} onClick={()=>setMinRating(r)} style={{padding:'7px 12px', borderRadius:999, border:'1px solid var(--border)', background: minRating===r?'var(--accent)':'var(--surface-2)', color:minRating===r?'var(--accent-text)':'var(--text)'}}>{r===0?'Any':`★ ${r}+`}</button>)}
                </div>
                <button onClick={()=>setShowFilters(false)} style={{padding:'12px', borderRadius:12, border:'none', background:'var(--accent)', color:'var(--accent-text)', fontWeight:800}}>Apply</button>
              </div>
            </div>
          </div>
        )}

        <div>
          {loading ? (
            <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16}}>
              {Array.from({length:6}).map((_,i)=><ProductSkeleton key={i}/>)}
            </div>
          ) : err ? (
            <EmptyState icon="⚠" title="Something went wrong" desc="We couldn't load the products." action={<button onClick={()=>location.reload()} style={{padding:'10px 16px', borderRadius:999, border:'none', background:'var(--accent)', color:'var(--accent-text)', fontWeight:700}}>Try Again</button>} />
          ) : filtered.length===0 ? (
            <EmptyState icon="⌕" title="No products found" desc="Try searching for something else or clear filters." action={<button onClick={clearFilters} style={{padding:'10px 16px', borderRadius:999, border:'none', background:'var(--accent)', color:'var(--accent-text)', fontWeight:700}}>Clear filters</button>} />
          ) : (
            <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16}} className="productGrid">
              {filtered.map(p=> <ProductCard key={p.id} product={p}/>)}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media(max-width:1100px){ .shopLayout{grid-template-columns:1fr !important} .sidebar{display:none !important} .filterBtn{display:inline-flex !important} .productGrid{grid-template-columns:repeat(2,1fr) !important} }
        @media(max-width:600px){ .productGrid{grid-template-columns:1fr !important} }
      `}</style>
    </div>
  )
}
