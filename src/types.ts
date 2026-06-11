export interface Appointment {
  id: string;
  fullName: string;
  phoneNumber: string;
  serviceId: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  priceETB: number;
  durationMin: number;
  category: 'hair' | 'beard' | 'grooming' | 'combo';
  image: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  serviceName?: string;
  isVerified: boolean;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  category: 'haircuts' | 'beard' | 'interior' | 'tools';
  title: string;
}

export interface BeforeAfterItem {
  id: string;
  beforeUrl: string;
  afterUrl: string;
  title: string;
  description: string;
}
