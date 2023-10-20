import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ParkingLotService } from '../services';
import { ParkingLot } from '../entities/parking-lot.entity';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParkingLotRequest } from '../types/requests';
@Controller('v1/parking')
@ApiTags('주자장 관리 API')
export class ParkingLotController {
  constructor(private readonly parkingLotService: ParkingLotService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '주차장 조회 API',
    description: '등록된 주차장의 리스트를 조회',
  })
  @ApiCreatedResponse({
    description: '주차장의 리스트를 조회한다.',
    type: [ParkingLot],
  })
  getParkingLots(): Promise<ParkingLot[]> {
    return this.parkingLotService.getParkingLots();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '주차장 상세 조회 API',
    description: '등록된 주차장 ID로 주차장 조회',
  })
  @ApiCreatedResponse({
    description: '주차장의 ID로 주차장을 조회한다.',
    type: ParkingLot,
  })
  getParkingLot(@Param('id') id: string): Promise<ParkingLot> {
    return this.parkingLotService.getParkingLotById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '주차장 생성 API',
    description: '주차장 생성',
  })
  @ApiCreatedResponse({
    description: '주차장 정보를 기반으로 주차장 생성한다.',
    type: ParkingLot,
  })
  async createParkingLot(
    @Body('parkingLot')
    parkingLot: ParkingLotRequest,
  ): Promise<ParkingLot> {
    return await this.parkingLotService.saveParkingLot(parkingLot);
  }
}
