const BASE = 'https://fakestoreapi.com';

async function fetchJSON(url, opts){
  const res = await fetch(url, opts);
  if(!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getProducts(){
  try{
    return await fetchJSON(`${BASE}/products`);
  }catch(e){
    // fallback to dummyjson mapped to fakestore shape
    const d = await fetchJSON('https://dummyjson.com/products?limit=30');
    return d.products.map(p=>({
      id:p.id,
      title:p.title,
      price:p.price,
      description:p.description,
      category:p.category,
      image:p.thumbnail || p.images?.[0],
      rating:{ rate: p.rating ?? 4.5, count: p.stock ?? 100 }
    }));
  }
}
export async function getProduct(id){
  try{
    return await fetchJSON(`${BASE}/products/${id}`);
  }catch{
    const d = await fetchJSON(`https://dummyjson.com/products/${id}`);
    return {
      id:d.id, title:d.title, price:d.price, description:d.description,
      category:d.category, image:d.thumbnail || d.images?.[0],
      rating:{ rate: d.rating ?? 4.5, count: d.stock ?? 100 }
    }
  }
}
export async function getCategories(){
  try{
    return await fetchJSON(`${BASE}/products/categories`);
  }catch{
    return ["smartphones","laptops","fragrances","groceries","beauty","furniture"];
  }
}
