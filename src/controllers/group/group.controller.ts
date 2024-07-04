import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GroupService } from 'src/services/group.service';

@Controller('group')
@ApiTags('Group')
@ApiBearerAuth()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}
}
