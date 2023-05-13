import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState, FC } from 'react';
import { ChromePicker } from 'react-color';
import { usePalette, usePickColor } from 'hooks/editor';
import { Color } from 'types';

type Props = {
  colorModal: Color['id'] | null;
  onClose: () => void;
};

const ColorModal: FC<Props> = ({ colorModal, onClose }) => {
  const palette = usePalette();
  const pickColor = usePickColor();
  const defaultColor = palette.find(el => el.id === colorModal)?.color;
  const [color, setColor] = useState(defaultColor || '#fff');

  const handleSave = () => {
    pickColor(colorModal as Color['id'], color);
    onClose();
  };

  useEffect(() => setColor(defaultColor || '#fff'), [defaultColor]);

  return (
    <Dialog open={Boolean(colorModal)} onClose={onClose}>
      <DialogTitle>Pick Color</DialogTitle>
      <DialogContent>
        <ChromePicker color={color} onChange={color => setColor(color.hex)} disableAlpha />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorModal;
