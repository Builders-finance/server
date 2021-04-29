import { Request, Response } from "express";
import { container } from 'tsyringe';
import CreateTransactionService from "../services/CreateTransactionService";
import ListTransactionService from "../services/LIstTransactionsService";

export default class TransactionsController {

  public async create(request: Request, response: Response): Promise<Response>  {
    const transaction = request.body;

    const createTransaction = container.resolve(CreateTransactionService);
    const transactionCreated = await createTransaction.execute(transaction);

    return response.json(transactionCreated);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listTransaction = container.resolve(ListTransactionService);

    const execListTransaction = await listTransaction.execute();

    return response.json(execListTransaction);
  }

}
