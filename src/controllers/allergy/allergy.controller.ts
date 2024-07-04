import { Controller, Get } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllAllergyResponse } from 'src/controllers/allergy/type/get-all-allergy.type';
import { AllergyService } from 'src/services/allergy.service';

@Controller('allergy')
@ApiTags('Allergy')
export class AllergyController {
  constructor(private readonly allergyService: AllergyService) {}

  @Get('/')
  @ApiOperation({ summary: '알러지 리스트 조회' })
  @ApiCreatedResponse({
    description: '알러지 리스트 조회 성공',
    type: GetAllAllergyResponse,
    example: {
      ok: true,
      status: 200,
      data: [
        {
          id: 1,
          name: '알러지 이름',
        },
        {
          id: 2,
          name: '알러지 이름',
        },
        {
          id: 3,
          name: '알러지 이름',
        },
      ],
    },
  })
  async getAllergy(): Promise<GetAllAllergyResponse> {
    const allergyList = await this.allergyService.findAll();

    return {
      status: 200,
      ok: true,
      data: allergyList.map((allergy) => ({
        id: allergy.id,
        name: allergy.name,
      })),
    };
  }
}
