import { useState, useEffect } from 'react';
import './App.scss';
import Navigation from './components/Navigation/Navigation';
import { ReactComponent as HeartIcon } from './assets/svg/heart.svg'
import Rate from './components/Rate/Rate';

interface CalcValues{
  ethCalcValue: number;
  btcCalcValue: number;
  nairaCalcValue: number;
}

const defaultCalcValues = {
  ethCalcValue: 0,
  btcCalcValue: 0,
  nairaCalcValue: 0
};

function App() {
  const [btcValue, setBtcValue] = useState(0);
  const [ethValue, setEthValue] = useState(0);
  const [nairaValue, setNairaValue] = useState(580);
  const [calcValues, setCalcValues] = useState<CalcValues>(defaultCalcValues);
  const [convertedValues, setConvertedValues] = useState({convertedDollars: 0, convertedNaira: 0, convertedBtc: 0});
  const [ethInputValue, setEthInputValue] = useState(0);

  const data = [
    {
      id: 1,
      currency: 'eth',
      fromSymbol: '$',
      fromValue: ethValue,
      toSymbol: 'ETH',
      toValue: 1,
      bgColor: '#7D24C2',
      bgShadow: 'rgba(125, 36, 194, 0.16)'
    },
    {
      id: 2,
      currency: 'btc',
      fromSymbol: '$',
      fromValue: btcValue,
      toSymbol: 'BTC',
      toValue: 1,
      bgColor: '#F68F00',
      bgShadow: 'rgba(246, 143, 0, 0.16)'

    },
    {
      id: 3,
      currency: 'naira',
      fromSymbol: '₦',
      fromValue: nairaValue,
      toSymbol: '$',
      toValue: 1,
      bgColor: '#00DE8E',
      bgShadow: 'rgba(0, 222, 142, 0.16)'
    },
  ]

  // Connect to WebSockets
  // BTC Websocket
  let btcWS = new WebSocket('wss://fstream.binance.com/stream?streams=btcusdt@aggTrade');
  btcWS.onmessage = (e) => {
    const value = JSON.parse(e.data);
    // console.log("BTC", value.data.p);
    
    try {
      if ((value.event = "data")) {
        setBtcValue(value.data.p);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // ETH Websocket
  let ethWS = new WebSocket('wss://fstream.binance.com/stream?streams=ethusdt@aggTrade');
  ethWS.onmessage = (e) => {
    const value = JSON.parse(e.data);
    // console.log("ETH", value.data.p);

    try {
      if ((value.event = "data")) {
        setEthValue(value.data.p);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Naira Websocket
  let ngnWS = new WebSocket('wss://stream.binance.com:9443/stream?streams=usdtngn@aggTrade');
  ngnWS.onmessage = (e) => {
    const value = JSON.parse(e.data);
    try {
      if ((value.event = "data")) {
        setNairaValue(value.data.p);
      }
    } catch (err) {
      console.log(err);
    }
    // console.log("NGN",value.data.p);
  }

  // Perform conversion
  useEffect(() => {
    setCalcValues({
      ethCalcValue: ethValue ? ethValue : 0,
      btcCalcValue: btcValue ? btcValue : 0,
      nairaCalcValue: nairaValue
    })

    setInterval(
      () => setCalcValues({
        ethCalcValue: ethValue,
        btcCalcValue: btcValue,
        nairaCalcValue: nairaValue
      }), 150000)
  }, [ethValue, btcValue, nairaValue])

  // Submit function
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let dollarEquivalent = ethInputValue * calcValues.ethCalcValue;
    let nairaEquivalent = dollarEquivalent * calcValues.nairaCalcValue;
    let btcEquivalent = dollarEquivalent / calcValues.btcCalcValue;

    setConvertedValues({
      convertedDollars: dollarEquivalent,
      convertedNaira: nairaEquivalent,
      convertedBtc: btcEquivalent
    })

  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    let actualVal = Number(e.target.value);
    setEthInputValue(Math.abs(actualVal))

  }

  // Puppeeter
  // <!-- #__APP > div > div > div.css-1jx6fr9 > div > div.css-i54jlg > div.left > div > div.nowPrice > div.showPrice -->


  return (
    <div className="homepage" id="home">
      <header>
        <Navigation />
        <div className="hero-container">
          <div className="hero">
            <div className='hero-text'>
              <h3 className="hero_pretitle">noti's</h3>
              <h1 className="hero_title">Crypto Calc</h1>
              <p className="hero_subtitle">
                Built for Noti’s founder and Beanies co founder, Femi Johnsn so he can stop disturbing Stanley’s life. 
              </p>
            </div>
            <a href="#conversion" className="hero-btn" >Perform Conversion</a>
          </div>
          <div className="hero-art">
            <iframe src='https://my.spline.design/crypto-6554ab1fac313c113586d95f59c22e3f/' title="Crypto" frameBorder='0' width='100%' height='100%'></iframe>
          </div>
        </div>
      </header>
      <main>
        <section className="rates-container" id="rates">
          <h2 className="rates_title">Exchange Rates</h2>
          <em className="rates_source">Source: <a href='https://www.binance.com/en-NG/markets' target="_blank" rel="noreferrer">Binance</a></em>
          <div className="rates">
            {
              data.map((rate) => {
                return <Rate
                  currency={rate.currency}
                  fromSymbol={rate.fromSymbol}
                  fromValue={rate.fromValue}
                  toSymbol={rate.toSymbol}
                  toValue={rate.toValue}
                  bgColor={rate.bgColor}
                  bgShadow={rate.bgShadow}
                  key={rate.id}
                />
              })
            }
          </div>
        </section>
        {
          ethValue > 0 &&
          <section className="conversion-container" id="conversion">
          <div className="conversion-form-container">
            <h2 className="conversion_title">Convert ETH</h2>
            <p className="conversion_subtitle">Get the your equivalent ETH in Naira, BTC and Dollars.</p>
            <form className=" conversion-form" onSubmit={handleSubmit}>
              <div className="eth-input-container">
                <label htmlFor="eth-input">eth</label>
                <input type="number" name="eth-input" className="eth-input" onChange={handleChange} required min="0" step=".0001"/>
              </div>
              <input type="submit" value="Convert" className="convert-btn"/>
            </form>
          </div>
          <div className="conversion-results-container">
            <h2 className="conversion-results-container_title">Conversion Results</h2>
            <div className="conversion-results">
              <h3 className="conversion-result dollar-result">
                $ <span>{ Math.ceil(convertedValues.convertedDollars).toLocaleString('en-US') }</span> Dollars
              </h3>
              <h3 className="conversion-result dollar-result">
                ₦ <span>{ Math.ceil(convertedValues.convertedNaira).toLocaleString('en-US') }</span> Naira
              </h3>
              <h3 className="conversion-result dollar-result">
                <span>{ Math.abs(convertedValues.convertedBtc).toPrecision(4) }</span> BTC
              </h3>
            </div>
          </div>
        </section>
        }
      </main>
      <footer>
        <h4 className="made-by">
          Made with <span className="heart-logo"><HeartIcon/></span> by
          <span className="gh-link">
            <a href="https://github.com/stanislaus-onwuka" target='_blank' rel="noreferrer">5T4N5</a>
          </span>
        </h4>
        <p className='copyrights'>©NOTI 2022 All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default App;
