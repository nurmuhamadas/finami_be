exports.up = (pgm) => {
  pgm.createTable('transactions', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    descriptions: {
      type: 'TEXT',
      notNull: true,
    },
    amount: {
      type: 'NUMERIC',
    },
    transaction_type: {
      type: 'VARCHAR(20)',
      notNull: true,
      check: `transaction_type = 'in' OR transaction_type = 'out'`,
    },
    date: {
      type: 'timestamp',
      notNull: true,
    },
    image_url: {
      type: 'TEXT',
    },
    user_id: {
      type: 'VARCHAR(20)',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    wallet_id: {
      type: 'VARCHAR(20)',
      notNull: true,
      references: 'wallets(id)',
      onDelete: 'CASCADE',
    },
    category_id: {
      type: 'VARCHAR(20)',
      notNull: true,
      references: 'categories(id)',
      onDelete: 'CASCADE',
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
  pgm.dropTable('transactions')
}
