import React from "react";
import {Header} from './components';
import {Home, Cart} from "./Pages";
import {Route} from "react-router-dom";



function App()  {
    return (
        <div className="App">
            <div className="wrapper">
                <Header />
                <div className="content">
                    <Route exact path={"/"} component={Home}/>
                    <Route exact path={"/cart"} component={Cart}/>
                </div>
            </div>
        </div>
    )
}

export default App;
