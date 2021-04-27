import PaymentType from '../enums/TransactionPaymentTypeEnum';
import RevExp from '../../../../modules/rev_exp/typeorm/entities/RevExp';
import User from '../../../../modules/users/typeorm/entities/User';
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';


@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rev_exp_id: string;

  @Column()
  user_id: string;

  @Column()
  forma_pagamento: string;

  @Column()
  status_pagamento: string;

  @Column()
  valor: number;

  @Column('int', {default: 1})
  status: number = 1;

  @Column({nullable: true})
  description: string;

  @Column()
  data: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(type => User, user => user.transactions)
  user: User;

  @ManyToOne(type => RevExp, revExp => revExp.transactions)
  revExp: RevExp;

}

export default Transaction;
