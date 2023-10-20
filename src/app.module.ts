import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectionOptions } from './config';
import { ConfigModule } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ParkingModule } from './modules/parking/parking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (process.env.NODE_ENV === 'local' && !+process.env.DEBUG_PROD) {
          const options = await connectionOptions(process.env);
          return {
            ...options,
            autoLoadEntities: true,
            name: 'default',
            namingStrategy: new SnakeNamingStrategy(),
          };
        }
      },
    }),
    ParkingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
