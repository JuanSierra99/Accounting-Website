import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BillService } from './Bills.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('bills')
export class BillController {
  constructor(private readonly service: BillService) {}
  // Route guard to ensure the user is authenticated using jwt before accessing the route
  @UseGuards(AuthGuard('jwt'))
  @Get()
  // Method to list all bills for the authenticated user
  // The user's ID is extracted from the request object, which is populated by the JWT strategy after successful authentication
  listBills(@Request() req) {
    return this.service.listBills(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  // Method to get a specific bill by its ID for the authenticated user
  // Uses ParseIntPipe to automatically validate and transform the 'id' parameter to a number
  getBillById(@Request() req, @Param('id', ParseIntPipe) id: number) {
    return this.service.getBillById(req.user.userId, id);
  }
}
