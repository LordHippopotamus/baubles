import { createContext, useEffect, useState } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { generatePalette } from 'utils/generatePalette';

export const ToolContext = createContext();
export const PaletteContext = createContext();
export const AreaContext = createContext();

const defaultPalette = generatePalette()

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
