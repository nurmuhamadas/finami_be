exports.up = (pgm) => {
  pgm.createTable('plannings', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    amount: {
      type: 'NUMERIC',
    },
    month: {
      type: 'date',
      notNull: true,
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
  pgm.dropTable('plannings')
}
