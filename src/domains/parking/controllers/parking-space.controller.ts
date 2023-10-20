import { Controller } from '@nestjs/common';
import { ParkingSpaceService } from '../services';

@Controller('v1/parking')
export class ParkingSpaceController {
  constructor(private readonly parkingSpaceService: ParkingSpaceService) {}
}
