import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Allergy } from 'src/entities/allergy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AllergyService {
  constructor(
    @InjectRepository(Allergy)
    private allergyRepository: Repository<Allergy>,
  ) {}

  async findAll(): Promise<Allergy[]> {
    const allergyList = await this.allergyRepository.find();
    return allergyList;
  }
}
