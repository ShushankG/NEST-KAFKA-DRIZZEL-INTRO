import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
// import { DatabaseModule } from 'src/db/database.module';
import { KafkaModule } from '../kafka/kafka.module'; // Adjust the path as needed


@Module({
  imports: [KafkaModule,],
  controllers: [CarController],
  providers: [CarService]
})
export class CarModule {}
