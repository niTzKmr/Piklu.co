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
    id: 'hollow-knight-acrylic-keychain',
    name: 'Hollow Knight Acrylic Keychain',
    price: 129,
    category: 'Keychain',
    description: 'Add a touch of Hallownest to your daily life with this beautiful laser-cut custom Hollow Knight keychain. Engrave your name or gamer tag on the back!',
    image: hkKnight,
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
    id: 'hollow-knight-figurine-keychain',
    name: 'Hollow Knight Figurine Keychain',
    price: 149,
    category: 'Keychain',
    description: 'A stunning 3D Hollow Knight figurine keychain. Perfect for collectors and hollow knight fans who want a high-quality figurine charm by their side.',
    image: hkHornet,
    specifications: [
      { name: 'Material', value: 'Premium Resinated Mold' },
      { name: 'Type', value: '3D Figurine Charm' },
      { name: 'Origin', value: 'India' }
    ],
    faqs: [
      { q: 'What is the height of the figure?', a: 'The Hollow Knight figurine charm stands approximately 2 inches tall.' }
    ]
  },
  {
    id: 'plushie-keychain',
    name: 'Cute Handcrafted Plushie Keychain',
    price: 199,
    category: 'Keychain',
    description: 'An incredibly soft, hand-stitched mini plushie keychain. Choose your favorite animal buddy and add a personalized custom label tag!',
    image: plushieKeychain,
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
    id: 'shinchan-action-keychain',
    name: 'Shinchan Custom Keychain (Action Pose)',
    price: 119,
    category: 'Keychain',
    description: 'A funny and adorable Shinchan custom keychain in his iconic Action Mask superhero suit! Perfect for 90s kids and anime fans.',
    image: shinchanAction,
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
    id: 'shinchan-pajamas-keychain',
    name: 'Shinchan Custom Keychain (Pajamas Pose)',
    price: 119,
    category: 'Keychain',
    description: 'A lazy, sleeping Shinchan custom keychain wearing his classic green-and-white pajama set. Super cute and detailed.',
    image: shinchanSleepy,
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
