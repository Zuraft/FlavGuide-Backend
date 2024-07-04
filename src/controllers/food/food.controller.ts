import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllFoodResponse } from 'src/controllers/food/type/get-all-food.type';
import { FoodService } from 'src/services/food.service';

@Controller('food')
@ApiTags('Food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('/')
  @ApiOperation({ summary: '음식 리스트 조회' })
  @ApiCreatedResponse({
    description: '음식 리스트 조회 성공',
    type: GetAllFoodResponse,
    example: {
      ok: true,
      status: 200,
      data: [
        {
          id: 1,
          name: '음식 이름',
        },
        {
          id: 2,
          name: '음식 이름',
        },
        {
          id: 3,
          name: '음식 이름',
        },
      ],
    },
  })
  async getFood(): Promise<GetAllFoodResponse> {
    const foodList = await this.foodService.findAll();

    return {
      status: 200,
      ok: true,
      data: foodList.map((food) => ({
        id: food.id,
        name: food.name,
      })),
    };
  }
}
