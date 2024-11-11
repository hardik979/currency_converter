import useCurrencyInfo from "./hooks/currencyInfoHook";
import { InputBaxa } from "./components";
import { useState } from "react";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [conversionMessage, setConversionMessage] = useState(""); // New state for message

  const CurrencyInfo = useCurrencyInfo(from);
  const option = CurrencyInfo ? Object.keys(CurrencyInfo) : [];

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    const result = amount * (CurrencyInfo[to] || 1);
    setConvertedAmount(result);
    setConversionMessage(`Kya karna convert karke ho toh Gareeb hi`); // Set message
  };

  return (
    <>
      <div>
        {" "}
        {conversionMessage && ( // Conditionally render the message
          <h1 className="mt-4 text-center text-lg text-white ">
            {conversionMessage}
          </h1>
        )}{" "}
      </div>
      <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat">
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                convert();
              }}
            >
              <div className="w-full mb-1">
                <InputBaxa
                  label="From"
                  currencyOptions={option}
                  amount={amount}
                  onAmountChange={setAmount}
                  onCurrencyChange={(currency) => setFrom(currency)}
                  selectCurrency={from}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <InputBaxa
                  label="To"
                  currencyOptions={option}
                  amount={convertedAmount}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
