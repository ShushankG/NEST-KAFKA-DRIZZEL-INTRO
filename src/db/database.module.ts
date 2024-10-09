//---------------------------------------------------------------------------------------------------------------------
// NOT USING NEED TO UNDERSTAND POOL CONCEPT

// import { Module } from '@nestjs/common';
// import { createPool } from 'mysql2/promise';

// const pool = createPool({
//   host: 'localhost',
//   user: 'root',
//   password: 'Khem@123',
//   database: 'drizzel_db',
//   waitForConnections: true,
//   connectionLimit: 1000, // Adjust based on your needs
//   queueLimit: 0,
// });

// @Module({
//   providers: [
//     {
//       provide: 'DATABASE_POOL',
//       useValue: pool,
//     },
//   ],
//   exports: ['DATABASE_POOL'], // Export the pool for use in other modules
// })
// export class DatabaseModule {}
//---------------------------------------------------------------------------------------------------------------------
// NOT USING NEED TO UNDERSTAND POOL CONCEPT