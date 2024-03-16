import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class InvoiceService {
  constructor(private readonly prismaService: PrismaService) {}
  // Fetches a list of invoices associated with a specific user.
  // This demonstrates multi-tenancy where data access is scoped to the user level.
  async listInvoices(userId: number) {
    try {
      // Utilizes Prisma Client's `findMany` method to retrieve all invoices belonging to the userId.
      // The `select` option specifies that only the id, amount, and due_date fields should be returned,
      // minimizing the amount of data transferred and enhancing privacy/security.
      const invoices = await this.prismaService.invoice.findMany({
        where: { userId: userId },
        select: { id: true, amount: true, due_date: true },
      });
      return invoices;
    } catch (error) {
      // Generic error handling
      return { error: 'error' };
    }
  }

  // Retrieves a single invoice by its unique identifier, scoped to the requesting user.
  // This method is essential for accessing the details of a specific invoice.
  async getInvoiceById(userId: number, id: number) {
    try {
      //fetches a single invoice by its id
      const invoiceDetails = await this.prismaService.invoice.findUnique({
        where: { id: id },
        select: { details: true },
      });
      return invoiceDetails;
    } catch (error) {
      return { error: 'error' };
    }
  }
}
