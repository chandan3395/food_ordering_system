export const defaultCategories = [
  {
    name: 'Signature Meals',
    description: 'Chef-driven mains with bold flavor, balanced texture, and fresh seasonal ingredients.',
    image:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Burgers',
    description: 'Juicy stacks, buttery buns, crisp vegetables, and house-made sauces.',
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Pizza',
    description: 'Stone-baked pies with slow-fermented dough, creamy cheese, and vibrant toppings.',
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Asian Bowls',
    description: 'Noodle and rice bowls layered with umami-rich sauces, herbs, and crunch.',
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Desserts',
    description: 'Plated sweets and comfort desserts to finish the meal on a high note.',
    image:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Refreshers',
    description: 'Fresh juices, iced teas, and handcrafted coolers to pair with every order.',
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
  },
];

export const defaultFoods = [
  {
    name: 'Truffle Roast Chicken',
    description: 'Herb-roasted chicken with whipped potato, garlic jus, and charred broccolini.',
    price: 489,
    image:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80',
    category: 'Signature Meals',
    stock: 18,
    isAvailable: true,
    ratings: { average: 4.8, count: 142 },
  },
  {
    name: 'Smoked Salmon Harvest Bowl',
    description: 'Citrus rice, smoked salmon, pickled cucumber, avocado, and sesame crunch.',
    price: 445,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    category: 'Signature Meals',
    stock: 14,
    isAvailable: true,
    ratings: { average: 4.7, count: 96 },
  },
  {
    name: 'Double Sear Smash Burger',
    description: 'Two beef patties, cheddar, caramelized onion, lettuce, and signature bites sauce.',
    price: 325,
    image:
      'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80',
    category: 'Burgers',
    stock: 24,
    isAvailable: true,
    ratings: { average: 4.9, count: 211 },
  },
  {
    name: 'Crispy Fire Chicken Burger',
    description: 'Buttermilk fried chicken, chili glaze, slaw, pickles, and brioche bun.',
    price: 299,
    image:
      'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=80',
    category: 'Burgers',
    stock: 20,
    isAvailable: true,
    ratings: { average: 4.6, count: 128 },
  },
  {
    name: 'Burrata Garden Pizza',
    description: 'San Marzano tomato, torn burrata, basil oil, and blistered cherry tomatoes.',
    price: 389,
    image:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    category: 'Pizza',
    stock: 15,
    isAvailable: true,
    ratings: { average: 4.8, count: 174 },
  },
  {
    name: 'Pepperoni Heatwave Pizza',
    description: 'Spicy pepperoni, mozzarella, roasted peppers, honey drizzle, and oregano.',
    price: 369,
    image:
      'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=900&q=80',
    category: 'Pizza',
    stock: 17,
    isAvailable: true,
    ratings: { average: 4.7, count: 183 },
  },
  {
    name: 'Tokyo Teriyaki Bowl',
    description: 'Grilled chicken, jasmine rice, steamed greens, soy glaze, and toasted sesame.',
    price: 329,
    image:
      'https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=900&q=80',
    category: 'Asian Bowls',
    stock: 22,
    isAvailable: true,
    ratings: { average: 4.5, count: 109 },
  },
  {
    name: 'Spicy Miso Ramen Bowl',
    description: 'Rich miso broth, ramen noodles, marinated egg, mushrooms, and chili crisp.',
    price: 349,
    image:
      'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?auto=format&fit=crop&w=900&q=80',
    category: 'Asian Bowls',
    stock: 19,
    isAvailable: true,
    ratings: { average: 4.8, count: 154 },
  },
  {
    name: 'Mango Sticky Parfait',
    description: 'Creamy coconut sticky rice layered with ripe mango, lime zest, and crunch.',
    price: 189,
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    category: 'Desserts',
    stock: 20,
    isAvailable: true,
    ratings: { average: 4.6, count: 88 },
  },
  {
    name: 'Dark Chocolate Lava Slice',
    description: 'Warm chocolate cake with molten center, sea salt, and vanilla cream.',
    price: 209,
    image:
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80',
    category: 'Desserts',
    stock: 16,
    isAvailable: true,
    ratings: { average: 4.9, count: 132 },
  },
  {
    name: 'Strawberry Basil Cooler',
    description: 'Fresh strawberry puree, basil leaves, sparkling water, and lime.',
    price: 129,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    category: 'Refreshers',
    stock: 40,
    isAvailable: true,
    ratings: { average: 4.4, count: 61 },
  },
  {
    name: 'Citrus Mint Iced Tea',
    description: 'Brewed black tea with orange, lemon, mint, and light cane sweetness.',
    price: 119,
    image:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=80',
    category: 'Refreshers',
    stock: 36,
    isAvailable: true,
    ratings: { average: 4.5, count: 57 },
  },
];
