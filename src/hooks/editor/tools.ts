import { useContext } from 'react';
import { ToolContext } from 'context/editor';

export const useTool = () => useContext(ToolContext);

export const useSelectedTool = () => {
  const [tool] = useContext(ToolContext);
  return tool;
};
