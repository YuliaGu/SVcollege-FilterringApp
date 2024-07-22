import { useEffect, useRef, useState } from 'react'
import './App.css'
import Product from './Components/Product'

function App(){
  const [products, setProducts] = useState([])
  const [categorys, setCategorys] = useState([])
  // const categorys = useRef([])
  const [filterBool, setFilterBool] = useState(true)

  async function getData(){
    const url = 'https://dummyjson.com/products'
    
    try{
      const res = await fetch(url)
      const data = await res.json()
      setProducts(data.products)
    } 
    catch (error) {
      console.log(error.message)
    }
    console.log('Products:')
    console.log(products)
  }
  
  useEffect(() => {
    getData()
  }, [])

  function addSelectOptions(){
    for(let i = 0; i < products?.length; i++){
      if(categorys?.length == 0){
        setCategorys(products[i].category)
      }
      if(!categorys?.includes(products[i].category)){
        setCategorys([...categorys, products[i].category])
      }
    }
    console.log('Categorys:')
    console.log(categorys)
  }

  useEffect(() => {
    addSelectOptions()
  }, [])

  function setFilter(){
    let chosenCategory = document.getElementById("filterOptions")?.value
    if(chosenCategory != 'all'){
      setFilterBool(false)
    }
    else if (chosenCategory == 'all')
      setFilterBool(true)
  }

  function filter(){
    let tmp = []
    let chosenCategory = document.getElementById("filterOptions")?.value
    if(chosenCategory == 'all'){
      tmp = [...products]
    }
    for(let i = 0; i < products?.length; i++){
      if(products[i].category == chosenCategory){
        tmp.push(products[i])
      }
    }
    return tmp
  }

  return(
    <div>
      <select name="filterOptions" id="filterOptions">
        <option value="all">All products</option>
        {categorys.map((category) => {return <option>{category}</option>})}
      </select>
      <br />
      <br />
      <button onClick={() => {setFilter()}}>Filter</button>
      {filterBool && products?.map((e) => { return <Product title={e.title} price={e.price} brand={e.brand} category={e.category} /> })}
      {!filterBool && filter().map((e) => {return <Product title={e.title} price={e.price} brand={e.brand} category={e.category}/>})}
    </div>
  )
}

export default App
