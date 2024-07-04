import { AllergyService } from 'src/services/allergy.service';
import { AuthService } from 'src/services/auth.service';
import { FoodService } from 'src/services/food.service';
import { GroupService } from 'src/services/group.service';
import { UserService } from 'src/services/user.service';

export default [
  UserService,
  AuthService,
  AllergyService,
  FoodService,
  GroupService,
];
