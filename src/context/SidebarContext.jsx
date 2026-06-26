import { createContext, useContext, useState } from "react";

const SideContext = createContext();

function SideProvider({ children }) {
  const [isOpenSide, setIsOpenSide] = useState(window.innerWidth >= 640);

  return (
    <SideContext.Provider value={{ isOpenSide, setIsOpenSide }}>
      {children}
    </SideContext.Provider>
  );
}

function useSideBar() {
  const content = useContext(SideContext);
  if (!content) throw new Error("Out Of Range");
  return content;
}

// eslint-disable-next-line react-refresh/only-export-components
export { SideProvider, useSideBar };
