import { createContext, useContext, useEffect, useState, useMemo } from 'react';
const CartContext = createContext(null);

export function CartProvider({children}){
  const [items,setItems]=useState(()=>{
    try{ const r=localStorage.getItem('nova-cart'); return r?JSON.parse(r):[] }catch{ return []}
  });
  useEffect(()=>{ try{ localStorage.setItem('nova-cart', JSON.stringify(items))}catch{} },[items]);

  const add=(product, qty=1)=>{
    setItems(prev=>{
      const ex=prev.find(p=>p.id===product.id);
      if(ex) return prev.map(p=> p.id===product.id? {...p, qty: p.qty+qty}:p);
      return [...prev, {...product, qty}]
    });
  };
  const remove=(id)=> setItems(prev=> prev.filter(p=>p.id!==id));
  const updateQty=(id, qty)=>{
    if(qty<=0) return remove(id);
    setItems(prev=> prev.map(p=> p.id===id? {...p, qty}:p));
  };
  const clear=()=> setItems([]);
  const count = useMemo(()=> items.reduce((a,c)=>a+c.qty,0),[items]);
  const subtotal = useMemo(()=> items.reduce((a,c)=>a+c.price*c.qty,0),[items]);
  const shipping = items.length ? 10 : 0;
  const total = subtotal + shipping;

  return <CartContext.Provider value={{items,add,remove,updateQty,clear,count,subtotal,shipping,total}}>{children}</CartContext.Provider>
}
export const useCart=()=> useContext(CartContext);
