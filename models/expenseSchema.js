import mongoose from 'mongoose';

const { Schema } = mongoose;

const expenseSchema = new Schema({
    amount: { type: Number, required: true },
    category: { type: String, required: true },
  });

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;