import 'dart:io';

var expenses = 0.0;
var currentBalance = 0.0;

void main() {
  // print(calculateBalanceAfterExpenses(10, 5));
  try {
    print("Enter your current balance: ");
    currentBalance = double.parse(stdin.readLineSync()!);
    print("Enter your expenses: ");
    expenses = double.parse(stdin.readLineSync()!);
    print("Your balance after expenses is: ${calculateBalanceAfterExpenses(currentBalance, expenses)}");
    
  } catch (e) {
    print("Error: Please enter valid numbers only. $e");
  }
}

calculateBalanceAfterExpenses(currentBalance, expenses) {

    if (currentBalance < 0 || expenses < 0) {
      throw Exception("Negative values are not allowed.");
    }
    return currentBalance - expenses;

}

