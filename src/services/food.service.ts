import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from 'src/entities/food.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  async findAll(): Promise<Food[]> {
    const foodList = await this.foodRepository.find();
    return foodList;
  }
}
