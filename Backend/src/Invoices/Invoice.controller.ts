import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { InvoiceService } from './Invoice.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('invoices')
export class InvoiceController {
  constructor(private readonly service: InvoiceService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  listInvoices(@Request() req) {
    return this.service.listInvoices(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt')) // protect the route
  @Get(':id')
  getInvoiceById(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.service.getInvoiceById(req.user.userId, id);
  }
}
