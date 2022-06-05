import { useState, useEffect } from 'react';

export default function EffectDemo() {
  const [show, setShow] = useState(false);
  const [number, setNumber] = useState(0);
  const [color, setColor] = useState('#f25f4c');

  return (
    <div>
      <button onClick={() => setShow((current) => !current)}>
        {show ? 'Hide' : 'Show'}
      </button>
      <div>
        <input
          type="range"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          min={0}
          max={10}
        />
        <div>{number}</div>
      </div>
      <div>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      {show && <Effects number={number} color={color} />}
    </div>
  );
}

function Effects({ color, number }) {
  // useEffect nimmt eine Funktion entgegen. Wenn man nichts weiter angibt, wird die übergebene Funktion bei jedem rendern der Komponente ausgeführt. Dafür gibt es wenig Anwendungsfälle.

  // useEffect(() => console.log('Effekt'));

  // Als zweites Argument erhält useEffect den Array mit "Abhängigkeiten", d.h. die Variablen, von denen die Effekt-Funktion abhängt bzw. zusammenhängt. Wenn man einen leeren Array übergibt, wird der Effekt nur einmal beim "mounten", also Einfügen der Komponente ausgeführt.

  useEffect(() => console.log('Komponente wurde gerendert!'), []);

  // Diese Effekt werden nur beim Einfügen der Komponente ausgeführt, und wenn sich color ändert.

  useEffect(() => console.log(`Farbe hat sich geändert: ${color}`), [color]);

  useEffect(() => {
    const intervalId = setInterval(
      () => console.log(new Date().toLocaleTimeString()),
      1000
    );

    // Man kann aus der Effekt-Funktion eine "Aufräum-Funktion" zurückgeben, die nur dann ausgeführt wird, wenn die Komponente entfernt wird.Nützlich, um z.B. Intervalle zu stoppen oder Netzwerkanfragen abzubrechen.

    return function () {
      console.log('Komponente wurde entfernt!');
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <h2 style={{ color }}>Effekte!</h2>
    </div>
  );
}
