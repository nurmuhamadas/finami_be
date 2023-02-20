exports.up = (pgm) => {
  pgm.sql(`INSERT INTO currencies VALUES
          ('currency-1', 'United States Dollar', 'USD', '$'),
          ('currency-2', 'Indonesia Rupiah', 'IDR', 'Rp'),
          ('currency-3', 'China Yuan Renminbi', 'CNY', '¥');
        `)
}

exports.down = (pgm) => {
  pgm.sql('TRUNCATE TABLE currencies CASCADE')
}
