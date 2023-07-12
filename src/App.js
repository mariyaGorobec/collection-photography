import React from "react";
import Collection from "./Collection";
import "./index.scss";

function App() {
  const [collection, setCollection] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(0); 

  const categories = [
    { name: "Все" },
    { name: "Море" },
    { name: "Горы" },
    { name: "Архитектура" },
    { name: "Города" },
  ];

  React.useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : ""
    fetch(
      `https://6493e42c0da866a95366cd75.mockapi.io/collection_photo?page=${page+1}&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => {setCollection(json);
     setItems(json)
  })
      .catch((err) => {
        console.warn(err);
        alert("Error while getting data.");
      })
      .finally(() => {
        setIsLoading(false);
        
      });
      
  }, [categoryId, page]);

  return (
    <div className="App">
     
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, index) => (
            <li
              onClick={() => 
                setCategoryId(index)
                
              }
              className={categoryId === index ? "active" : ""}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск..."
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идёт загрузка...</h2>
        ) : (
          collection
            .filter((obj) => {
              return obj.name.toLowerCase().includes(searchValue.toLowerCase());
            })
            .map((obj, index) => (
              <Collection
                key={index}
                name={obj.name}
                images={obj.photos}
              ></Collection>
            ))
        )}
      </div>
      <ul className="pagination">
      {
      [...Array(3)].map((_,index)=>(<li onClick={()=>setPage(index)} className={page === index ? "active" : ''}>{index+1}</li>))
      
  }
       
      </ul>
    </div>
  );
}

export default App;
