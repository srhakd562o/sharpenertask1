function handleFormSubmit(event) {
    event.preventDefault();

    const expenseAmount = document.getElementById('expenseAmount').value;
    const expenseDescription = document.getElementById('expenseDescription').value;
    const expenseCategory = document.getElementById('expenseCategory').value;

    const expense = {
        expenseAmount: expenseAmount,
        expenseDescription: expenseDescription,
        expenseCategory: expenseCategory,
    };

    saveExpense(expense);
    displayUserInfo(expense);
    clearForm();
}

function saveExpense(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function displayUserInfo(expense, index) {
    const parent1 = document.getElementById('listOfItems');
    const child1 = document.createElement('li');
    child1.textContent = `${expense.expenseAmount} - ${expense.expenseDescription} - ${expense.expenseCategory}`;
    
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger btn-sm ml-2';
    deleteButton.addEventListener('click', function() {
        deleteExpense(index);
    });

    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'btn btn-primary btn-sm ml-2';
    editButton.addEventListener('click', function() {
        editExpense(index);
    });

    // Append buttons to the list item
    child1.appendChild(deleteButton);
    child1.appendChild(editButton);

    // Append the list item to the list
    parent1.appendChild(child1);
}

function deleteExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    loadExpenses();
}

function editExpense(index) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const editedExpense = expenses[index];

    // Prompt the user to edit the expense details
    const updatedAmount = prompt('Edit Expense Amount:', editedExpense.expenseAmount);
    const updatedDescription = prompt('Edit Expense Description:', editedExpense.expenseDescription);
    const updatedCategory = prompt('Edit Expense Category:', editedExpense.expenseCategory);

    // Update the expense if valid inputs are provided
    if (updatedAmount !== null && updatedDescription !== null && updatedCategory !== null) {
        // Create a new expense object with updated values
        const updatedExpense = {
            expenseAmount: updatedAmount,
            expenseDescription: updatedDescription,
            expenseCategory: updatedCategory,
        };

        // Replace the old expense with the updated one
        expenses[index] = updatedExpense;

        // Save the updated expenses to local storage
        localStorage.setItem('expenses', JSON.stringify(expenses));

        // Reload the expenses
        loadExpenses();
    }
}


function loadExpenses() {
    const listOfItems = document.getElementById('listOfItems');
    listOfItems.innerHTML = '';

    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    expenses.forEach((expense, index) => {
        displayUserInfo(expense, index);
    });
}

function clearForm() {
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseDescription').value = '';
    document.getElementById('expenseCategory').value = '';
}

// Load expenses initially
loadExpenses();
