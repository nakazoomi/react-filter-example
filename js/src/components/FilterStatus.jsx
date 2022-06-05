// 1. Erstellt eine Komponente FilterStatus, die die Anzahl der gefilterten Produkte darstellt. Also "x Produkte gefunden". Die Komponente soll zwischen Filter und Produktliste dargestellt werden. Die Anzeige soll in einem div mit der Klasse "filter-status" erscheinen.

// 2. Die Komponente soll Kein Produkt / Ein Produkt / x Produkte gefunden...ausgeben.

// 3. Bonus: Wenn KEIN Produkt gefunden wurde, soll der Text z.B. in rot erscheinen. Das div soll zusätzlich die Klasse "filter-status--no-results" haben.

export default function FilterStatus({ count }) {
  const cssClasses = `filter-status ${
    count === 0 ? 'filter-status--no-results' : ''
  }`;

  return (
    <h2 className={cssClasses} role="status">
      {getStatusText(count)}
    </h2>
  );
}

function getStatusText(count) {
  switch (count) {
    case 0:
      return 'Kein Produkt gefunden';
    case 1:
      return 'Ein Produkt gefunden';
    default:
      return `${count} Produkte gefunden`;
  }
}
