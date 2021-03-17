import React, { useState, useEffect } from "react";
import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  useEffect(() => {
    fetch(
      "https://reack-hooks-update-42a45-default-rtdb.firebaseio.com/ingredients.json"
    )
      .then((res) => res.json())
      .then((responseData) => {
        const loadedIngredients = [];
        for (const key in responseData) {
          loadedIngredients.push({
            id: key,
            title: responseData[key].title,
            amount: responseData[key].amount,
          });
        }
        setUserIngredients(loadedIngredients);
      });
  }, []);

  useEffect(() => {
    console.log("rebdering ingredients...", userIngredients);
    return () => {
      console.log("this component will be unmounted.....");
    };
  }, [userIngredients]);

  const addIngresientHandle = (ingredients) => {
    // setUserIngredients((prevState) => [
    //   ...prevState,
    //   { id: Math.random().toString(), ...ingredients },
    // ]);
    fetch(
      "https://reack-hooks-update-42a45-default-rtdb.firebaseio.com/ingredients.json",
      {
        method: "POST",
        body: JSON.stringify(ingredients),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((responseData) => {
        setUserIngredients((prevState) => [
          ...prevState,
          { id: responseData.name, ...ingredients },
        ]);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setUserIngredients((prevState) => {
      prevState.filter((ingredient) => ingredient.id !== ingredientId);
    });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngresientHandle} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
}

export default Ingredients;
