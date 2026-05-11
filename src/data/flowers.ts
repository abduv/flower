export interface Flower {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const categories: Category[] = [
  {id: '1', name: 'Розы', icon: '🌹', color: '#FFE4E8'},
  {id: '2', name: 'Тюльпаны', icon: '🌷', color: '#FFF0E0'},
  {id: '3', name: 'Букеты', icon: '💐', color: '#E8F5E9'},
  {id: '4', name: 'Комнатные', icon: '🪴', color: '#E3F2FD'},
  {id: '5', name: 'Подарки', icon: '🎁', color: '#F3E5F5'},
];

export const flowers: Flower[] = [
  {
    id: '1',
    name: 'Красные розы',
    price: 2990,
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=400',
    category: '1',
    description:
      'Классический букет из 11 красных роз. Идеальный подарок для любимого человека. Свежие розы с бархатными лепестками и нежным ароматом.',
    rating: 4.8,
    reviews: 124,
  },
  {
    id: '2',
    name: 'Белые тюльпаны',
    price: 1990,
    image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=400',
    category: '2',
    description:
      'Нежный букет из 15 белых тюльпанов. Символ чистоты и нежности. Прекрасный весенний подарок.',
    rating: 4.6,
    reviews: 89,
  },
  {
    id: '3',
    name: 'Букет "Весеннее настроение"',
    price: 3490,
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400',
    category: '3',
    description:
      'Яркий микс из сезонных цветов: герберы, хризантемы, альстромерии. Поднимет настроение в любой день!',
    rating: 4.9,
    reviews: 203,
  },
  {
    id: '4',
    name: 'Розовые пионы',
    price: 4590,
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400',
    category: '3',
    description:
      'Роскошный букет из 9 пионов нежно-розового цвета. Пионы — символ богатства и благополучия.',
    rating: 4.9,
    reviews: 156,
  },
  {
    id: '5',
    name: 'Орхидея фаленопсис',
    price: 3290,
    image: 'https://images.unsplash.com/photo-1567748157439-651aca2ff064?w=400',
    category: '4',
    description:
      'Элегантная орхидея в керамическом кашпо. Цветёт до 3 месяцев. Не требует сложного ухода.',
    rating: 4.7,
    reviews: 98,
  },
  {
    id: '6',
    name: 'Букет "Нежность"',
    price: 2490,
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400',
    category: '3',
    description:
      'Воздушный букет в пастельных тонах: кустовые розы, эустома, гипсофила. Упакован в крафт-бумагу.',
    rating: 4.5,
    reviews: 67,
  },
  {
    id: '7',
    name: 'Жёлтые тюльпаны',
    price: 1790,
    image: 'https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=400',
    category: '2',
    description:
      'Солнечный букет из 15 жёлтых тюльпанов. Дарят радость и хорошее настроение!',
    rating: 4.4,
    reviews: 45,
  },
  {
    id: '8',
    name: 'Монстера делициоза',
    price: 2890,
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400',
    category: '4',
    description:
      'Тропическое растение с крупными резными листьями. Высота 40-50 см. В стильном горшке.',
    rating: 4.6,
    reviews: 73,
  },
  {
    id: '9',
    name: 'Набор "Романтика"',
    price: 5990,
    image: 'https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?w=400',
    category: '5',
    description:
      'Подарочный набор: букет из 25 красных роз, бельгийский шоколад, открытка ручной работы.',
    rating: 5.0,
    reviews: 312,
  },
  {
    id: '10',
    name: 'Кустовые розы микс',
    price: 2190,
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=400',
    category: '1',
    description:
      'Очаровательный букет из разноцветных кустовых роз. 7 веток, около 20 бутонов.',
    rating: 4.7,
    reviews: 88,
  },
  {
    id: '11',
    name: 'Фикус Бенджамина',
    price: 1990,
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
    category: '4',
    description:
      'Популярное комнатное растение. Высота 30-40 см. Очищает воздух в помещении.',
    rating: 4.3,
    reviews: 54,
  },
  {
    id: '12',
    name: 'Набор "С днём рождения"',
    price: 4490,
    image: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=400',
    category: '5',
    description:
      'Яркий букет, воздушные шары, коробка конфет и поздравительная открытка в одном наборе.',
    rating: 4.8,
    reviews: 167,
  },
];
