import type { Wheel } from './types';
import { PlaceHolderImages } from './placeholder-images';

const wheelImages = PlaceHolderImages.filter(img => img.id.startsWith('wheel'));

export const wheels: Wheel[] = [
  { id: 'w1', name: 'Vortex R1', brand: 'Momentum', size: 18, type: 'Легкосплавные', price: 250, imageUrl: wheelImages[0].imageUrl, imageHint: wheelImages[0].imageHint },
  { id: 'w2', name: 'Apex P5', brand: 'Apex', size: 19, type: 'Легкосплавные', price: 320, imageUrl: wheelImages[1].imageUrl, imageHint: wheelImages[1].imageHint },
  { id: 'w3', name: 'Stark S7', brand: 'Stark', size: 17, type: 'Хром', price: 450, imageUrl: wheelImages[2].imageUrl, imageHint: wheelImages[2].imageHint },
  { id: 'w4', name: 'Terra XT', brand: 'Velocity', size: 16, type: 'Стальные', price: 150, imageUrl: wheelImages[3].imageUrl, imageHint: wheelImages[3].imageHint },
  { id: 'w5', name: 'Momentum M3', brand: 'Momentum', size: 20, type: 'Легкосплавные', price: 400, imageUrl: wheelImages[4].imageUrl, imageHint: wheelImages[4].imageHint },
  { id
: 'w6', name: 'Apex F1', brand: 'Apex', size: 18, type: 'Легкосплавные', price: 280, imageUrl: wheelImages[5].imageUrl, imageHint: wheelImages[5].imageHint },
  { id: 'w7', name: 'Stark Classic', brand: 'Stark', size: 16, type: 'Стальные', price: 180, imageUrl: wheelImages[6].imageUrl, imageHint: wheelImages[6].imageHint },
  { id: 'w8', name: 'Velocity V2', brand: 'Velocity', size: 19, type: 'Хром', price: 550, imageUrl: wheelImages[7].imageUrl, imageHint: wheelImages[7].imageHint },
  { id: 'w9', name: 'Momentum GT', brand: 'Momentum', size: 19, type: 'Легкосплавные', price: 350, imageUrl: wheelImages[0].imageUrl, imageHint: wheelImages[0].imageHint },
  { id: 'w10', name: 'Apex Pro', brand: 'Apex', size: 20, type: 'Легкосплавные', price: 480, imageUrl: wheelImages[1].imageUrl, imageHint: wheelImages[1].imageHint },
  { id: 'w11', name: 'Stark HeavyDuty', brand: 'Stark', size: 18, type: 'Стальные', price: 220, imageUrl: wheelImages[3].imageUrl, imageHint: wheelImages[3].imageHint },
  { id: 'w12', name: 'Velocity Shine', brand: 'Velocity', size: 17, type: 'Хром', price: 490, imageUrl: wheelImages[2].imageUrl, imageHint: wheelImages[2].imageHint },
];

export const brands = ['Momentum', 'Apex', 'Stark', 'Velocity'];
export const sizes = [16, 17, 18, 19, 20];
export const types: Wheel['type'][] = ['Легкосплавные', 'Стальные', 'Хром'];
