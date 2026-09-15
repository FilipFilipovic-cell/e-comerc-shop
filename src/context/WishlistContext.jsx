import { createContext, useContext, useEffect, useState } from 'react';
const WishlistContext = createContext(null);
export function WishlistProvider({children}){
  const [items,setItems]=useState(()=>{
    try{ const r=localStorage.getItem('nova-wishlist'); return r?JSON.parse(r):[] }catch{ return []}
  });
  useEffect(()=>{ try{ localStorage.setItem('nova-wishlist', JSON.stringify(items))}catch{} },[items]);
  const toggle=(product)=>{
    setItems(prev=> prev.find(p=>p.id===product.id) ? prev.filter(p=>p.id!==product.id) : [...prev, product]);
  };
  const isWished=(id)=> items.some(p=>p.id===id);
  const remove=(id)=> setItems(prev=> prev.filter(p=>p.id!==id));
  return <WishlistContext.Provider value={{items,toggle,isWished,remove, count:items.length}}>{children}</WishlistContext.Provider>
}
export const useWishlist=()=> useContext(WishlistContext);
