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
    recommended: true,
    collection: 'pixelated',
    varieties: {
      label: 'Select Size',
      options: [
        { id: '4x4', name: '4x4 Size', price: 249, isDefault: true },
        { id: '4x6', name: '4x6 Size', price: 349 }
      ]
    },
    customFields: [
      { id: 'engraving', label: 'Name/Text to engrave', type: 'text', placeholder: 'E.g., PLAYER 1 / HERO', required: false },
      { id: 'photoNote', label: 'Photo Upload Instructions', type: 'note', placeholder: 'Send your high-res photo to us on WhatsApp after checkout!' }
    ],
    specifications: [
      { name: 'Color', value: 'White' },
      { name: 'Product Length', value: '8 Inch' },
      { name: 'Product Breadth', value: '0.5 Inch' },
      { name: 'Product Height', value: '12 Inch' },
      { name: 'Weight', value: '100 g' },
      { name: 'Material', value: 'Plastic' },
      { name: 'Type', value: 'Digital Photo Frame' },
      { name: 'Generic Name', value: 'Photo Frames' },
      { name: 'Country of Origin', value: 'India' },
      { name: 'Net Quantity (N)', value: '1' }
    ],
    faqs: [
      { q: 'How do I send my photo?', a: 'After checkout, you will be redirected to WhatsApp. Send your high-res photo to us directly in the chat, and we will send you a digital mockup for approval before printing!' }
    ]
  },
  {
    id: 'pixelated-keychain',
    name: 'Arcade Name Keychain',
    price: 99,
    category: 'Keychain',
    description: 'A custom dual-layered laser-cut acrylic keychain styled like a retro arcade name badge. Your name is engraved in a blocky 8-bit gaming font.',
    image: pixelatedKeychain,
    recommended: true,
    collection: 'pixelated',
    varieties: {
      label: 'Select Finish',
      options: [
        { id: 'glossy', name: 'Glossy Neon Acrylic', price: 99, isDefault: true },
        { id: 'frosted', name: 'Frosted Matte Acrylic', price: 119 },
        { id: 'wood', name: 'Classic Birch Wood', price: 129 }
      ]
    },
    customFields: [
      { id: 'engraving', label: 'Name to engrave (Max 8 letters)', type: 'text', placeholder: 'E.g., PIKLU', required: true }
    ],
    specifications: [
      { name: 'Material', value: 'Acrylic / Premium Wood' },
      { name: 'Thickness', value: '3 mm' },
      { name: 'Length', value: '3.5 Inch' },
      { name: 'Breadth', value: '1.2 Inch' },
      { name: 'Origin', value: 'India' }
    ],
    faqs: [
      { q: 'Is there a protective film?', a: 'Yes! Acrylic keychains are shipped with a thin protective plastic film on both sides to prevent scratches. Please peel it off to reveal the glossy color!' }
    ]
  }
];
