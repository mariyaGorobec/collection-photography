import React from "react";
import Collection from "./Collection";
import "./index.scss";

function App() {
  const [collection, setCollection] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  const categories = [
    { name: "Все" },
    { name: "Море" },
    { name: "Горы" },
    { name: "Архитектура" },
    { name: "Города" },
  ];

  React.useEffect(() => {
    fetch(
      `https://6493e42c0da866a95366cd75.mockapi.io/collection_photo?${
        categoryId ? `category=${categoryId}` : ""
      }`
    )
      .then((res) => res.json())
      .then((json) => setCollection(json))
      .catch((err) => {
        console.warn(err);
        alert("Error while getting data.");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((obj, index) => (
            <li
              onClick={() => {
                setCategoryId(index);
                setIsLoading(true);
              }}
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
          placeholder="Name search"
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
        <li className="active">1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
