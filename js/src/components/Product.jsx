import { getFormattedPrice } from '../helpers';

/*
<article class="product">
<div class="product__image"></div>
<h3 class="product__heading"></h3>
<p class="product__price"></p>
</article>

Bonus: Produkte, die im Sonderangebot sind (sale) sollen zusätzlich die Klasse
product--sale erhalten.
*/

export default function Product({ title, price, image, sale }) {
  const cssClass = `product ${sale ? 'product--sale' : ''}`;

  return (
    <article className={cssClass}>
      <div className="product__image">{image}</div>
      <h3 className="product__heading">{title}</h3>
      <p className="product__price">{getFormattedPrice(price)}</p>
    </article>
  );
}
