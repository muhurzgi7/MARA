import { Service, GalleryItem, BeforeAfterItem, Review } from './types';

export const BUSINESS_INFO = {
  name: 'MARA Barber Shop',
  tagline: 'Precision Cuts, Classic Style, Modern Confidence',
  phone: '+251 77 177 1111',
  phoneFormatted: '+251 (77) 177-1111',
  email: 'appointments@marabarbers.com',
  address: 'CMC Road, Safari Building, 2nd Floor, Addis Ababa, Ethiopia',
  landmark: 'Adjacent to Safari Tram Station, opposite Safeway Supermarket',
  gmapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15764.09459522883!2d38.8188185!3d9.0152431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b854af8a3c0cb%3A0x8e82d8d85fcdccf!2sCMC%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set'
};

export const SERVICES: Service[] = [
  {
    id: 'royal-cut',
    name: 'The Royal Cut & Wash',
    description: 'Precision shear or clipper haircut, customized Consultation, relaxing lavender-infused shampoo, and premium blow-dry styling.',
    priceETB: 1200,
    durationMin: 45,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1605497746444-ac9dba450f33?q=80&w=600'
  },
  {
    id: 'modern-fade',
    name: 'Skin Fade or Taper Fade',
    description: 'Expert fade blending down to the skin. Includes neck shave, razor lining, hair bath, and modern texture styling.',
    priceETB: 1000,
    durationMin: 40,
    category: 'hair',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=600'
  },
  {
    id: 'beard-sculpt',
    name: 'Beard Sculpting & Trim',
    description: 'Detailed beard reshaping combined with a botanical oil treatment, absolute symmetry alignment, and hot towel-neck lining.',
    priceETB: 800,
    durationMin: 30,
    category: 'beard',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600'
  },
  {
    id: 'shave-experience',
    name: 'Royal Hot Towel Shave',
    description: 'Classic straight-razor shave with a sequence of 3 hot towels, pre-shave steam, natural essential oils, and ice-cold soothing finish.',
    priceETB: 900,
    durationMin: 35,
    category: 'beard',
    image: 'https://images.unsplash.com/photo-1517832606589-7a598b647192?q=80&w=600'
  },
  {
    id: 'charcoal-mask',
    name: 'Gold & Charcoal Facial Therapy',
    description: 'Active black charcoal pore cleansing mask paired with absolute skin hydration, cooling mist, and stress-release facial massage.',
    priceETB: 1100,
    durationMin: 30,
    category: 'grooming',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600'
  },
  {
    id: 'mara-signature',
    name: 'The MARA Signature Experience',
    description: 'The ultimate gentleman service: Royal Haircut, luxury Hot Towel Shave/Beard Treatment, Gold Facial Therapy, and shoulder massage.',
    priceETB: 2800,
    durationMin: 110,
    category: 'combo',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    imageUrl: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800',
    category: 'tools',
    title: 'Artisanal Barber Equipment'
  },
  {
    id: 'gal-2',
    imageUrl: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800',
    category: 'interior',
    title: 'The Luxury Waiting Lounge'
  },
  {
    id: 'gal-3',
    imageUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800',
    category: 'beard',
    title: 'Hot Towel Detailing Session'
  },
  {
    id: 'gal-4',
    imageUrl: 'https://images.unsplash.com/photo-1517832606589-7a598b647192?q=80&w=800',
    category: 'haircuts',
    title: 'Sharp Temple Lining Fade'
  },
  {
    id: 'gal-5',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800',
    category: 'haircuts',
    title: 'Polished High Skin Taper'
  },
  {
    id: 'gal-6',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800',
    category: 'tools',
    title: 'Sanitized Premium Scissors'
  }
];

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: 'ba-1',
    beforeUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
    afterUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300',
    title: 'Volume Haircut & Fade Upgrade',
    description: 'Transforming an overgrown top into a refined mid-drop style with clean side contours.'
  },
  {
    id: 'ba-2',
    beforeUrl: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=300',
    afterUrl: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=300',
    title: 'Beard Sculpt & Definition',
    description: 'Taming a wild patch beard into a sharp, symmetric jaw-contouring asset.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Dawit Yohannes',
    rating: 5,
    comment: 'The best barber shop experience in Addis Ababa, hands down! The luxury feel at CMC is incomparable. I recommend "The Royal Cut & Wash" – worth every single Birr.',
    date: '2026-05-18',
    serviceName: 'The Royal Cut & Wash',
    isVerified: true
  },
  {
    id: 'rev-2',
    name: 'Michael Kebede',
    rating: 5,
    comment: 'MARA has elevated beard-grooming to a surgical level. The hot towels are unbelievably relaxing and the hygiene standards are immaculate.',
    date: '2026-06-02',
    serviceName: 'Royal Hot Towel Shave',
    isVerified: true
  },
  {
    id: 'rev-3',
    name: 'Dr. Selamawit Alene',
    rating: 5,
    comment: 'I booked a signature grooming package for my husband as a gift. He came out looking incredibly sharp and confident. Outstanding customer hospitality!',
    date: '2026-06-08',
    serviceName: 'The MARA Signature Experience',
    isVerified: true
  },
  {
    id: 'rev-4',
    name: 'Brook Abraham',
    rating: 5,
    comment: 'Expert precision skin fade. CMC now has its ultimate grooming benchmark. Super fast booking workflow online as well!',
    date: '2026-06-10',
    serviceName: 'Skin Fade or Taper Fade',
    isVerified: true
  }
];

export const HOURLY_SLOTS = [
  '08:00 AM',
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
  '06:00 PM',
  '07:00 PM',
  '08:00 PM'
];

export const WHY_CHOOSE_US = [
  {
    title: 'Sterilized Hygiene Standards',
    description: 'We follow absolute hospital-grade sterilization for barber clippers, razors, chairs, and styling tools between clients.'
  },
  {
    title: 'Certified Master Barbers',
    description: 'Our team is professionally certified, with over a decade of haircutting excellence in modern gradients and styling trends.'
  },
  {
    title: 'Premium Styling Products',
    description: 'We use premium, organic essential oils, luxury face mud, hair texturizers, and pomades imported directly from premium brands.'
  },
  {
    title: 'Luxury Chill Lounge',
    description: 'Enjoy high-speed Wi-Fi, premium espresso/iced tea, and luxurious leather lounge seats while waiting for your slot.'
  }
];
