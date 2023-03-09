exports.up = (pgm) => {
  pgm.sql(`INSERT INTO categories VALUES
           ('category-00000000001', 'Food and Beverage', 'https://i.ibb.co/rdqT4BG/food.png', null, 'out', 'Required Expense', NOW(), NOW(), null), 
           ('category-00000000002', 'Transportation', 'https://i.ibb.co/ZTsd9DN/car.png', null, 'out', 'Required Expense', NOW(), NOW(), null), 
           ('category-00000000003', 'Other Bills', 'https://i.ibb.co/p42zFvt/taxes.png', null, 'out', 'Required Expense', NOW(), NOW(), null), 
           ('category-00000000004', 'Home Maintenance', 'https://i.ibb.co/WpMFrmx/home.png', null, 'out', 'Irregular Expense', NOW(), NOW(), null), 
           ('category-00000000005', 'Education', 'https://i.ibb.co/X4hQ4F9/educational-video.png', null, 'out', 'Irregular Expense', NOW(), NOW(), null), 
           ('category-00000000006', 'Personal Items', 'https://i.ibb.co/dPynBNS/phone-login.png', null, 'out', 'Irregular Expense', NOW(), NOW(), null), 
           ('category-00000000007', 'Medical Check Up', 'https://i.ibb.co/q1zyRmJ/medical.png', null, 'out', 'Irregular Expense', NOW(), NOW(), null), 
           ('category-00000000008', 'Investment', 'https://i.ibb.co/4jnMrRC/investment.png', null, 'out', 'Investing and Debt Payment', NOW(), NOW(), null), 
           ('category-00000000009', 'Debt', 'https://i.ibb.co/WPJBCTp/debt-bomb.png', null, 'in', 'Investing and Debt Payment', NOW(), NOW(), null), 
           ('category-00000000010', 'Loan', 'https://i.ibb.co/hYRQhLS/loan.png', null, 'out', 'Investing and Debt Payment', NOW(), NOW(), null), 
           ('category-00000000011', 'Gift and Donations', 'https://i.ibb.co/bLgGthr/gift.png', null, 'out', 'Fun and Relax', NOW(), NOW(), null), 
           ('category-00000000012', 'Fun Money', 'https://i.ibb.co/jHF8pGZ/game-console.png', null, 'out', 'Fun and Relax', NOW(), NOW(), null),
           ('category-00000000013', 'Salary', 'https://i.ibb.co/WnGvdbS/money.png', null, 'in', 'Income', NOW(), NOW(), null),
           ('category-00000000014', 'Other Income', 'https://i.ibb.co/F361pgL/income.png', null, 'in', 'Income', NOW(), NOW(), null)
          `)
}

exports.down = (pgm) => {
  pgm.sql('TRUNCATE TABLE categories CASCADE')
}
