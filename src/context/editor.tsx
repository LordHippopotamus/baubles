import { FC, Dispatch, SetStateAction, createContext, useEffect, useState, ReactNode } from 'react';
import { Palette, Area, Bauble } from 'types';
import { useRouteLoaderData } from 'react-router-dom';
import { generatePalette } from 'utils/generatePalette';

type Tool = 'pan' | 'editor' | 'brush' | 'eraser';

type ToolContext = [Tool, Dispatch<SetStateAction<Tool>>];
type PaletteContext = [Palette, Dispatch<SetStateAction<Palette>>];
type AreaContext = [Area, Dispatch<SetStateAction<Area>>];

type Props = {
  children: ReactNode;
};

export const ToolContext = createContext<ToolContext>(['pan', () => undefined]);
export const PaletteContext = createContext<PaletteContext>([[], () => undefined]);
export const AreaContext = createContext<AreaContext>([[], () => undefined]);

const defaultPalette = generatePalette();

const EditorProvider: FC<Props> = ({ children }) => {
  const bauble = useRouteLoaderData('editor') as Bauble;

  const [tool, setTool] = useState<Tool>('pan');
  const [palette, setPalette] = useState<Palette>(defaultPalette);
  const [area, setArea] = useState<Area>([]);

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
