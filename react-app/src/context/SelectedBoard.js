import { createContext, useContext, useState } from 'react';

export const SelectedBoardContext = createContext();

export const useSelectedBoard = () => {return useContext(SelectedBoardContext);};


export function SelectedBoardProvider({ children }) {

    const [selected, setSelected] = useState(null);




    return (
      <SelectedBoardContext.Provider
        value={{
          selected,
          setSelected
        }}
      >
        {children}
      </SelectedBoardContext.Provider>
    );
  }
