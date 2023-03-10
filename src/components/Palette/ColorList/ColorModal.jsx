import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import { usePaletteStore } from 'hooks';

const ColorModal = ({ colorModal, handleColorModal }) => {
  const palette = usePaletteStore(state => state.getPalette());
  const changeColor = usePaletteStore(state => state.changeColor);
  const defaultColor = palette.find(el => el.id === colorModal)?.color;
  const [color, setColor] = useState(defaultColor || '#fff');

  const handleClose = () => handleColorModal(null);
  const handleSave = () => {
    changeColor(colorModal, color);
    handleColorModal(null);
  };

  useEffect(() => setColor(defaultColor || '#fff'), [colorModal]);

  return (
    <Dialog open={Boolean(colorModal)} onClose={handleClose}>
      <DialogTitle>Pick Color</DialogTitle>
      <DialogContent>
        <ChromePicker color={color} onChange={color => setColor(color.hex)} disableAlpha />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorModal;
