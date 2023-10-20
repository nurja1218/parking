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
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ParkingLotRequest } from '../types/requests';
import { ParkingLotMetaResponse } from '../types/responses';
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
    type: [ParkingLotMetaResponse],
  })
  getParkingLots(): Promise<ParkingLotMetaResponse[]> {
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
    type: ParkingLotMetaResponse,
  })
  getParkingLot(@Param('id') id: string): Promise<ParkingLotMetaResponse> {
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
    type: ParkingLotMetaResponse,
  })
  async createParkingLot(
    @Body('parkingLot')
    parkingLot: ParkingLotRequest,
  ): Promise<ParkingLotMetaResponse> {
    return await this.parkingLotService.saveParkingLot(parkingLot);
  }
}
