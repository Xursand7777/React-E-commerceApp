import React, {useState} from "react";
import {Header, PizzaBlock} from './components';
import {Home, Cart} from "./Pages";
import {Route} from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';


function App() {
    const [pizzas, setPizzas] = useState([]);

    React.useEffect(()=>{
        axios.get('http://localhost:3000/db.json')
            .then(({data})=>{
                setPizzas(data.pizzas)
            })
    }, [])


  return (
    <div className="App">
      <div className="wrapper">
        <Header />
        <div className="content">
            <Route exact path={"/"} render={()=><Home items={pizzas} />}/>
            <Route exact path={"/cart"} component={Cart}/>
        </div>
      </div>
    </div>
  );
}

PizzaBlock.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    types: PropTypes.arrayOf(PropTypes.number).isRequired,
    sizes: PropTypes.array.isRequired

}

export default App;
