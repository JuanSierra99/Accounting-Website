import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './Invoices/Invoice.module';
import { BillModule } from './Bills/Bills.module';
import { AuthenticationModule } from './Authentication/Authentication.module';

@Module({
  imports: [InvoiceModule, BillModule, AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
