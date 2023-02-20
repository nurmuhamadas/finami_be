exports.up = (pgm) => {
  pgm.createTable('wallets', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    balance: {
      type: 'NUMERIC',
    },
    user_id: {
      type: 'VARCHAR(20)',
      notNull: true,
      references: 'users(id)',
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
  pgm.dropTable('wallets')
}
