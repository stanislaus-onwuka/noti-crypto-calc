import { useState } from 'react';
import './App.scss';
import Navigation from './components/Navigation/Navigation';
import { ReactComponent as HeartIcon } from './assets/svg/heart.svg'
import Rate from './components/Rate/Rate';


function App() {
  const [btcValue, setBtcValue] = useState(0);
  const [ethValue, setEthValue] = useState(0);
  const [nairaValue, setNairaValue] = useState(0);

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

  let btcWS = new WebSocket('wss://fstream.binance.com/stream?streams=btcusdt@aggTrade');
  btcWS.onmessage = (e) => {
    const value = JSON.parse(e.data);
    console.log("BTC", value.data.p);
    
    try {
      if ((value.event = "data")) {
        setBtcValue(value.data.p);
      }
    } catch (err) {
      console.log(err);
    }
  }

  let ethWS = new WebSocket('wss://fstream.binance.com/stream?streams=ethusdt@aggTrade');
  ethWS.onmessage = (e) => {
    const value = JSON.parse(e.data);
    console.log("ETH", value.data.p);

    try {
      if ((value.event = "data")) {
        setEthValue(value.data.p);
      }
    } catch (err) {
      console.log(err);
    }
  }

  let ngnWS = new WebSocket('wss://stream.binance.com/stream?streams=usdtngn@aggTrade');
  ngnWS.onmessage = (e) => {
    const value = JSON.parse(e.data);
    // setNairaValue(value.data.p);
    console.log("NGN",value.data.p);
  }




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
            <iframe src='https://my.spline.design/crypto-6554ab1fac313c113586d95f59c22e3f/' title='Crypto' frameBorder='0' width='100%' height='100%'></iframe>
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
        <section className="conversion-container" id="conversion">
          <div className="conversion-form-container">
            <h2 className="conversion_title">Convert ETH</h2>
            <p className="conversion_subtitle">Get the your equivalent ETH in Naira, BTC and Dollars.</p>
            <form className=" conversion-form">
              <div className="eth-input-container">
                <label htmlFor="eth-input">eth</label>
                <input type="number" name="eth-input" className="eth-input"/>
              </div>
              <input type="submit" value="Convert" className="convert-btn"/>
            </form>
          </div>
          <div className="conversion-results-container">
            <h2 className="conversion-results-container_title">Conversion Results</h2>
            <div className="conversion-results">
              <h3 className="conversion-result dollar-result">
                $ <span></span> Dollars
              </h3>
              <h3 className="conversion-result dollar-result">
                ₦ <span></span> Naira
              </h3>
              <h3 className="conversion-result dollar-result">
                <span></span> BTC
              </h3>
            </div>
          </div>
        </section>
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
