import { useRef, useState } from "react";
import { Button, Table } from "react-bootstrap";
import style from '../css/Products.module.css'


function Products() {
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();
  const storeRef = useRef();
  const [products, setProducts] = useState([
    { name: 'Cupcake', price: 1.99, quantity: 7, store: 'Downtown store' },
    { name: 'Cheesecake', price: 2, quantity: 2, store: 'Ülemiste store' },
    { name: 'Bread', price: 3, quantity: 5, store: 'Lasnamäe store' },
    { name: 'Apple pie', price: 4, quantity: 2, store: 'Nõmme store' },
    { name: 'Éclair', price: 3.25, quantity: 1, store: 'Mustamäe store' },
    { name: 'Croissant', price: 1.99, quantity: 4, store: 'Downtown store' },
    { name: 'Cupcake', price: 2, quantity: 6, store: 'Ülemiste store' },
    { name: 'Bread', price: 5, quantity: 10, store: 'Lasnamäe store' },
    { name: 'Croissant', price: 1.8, quantity: 1, store: 'Lasnamäe store' },
    { name: 'Chocolate chip cookie', price: 3.25, quantity: 3, store: 'Mustamäe store' }
  ]);

  const addProduct = () => {
    const newProduct = {
      name: nameRef.current.value,
      price: Number(priceRef.current.value),
      quantity: quantityRef.current.value,
      store: storeRef.current.value,
    }
    products.push(newProduct);
    setProducts(products.slice());
  }

  return (<div>
    <div className="container">
      <h2 className="mb-4">Products</h2>
      <Table className="table table-hover table-bordered">
        <thead>
        <tr className={style.header}>
          <th scope="col">Product</th>
          <th scope="col">Price (€)</th>
          <th scope="col">Quantity (pcs)</th>
          <th scope="col" colSpan="2">Store</th>
          
        </tr>
        </thead>
        <tbody>
        {/* DONE TODO: Order the products by price */}
        {products.sort((a,b)=>a.price-b.price)
          .map((product, ix) => 
            <tr key={product.name + product.price}className={(ix%2===0)?style.even:style.odd} >
              <td className={style.product}>{product.name}</td>
              <td className={style.price}>{product.price.toFixed(2)}</td>
              {/* DONE TODO: Display the quantity in red if it is lower than 3 */}
              <td 
                style={(product.quantity<3)?{color:"red"}:undefined}
                className={style.quantity}
              ><span>{product.quantity}</span></td> 
              <td colSpan="2">{product.store}</td>
            </tr>
          )}
        <tr className="input-row">
          <td><input type="text" ref={nameRef} placeholder="Product" className={style.idClass + " form-control"} size="3"/></td>
          <td><input type="text" ref={priceRef} placeholder="Price" className="form-control" /></td>
          <td><input type="text" ref={quantityRef} placeholder="Quantity" className="form-control" /></td>
          <td><input type="text" ref={storeRef} placeholder="Store" className="form-control" /></td>
          <td><Button variant="success" type="submit" onClick={() => addProduct()} >Add</Button></td>
        </tr>
        </tbody>
      </Table>
    </div>
  </div>)
}

export default Products;