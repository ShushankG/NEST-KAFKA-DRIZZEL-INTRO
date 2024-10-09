import { Module } from '@nestjs/common';

import { CarModule } from './car/car.module';
import { KafkaModule } from './kafka/kafka.module';
// import { DatabaseModule } from './db/database.module';


@Module({
  imports: [CarModule, KafkaModule]

})
export class AppModule {}
