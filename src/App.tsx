import React from "react";
import { Block } from "./Block";
import "./index.scss";
interface Rates {
  [index: string]: string;
}
function App() {
  const [fromCurrency, setFromCurrency] = React.useState("RUB");
  const [toCurrency, setToCurrency] = React.useState("USD");
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);
  const ratesRef = React.useRef<Rates>({});
  React.useEffect(() => {
    fetch(
      "https://api.currencyfreaks.com/latest?apikey=a52a8b3a409647a8886cc39c7974b2cf"
    )
      .then((res) => res.json())
      .then((json) => {
        ratesRef.current = json.rates;
        onChangeToPrice(1);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении");
      });
  }, []);

  const onChangeFromPrice = (value: number) => {
    const price = value / Number(ratesRef.current[fromCurrency]);
    const result = price * Number(ratesRef.current[toCurrency]);
    setToPrice(Number(result.toFixed(4)));
    setFromPrice(value);
  };
  const onChangeToPrice = (value: number) => {
    const result =
      (Number(ratesRef.current[fromCurrency]) /
        Number(ratesRef.current[toCurrency])) *
      value;
    setToPrice(value);
    setFromPrice(Number(result.toFixed(4)));
  };
  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);
  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);
  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
