# 🛒 Grocery Tracker

A simple, clean, and intuitive web application to help you stay within your grocery budget and track your spending in real-time.

## 🤔 Why I Built This

Like most people, I find it incredibly challenging to stick to my grocery budget. I often end up spending more than I planned, and it's such a hassle to pull out my phone and use the calculator every time I want to check if I've gone over my budget.

I thought to myself: *"Why not build an app that makes my life easier?"*

This Grocery Tracker was born out of that frustration. Now I can:
- Set my budget before shopping
- Add items with their prices as I shop
- Get real-time feedback on my spending
- Receive clear warnings when I'm about to exceed my budget

No more awkward calculator sessions in the grocery aisle!

Here's the deployment link if you want to try: [https://grocery-calculator-gamma.vercel.app](https://grocery-calculator-gamma.vercel.app/)

## ✨ Features

- **📊 Budget Management** - Set and edit your grocery budget easily
- **➕ Item Tracking** - Add items with prices and quantities
- **📈 Real-time Budget Tracking** - Visual progress bar showing budget usage
- **⚠️ Over-budget Warnings** - Clear alerts when you exceed your budget
- **✏️ Edit & Delete** - Modify or remove items as needed
- **🔄 Reset Functionality** - Start fresh with a clean slate
- **📱 Responsive Design** - Works perfectly on mobile and desktop
- **🎨 Clean UI** - Modern and intuitive interface

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Heroicons](https://heroicons.com/)

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/grocery-tracker.git
   cd grocery-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

### Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## 📁 Project Structure

```
grocery-tracker/
├── app/
│   ├── layout.tsx          # Root layout with font configuration
│   ├── page.tsx            # Main grocery tracker page
│   └── globals.css         # Global styles
├── components/
│   ├── AddItemForm.tsx     # Form to add grocery items
│   ├── BudgetInput.tsx     # Budget setting component
│   ├── BudgetTracker.tsx   # Budget overview and progress
│   ├── ConfirmationModal.tsx # Reusable confirmation dialog
│   ├── GroceryList.tsx     # List of grocery items
│   └── OverBudgetWarning.tsx # Over-budget alert
├── types/
│   └── grocery.ts          # TypeScript interfaces
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Project dependencies
```

## 🎯 How to Use

1. **Set Your Budget** - Enter your total grocery budget for the shopping trip
2. **Add Items** - As you shop, add items with their names, prices, and quantities  
3. **Track Progress** - Watch the real-time budget tracker and progress bar
4. **Stay Informed** - Get warnings if you're approaching or exceeding your budget
5. **Make Adjustments** - Edit or remove items as needed to stay within budget
6. **Reset When Done** - Clear everything for your next shopping trip

## 🤝 Contributing

This is a personal project, but if you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**Happy Grocery Shopping! 🛒✨**

*Made with ❤️ to solve a real-world problem*
