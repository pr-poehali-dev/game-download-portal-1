export interface Game {
  id: number;
  title: string;
  genre: string;
  rating: number;
  size: string;
  platform: string[];
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
  downloads: number;
  description: string;
  releaseYear: number;
}

export const GAMES: Game[] = [
  {
    id: 1,
    title: "Cyberpunk 2099",
    genre: "RPG",
    rating: 4.8,
    size: "70 GB",
    platform: ["PC", "PS5"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
    isNew: true,
    isFeatured: true,
    downloads: 1240000,
    description: "Открытый мир будущего с глубокой ролевой системой",
    releaseYear: 2025,
  },
  {
    id: 2,
    title: "Shadow Legends: Reborn",
    genre: "Action",
    rating: 4.6,
    size: "45 GB",
    platform: ["PC", "Xbox"],
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
    isNew: true,
    isFeatured: false,
    downloads: 890000,
    description: "Эпические битвы в тёмном фэнтезийном мире",
    releaseYear: 2025,
  },
  {
    id: 3,
    title: "Galactic Wars: Origins",
    genre: "Strategy",
    rating: 4.5,
    size: "32 GB",
    platform: ["PC"],
    image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop",
    isNew: true,
    downloads: 560000,
    description: "Стратегия в реальном времени в космосе",
    releaseYear: 2025,
  },
  {
    id: 4,
    title: "Neon Drift",
    genre: "Racing",
    rating: 4.4,
    size: "18 GB",
    platform: ["PC", "PS5", "Xbox"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
    isNew: true,
    downloads: 430000,
    description: "Гонки в неоновом городе будущего",
    releaseYear: 2025,
  },
  {
    id: 5,
    title: "Eternal Quest",
    genre: "RPG",
    rating: 4.9,
    size: "55 GB",
    platform: ["PC", "PS5"],
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=400&h=250&fit=crop",
    isFeatured: true,
    downloads: 3200000,
    description: "Легендарная ролевая игра с миллионами игроков",
    releaseYear: 2023,
  },
  {
    id: 6,
    title: "Warfront: Omega",
    genre: "Shooter",
    rating: 4.7,
    size: "60 GB",
    platform: ["PC", "PS5", "Xbox"],
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop",
    isFeatured: true,
    downloads: 2800000,
    description: "Тактический шутер с реалистичной физикой",
    releaseYear: 2023,
  },
  {
    id: 7,
    title: "Minecraft Universe",
    genre: "Sandbox",
    rating: 4.8,
    size: "1 GB",
    platform: ["PC", "Mobile"],
    image: "https://images.unsplash.com/photo-1587182037961-5f5dde9b9bd8?w=400&h=250&fit=crop",
    downloads: 5000000,
    description: "Бесконечный мир для строительства и творчества",
    releaseYear: 2022,
  },
  {
    id: 8,
    title: "Dark Realm",
    genre: "Horror",
    rating: 4.3,
    size: "28 GB",
    platform: ["PC"],
    image: "https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=400&h=250&fit=crop",
    downloads: 720000,
    description: "Атмосферный хоррор с нелинейным сюжетом",
    releaseYear: 2024,
  },
];

export const GENRES = ["Все", "RPG", "Action", "Strategy", "Racing", "Shooter", "Sandbox", "Horror"];
