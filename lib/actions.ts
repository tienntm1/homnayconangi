'use server';
import pool, { NutritiousMeal, HandbookArticle } from './db';

const defaultMeals = [
  // 6-8 months
  { id: 'm1', title: 'Cháo cá lóc khoai lang', age_group: '01. Từ 6-8 tháng', ingredients: 'Gạo tẻ, cá lóc phi lê, khoai lang, dầu olive.', benefits: 'Giúp bé tăng cân nhanh, phát triển trí não nhờ hàm lượng DHA cao từ cá lóc và vitamin A từ khoai lang giúp sáng mắt.', instructions: '1. Nấu cháo chín nhừ.\n2. Cá lóc hấp chín, gỡ xương rỉa tơi.\n3. Khoai lang hấp chín, nghiền nhuyễn.\n4. Trộn cá và khoai vào cháo, đun sôi lại, tắt bếp thêm dầu olive.' },
  { id: 'm2', title: 'Súp bí đỏ thịt băm', age_group: '01. Từ 6-8 tháng', ingredients: 'Bí đỏ, thịt heo nạc băm, nước cốt gà, bơ nhạt.', benefits: 'Tốt cho hệ tiêu hóa, tăng cường miễn dịch tự nhiên, bổ sung vitamin C và beta-carotene.', instructions: '1. Bí đỏ thái nhỏ hấp chín, xay nhuyễn.\n2. Thịt băm xào sơ với chút bơ nhạt.\n3. Cho bí đỏ và thịt băm vào nồi nước dùng đun sôi, khuấy đều.' },
  { id: 'm3', title: 'Cháo tôm bí xanh', age_group: '01. Từ 6-8 tháng', ingredients: 'Gạo tẻ, tôm tươi, bí xanh, dầu óc chó.', benefits: 'Cung cấp canxi từ tôm giúp xương chắc khỏe, bí xanh thanh mát giải nhiệt.', instructions: '1. Tôm bóc vỏ, bỏ chỉ lưng, băm nhuyễn.\n2. Bí xanh luộc chín, tán nhuyễn.\n3. Nấu cháo nhừ, cho tôm và bí xanh vào khuấy đều đến khi chín.' },
  { id: 'm4', title: 'Bơ nghiền sữa mẹ', age_group: '01. Từ 6-8 tháng', ingredients: '1/2 quả bơ chín, sữa mẹ hoặc sữa công thức.', benefits: 'Giàu chất béo tốt Omega-3, giúp trí não bé phát triển tối ưu.', instructions: '1. Lấy phần thịt bơ chín.\n2. Dùng nĩa nghiền nhuyễn hoặc rây mịn.\n3. Trộn thêm sữa mẹ đến độ đặc loãng phù hợp.' },
  
  // 9-12 months
  { id: 'm5', title: 'Cháo yến mạch thịt bò và cà rốt', age_group: '02. Từ 9-12 tháng', ingredients: 'Yến mạch, thịt bò thăn, cà rốt, hành khô, dầu ăn dặm.', benefits: 'Bổ sung lượng lớn chất sắt giúp phòng ngừa thiếu máu, tăng cường phát triển cơ bắp và thể chất toàn diện.', instructions: '1. Ngâm yến mạch 15 phút.\n2. Thịt bò và cà rốt xay nhỏ.\n3. Phi hành thơm, xào thịt bò cà rốt.\n4. Đun yến mạch với nước cho nở mềm, thêm thịt bò xào vào đảo đều 3 phút.' },
  { id: 'm6', title: 'Mì somen nấu cá hồi rau cải', age_group: '02. Từ 9-12 tháng', ingredients: 'Mì somen Nhật, cá hồi, rau cải ngọt, nước dùng dashi.', benefits: 'Đổi bữa cho bé biếng ăn cháo, cá hồi giàu Omega-3 phát triển võng mạc và não bộ.', instructions: '1. Luộc mì somen chín mềm, cắt khúc.\n2. Cá hồi hấp chín, dằm nát.\n3. Rau cải thái thật nhỏ.\n4. Đun nước dashi, cho cá, rau và mì vào nấu sôi.' },
  { id: 'm7', title: 'Cháo gà nấm hương', age_group: '02. Từ 9-12 tháng', ingredients: 'Thịt ức gà, nấm hương tươi, gạo tẻ, dầu hạt lanh.', benefits: 'Nấm hương chứa nhiều vitamin nhóm B và D giúp tăng cường đề kháng.', instructions: '1. Gà luộc xé nhỏ hoặc xay.\n2. Nấm hương ngâm nở, băm nhuyễn.\n3. Nấu cháo chín nhừ, cho gà và nấm vào đun sôi 5 phút.' },
  
  // 1-3 years
  { id: 'm8', title: 'Cơm nát cá hồi sốt cam', age_group: '03. Từ 1-3 tuổi', ingredients: 'Cơm nát, cá hồi phi lê, nước cốt cam tươi, bột bắp, bơ nhạt.', benefits: 'Cung cấp canxi và omega-3 giúp phát triển chiều cao vượt trội, kích thích IQ và khả năng ghi nhớ của trẻ.', instructions: '1. Áp chảo cá hồi với bơ cho chín tới.\n2. Đun nước cốt cam với chút bột bắp tạo độ sánh.\n3. Rưới nước sốt cam lên cá hồi, ăn kèm cơm nát.' },
  { id: 'm9', title: 'Canh rau ngót tôm nõn', age_group: '03. Từ 1-3 tuổi', ingredients: 'Rau ngót, tôm nõn tươi, hành khô, nước mắm trẻ em.', benefits: 'Thanh nhiệt cơ thể, chống táo bón hiệu quả, giàu canxi từ tôm giúp xương chắc khỏe.', instructions: '1. Tôm bóc vỏ băm nhuyễn.\n2. Rau ngót vò nát.\n3. Đun sôi nước, thả tôm vào đun chín, thêm rau ngót đun sôi 3 phút.' },
  { id: 'm10', title: 'Thịt viên sốt cà chua ngọt', age_group: '03. Từ 1-3 tuổi', ingredients: 'Thịt heo xay, mộc nhĩ, hành tây, cà chua, đường thốt nốt.', benefits: 'Cung cấp protein dồi dào, vitamin C từ cà chua giúp hấp thu sắt tốt hơn.', instructions: '1. Trộn thịt xay với mộc nhĩ, vò viên.\n2. Hấp chín viên thịt.\n3. Sốt cà chua với đường thốt nốt chua ngọt, thả thịt viên vào rim.' },
  { id: 'm11', title: 'Trứng cuộn rau củ phô mai', age_group: '03. Từ 1-3 tuổi', ingredients: 'Trứng gà ta, cà rốt thái hạt lựu siêu nhỏ, đậu lê, phô mai bào.', benefits: 'Phô mai giàu canxi và chất béo, trứng có choline rất tốt cho trí nhớ.', instructions: '1. Đánh tan trứng với rau củ.\n2. Cho vào chảo rán mỏng, rắc phô mai rồi cuộn tròn.\n3. Cắt khoanh vừa ăn.' }
];

