import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [recipesData, setRecipesData] = useState([]);
  const [nutritionData, setNutritionData] = useState(null);
  const [varietiesData, setVarietiesData] = useState([]);

  return (
    <AppContext.Provider value={{ recipesData, setRecipesData, nutritionData, setNutritionData, varietiesData, setVarietiesData }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
