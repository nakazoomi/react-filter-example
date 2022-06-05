// 1. importiert Product
// 2. Nehmt den products-Array als prop in die ProdutctsList-Komponenente.
// 2. Nutzt die map-Methode von products,um innerhalb der section alle Produkte im Array auszugeben.

import Product from './Product';

export default function ProductsList({ products }) {
  return (
    <section className="products">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </section>
  );
}
