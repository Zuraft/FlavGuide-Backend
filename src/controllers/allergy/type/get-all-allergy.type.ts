import { ApiProperty } from '@nestjs/swagger';
import { Allergy } from 'src/entities/allergy.entity';
import { ResponseBody } from 'src/type/base.type';

class GetAllAllergyResponseData implements Pick<Allergy, 'id' | 'name'> {
  @ApiProperty({ description: '알러지 고유 ID' })
  id: number;

  @ApiProperty({ description: '알러지 이름' })
  name: string;
}

export class GetAllAllergyResponse extends ResponseBody {
  @ApiProperty({ description: '데이터' })
  data: GetAllAllergyResponseData[];
}
