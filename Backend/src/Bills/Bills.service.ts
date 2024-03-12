import { Injectable, ParseIntPipe } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class BillService {
  constructor(private readonly prismaService: PrismaService) {}
  // Lists bills associated with a specific user.
  // This method leverages Prisma's `findMany` to query the database for bills that belong to the given `userId`.
  // It selectively returns only the id, amount, and due_date fields of each bill, enhancing performance and privacy.
  async listBills(userId: number) {
    try {
      const bills = this.prismaService.bill.findMany({
        where: { userId: userId },
        select: { id: true, amount: true, due_date: true },
      });
      return bills;
    } catch (error) {
      return { error: 'error' };
    }
  }

  // Retrieves a specific bill by its `id` for a given `userId`.
  // This method uses Prisma's `findUnique` to find a single bill that matches both `userId` and `id`.
  // Only the details field is selected to be returned, presumably containing information specific to the bill.
  async getBillById(userId: number, id: number) {
    try {
      const billDetails = await this.prismaService.bill.findUnique({
        where: { id: id },
        select: { details: true },
      });
      return billDetails;
    } catch (error) {
      return { error: 'error' };
    }
  }
}
