import { categories } from '../products';

export default function FilterForm({
  saleOnly,
  setSaleOnly,
  selectedCategory,
  setSelectedCategory,
  keyword,
  setKeyword,
}) {
  return (
    <form className="filter" onSubmit={(e) => e.preventDefault()}>
      <div className="filter__category">
        {/* 1. Verknüpft das select-Menü mit einem Label "Kategorie"
        2. Importiert die anderen Kategorien aus products.js
        3. Nutzt die Map-Methode, um nach der ersten option die
        weiteren option-Elemente zu erzeugen.
         4. Erstellt in Finder.jsx den state selectedCategory und
        gebt ihn samt set-Funktion in FilterForm.
        5. Verknüpft den state und die set-Funktion mit dem
        select-Element, ähnlich wie bei einem text-Input.
        6. Ergänzt in Finder.js die getFilteredProducts-Funktion
        um den selectedCategory-Filter. Beachtet, dass der ausgelesene
        value des select-Elements immer ein String ist, und nutzt
        parseInt, um ihn in einen Integer umzuwandeln.
     */}
        <label htmlFor="category">Kategorie</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
          name="category"
          id="category"
        >
          <option value="0">Alle Kategorien</option>
          {categories.map(({ categoryId, name }) => (
            <option key={categoryId} value={categoryId}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter__search">
        <label htmlFor="keyword">Suchbegriff</label>
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          id="keyword"
        />
      </div>
      <div>
        <label>
          Sonderangebote{' '}
          <input
            checked={saleOnly}
            onChange={(e) => setSaleOnly(e.target.checked)}
            type="checkbox"
          />
        </label>
      </div>
    </form>
  );
}
