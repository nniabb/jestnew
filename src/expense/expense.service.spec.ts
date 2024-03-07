import { Test, TestingModule } from '@nestjs/testing';
import { ExpenseService } from './expense.service';
import { Model } from 'mongoose';
import { Expense } from './entities/expense.entity';
import { getModelToken } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common';


describe('ExpenseService', () => {
  let expenseService: ExpenseService;
  let expenseModel: Model<Expense>;
  const mockExpenseModel = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseService, {
        provide: getModelToken(Expense.name),
        useValue: mockExpenseModel,

      }],
    }).compile();

    expenseService = module.get<ExpenseService>(ExpenseService);
    expenseModel = module.get<Model<Expense>>(getModelToken(Expense.name))
  });

  describe('create', () => {
    it('should throw an error if name contains numbers', async () => {
      const createExpenseDto = {id: "1", name: "expense123", cost: 100}
      await expect (expenseService.create(createExpenseDto)).rejects.toThrowError("name should now contain numbers")
    })
  })

  describe('findOne', () => {
    it('should throw an error if id does not exist', async () => {
      jest.spyOn(expenseModel, 'findById').mockResolvedValueOnce(null)
      const findOnePromise = expenseService.findOne('1')
      await expect(findOnePromise).rejects.toThrowError(NotFoundException)
    })
  })

  describe('remove', () => {
    it('should throw an error if id does not exist', async () => {
      jest.spyOn(expenseModel, 'findByIdAndDelete').mockResolvedValueOnce(null);
      const removePromise = expenseService.remove('1');
      await expect(removePromise).rejects.toThrowError(NotFoundException);
    });
  });
});

