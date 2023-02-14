exports.up = (pgm) => {
  pgm.createTable('settings', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(20)',
      notNull: true,
      references: 'users(id)',
      onDelete: 'CASCADE',
    },
    currency_id: {
      type: 'VARCHAR(20)',
      notNull: true,
      references: 'currencies(id)',
      onDelete: 'SET NULL',
    },
    date_format: {
      type: 'VARCHAR(10)',
      notNull: true,
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
  pgm.dropTable('settings')
}
