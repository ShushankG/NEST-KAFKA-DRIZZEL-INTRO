// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { Kafka, Consumer } from 'kafkajs';
// import { drizzle } from 'drizzle-orm/connect';
// import { cars } from 'src/db/schema';

// @Injectable()
// export class KafkaService implements OnModuleInit {
//   private kafka: Kafka;
//   private producer: any;
//   private consumer: Consumer;

//   constructor() {
//     this.kafka = new Kafka({
//       clientId: 'car-app',
//       brokers: ['localhost:9092'], // Your Kafka broker
//     });
//   }

//   async onModuleInit() {
// //This is producer
//     this.producer = this.kafka.producer();
//     await this.producer.connect();
// //This is consumer that will take message from topic and add them to db
//     this.consumer = this.kafka.consumer({ groupId: 'car-group' });
//     await this.consumer.connect();
//     await this.consumer.subscribe({ topic: 'car-topic', fromBeginning: true });

//     this.consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         const carData = JSON.parse(message.value.toString());
//         console.log('Consumed car data:', carData);

//         // Insert the car data into the database
//         const db = await drizzle("mysql2", process.env.DATABASE_URL!);
//         const car: typeof cars.$inferInsert = {
//             name: carData.name,
//             color: carData.color,
//         };
//         await db.insert(cars).values(car);
//         console.log('Car data inserted into DB: ', car);
//       },
//     });
//   }

//   async sendMessage(topic: string, message: any) {
//     await this.producer.send({
//       topic,
//       messages: [{ value: JSON.stringify(message) }],
//     });
//   }
// }

//Below is batch posting of data to avoid node heap memory storage issue:

import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { drizzle } from 'drizzle-orm/connect';
import { cars } from 'src/db/schema';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private producer: any;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'car-app',
      brokers: ['localhost:9092'], // Your Kafka broker
    });
  }

  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();

    this.consumer = this.kafka.consumer({ groupId: 'car-group' });
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'car-topic', fromBeginning: true });

    await this.consumer.run({
      eachBatch: async ({ batch }) => {
        const carDataBatch = batch.messages.map((message) => JSON.parse(message.value.toString()));
        console.log('Consumed car data batch:', carDataBatch);

        // Insert the car data into the database in batch
        const db = await drizzle('mysql2', process.env.DATABASE_URL!);

        // Map batch of car data to be inserted
        const carBatch: typeof cars.$inferInsert[] = carDataBatch.map(carData => ({
          name: carData.name,
          color: carData.color,
        }));

        // Insert batch into the database
        await db.insert(cars).values(carBatch);
        console.log('Batch of car data inserted into DB: ', carBatch);
      },
    });
  }

  async sendMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  }
}
