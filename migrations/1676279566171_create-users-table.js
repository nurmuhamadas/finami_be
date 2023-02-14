exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(20)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(30)',
      notNull: true,
      unique: true,
    },
    email: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    password: {
      type: 'TEXT',
      notNull: true,
    },
    fullname: {
      type: 'TEXT',
      notNull: true,
    },
    image_url: {
      type: 'TEXT',
    },
    parent_id: {
      type: 'VARCHAR(20)',
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
  pgm.dropTable('users')
}
