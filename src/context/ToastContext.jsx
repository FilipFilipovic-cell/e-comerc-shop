import { createContext, useContext, useState, useCallback } from 'react';
const ToastContext = createContext(null);
let idc=0;
export function ToastProvider({children}){
  const [toasts,setToasts]=useState([]);
  const show = useCallback((message, type='success')=>{
    const id=++idc;
    setToasts(t=>[...t,{id,message,type}]);
    setTimeout(()=> setToasts(t=> t.filter(x=>x.id!==id)), 2600);
  },[]);
  return <ToastContext.Provider value={{show}}>
    {children}
    <div style={{position:'fixed', bottom:20, left:'50%', transform:'translateX(-50%)', zIndex:9999, display:'flex', flexDirection:'column', gap:10, alignItems:'center', pointerEvents:'none'}}>
      {toasts.map(t=>(
        <div key={t.id} role="status" style={{
          background: t.type==='error'?'#ef4444':'var(--accent)',
          color: t.type==='error'?'white':'var(--accent-text)',
          padding:'12px 18px', borderRadius:999, fontSize:14, fontWeight:600,
          boxShadow:'0 10px 30px rgba(0,0,0,0.18)', animation:'toastIn .35s ease',
          maxWidth:'90vw', textAlign:'center'
        }}>{t.message}</div>
      ))}
    </div>
    <style>{`@keyframes toastIn{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}`}</style>
  </ToastContext.Provider>
}
export const useToast=()=> useContext(ToastContext);
