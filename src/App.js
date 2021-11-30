
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import reactDom from 'react-dom';
import Coin from './components/Coin'
import Navbar from './components/Navbar';


function App() {
 const [coins, setCoins] = useState([]);
 const [search, setSearch] = useState ('');
 const [sorting, setSorting] = useState (true);


  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(info => {
      setCoins(info.data);
    }).catch(error => alert ('Error'));
  }, []);

  const searchName = e => {
    setSearch (e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  
  //   const sortMarket = () => {    ---> used this before repeating for every propety type (volume, name, price, etc) -- figured out a way to do 1 function only
  //     let newArr = [...coins];
  //     if (sorting === true){
  //     let orderedArr = newArr.sort((a, b) => {
  //       if (a.market_cap < b.market_cap) {
  //         return -1;
  //       }
  //       if (a.market_cap > b.market_cap) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     setCoins(orderedArr);
  //     setSorting(false);
  //   } else {
  //     let orderedArr = newArr.sort((a, b) => {
  //       if (a.market_cap < b.market_cap) {
  //         return -1;
  //       }
  //       if (a.market_cap > b.market_cap) {
  //         return 1;
  //       }
  //       return 0;
  //     });
  //     setCoins(orderedArr.reverse());
  //     setSorting(true);
  //   }
  // }

  const sortCoins = (proprety) => {
    let newArr = [...coins];
    if (sorting === true){
    let orderedArr = newArr.sort((a, b) => {
      if (a[proprety] < b[proprety]) {
        return -1;
      }
      if (a[proprety] > b[proprety]) {
        return 1;
      }
      return 0;
    });
    setCoins(orderedArr);
    setSorting(false);
  } else {
    let orderedArr = newArr.sort((a, b) => {
      if (a[proprety] < b[proprety]) {
        //because we searching by string
        return -1;
      }
      if (a[proprety] > b[proprety]) {
        return 1;
      }
      return 0;
    });
    setCoins(orderedArr.reverse());
    setSorting(true);
  }
} 

  //* <button onClick={sortName} type='button' className='btn'>Name</button> -- did this originally, but it had to be a diff function every time  */

  return (
    <div className="coin-app">
      <div calssName='coin-search'>
        <h1 className='coin-text'> CRYPTO GODS</h1>
        <h2 className='coin-subtext'>Check your crypto bag here 🚀🚀🚀</h2>
        <form>
          <input type="text" placeholder="Search" 
          className="coin-input" onChange={searchName}/>
        </form>
      </div>
      <div className='header-cointainer'>
      <div className='header-row'>
        <button onClick={()=> sortCoins('name')} type='button' className='btn'>Name</button>
        <button onClick={()=> sortCoins('symbol')} type='button' className='btn'>Symbol</button>
        <button onClick={()=> sortCoins('current_price')} type='button' className='btn'>Price</button>
        <button onClick={()=> sortCoins('total_volume')} type='button' className='btn'>Volume</button>
        <button onClick={()=> sortCoins('price_change_percentage_24')} type='button' className='btn'>24h Change %</button>
        <button onClick={()=> sortCoins('market_cap')} type='button' className='btn'>Market Cap</button>
        </div>
        </div>
        {filteredCoins.map(coin => {
          return (
            <Coin 
            key={coin.id} 
            name={coin.name} 
            image={coin.image}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            volume={coin.total_volume}
            />
          )
        })}
    </div>
  );
}

export default App;
