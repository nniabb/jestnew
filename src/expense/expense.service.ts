import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';


@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name) private readonly expenseModel: Model<Expense>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const expense = new this.expenseModel(createExpenseDto)
    const savedExpense = await expense.save()
    return savedExpense;
  }

  async findAll(): Promise<Expense[]> {
    const expenses = await this.expenseModel.find()
    return expenses;
  }

  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id)
    if (!expense) {
      throw new NotFoundException('not found')
    }
    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    const updatedExpense = await this.expenseModel
      .findByIdAndUpdate(id, updateExpenseDto, { new: true })
    if (!updatedExpense) {
      throw new NotFoundException('not found')
    }
    return updatedExpense;
  }

  async remove(id: string): Promise<Expense> {
    const deletedExpense = await this.expenseModel.findByIdAndDelete(id)
    if (!deletedExpense) {
      throw new NotFoundException('Expense not found')
    }
    return deletedExpense;
  }
}

