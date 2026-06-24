import pixelatedFrame from '../assets/pixelated-frame.png';
import pixelatedKeychain from '../assets/pixelated-keychain.png';

// New Keychain Imports
import qrFront from '../../Products/Keychain/Double Side QR/Front.png';
import qrBack from '../../Products/Keychain/Double Side QR/Back.png';
import hkKnight from '../../Products/Keychain/Hollow Knight/aclylic_hollow knight.png';
import hkHornet from '../../Products/Keychain/Hollow Knight/Hollow knight.png';
import hkQuirrel from '../../Products/Keychain/Hollow Knight/Hollow Knight 2.png';
import plushieKeychain from '../../Products/Keychain/Plushie Keychain/Plushie_keychain.png';
import shinchanAction from '../../Products/Keychain/Shinchan/image 1.png';
import shinchanSleepy from '../../Products/Keychain/Shinchan/image 2.png';
import strawberryKeychain from '../../Products/Keychain/Strawberry/strawberry_keychain.png';

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
  },
  {
    id: 'double-side-qr-keychain',
    name: 'Double-Sided Scan Me QR Code Keychain',
    price: 149,
    category: 'Keychain',
    description: 'A dual-sided custom keychain featuring your Instagram/Facebook page or payment UPI QR code on one side, and a custom design or text on the other. Extremely handy for creators and business owners!',
    image: qrFront,
    varieties: {
      label: 'Acrylic Finish',
      options: [
        { id: 'glossy', name: 'Glossy Black & Neon', price: 149, isDefault: true, image: qrFront },
        { id: 'frosted', name: 'Frosted Translucent', price: 169, image: qrFront }
      ]
    },
    customFields: [
      { id: 'qrLink', label: 'UPI ID or Social Link (for QR)', type: 'text', placeholder: 'E.g., instagram.com/yourusername or upiid@okaxis', required: true },
      { id: 'titleText', label: 'Title / Custom Text on Back', type: 'text', placeholder: 'E.g., SCAN ME / PAY HERE', required: false }
    ],
    specifications: [
      { name: 'Material', value: 'Dual-Layer Acrylic' },
      { name: 'Thickness', value: '3 mm' },
      { name: 'Length', value: '2.2 Inch' },
      { name: 'Breadth', value: '2.2 Inch' },
      { name: 'Origin', value: 'India' }
    ],
    faqs: [
      { q: 'How do you create the QR code?', a: 'We automatically generate a high-quality QR code using the link or UPI ID you provide. We recommend verifying the link before checkout!' }
    ]
  },
  {
    id: 'hollow-knight-keychain',
    name: 'Hollow Knight Custom Keychain',
    price: 129,
    category: 'Keychain',
    description: 'Add a touch of Hallownest to your daily life with this beautiful laser-cut custom Hollow Knight keychain. Engrave your name or gamer tag on the back!',
    image: hkKnight,
    varieties: {
      label: 'Choose Character',
      options: [
        { id: 'knight', name: 'The Knight', price: 129, isDefault: true, image: hkKnight },
        { id: 'hornet', name: 'Hornet', price: 129, image: hkHornet },
        { id: 'quirrel', name: 'Quirrel', price: 139, image: hkQuirrel }
      ]
    },
    customFields: [
      { id: 'engraving', label: 'Name or Gamer Tag to engrave on back', type: 'text', placeholder: 'E.g., GHOST / PLAYER 1', required: false }
    ],
    specifications: [
      { name: 'Material', value: 'Laser-Cut Acrylic' },
      { name: 'Thickness', value: '3.5 mm' },
      { name: 'Generic Name', value: 'Anime Keychain' },
      { name: 'Origin', value: 'India' }
    ],
    faqs: [
      { q: 'Is it printed on both sides?', a: 'Yes! The character design is printed on both sides of the keychain, with high scratch resistance.' }
    ]
  },
  {
    id: 'plushie-keychain',
    name: 'Cute Handcrafted Plushie Keychain',
    price: 199,
    category: 'Keychain',
    description: 'An incredibly soft, hand-stitched mini plushie keychain. Choose your favorite animal buddy and add a personalized custom label tag!',
    image: plushieKeychain,
    varieties: {
      label: 'Choose Plushie Animal',
      options: [
        { id: 'teddy', name: 'Teddy Bear', price: 199, isDefault: true },
        { id: 'bunny', name: 'Cute Bunny', price: 199 },
        { id: 'chick', name: 'Lil Chick', price: 189 }
      ]
    },
    customFields: [
      { id: 'tagText', label: 'Tag Initials/Name (Max 5 letters)', type: 'text', placeholder: 'E.g., LOVE / A & B', required: true }
    ],
    specifications: [
      { name: 'Material', value: 'Premium Soft Velvet Cotton' },
      { name: 'Size', value: '3.5 Inch Height' },
      { name: 'Weight', value: '25 g' },
      { name: 'Net Quantity', value: '1' }
    ],
    faqs: [
      { q: 'Is it washable?', a: 'Yes, we recommend gentle hand washing with mild soap to maintain the softness of the plush fabric.' }
    ]
  },
  {
    id: 'shinchan-keychain',
    name: 'Shinchan Nohara Custom Keychain',
    price: 119,
    category: 'Keychain',
    description: 'A funny and adorable Shinchan custom keychain. Perfect for 90s kids and anime fans. Engrave your favorite dialogue or nickname on the back!',
    image: shinchanAction,
    varieties: {
      label: 'Choose Pose',
      options: [
        { id: 'action', name: 'Action Mask Shinchan', price: 119, isDefault: true, image: shinchanAction },
        { id: 'sleepy', name: 'Sleepy Pajamas Shinchan', price: 119, image: shinchanSleepy }
      ]
    },
    customFields: [
      { id: 'engraving', label: 'Dialogue/Name to engrave on back', type: 'text', placeholder: 'E.g., SHINCHAN', required: false }
    ],
    specifications: [
      { name: 'Material', value: 'Acrylic' },
      { name: 'Size', value: '2.5 Inches' },
      { name: 'Thickness', value: '3 mm' },
      { name: 'Origin', value: 'India' }
    ],
    faqs: [
      { q: 'Is the color scratch proof?', a: 'Yes, the Shinchan graphic is encased between double layers of protective clear acrylic, rendering it scratch proof!' }
    ]
  },
  {
    id: 'strawberry-keychain',
    name: 'Sweet Strawberry Custom Keychain',
    price: 99,
    category: 'Keychain',
    description: 'A sweet, summery custom keychain shaped like a strawberry. Add custom initials to the little metal leaf charm for a personal touch!',
    image: strawberryKeychain,
    customFields: [
      { id: 'charmInitials', label: 'Initials to engrave on charm', type: 'text', placeholder: 'E.g., S.K.', required: true }
    ],
    specifications: [
      { name: 'Material', value: 'Premium Resinated Acrylic & Alloy' },
      { name: 'Weight', value: '15 g' },
      { name: 'Net Quantity', value: '1' }
    ],
    faqs: [
      { q: 'Can I choose standard gold/silver metal?', a: 'Yes, during WhatsApp confirmation you can specify your preference for gold-plated or silver-plated rings and charms!' }
    ]
  }
];

