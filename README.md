# Fintrack

Fintrack is a modern expense-sharing application inspired by features similar to Splitwise. It allows users to manage shared expenses, track balances, and settle debts seamlessly. The application is built with a focus on simplicity, speed, and scalability.

## Features

- **Expense Tracking**: Add, edit, and delete shared expenses.
- **Group Management**: Create and manage groups for shared expenses.
- **Balance Calculation**: Automatically calculate who owes whom.
- **Expense Splitting**: Split expenses equally or customize the split.
- **Debt Settlement**: Record payments to settle debts.
- **User Authentication**: Secure login and signup functionality.
- **Real-time Updates**: Changes are reflected instantly across all users.

## Tech Stack

- **Frontend**: React
- **Backend**: FastAPI
- **Database**: PostgreSQL (hosted on Supabase)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/fintrack.git
   cd fintrack
   ```

2. Install dependencies for the frontend and backend:

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   pip install -r requirements.txt
   ```

3. Set up the database on Supabase and configure environment variables.

4. Run the application:

   ```bash
   # Frontend
   cd frontend
   npm start

   # Backend
   cd ../backend
   uvicorn main:app --reload
   ```

## TODO

- [ ] Set up project structure for React frontend.
- [ ] Build FastAPI backend with basic endpoints.
- [ ] Configure Supabase PostgreSQL database.
- [ ] Implement user authentication.
- [ ] Create expense tracking functionality.
- [ ] Add group management features.
- [ ] Enable real-time updates.
- [ ] Test and deploy the application.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

# Backend

Make sure to add a ".env" file where to put the following secrets.

1. DATABASE_URL
