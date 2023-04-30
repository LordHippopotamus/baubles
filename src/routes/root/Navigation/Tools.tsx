import { Box, Button, useTheme } from '@mui/material';
import { Brush, FormatColorReset, Menu, PanTool } from '@mui/icons-material';
import { useTool } from 'hooks/editor';

const Tools = ({ handleDrawer }) => {
  const [tool, setTool] = useTool();
  return (
    <Box>
      <Tool icon={<Menu />} onClick={handleDrawer} />
      <Tool icon={<PanTool />} onClick={() => setTool('pan')} active={tool === 'pan'} />
      <Tool icon={<Brush />} onClick={() => setTool('brush')} active={tool === 'brush'} />
      <Tool
        icon={<FormatColorReset />}
        onClick={() => setTool('eraser')}
        active={tool === 'eraser'}
      />
    </Box>
  );
};

const Tool = ({ icon, active, ...props }) => {
  const { palette } = useTheme();

  return (
    <Button
      color="inherit"
      sx={{
        height: { xs: 56, sm: 64 },
        minWidth: { xs: 56, sm: 64 },
        borderRadius: 0,
        background: active ? palette.action.selected : 'transparent',
      }}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default Tools;
