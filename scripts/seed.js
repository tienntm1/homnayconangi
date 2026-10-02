const { Pool } = require('pg');

const connectionString = 'postgresql://user_c11d1ed51ee0:Dl9wAeFWNE_4x86x5dIbuEOhdG6ueMcD@vibe.tinhgon.xyz:30005/postgresql_instance';

const pool = new Pool({
  connectionString,
  ssl: false
});

const generateId = () => Math.random().toString(36).substring(2, 15);

const meals = [
  {
    title: 'Cháo cá lóc khoai lang',
    age_group: '01. Từ 6-8 tháng',
    ingredients: 'Gạo tẻ, cá lóc phi lê, khoai lang, dầu olive.',
    benefits: 'Giúp bé tăng cân nhanh, phát triển trí não nhờ hàm lượng DHA cao từ cá lóc và vitamin A từ khoai lang giúp sáng mắt.',
    instructions: '1. Nấu cháo chín nhừ.\n2. Cá lóc hấp chín, gỡ xương rỉa tơi.\n3. Khoai lang hấp chín, nghiền nhuyễn.\n4. Trộn cá và khoai vào cháo, đun sôi lại, tắt bếp thêm dầu olive.'
  },
  {
    title: 'Súp bí đỏ thịt băm',
    age_group: '01. Từ 6-8 tháng',
    ingredients: 'Bí đỏ, thịt heo nạc băm, nước cốt gà, bơ nhạt.',
    benefits: 'Tốt cho hệ tiêu hóa, tăng cường miễn dịch tự nhiên, bổ sung vitamin C và beta-carotene.',
    instructions: '1. Bí đỏ thái nhỏ hấp chín, xay nhuyễn.\n2. Thịt băm xào sơ với chút bơ nhạt.\n3. Cho bí đỏ và thịt băm vào nồi nước dùng đun sôi, khuấy đều.'
  },
  {
    title: 'Cháo yến mạch thịt bò và cà rốt',
    age_group: '02. Từ 9-12 tháng',
    ingredients: 'Yến mạch, thịt bò thăn, cà rốt, hành khô, dầu ăn dặm.',
    benefits: 'Bổ sung lượng lớn chất sắt giúp phòng ngừa thiếu máu, tăng cường phát triển cơ bắp và thể chất toàn diện.',
    instructions: '1. Ngâm yến mạch 15 phút.\n2. Thịt bò và cà rốt xay nhỏ.\n3. Phi hành thơm, xào thịt bò cà rốt.\n4. Đun yến mạch với nước cho nở mềm, thêm thịt bò xào vào đảo đều 3 phút.'
  },
  {
    title: 'Cơm nát cá hồi sốt cam',
    age_group: '03. Từ 1-3 tuổi',
    ingredients: 'Cơm nát, cá hồi phi lê, nước cốt cam tươi, bột bắp, bơ nhạt.',
    benefits: 'Cung cấp canxi và omega-3 giúp phát triển chiều cao vượt trội, kích thích IQ và khả năng ghi nhớ của trẻ.',
    instructions: '1. Áp chảo cá hồi với bơ cho chín tới.\n2. Đun nước cốt cam với chút bột bắp tạo độ sánh.\n3. Rưới nước sốt cam lên cá hồi, ăn kèm cơm nát.'
  },
  {
    title: 'Canh rau ngót tôm nõn',
    age_group: '03. Từ 1-3 tuổi',
    ingredients: 'Rau ngót, tôm nõn tươi, hành khô, nước mắm trẻ em.',
    benefits: 'Thanh nhiệt cơ thể, chống táo bón hiệu quả, giàu canxi từ tôm giúp xương chắc khỏe.',
    instructions: '1. Tôm bóc vỏ băm nhuyễn.\n2. Rau ngót vò nát.\n3. Đun sôi nước, thả tôm vào đun chín, thêm rau ngót đun sôi 3 phút.'
  }
];

async function seed() {
  console.log('Connecting to PostgreSQL and preparing table...');
  
  await pool.query(`DROP TABLE IF EXISTS meals;`);
  await pool.query(`DROP TABLE IF EXISTS nutritious_meals;`);
  
  await pool.query(`
    CREATE TABLE nutritious_meals (
        id VARCHAR(50) PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        age_group VARCHAR(100) NOT NULL,
        ingredients TEXT NOT NULL,
        benefits TEXT NOT NULL,
        instructions TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('Inserting nutritious meals data...');

  for (const meal of meals) {
    await pool.query(`
      INSERT INTO nutritious_meals (id, title, age_group, ingredients, benefits, instructions)
      VALUES ($1, $2, $3, $4, $5, $6)
    `, [generateId(), meal.title, meal.age_group, meal.ingredients, meal.benefits, meal.instructions]);
  }

  console.log('Seeded database with nutritious meals successfully.');
  process.exit(0);
}

seed().catch(err => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
