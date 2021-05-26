
import Transaction from '../../../../modules/transactions/typeorm/entities/Transaction';
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity('rev_exp')
class RevExp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  icon: string;

  @Column({nullable: true})
  rev_exp_id: string;

  @Column({nullable: true})
  user_id: string;

  @Column('int', {default: 1})
  status: number = 1;

  @Column('int')
  rec_des: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(type => Transaction, transaction => transaction.revExp)
  transactions: Transaction[];

  @ManyToOne(type => RevExp)
  @JoinColumn({  name: "rev_exp_id", referencedColumnName: "id" })
  revExpChild: RevExp;

}

export default RevExp;
