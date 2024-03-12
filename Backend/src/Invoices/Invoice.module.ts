import { Module } from '@nestjs/common';
import { InvoiceController } from './Invoice.controller';
import { InvoiceService } from './Invoice.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [],
  controllers: [InvoiceController],
  providers: [InvoiceService, PrismaService],
})
export class InvoiceModule {}