const defaultArticles = [
  {
    id: 'a1',
    title: 'Lịch Tiêm Chủng Mở Rộng Tiêu Chuẩn Cho Bé 0-2 Tuổi',
    category: 'Sức Khoẻ & Y Tế',
    summary: 'Tổng hợp danh sách các mũi tiêm phòng bắt buộc và dịch vụ quan trọng mẹ cần ghi nhớ để bảo vệ bé khỏi các bệnh lây nhiễm.',
    icon: '💉',
    content: `Việc tiêm chủng đúng lịch giúp trẻ xây dựng hệ miễn dịch hoàn thiện. Dưới đây là các mốc quan trọng:
    
- **Sơ sinh**: Tiêm vắc xin viêm gan B (trong 24h đầu) và Lao (BCG).
- **2, 3, 4 tháng tuổi**: Vắc xin 6 trong 1 (Bạch hầu, ho gà, uốn ván, bại liệt, viêm gan B, Hib), uống Rotavirus.
- **6 tháng tuổi**: Cúm mùa (tiêm nhắc lại hàng năm).
- **9 tháng tuổi**: Sởi, Thủy đậu, Viêm màng não do não mô cầu BC.
- **12-15 tháng tuổi**: Sởi - Quai bị - Rubella (MMR), Viêm não Nhật Bản.
- **18-24 tháng tuổi**: Nhắc lại 6 trong 1, nhắc lại Sởi.

*Lưu ý: Mẹ nên có một cuốn sổ tiêm chủng để ghi chép và theo dõi sát sao lịch của con nhé!*`
  },
  {
    id: 'a2',
    title: 'Phương Pháp Luyện Ngủ EASY Xuyên Đêm (Xuyên Màn Đêm)',
    category: 'Giấc Ngủ & Sinh Hoạt',
    summary: 'Bí kíp giúp con tự ngủ ngoan, không cần bế ru, mẹ có thời gian nghỉ ngơi phục hồi sức khỏe.',
    icon: '😴',
    content: `E.A.S.Y là viết tắt của Eat (Ăn) - Activity (Chơi) - Sleep (Ngủ) - Your time (Thời gian của mẹ). Chu kỳ này lặp đi lặp lại trong ngày giúp bé có nếp sinh hoạt khoa học.

**Các bước luyện ngủ cơ bản:**
1. **Phân biệt ngày đêm**: Ban ngày mở rèm sáng, nói chuyện ồn ào. Ban đêm giữ phòng tối, yên tĩnh.
2. **Trình tự ngủ (Bedtime routine)**: Tắm nước ấm -> Massage -> Đọc truyện -> Hát ru -> Đặt vào nôi khi bé đang lơ mơ nhưng CHƯA ngủ hẳn.
3. **Môi trường lý tưởng**: Tiếng ồn trắng (White noise), nhiệt độ phòng 22-24 độ C, sử dụng nhộng chũn (swaddle).
4. **Quy tắc chờ đợi (Wait time)**: Khi bé khóc, mẹ đừng bế lên ngay. Hãy chờ 3-5 phút để xem bé có thể tự trấn an và ngủ lại không (Ngoại trừ bé đang đau hoặc tã ướt).`
  },
  {
    id: 'a3',
    title: 'Dấu Hiệu Bé Sẵn Sàng Ăn Dặm & Cách Bắt Đầu',
    category: 'Dinh Dưỡng',
    summary: 'Khi nào nên cho bé ăn dặm? Ăn dặm truyền thống, kiểu Nhật hay BLW là tốt nhất?',
    icon: '🥣',
    content: `WHO khuyến cáo mẹ nên cho bé bắt đầu ăn dặm khi tròn 6 tháng tuổi. Tuy nhiên, mẹ cần quan sát các biểu hiện sẵn sàng của con:
    
- Cổ bé đã cứng, có thể ngồi vững (khi được hỗ trợ).
- Bé mất phản xạ nhè lưỡi (phản xạ đẩy vật lạ ra khỏi miệng).
- Bé thể hiện sự thích thú với thức ăn của người lớn (nhìn chằm chằm, chóp chép miệng).

**Các phương pháp ăn dặm phổ biến:**
1. **Ăn dặm truyền thống**: Thức ăn xay nhuyễn, nấu chung thịt/rau/cháo. Giúp bé dễ lên cân nhưng hạn chế khả năng nhai.
2. **Ăn dặm kiểu Nhật**: Các món được chế biến riêng rẽ, không nêm gia vị, tôn trọng hương vị nguyên bản. Giúp bé nhận biết mùi vị tốt.
3. **Ăn dặm tự chỉ huy (BLW)**: Bé tự cầm nắm thức ăn thô ngay từ đầu, tự quyết định ăn gì và ăn bao nhiêu. Rèn luyện sự khéo léo nhưng thời gian đầu dễ bị ọe.`
  },
  {
    id: 'a4',
    title: 'Bảng Chiều Cao Cân Nặng Chuẩn Theo Tổ Chức Y Tế Thế Giới (WHO)',
    category: 'Sự Phát Triển',
    summary: 'Tra cứu nhanh xem bé có đang phát triển đạt chuẩn hay không để có sự điều chỉnh dinh dưỡng kịp thời.',
    icon: '📈',
    content: `Theo dõi biểu đồ tăng trưởng là cách tốt nhất để biết bé có khỏe mạnh không. 

**Bé trai (Trung bình):**
- Lúc sinh: 3.3kg - 49.9cm
- 6 tháng: 7.9kg - 67.6cm
- 12 tháng: 9.6kg - 75.7cm
- 2 tuổi: 12.2kg - 87.8cm

**Bé gái (Trung bình):**
- Lúc sinh: 3.2kg - 49.1cm
- 6 tháng: 7.3kg - 65.7cm
- 12 tháng: 8.9kg - 74.0cm
- 2 tuổi: 11.5kg - 86.4cm

*Sự dao động xung quanh mức trung bình là hoàn toàn bình thường. Điều quan trọng là bé phát triển đều đặn theo đường cong sinh trưởng của riêng mình, mẹ không nên so sánh con với các em bé khác.*`
  }
];

