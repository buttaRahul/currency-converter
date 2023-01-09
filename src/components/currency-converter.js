import { useEffect, useState } from "react";
import "./currency.css"
const RATES_URL = "http://www.floatrates.com/daily/inr.json";
function CurrencyConverter() {
    const [currencies,setCurrencies] = useState({});
    const [selectedCode,setCode] = useState("usd");
    const [ammount,setAmmount]  = useState(1);
    const [totalAmmount,setTotalAmmount] = useState(0);
    
  useEffect(() => {
    // fetch("./rates.json")
    fetch(RATES_URL)
    .then( response => response.json() )
    .then(data => {
        setCurrencies({...data})

});
  
    
  }, [])
    
  const codes = Object.keys(currencies);
  const optionItemsLeft = codes.map(
    (code) => <option key = {code} value={code}> {code.toUpperCase() } </option>
  )

  const onChange = e=> {
      const code  = e.target.value;
      setCode(code);
      calculateTotal(code,ammount);

    
  }
 const calculateTotal = (code,amt) => {
    const rate = currencies[code].inverseRate;
    const tempAmt = rate * amt;
    setTotalAmmount(tempAmt)
 }

 const onChangeForAmmount = e=>{
    const amt = e.target.value;
    setAmmount(amt)
    calculateTotal(selectedCode,amt);
 }

 const getInversionRate = ()=>{
    if(currencies && currencies[selectedCode])
        return currencies[selectedCode].inverseRate.toFixed(2);
    return ''
 }

  return (
    // <div>CurrencyConverter</div>
        <div className="container">
                <div className="row title">
                    <h1>Currency Converter</h1>
                </div>
                <div className="row">
                    <input type="text" onChange = {onChangeForAmmount}/>
                    <select  value={selectedCode} onChange={onChange} >
                        {optionItemsLeft}
                    </select>
                </div>
                <div className="info">
                    <span className="info-value">{totalAmmount === 0 ? " ":totalAmmount.toFixed(2)}</span>
                    {/* <span className="info-at">conversion Rate:</span> */}
                    < p className="rate-lbl">conversion Rate: <span >{getInversionRate()}</span> </p>
                    
                </div>
            </div>
  )
}

export default CurrencyConverter