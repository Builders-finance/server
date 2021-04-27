import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import TransactionsController from '../controllers/TransactionsController';
import PaymentType from '../typeorm/enums/TransactionPaymentTypeEnum';
import PaymentStatus from '../typeorm/enums/TransactionPaymentStatusEnum';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      description: Joi.string(),
      rev_exp_id: Joi.string().uuid().required(),
      user_id: Joi.string().uuid().required(),
      valor: Joi.number().required(),
      forma_pagamento: Joi.string().required().valid(PaymentType.cash, PaymentType.credit, PaymentType.debit, PaymentType.pix),
      status_pagamento: Joi.string().required().valid(PaymentStatus.paid, PaymentStatus.unpaid, PaymentStatus.partial),
      data: Joi.date().iso().required()
    })
  }, {
    abortEarly: false
  }),
  transactionsController.create
  );

export default transactionsRouter;
