import { Injectable } from '@nestjs/common';
import {CARS} from './cars.mock';
import { cars } from 'src/db/schema';
import { KafkaService } from '../kafka/kafka.service'; // Import Kafka service
import { Pool } from 'mysql2/promise'; // Import Pool type



import 'dotenv/config';
import { drizzle } from 'drizzle-orm/connect';

@Injectable()
export class CarService {
    constructor(private readonly kafkaService: KafkaService) {}

     
    public async getCars()
        {
            const db = await drizzle("mysql2", process.env.DATABASE_URL!);

            const car = await db.select().from(cars);
            console.log('Getting all cars from the database: ', car)

        }
        // public async pushCars(createCarDto: { name: string; color: string })
        // {
        //     const db = await drizzle("mysql2", process.env.DATABASE_URL!);

        //     const car: typeof cars.$inferInsert = {
        //         name: createCarDto.name,
        //         color: createCarDto.color,
        //       };
        //       await db.insert(cars).values(car);
        //     //   console.log('New user created!')
        //     console.log('Getting new car from the database: ', car)

            
        // }
        public async pushCars(createCarDto: { name: string; color: string }) {
            // Send message to Kafka producer
            await this.kafkaService.sendMessage('car-topic', createCarDto);
        
            console.log('Car data pushed to Kafka: ', createCarDto);
          }
       public updateCars()
        {
            return CARS;
        }
       public deleteCars()
        {
            return CARS;
        }
}
// import { Injectable, Inject } from '@nestjs/common';
// import { Pool } from 'mysql2/promise'; // Import Pool type

// @Injectable()
// export class CarService {
//   constructor(@Inject('DATABASE_POOL') private pool: Pool) {}

//   public async pushCars(createCarDto: { name: string; color: string }) {
//     const connection = await this.pool.getConnection();
//     try {
//       const car: typeof cars.$inferInsert = {
//         name: createCarDto.name,
//         color: createCarDto.color,
//       };
//       await connection.query('INSERT INTO cars SET ?', car);
//       console.log('Sent car details to DB: ', car);
//     } finally {
//       connection.release(); // Always release the connection back to the pool
//     }
//   }
// }
