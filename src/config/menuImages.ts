import type { MenuItemId } from './cateringPricing';
import cheeseburgerImage from '../img/Cheeseburger.jpg';
import doubleCheeseburgerImage from '../img/Double Cheese.jpg';
import friesImage from '../img/Fries.jpg';
import veggieBurgerImage from '../img/Veggie Burger.png';

export const menuImages: Partial<Record<MenuItemId, string>> = {
  cheeseburger: cheeseburgerImage,
  doubleCheeseburger: doubleCheeseburgerImage,
  veggieBurger: veggieBurgerImage,
  fries: friesImage,
};
