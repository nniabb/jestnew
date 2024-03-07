import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class Expense {
    @Prop({required: true, unique: true})
    id: string;

    @Prop()
    name: string;

    @Prop({required: true})
    cost: number;
}

export const ExpensesSchema = SchemaFactory.createForClass(Expense)