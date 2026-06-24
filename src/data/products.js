import pixelatedFrame from '../assets/pixelated-frame.png';
import pixelatedKeychain from '../assets/pixelated-keychain.png';

export const products = [
  {
    id: 'pixelated-frame',
    name: 'Retro Pixel Custom Frame',
    price: 249,
    category: 'Frame',
    description: 'A blocky, 8-bit styled custom photo frame. Share a photo with us during checkout and watch us transform it into beautiful, physical pixel art!',
    image: pixelatedFrame,
    customizationLabel: 'Name/Text to engrave',
    placeholder: 'E.g., PLAYER 1 / HERO',
    recommended: true,
    collection: 'pixelated'
  },
  {
    id: 'pixelated-keychain',
    name: 'Arcade Name Keychain',
    price: 99,
    category: 'Keychain',
    description: 'A custom dual-layered laser-cut acrylic keychain styled like a retro arcade name badge. Your name is engraved in a blocky 8-bit gaming font.',
    image: pixelatedKeychain,
    customizationLabel: 'Name to engrave (Max 8 letters)',
    placeholder: 'E.g., PIKLU',
    recommended: true,
    collection: 'pixelated'
  }
];
