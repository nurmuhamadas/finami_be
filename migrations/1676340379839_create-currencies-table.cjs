exports.up = (pgm) => {
  pgm.createTable('currencies', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    code: {
      type: 'VARCHAR(5)',
      notNull: true,
    },
    symbol: {
      type: 'VARCHAR(5)',
      notNull: true,
    },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('currencies')
}
