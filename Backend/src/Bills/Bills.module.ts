import { Module } from '@nestjs/common';
import { BillController } from './Bills.controller';
import { BillService } from './Bills.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [BillController], // Registers BillController to handle incoming HTTP requests for the 'bills' route and its subroutes
  providers: [
    BillService, // Makes BillService available for dependency injection in BillModule, primarily used by BillController
    PrismaService, // PrismaService is also registered as a provider, indicating it's used within this module, likely by BillService for database operations
  ],
})
export class BillModule {}
