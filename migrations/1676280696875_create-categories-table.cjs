exports.up = (pgm) => {
  pgm.createTable('categories', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    icon_url: {
      type: 'TEXT',
    },
    user_id: {
      type: 'VARCHAR(20)',
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    transaction_type: {
      type: 'VARCHAR(5)',
      notNull: true,
      check: `transaction_type = 'in' OR transaction_type = 'out'`,
    },
    group: {
      type: 'VARCHAR(50)',
      notNull: true,
      // check: `group = 'Required Expense' OR group = 'Irregular Expense' OR group = 'Invensting and Debt Payment' OR group = 'Fun and Relax' OR group = 'Income'`,
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    deleted_at: {
      type: 'timestamp',
    },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('categories')
}
