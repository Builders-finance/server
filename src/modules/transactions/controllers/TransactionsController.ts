import { Request, Response } from "express";
import { container } from 'tsyringe';
import CreateTransactionService from "../services/CreateTransactionService";
import ListTransactionService from "../services/LIstTransactionsService";
import ShowTransactionsService from "../services/ShowTransactionsService";

export default class TransactionsController {

  public async create(request: Request, response: Response): Promise<Response>  {
    const transaction = request.body;

    const createTransaction = container.resolve(CreateTransactionService);
    const transactionCreated = await createTransaction.execute(transaction);

    return response.json(transactionCreated);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const userId = response.locals.user;
    const listTransaction = container.resolve(ListTransactionService);

    const execListTransaction = await listTransaction.execute(userId);

    return response.json(execListTransaction);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTransactions = container.resolve(ShowTransactionsService);

    const transaction = await showTransactions.execute({ id });

    return response.json(transaction);
  }

}
