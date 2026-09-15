export default function EmptyState({icon='◯', title, desc, action}){
  return (
    <div style={{textAlign:'center', padding:'56px 20px', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20}}>
      <div style={{width:64,height:64, borderRadius:20, background:'var(--surface-2)', border:'1px solid var(--border)', display:'grid', placeItems:'center', margin:'0 auto 16px', fontSize:26}}>{icon}</div>
      <div style={{fontWeight:800, fontSize:20, letterSpacing:-0.5}}>{title}</div>
      <p style={{color:'var(--text-muted)', marginTop:6, maxWidth:420, marginInline:'auto', fontSize:14}}>{desc}</p>
      {action && <div style={{marginTop:18}}>{action}</div>}
    </div>
  )
}
