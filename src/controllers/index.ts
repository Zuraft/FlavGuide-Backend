import { AllergyController } from 'src/controllers/allergy/allergy.controller';
import { AuthController } from 'src/controllers/auth/auth.controller';
import { FoodController } from 'src/controllers/food/food.controller';
import { GroupController } from 'src/controllers/group/group.controller';
import { UserController } from 'src/controllers/user/user.controller';

export default [
  AuthController,
  UserController,
  AllergyController,
  FoodController,
  GroupController,
];
