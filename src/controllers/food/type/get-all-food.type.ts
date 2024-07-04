import { ApiProperty } from '@nestjs/swagger';
import { Food } from 'src/entities/food.entity';
import { ResponseBody } from 'src/type/base.type';

class GetAllFoodResponseData implements Pick<Food, 'id' | 'name'> {
  @ApiProperty({ description: '음식 고유 ID' })
  id: number;

  @ApiProperty({ description: '음식 이름' })
  name: string;
}

export class GetAllFoodResponse extends ResponseBody {
  @ApiProperty({ description: '데이터' })
  data: GetAllFoodResponseData[];
}
