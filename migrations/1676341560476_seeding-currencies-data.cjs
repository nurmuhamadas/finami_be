exports.up = (pgm) => {
  pgm.sql(`INSERT INTO currencies VALUES
          ('currency-00000000001', 'United States Dollar', 'USD', '$'),
          ('currency-00000000002', 'Indonesia Rupiah', 'IDR', 'Rp'),
          ('currency-00000000003', 'China Yuan Renminbi', 'CNY', '¥');
        `)
}

exports.down = (pgm) => {
  pgm.sql('TRUNCATE TABLE currencies CASCADE')
}