export async function initDbAndSeed() {
  try {
    // 1. Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS nutritious_meals (
          id VARCHAR(50) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          age_group VARCHAR(100) NOT NULL,
          ingredients TEXT NOT NULL,
          benefits TEXT NOT NULL,
          instructions TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS handbook_articles (
          id VARCHAR(50) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          summary TEXT NOT NULL,
          content TEXT NOT NULL,
          icon VARCHAR(10),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Seed meals
    const mealCount = await pool.query('SELECT COUNT(*) FROM nutritious_meals');
    if (parseInt(mealCount.rows[0].count) === 0) {
      console.log('Seeding meals...');
      for (const meal of defaultMeals) {
        await pool.query(`
          INSERT INTO nutritious_meals (id, title, age_group, ingredients, benefits, instructions)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [meal.id, meal.title, meal.age_group, meal.ingredients, meal.benefits, meal.instructions]);
      }
    }

    // 3. Seed articles
    const articleCount = await pool.query('SELECT COUNT(*) FROM handbook_articles');
    if (parseInt(articleCount.rows[0].count) === 0) {
      console.log('Seeding articles...');
      for (const article of defaultArticles) {
        await pool.query(`
          INSERT INTO handbook_articles (id, title, category, summary, content, icon)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [article.id, article.title, article.category, article.summary, article.content, article.icon]);
      }
    }
  } catch (error) {
    console.error("Error during auto-seeding:", error);
  }
}

export async function getAllMeals(): Promise<NutritiousMeal[]> {
  await initDbAndSeed();
  const result = await pool.query('SELECT * FROM nutritious_meals ORDER BY age_group, created_at DESC');
  return result.rows.map(row => ({
    ...row,
    created_at: new Date(row.created_at).toISOString(),
  })) as NutritiousMeal[];
}

export async function getMealById(id: string): Promise<NutritiousMeal | undefined> {
  await initDbAndSeed();
  const result = await pool.query('SELECT * FROM nutritious_meals WHERE id = $1', [id]);
  if (!result.rows[0]) return undefined;
  
  return {
    ...result.rows[0],
    created_at: new Date(result.rows[0].created_at).toISOString(),
  } as NutritiousMeal;
}

export async function getAllArticles(): Promise<HandbookArticle[]> {
  await initDbAndSeed();
  const result = await pool.query('SELECT * FROM handbook_articles ORDER BY created_at ASC');
  return result.rows.map(row => ({
    ...row,
    created_at: new Date(row.created_at).toISOString(),
  })) as HandbookArticle[];
}

export async function getArticleById(id: string): Promise<HandbookArticle | undefined> {
  await initDbAndSeed();
  const result = await pool.query('SELECT * FROM handbook_articles WHERE id = $1', [id]);
  if (!result.rows[0]) return undefined;
  
  return {
    ...result.rows[0],
    created_at: new Date(result.rows[0].created_at).toISOString(),
  } as HandbookArticle;
}
