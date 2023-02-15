import { Brush, FormatColorReset as Clear, Menu, PanTool } from '@mui/icons-material';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { useEditorStore } from 'hooks';
import Drawer from './blocks/Drawer';
import Account from './blocks/Account';

const EditorToolbar = () => {
  const [open, setOpen] = useState(false);
  const tool = useEditorStore(state => state.tool);
  const changeTool = useEditorStore(state => state.changeTool);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const select = tool => {
    closeDrawer();
    changeTool(tool);
  };

  return (
    <Box display="flex">
      <Box display="flex" justifyContent="space-between" alignItems="center" mr="auto">
        <Box>
          <Tool icon={<Menu />} onClick={openDrawer} />
          <Tool icon={<PanTool />} onClick={() => select('pan')} active={tool === 'pan'} />
          <Tool icon={<Brush />} onClick={() => select('brush')} active={tool === 'brush'} />
          <Tool icon={<Clear />} onClick={() => select('eraser')} active={tool === 'eraser'} />
        </Box>
      </Box>
      <Account />
      <Drawer open={open} onClose={closeDrawer} />
    </Box>
  );
};

const Tool = ({ icon, active, ...props }) => {
  const { palette, breakpoints } = useTheme();
  const xs = useMediaQuery(breakpoints.down('md'));

  return (
    <Button
      color="inherit"
      sx={{
        height: xs ? '56px' : '64px',
        minWidth: xs ? '56px' : '64px',
        borderRadius: 0,
        background: active ? palette.action.selected : 'transparent',
      }}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default EditorToolbar;
