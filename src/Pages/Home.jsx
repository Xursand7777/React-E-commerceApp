import React from "react";
import {Categories, SortPopup, Index, LoadingBlock,} from "../components";
import {useDispatch, useSelector} from "react-redux";
import {setCategory, setSortBy} from "../redux/actions/filters";
import {fetchPizzas} from "../redux/actions/pizzas";
import {addPizzaToCart} from "../redux/actions/cart";


const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
const sortItems = [{name: 'популярности', type: 'popular', order: 'desc'}, {name: 'цене', type: 'price', order: 'desc'}, {name: 'алфавит', type: 'name', order: 'asc'},]

function Home() {

    const dispatch = useDispatch();
    const  items  = useSelector(({pizzas}) => pizzas.items);
    const  cartItems  = useSelector(({cart}) => cart.items);
    const  isLoaded  = useSelector(({pizzas}) => pizzas.isLoaded);
    const {category, sortBy}  = useSelector(({filters}) => filters);

    React.useEffect(()=>{
            dispatch(fetchPizzas(category, sortBy));
    }, [ category, sortBy,])

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index));
    }, []);

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);

    const handleAddPizzaToCart = obj => {
        dispatch(addPizzaToCart(obj))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    onClickCategory={onSelectCategory}
                    items={categoryNames}
                    activeCategory={category} />

                <SortPopup activeSortType={sortBy.type} items={sortItems} onClickSortType={onSelectSortType} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                  isLoaded ?  items.map((obj) => <Index onClickAddPizza={handleAddPizzaToCart} key={obj.id} {...obj} addedCount={cartItems[obj.id] && cartItems[obj.id].items.length} />)
                           : Array(12).fill(0).map((_,index)=><LoadingBlock key={index} />)

                }

            </div>
        </div>
    )
}


export default Home;
