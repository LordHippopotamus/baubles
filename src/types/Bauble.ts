import { Timestamp } from 'firebase/firestore';
import { Area } from './Area';
import { Palette } from './Palette';

export type Bauble = {
  id: string;
  area: Area;
  palette: Palette;
  name: string;
  owner: string;
  createdAt: Timestamp;
};
