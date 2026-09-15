export function ProductSkeleton(){
  return (
    <div style={{background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20, overflow:'hidden'}}>
      <div className="shimmer" style={{aspectRatio:'1', background:'var(--surface-2)'}}/>
      <div style={{padding:14, display:'flex', flexDirection:'column', gap:10}}>
        <div className="shimmer" style={{height:14, borderRadius:8, background:'var(--surface-2)', width:'85%'}}/>
        <div className="shimmer" style={{height:14, borderRadius:8, background:'var(--surface-2)', width:'60%'}}/>
        <div style={{display:'flex', justifyContent:'space-between', marginTop:8}}>
          <div className="shimmer" style={{height:18, width:70, borderRadius:8, background:'var(--surface-2)'}}/>
          <div className="shimmer" style={{height:32, width:110, borderRadius:999, background:'var(--surface-2)'}}/>
        </div>
      </div>
      <style>{`@keyframes shimmer{0%{opacity:.6}50%{opacity:1}100%{opacity:.6}} .shimmer{animation:shimmer 1.2s ease infinite}`}</style>
    </div>
  )
}
export function GridSkeleton({count=8}){
  return <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18}}>
    {Array.from({length:count}).map((_,i)=><ProductSkeleton key={i}/>)}
    <style>{`@media(max-width:1100px){ div{grid-template-columns:repeat(3,1fr) !important} } @media(max-width:760px){ div{grid-template-columns:repeat(2,1fr) !important} } @media(max-width:460px){ div{grid-template-columns:1fr !important} }`}</style>
  </div>
}
