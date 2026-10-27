/* BrewHouse menu data. Prices are in INR.
   opt: 'sm' = size + milk choices, 's' = size only, '' = no options.
   art: illustration type. To use a real photo instead, add photo:'images/name.jpg'. */
const MENU = [
  { id: 'espresso', name: 'Single-Origin Espresso', cat: 'coffee', price: 140, opt: 's', art: 'esp', tint: '#4a2c1d', desc: 'A double shot of our rotating single origin. Dark chocolate, orange peel, long finish.' },
  { id: 'flatwhite', name: 'Flat White', cat: 'coffee', price: 220, opt: 'sm', art: 'cup', tint: '#8a5a3a', feat: 1, desc: 'Two ristretto shots under silky microfoam. Small, strong and smooth.' },
  { id: 'cappuccino', name: 'Cappuccino', cat: 'coffee', price: 210, opt: 'sm', art: 'cup', tint: '#a06a44', desc: 'Equal parts espresso, steamed milk and thick foam, dusted with cocoa.' },
  { id: 'hazelnut', name: 'Hazelnut Latte', cat: 'coffee', price: 245, opt: 'sm', art: 'cup', tint: '#b98558', desc: 'Espresso, steamed milk and house-made roasted hazelnut syrup.' },
  { id: 'mocha', name: 'Cardamom Mocha', cat: 'coffee', price: 260, opt: 'sm', art: 'cup', tint: '#5a3322', desc: 'Dark chocolate, espresso and crushed green cardamom, finished with cream.' },
  { id: 'kahwa', name: 'Saffron Kahwa', cat: 'tea', price: 180, opt: 's', art: 'tea', tint: '#e0a53a', feat: 1, desc: 'Green tea simmered with saffron, cinnamon, cardamom and slivered almonds.' },
  { id: 'chai', name: 'Masala Chai', cat: 'tea', price: 150, opt: 'sm', art: 'tea', tint: '#b9763a', desc: 'Assam leaf boiled with ginger, black pepper and whole spices.' },
  { id: 'matcha', name: 'Matcha Latte', cat: 'tea', price: 270, opt: 'sm', art: 'cup', tint: '#8aa05a', desc: 'Ceremonial-grade matcha whisked to order and topped with steamed milk.' },
  { id: 'coldbrew', name: 'Cold Brew', cat: 'cold', price: 240, opt: 's', art: 'glass', tint: '#2a1a12', feat: 1, desc: 'Steeped for 18 hours, served over ice. Low acidity, cocoa and brown sugar notes.' },
  { id: 'icedlatte', name: 'Iced Vanilla Latte', cat: 'cold', price: 250, opt: 'sm', art: 'glass', tint: '#c39a6b', desc: 'Espresso, cold milk and Madagascan vanilla over ice.' },
  { id: 'caramel', name: 'Iced Caramel Macchiato', cat: 'cold', price: 270, opt: 'sm', art: 'glass', tint: '#b0763a', desc: 'Vanilla milk, espresso poured on top and a slow caramel drizzle.' },
  { id: 'lemon', name: 'Lemon Mint Cooler', cat: 'cold', price: 170, opt: 's', art: 'glass', tint: '#c9d36a', desc: 'Fresh lime, mint and a little jaggery, topped with sparkling water.' },
  { id: 'croissant', name: 'Butter Croissant', cat: 'pastries', price: 160, opt: '', art: 'croissant', tint: '#d9a25e', feat: 1, desc: 'Laminated by hand over three days. Crisp shell, honeycomb crumb.' },
  { id: 'almondcroissant', name: 'Almond Croissant', cat: 'pastries', price: 190, opt: '', art: 'croissant', tint: '#c98a3c', desc: 'Twice-baked with frangipane and toasted almond flakes.' },
  { id: 'muffin', name: 'Blueberry Muffin', cat: 'pastries', price: 150, opt: '', art: 'muffin', tint: '#4b4a7a', desc: 'Buttermilk batter packed with blueberries and a sugared crust.' },
  { id: 'brownie', name: 'Walnut Brownie', cat: 'pastries', price: 170, opt: '', art: 'brownie', tint: '#4a2c1d', desc: 'Dense, fudgy and made with 70% dark chocolate and Kashmiri walnuts.' },
  { id: 'roll', name: 'Cinnamon Roll', cat: 'pastries', price: 180, opt: '', art: 'roll', tint: '#8a4f2a', desc: 'Soft brioche spiral with cinnamon sugar and cream cheese glaze.' },
  { id: 'avotoast', name: 'Avocado Toast', cat: 'snacks', price: 290, opt: '', art: 'toast', tint: '#7b9a4e', desc: 'Sourdough, smashed avocado, chilli flakes, lime and a soft-poached egg.' },
  { id: 'paneer', name: 'Paneer Tikka Sandwich', cat: 'snacks', price: 260, opt: '', art: 'sandwich', tint: '#d8742f', desc: 'Grilled paneer, mint chutney, onion and peppers on toasted multigrain.' },
  { id: 'toastie', name: 'Chilli Cheese Toastie', cat: 'snacks', price: 220, opt: '', art: 'sandwich', tint: '#e3b23c', desc: 'Cheddar, mozzarella and green chilli pressed until golden.' }
];
const CATS = [['all', 'All'], ['coffee', 'Coffee'], ['tea', 'Tea'], ['cold', 'Cold drinks'], ['pastries', 'Pastries'], ['snacks', 'Snacks']];
