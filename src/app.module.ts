import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './expense/expense.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: 
    [MongooseModule.forRoot('mongodb+srv://niania:nia12345@cluster0.31mpgxd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    ,ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
