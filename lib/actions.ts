'use server';
import pool, { NutritiousMeal, HandbookArticle } from './db';

const defaultMeals = [
  // 6-8 months
  { id: 'm1', title: 'Cháo cá lóc khoai lang', age_group: '01. Từ 6-8 tháng', image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80', ingredients: 'Gạo tẻ, cá lóc phi lê, khoai lang, dầu olive.', benefits: 'Giúp bé tăng cân nhanh, phát triển trí não nhờ hàm lượng DHA cao từ cá lóc.', instructions: '1. Nấu cháo chín nhừ.\n2. Cá lóc hấp chín, gỡ xương rỉa tơi.\n3. Khoai lang hấp chín, nghiền nhuyễn.\n4. Trộn cá và khoai vào cháo.' },
  { id: 'm2', title: 'Súp bí đỏ thịt băm', age_group: '01. Từ 6-8 tháng', image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80', ingredients: 'Bí đỏ, thịt heo nạc băm, nước cốt gà, bơ nhạt.', benefits: 'Tốt cho hệ tiêu hóa, tăng cường miễn dịch tự nhiên.', instructions: '1. Bí đỏ thái nhỏ hấp chín, xay nhuyễn.\n2. Thịt băm xào sơ với bơ.\n3. Cho bí đỏ và thịt băm vào nồi nước dùng đun sôi.' },
  { id: 'm3', title: 'Cháo tôm bí xanh', age_group: '01. Từ 6-8 tháng', image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80', ingredients: 'Gạo tẻ, tôm tươi, bí xanh, dầu óc chó.', benefits: 'Cung cấp canxi từ tôm giúp xương chắc khỏe, bí xanh thanh mát giải nhiệt.', instructions: '1. Tôm bóc vỏ, bỏ chỉ lưng, băm nhuyễn.\n2. Bí xanh luộc chín, tán nhuyễn.\n3. Nấu cháo nhừ, cho tôm và bí xanh vào.' },
  { id: 'm4', title: 'Bơ nghiền sữa mẹ', age_group: '01. Từ 6-8 tháng', image_url: 'https://images.unsplash.com/photo-1601314117071-f6c18f3a8b41?w=800&q=80', ingredients: '1/2 quả bơ chín, sữa mẹ hoặc sữa công thức.', benefits: 'Giàu chất béo tốt Omega-3, giúp trí não bé phát triển tối ưu.', instructions: '1. Lấy phần thịt bơ chín.\n2. Dùng nĩa nghiền nhuyễn hoặc rây mịn.\n3. Trộn thêm sữa mẹ.' },
  { id: 'm5', title: 'Súp cà rốt táo tây', age_group: '01. Từ 6-8 tháng', image_url: 'https://images.unsplash.com/photo-1576020756312-d98c2538cbab?w=800&q=80', ingredients: 'Cà rốt, táo tây ngọt, sữa công thức.', benefits: 'Cung cấp nhiều vitamin A và chất xơ, hỗ trợ hệ miễn dịch và mắt sáng.', instructions: '1. Gọt vỏ, thái hạt lựu táo và cà rốt.\n2. Hấp chín mềm.\n3. Xay nhuyễn cùng một chút sữa.' },
  { id: 'm6', title: 'Cháo thịt bò rau ngót', age_group: '01. Từ 6-8 tháng', image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80', ingredients: 'Thịt bò xay nhuyễn, rau ngót, cháo trắng.', benefits: 'Giàu chất sắt, phòng ngừa thiếu máu cho trẻ ở giai đoạn bắt đầu ăn dặm.', instructions: '1. Nấu cháo trắng thật nhuyễn.\n2. Thịt bò và rau ngót xay mịn.\n3. Trộn vào cháo nấu sôi 5 phút.' },
  
  // 9-12 months
  { id: 'm7', title: 'Cháo yến mạch bò & cà rốt', age_group: '02. Từ 9-12 tháng', image_url: 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=800&q=80', ingredients: 'Yến mạch, thịt bò thăn, cà rốt, hành khô, dầu ăn dặm.', benefits: 'Bổ sung lượng lớn chất sắt giúp phòng ngừa thiếu máu.', instructions: '1. Ngâm yến mạch 15 phút.\n2. Thịt bò và cà rốt xay nhỏ.\n3. Phi hành thơm, xào thịt bò.\n4. Đun yến mạch nở mềm, thêm bò vào.' },
  { id: 'm8', title: 'Mì somen cá hồi rau cải', age_group: '02. Từ 9-12 tháng', image_url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80', ingredients: 'Mì somen Nhật, cá hồi, rau cải ngọt, nước dùng dashi.', benefits: 'Cá hồi giàu Omega-3 phát triển võng mạc và não bộ.', instructions: '1. Luộc mì somen chín mềm.\n2. Cá hồi hấp chín, dằm nát.\n3. Đun nước dashi, cho cá, rau và mì vào nấu sôi.' },
  { id: 'm9', title: 'Cháo gà nấm hương', age_group: '02. Từ 9-12 tháng', image_url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80', ingredients: 'Thịt ức gà, nấm hương tươi, gạo tẻ, dầu hạt lanh.', benefits: 'Nấm hương chứa nhiều vitamin nhóm B và D giúp tăng cường đề kháng.', instructions: '1. Gà luộc xé nhỏ hoặc xay.\n2. Nấm hương ngâm nở, băm nhuyễn.\n3. Nấu cháo chín nhừ, đun sôi 5 phút.' },
  { id: 'm10', title: 'Cơm nát cá lóc rim nước dừa', age_group: '02. Từ 9-12 tháng', image_url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80', ingredients: 'Cơm nấu nát, cá lóc phi lê, nước dừa tươi, xíu mắm trẻ em.', benefits: 'Giúp bé làm quen với cơm nát, rèn luyện kỹ năng nhai nuốt thô.', instructions: '1. Cá lóc thái miếng hạt lựu to.\n2. Rim cá với nước dừa tươi đến khi cạn nước.\n3. Cho bé ăn cùng cơm nát nhuyễn.' },
  { id: 'm11', title: 'Pancake chuối yến mạch', age_group: '02. Từ 9-12 tháng', image_url: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80', ingredients: 'Chuối chín, yến mạch, lòng đỏ trứng gà.', benefits: 'Món ăn tự chỉ huy (BLW) tuyệt vời, giàu năng lượng và kali.', instructions: '1. Dầm nát chuối, trộn cùng bột yến mạch và lòng đỏ trứng.\n2. Quét lớp bơ mỏng lên chảo chống dính.\n3. Áp chảo từng miếng nhỏ đến khi vàng đều 2 mặt.' },
  
  // 1-3 years
  { id: 'm12', title: 'Cơm nát cá hồi sốt cam', age_group: '03. Từ 1-3 tuổi', image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80', ingredients: 'Cơm nát, cá hồi phi lê, nước cốt cam tươi, bột bắp, bơ nhạt.', benefits: 'Cung cấp canxi và omega-3 giúp phát triển chiều cao vượt trội.', instructions: '1. Áp chảo cá hồi với bơ cho chín tới.\n2. Đun nước cốt cam với chút bột bắp tạo độ sánh.\n3. Rưới nước sốt cam lên cá hồi.' },
  { id: 'm13', title: 'Canh rau ngót tôm nõn', age_group: '03. Từ 1-3 tuổi', image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80', ingredients: 'Rau ngót, tôm nõn tươi, hành khô, nước mắm trẻ em.', benefits: 'Thanh nhiệt cơ thể, chống táo bón hiệu quả.', instructions: '1. Tôm bóc vỏ băm nhuyễn.\n2. Rau ngót vò nát.\n3. Đun sôi nước, thả tôm vào đun chín, thêm rau ngót.' },
  { id: 'm14', title: 'Thịt viên sốt cà chua ngọt', age_group: '03. Từ 1-3 tuổi', image_url: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80', ingredients: 'Thịt heo xay, mộc nhĩ, hành tây, cà chua, đường thốt nốt.', benefits: 'Cung cấp protein dồi dào, vitamin C từ cà chua giúp hấp thu sắt tốt hơn.', instructions: '1. Trộn thịt xay với mộc nhĩ, vò viên.\n2. Hấp chín viên thịt.\n3. Sốt cà chua với đường thốt nốt chua ngọt, thả thịt viên vào rim.' },
  { id: 'm15', title: 'Trứng cuộn rau củ phô mai', age_group: '03. Từ 1-3 tuổi', image_url: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&q=80', ingredients: 'Trứng gà ta, cà rốt thái lựu nhỏ, đậu lê, phô mai bào.', benefits: 'Phô mai giàu canxi và chất béo, trứng có choline rất tốt cho trí nhớ.', instructions: '1. Đánh tan trứng với rau củ.\n2. Cho vào chảo rán mỏng, rắc phô mai rồi cuộn tròn.\n3. Cắt khoanh vừa ăn.' },
  { id: 'm16', title: 'Măng tây xào thịt bò băm', age_group: '03. Từ 1-3 tuổi', image_url: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&q=80', ingredients: 'Măng tây non, thịt bò xay, tỏi, xíu dầu hào trẻ em.', benefits: 'Cung cấp nhiều chất xơ, axit folic rất tốt cho sự phát triển của hệ thần kinh.', instructions: '1. Măng tây lấy phần ngọn non, thái nhỏ.\n2. Phi tỏi thơm, xào nhanh thịt bò.\n3. Cho măng tây vào đảo nhanh tay, nêm vừa ăn.' }
];

const defaultArticles = [
  {
    id: 'a1', title: 'Lịch Tiêm Chủng Mở Rộng Tiêu Chuẩn Cho Bé 0-2 Tuổi', category: 'Sức Khoẻ & Y Tế', image_url: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?w=800&q=80', summary: 'Tổng hợp danh sách các mũi tiêm phòng bắt buộc và dịch vụ quan trọng mẹ cần ghi nhớ để bảo vệ bé khỏi các bệnh lây nhiễm.', icon: '💉',
    content: `Việc tiêm chủng đúng lịch giúp trẻ xây dựng hệ miễn dịch hoàn thiện. Dưới đây là các mốc quan trọng:
- **Sơ sinh**: Tiêm vắc xin viêm gan B (trong 24h đầu) và Lao (BCG).
- **2, 3, 4 tháng tuổi**: Vắc xin 6 trong 1, uống Rotavirus.
- **6 tháng tuổi**: Cúm mùa.
- **9 tháng tuổi**: Sởi, Thủy đậu, Viêm màng não.
- **12-15 tháng tuổi**: Sởi - Quai bị - Rubella (MMR), Viêm não Nhật Bản.
*Mẹ nhớ mang theo sổ tiêm chủng mỗi khi đưa con đi nhé!*`
  },
  {
    id: 'a2', title: 'Phương Pháp Luyện Ngủ EASY Xuyên Đêm', category: 'Giấc Ngủ', image_url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80', summary: 'Bí kíp giúp con tự ngủ ngoan, không cần bế ru, mẹ có thời gian nghỉ ngơi phục hồi sức khỏe.', icon: '😴',
    content: `E.A.S.Y là viết tắt của Eat (Ăn) - Activity (Chơi) - Sleep (Ngủ) - Your time (Thời gian của mẹ). 
**Các bước luyện ngủ cơ bản:**
1. **Phân biệt ngày đêm**: Ban ngày mở rèm sáng, nói chuyện ồn ào. Ban đêm giữ phòng tối.
2. **Trình tự ngủ (Bedtime routine)**: Tắm nước ấm -> Massage -> Hát ru -> Đặt vào nôi khi bé chưa ngủ hẳn.
3. **Môi trường**: Tiếng ồn trắng (White noise), dùng nhộng chũn.
4. **Chờ đợi (Wait time)**: Khi bé khóc, chờ 3-5 phút xem bé có tự ngủ lại không.`
  },
  {
    id: 'a3', title: 'Dấu Hiệu Bé Sẵn Sàng Ăn Dặm & Cách Bắt Đầu', category: 'Dinh Dưỡng', image_url: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80', summary: 'Khi nào nên cho bé ăn dặm? Ăn dặm truyền thống, kiểu Nhật hay BLW là tốt nhất?', icon: '🥣',
    content: `WHO khuyến cáo ăn dặm khi tròn 6 tháng tuổi.
**Biểu hiện sẵn sàng:**
- Cổ bé đã cứng, ngồi vững.
- Mất phản xạ nhè lưỡi.
- Nhìn chằm chằm người lớn ăn.
**Các phương pháp:**
1. Ăn dặm truyền thống: Xay nhuyễn, nấu chung.
2. Ăn dặm kiểu Nhật: Chế biến riêng rẽ từng món.
3. Ăn dặm tự chỉ huy (BLW): Bé tự cầm nắm thức ăn thô.`
  },
  {
    id: 'a4', title: 'Bảng Chiều Cao Cân Nặng Chuẩn Theo Tổ Chức Y Tế Thế Giới (WHO)', category: 'Sự Phát Triển', image_url: 'https://images.unsplash.com/photo-1502740479091-635887520276?w=800&q=80', summary: 'Tra cứu nhanh xem bé có đang phát triển đạt chuẩn hay không để có sự điều chỉnh dinh dưỡng kịp thời.', icon: '📈',
    content: `Theo dõi biểu đồ tăng trưởng là cách tốt nhất để biết bé có khỏe mạnh không. Dưới đây là bảng tiêu chuẩn của WHO:

### Bảng Chuẩn Bé Trai 👦
| Tháng tuổi | Cân nặng (kg) | Chiều cao (cm) |
|:---:|:---:|:---:|
| **Sơ sinh** | 3.3 | 49.9 |
| **6 tháng** | 7.9 | 67.6 |
| **12 tháng** | 9.6 | 75.7 |
| **2 tuổi** | 12.2 | 87.8 |
| **3 tuổi** | 14.3 | 96.1 |

### Bảng Chuẩn Bé Gái 👧
| Tháng tuổi | Cân nặng (kg) | Chiều cao (cm) |
|:---:|:---:|:---:|
| **Sơ sinh** | 3.2 | 49.1 |
| **6 tháng** | 7.3 | 65.7 |
| **12 tháng** | 8.9 | 74.0 |
| **2 tuổi** | 11.5 | 86.4 |
| **3 tuổi** | 13.9 | 95.1 |

> *Lưu ý: Sự dao động xung quanh mức trung bình (±10%) là hoàn toàn bình thường. Điều quan trọng là bé phát triển đều đặn theo đường cong sinh trưởng của riêng mình.*`
  },
  {
    id: 'a5', title: 'Hiểu Về Tuần Khủng Hoảng (Wonder Weeks)', category: 'Tâm Lý & Sinh Hoạt', image_url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80', summary: 'Tại sao tự nhiên em bé lại quấy khóc, biếng ăn, khó ngủ? Đó có thể là do Wonder Weeks.', icon: '🌪️',
    content: `Wonder Weeks là các giai đoạn phát triển nhảy vọt về tinh thần và trí não của trẻ.
**Biểu hiện của Wonder Weeks:**
- Khóc nhiều hơn bình thường (những đám mây đen).
- Bám mẹ không rời.
- Ngủ kém, hay giật mình, thức giấc đêm.
- Biếng ăn sinh lý.
**Cách mẹ đối phó:**
Hãy ôm ấp con nhiều hơn. Đây là lúc não con đang nâng cấp. Khi vượt qua mốc này, con sẽ học được rất nhiều kỹ năng mới như lẫy, bò, chỉ tay, nói...`
  },
  {
    id: 'a6', title: 'Chăm Sóc Răng Miệng Cho Bé Từ Khi Chưa Mọc Răng', category: 'Sức Khoẻ & Y Tế', image_url: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&q=80', summary: 'Nhiều mẹ nghĩ có răng mới cần đánh răng, nhưng thực tế việc vệ sinh nướu cần làm từ lúc sơ sinh.', icon: '🦷',
    content: `Việ vệ sinh miệng sớm giúp phòng ngừa nấm miệng và tạo thói quen tốt cho trẻ sau này.
**Từ 0-6 tháng (chưa mọc răng):**
Dùng gạc rơ lưỡi nhúng nước muối sinh lý ấm, lau nhẹ nhàng nướu và lưỡi bé mỗi ngày 1-2 lần.
**Khi có chiếc răng đầu tiên:**
Sử dụng bàn chải silicon mềm hoặc bàn chải xỏ ngón. Bắt đầu dùng kem đánh răng trẻ em (bằng hạt gạo).
**Khi trẻ 2-3 tuổi:**
Dạy trẻ tự chải răng ngày 2 lần. Biến việc đánh răng thành một trò chơi vui nhộn!`
  },
  {
    id: 'a7', title: 'Hướng Dẫn Mát-xa (Massage) Cho Bé Sơ Sinh', category: 'Chăm Sóc', image_url: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80', summary: 'Massage hàng ngày không chỉ giúp bé thư giãn, ngủ ngon mà còn tăng cường sự gắn kết mẫu tử.', icon: '💆',
    content: `Massage là ngôn ngữ yêu thương tuyệt vời nhất mẹ dành cho bé trong những tháng đầu đời.

**Lợi ích tuyệt vời:**
- Giúp bé thư giãn, giảm quấy khóc.
- Kích thích hệ tiêu hóa (đặc biệt các bài tập đạp xe giúp giảm đầy hơi, táo bón).
- Tăng cường tuần hoàn máu và hệ miễn dịch.

**Quy trình chuẩn bị:**
1. Phòng ấm áp (khoảng 25-27 độ C), yên tĩnh, có thể mở nhạc không lời nhẹ nhàng.
2. Mẹ tháo trang sức, cắt ngắn móng tay, rửa tay sạch và xoa ấm tay.
3. Sử dụng dầu massage chuyên dụng cho em bé (như dầu hướng dương, dầu dừa hữu cơ).

**Các bước cơ bản:**
- **Chân & Tay**: Vuốt dọc từ đùi xuống gót chân, nắn nhẹ các ngón chân. Lặp lại với tay.
- **Bụng**: Xoa quanh rốn theo chiều kim đồng hồ để hỗ trợ tiêu hóa (I Love You massage).
- **Lưng**: Đặt bé nằm sấp, vuốt dọc hai bên cột sống từ cổ xuống mông.`
  }
];

export async function initDbAndSeed() {
  try {
    // Ensure columns exist (Alter table if missing)
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
    
    await pool.query(`ALTER TABLE nutritious_meals ADD COLUMN IF NOT EXISTS image_url VARCHAR(500) DEFAULT 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80';`);

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
    
    await pool.query(`ALTER TABLE handbook_articles ADD COLUMN IF NOT EXISTS image_url VARCHAR(500) DEFAULT 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80';`);

    // Reseed if meals are less than 15 (Force a fresh massive seed for the new update)
    const mealCount = await pool.query('SELECT COUNT(*) FROM nutritious_meals');
    if (parseInt(mealCount.rows[0].count) < 15) {
      console.log('Clearing old data and reseeding massive dataset...');
      await pool.query('DELETE FROM nutritious_meals;');
      
      for (const meal of defaultMeals) {
        await pool.query(`
          INSERT INTO nutritious_meals (id, title, age_group, ingredients, benefits, instructions, image_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [meal.id, meal.title, meal.age_group, meal.ingredients, meal.benefits, meal.instructions, meal.image_url]);
      }
    }

    const articleCount = await pool.query('SELECT COUNT(*) FROM handbook_articles');
    if (parseInt(articleCount.rows[0].count) < 7) {
      await pool.query('DELETE FROM handbook_articles;');
      for (const article of defaultArticles) {
        await pool.query(`
          INSERT INTO handbook_articles (id, title, category, summary, content, icon, image_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [article.id, article.title, article.category, article.summary, article.content, article.icon, article.image_url]);
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

