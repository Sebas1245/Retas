export const getImageByCategory: (category?: string) => string = (category) => {
  switch (category?.toLowerCase()) {
    case 'futbol':
      return "futbol_cat.jpg";
    case 'golf':
      return "golf_cat.jpg";
    case 'voleibol':
      return "voley_cat.jpg";
    case 'baloncesto':
      return "basket_cat.jpg";
    case 'ajedrez':
      return "chess_cat.jpg";
    case 'raquetbol':
      return "raquet_cat.jpg";
    case 'esports':
      return "esport_cat.jpg";
    case 'otro':
      return "other_cat.jpg";
    default:
      return "other_cat.jpg";
  }
}