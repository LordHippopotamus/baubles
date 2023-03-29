import { createContext, useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';

export const ToolContext = createContext();
export const PaletteContext = createContext();
export const AreaContext = createContext();

const defaultPalette = [
  { id: 1, color: null, selected: false },
  { id: 2, color: null, selected: false },
  { id: 3, color: null, selected: false },
  { id: 4, color: null, selected: false },
  { id: 5, color: null, selected: false },
  { id: 6, color: null, selected: false },
  { id: 7, color: null, selected: false },
  { id: 8, color: null, selected: false },
  { id: 9, color: null, selected: false },
];

const EditorProvider = ({ children }) => {
  const bauble = useRouteLoaderData('editor');

  const [tool, setTool] = useState('pan');
  const [palette, setPalette] = useState(defaultPalette);
  const [area, setArea] = useState([]);

  useEffect(() => {
    if (bauble) {
      setArea(bauble.area);
      setPalette(bauble.palette);
    }
  }, [bauble]);

  return (
    <ToolContext.Provider value={[tool, setTool]}>
      <PaletteContext.Provider value={[palette, setPalette]}>
        <AreaContext.Provider value={[area, setArea]}>{children}</AreaContext.Provider>
      </PaletteContext.Provider>
    </ToolContext.Provider>
  );
};

export default EditorProvider;
