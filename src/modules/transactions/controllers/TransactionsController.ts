import BaseController from "@shared/http/BaseController";
import { Request, Response } from "express";
import { container } from 'tsyringe';
import CreateTransactionService from "../services/CreateTransactionService";
import ListTransactionsByRevExpService from "../services/LIstTransactionsByRevExpService";
import ListTransactionService from "../services/LIstTransactionsService";
import ShowTransactionsService from "../services/ShowTransactionsService";

export default class TransactionsController extends BaseController {

  public async create(request: Request, response: Response): Promise<Response>  {
    const transaction = request.body;
    transaction.user_id = response.locals.user;
    const createTransaction = container.resolve(CreateTransactionService);
    const transactionCreated = await createTransaction.execute(transaction);

    return response.json(super.customResponse(transactionCreated));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const userId = response.locals.user;
    const listTransaction = container.resolve(ListTransactionService);
    let filter = Object.assign({
      userId
    }, request.query);

    const execListTransaction = await listTransaction.execute(filter, {page: request.query.page, limit: 30});

    return response.json(super.customResponse(execListTransaction));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showTransactions = container.resolve(ShowTransactionsService);

    const transaction = await showTransactions.execute({ id });

    return response.json(super.customResponse(transaction));
  }

  public async transactionsByRevExp(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userId = response.locals.user;
    const listTransactionsByRevExp = container.resolve(ListTransactionsByRevExpService);

    const transaction = await listTransactionsByRevExp.execute(id, userId);

    return response.json(super.customResponse(transaction));
  }

}
