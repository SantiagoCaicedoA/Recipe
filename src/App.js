import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './index.css'


const App = () => {
  const APP_ID = '680933ed'
  const APP_KEY = 'f45f0040d3ced7842c688ebc91b9400d	';

  const[recipies, setRecipies] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('vegan');

  useEffect( () =>{
    getRecipes();
  },[query])
  
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipies(data.hits);
  
    if(data.hits == 0){
      alert("Sorry! We dont\' have any recipe with that name.")
    }
  }

  const updateSarch = e =>{
    setSearch(e.target.value);
  };

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
    console.log(search);
  }

  return(
  <div className="App">
    <form onSubmit={getSearch} className= "search-form">
      <input className="search-bar" placeholder="What type of dish are you looking for today?" valuetype="text" value={search} onChange={updateSarch}/>
      <button className="search-button" type="submit">Search</button>
    </form>
    <div className="recipies">
      {recipies.map(recipe => (
          <Recipe 
          key={recipe.recipe.label} 
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        ))}
    </div>
  </div>
  )
}

export default App;
