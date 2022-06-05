import { useState, useEffect } from 'react';
import products from '../products';
import FilterForm from './FilterForm';
import ProductsList from './ProductsList';
import FilterStatus from './FilterStatus';

export default function Finder() {
  const [saleOnly, setSaleOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  console.log('Rendern!');

  useEffect(() => {
    let title = 'React Filter';

    if (keyword) {
      title = `Suche: ${keyword}`;
    }

    if (saleOnly) {
      title += ' - Sonderangebote 🤑';
    }

    document.title = title;
  }, [saleOnly, keyword]);

  useEffect(() => {
    const url = new URL(window.location.href);

    const oldKeyword = url.searchParams.get('keyword');
    if (oldKeyword) {
      setKeyword(oldKeyword);
    }

    const oldCategory = url.searchParams.get('category');
    if (oldCategory) {
      setSelectedCategory(parseInt(oldCategory));
    }

    const oldSale = url.searchParams.get('sale');
    if (oldSale) {
      setSaleOnly(true);
    }

    // "Ladevorgang" ist beendet

    setLoading(false);
  }, []);

  useEffect(() => {
    // Konstruiere ein neues URL-Objekt auf Grundlage der aktuellen Url

    const url = new URL(window.location.href);

    // Entferne eventuellen keyword-Parameter

    url.searchParams.delete('keyword');

    // Falls keyword nicht leer ist, füge den Keyword-Parameter hinzu

    if (keyword) {
      url.searchParams.set('keyword', keyword);
    }

    url.searchParams.delete('category');
    if (selectedCategory) {
      url.searchParams.set('category', selectedCategory);
    }

    url.searchParams.delete('sale');
    if (saleOnly) {
      url.searchParams.set('sale', saleOnly);
    }

    // Ersetze den aktuellen Eintrag im Browser-Verlauf mit der neu erzeugten URL
    window.history.replaceState({}, '', url);
  }, [keyword, selectedCategory, saleOnly]);

  const filteredProducts = getFilteredProducts(
    products,
    saleOnly,
    selectedCategory,
    keyword
  );

  // Stelle beim ersten Durchgang (bei dem die alte URL noch nicht wiederhergestellt wurde) nichts dar, um Flackern zu verhindern.

  if (loading) {
    return null; // Wenn null zurückgegeben wird, wird nichts dargestellt
  }

  return (
    <div className="shop">
      <FilterStatus count={filteredProducts.length} />
      <FilterForm
        saleOnly={saleOnly}
        setSaleOnly={setSaleOnly}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <ProductsList products={filteredProducts} />
    </div>
  );
}

function getFilteredProducts(products, saleOnly, selectedCategory, keyword) {
  const noCategoryFilter = selectedCategory === 0;

  // Prüfe, ob weniger als zwei Zeichen eingegeben wurden.
  // Wenn ja, soll der Filter NICHT angewandt werden.

  const noKeywordFilter = keyword.length < 2;

  // Regulärer Ausdruck, um zu testen, ob ein Muster in einem anderen String vorkommt. "i" bedeutet "case insensitive", also Großschreibung ignorieren. Das RegExp-Objekt hat u.a. die Methode test(), um zu prüfen, ob ein String die Bedingungen des regulären Ausdrucks erfüllt.

  // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/RegExp

  const keywordRegExp = new RegExp(keyword, 'i');

  return products
    .filter((product) => !saleOnly || product.sale)
    .filter(
      (product) => noCategoryFilter || product.category === selectedCategory
    )
    .filter((product) => noKeywordFilter || keywordRegExp.test(product.title));
}
