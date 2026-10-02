const fs = require('fs');
const path = require('path');

const foodImages = [
  '1490645935967-10de6ba17061', '1504630083234-14187a9df0f5', '1494390248401-469b60efc6cd', 
  '1432139555190-58524dae6a55', '1482049142969-957a9dfc29af', '1476224203471-a2645ea98492', 
  '1473093295043-cdd812d0e601', '1455619452474-d2be8b1e70cd', '1506084868230-bb9d95c24759', 
  '1460306855393-0410f61241c7', '1496412705662-89688b1738d9', '1512621776951-a57141f2eefd', 
  '1484723091782-411bdc507c30', '1497362943211-140228bbbbdd', '1470324161839-ce2a4d468160', 
  '1481671700685-6bb957b469bd', '1464306208220-727e467d5843', '1457460866886-40ef8d4b5fc2', 
  '1523988185567-27a9cfa2bc91', '1498837167922-26615b3c3702', '1506459225024-1b32d2076043', 
  '1513442542250-854d436a73f2', '1490818387583-1b053d5fa95e', '1493770348161-369560ae357d', 
  '1478145046317-39f10e56b5e9', '1512058564366-18510be2db19', '1547592180-85f173990554',
  '1534422298391-e4f8c172dddb', '1601314117071-f6c18f3a8b41', '1576020756312-d98c2538cbab'
].map(id => `https://images.unsplash.com/photo-${id}?w=800&q=80`);

const kidImages = [
  '1519689680058-324335c77eba', '1503454537195-1dcabb73ffb9', '1511895426328-dc8714191300', 
  '1510154221590-b6aa6067b41e', '1537655780520-1a28a3074092', '1509048191080-d2984bad6ae5', 
  '1519340333755-56e9c1d04579', '1531682855195-0e3a6a125ce7', '1541285074251-c03848b53df4', 
  '1529156069898-49953e39b3ac', '1517457221295-8df600b678c1', '1540479859555-17af45c78602', 
  '1501189498260-bc04e427edfc', '1520694119335-71be992cde27', '1532012197267-da84d127e765',
  '1584362917165-526a968579e8', '1555252333-9f8e92e65df9', '1502740479091-635887520276',
  '1473280025148-643f5b0ff736', '1491013516836-7dbf43fb0362'
].map(id => `https://images.unsplash.com/photo-${id}?w=800&q=80`);

const meals = [];
const titles6_8 = ["Cháo cá lóc khoai lang", "Súp bí đỏ thịt băm", "Cháo tôm bí xanh", "Bơ nghiền sữa mẹ", "Súp cà rốt táo tây", "Cháo yến mạch chuối", "Cháo thịt bò rau ngót", "Súp khoai tây sữa", "Purée măng tây", "Đậu hà lan nghiền"];
for(let i=0; i<10; i++) {
  meals.push({
    id: 'm' + (i+1),
    title: titles6_8[i],
    age_group: '01. Từ 6-8 tháng',
    image_url: foodImages[i],
    ingredients: 'Thực phẩm sạch, rau củ quả, sữa mẹ hoặc sữa công thức, nước dùng thanh ngọt.',
    benefits: 'Giúp bé tập nhai nuốt, làm quen với hương vị mới, cung cấp vitamin và khoáng chất thiết yếu.',
    instructions: '1. Rửa sạch các nguyên liệu.\\n2. Hấp chín hoặc luộc mềm.\\n3. Xay nhuyễn hoặc tán nhuyễn tuỳ theo độ thô bé ăn được.\\n4. Trộn chung với sữa hoặc nước dùng.'
  });
}

const titles9_12 = ["Cháo yến mạch bò & cà rốt", "Mì somen cá hồi rau cải", "Cháo gà nấm hương", "Cơm nát cá lóc rim", "Pancake chuối yến mạch", "Cháo ếch đậu xanh", "Súp lươn khoai môn", "Bún thịt băm cà chua", "Cháo lươn đồng", "Cháo chim bồ câu hạt sen"];
for(let i=0; i<10; i++) {
  meals.push({
    id: 'm' + (11+i),
    title: titles9_12[i],
    age_group: '02. Từ 9-12 tháng',
    image_url: foodImages[10+i],
    ingredients: 'Thịt cá tươi sống, rau xanh mướt, gia vị ăn dặm, tinh bột dồi dào.',
    benefits: 'Bổ sung canxi, DHA, và sắt giúp bé phát triển trí não, cứng cáp xương khớp, chuẩn bị tập đi.',
    instructions: '1. Sơ chế sạch mùi tanh của hải sản/thịt.\\n2. Băm nhỏ hoặc thái hạt lựu nguyên liệu.\\n3. Nấu cháo hoặc nấu chín mềm các loại củ.\\n4. Kết hợp gia vị trẻ em cho vừa miệng bé.'
  });
}

const titles1_3 = ["Cơm nát cá hồi sốt cam", "Canh rau ngót tôm nõn", "Thịt viên sốt cà chua ngọt", "Trứng cuộn rau củ phô mai", "Măng tây xào thịt bò", "Cơm chiên tôm rau củ", "Sườn sụn hầm đu đủ", "Cá chép hấp xì dầu", "Bò hầm củ quả", "Đùi gà nướng mật ong (cho bé)"];
for(let i=0; i<10; i++) {
  meals.push({
    id: 'm' + (21+i),
    title: titles1_3[i],
    age_group: '03. Từ 1-3 tuổi',
    image_url: foodImages[20+i],
    ingredients: 'Đạm động vật, đạm thực vật, nhiều loại rau củ nhiều màu sắc, cơm nát hoặc bún/phở.',
    benefits: 'Cung cấp năng lượng dồi dào cho các hoạt động thể chất chạy nhảy, hoàn thiện hệ miễn dịch.',
    instructions: '1. Ướp gia vị vừa phải, ưu tiên các món hấp, luộc, xào nhẹ nhàng.\\n2. Nấu đồ ăn với độ thô lớn hơn, cắt miếng vừa tay bé cầm.\\n3. Trang trí đẹp mắt để kích thích sự thèm ăn của trẻ.'
  });
}

const articlesData = [
  {title: 'Lịch Tiêm Chủng Mở Rộng Tiêu Chuẩn', category: 'Sức Khoẻ & Y Tế', icon: '💉'},
  {title: 'Phương Pháp Luyện Ngủ EASY Xuyên Đêm', category: 'Giấc Ngủ', icon: '😴'},
  {title: 'Dấu Hiệu Bé Sẵn Sàng Ăn Dặm', category: 'Dinh Dưỡng', icon: '🥣'},
  {title: 'Bảng Chiều Cao Cân Nặng Chuẩn WHO', category: 'Sự Phát Triển', icon: '📈'},
  {title: 'Hiểu Về Tuần Khủng Hoảng (Wonder Weeks)', category: 'Tâm Lý & Sinh Hoạt', icon: '🌪️'},
  {title: 'Chăm Sóc Răng Miệng Cho Bé', category: 'Sức Khoẻ & Y Tế', icon: '🦷'},
  {title: 'Hướng Dẫn Mát-xa Cho Bé Sơ Sinh', category: 'Chăm Sóc', icon: '💆'},
  {title: 'Cai Sữa Mẹ Không Nước Mắt', category: 'Dinh Dưỡng', icon: '🍼'},
  {title: 'Dạy Trẻ Tập Ngồi Đồ Bô Tự Lập', category: 'Sinh Hoạt', icon: '🚽'},
  {title: 'Dấu Hiệu Trẻ Mọc Răng & Cách Giảm Đau', category: 'Sức Khoẻ', icon: '😁'},
  {title: 'Kích Thích Trí Não Qua Trò Chơi Tương Tác', category: 'Giáo Dục', icon: '🧩'},
  {title: 'Phòng Tránh Tai Nạn Trong Nhà Cho Bé', category: 'An Toàn', icon: '⚠️'},
  {title: 'Xử Lý Nhanh Khi Trẻ Sốt Cao Co Giật', category: 'Sức Khoẻ & Y Tế', icon: '🌡️'},
  {title: 'Tại Sao Trẻ Hay Khóc Đêm (Khóc Dạ Đề)?', category: 'Giấc Ngủ', icon: '🌙'},
  {title: 'Bổ Sung D3 Và Canxi Đúng Cách', category: 'Dinh Dưỡng', icon: '☀️'},
  {title: 'Khi Nào Cần Đưa Trẻ Đi Gặp Bác Sĩ?', category: 'Y Tế', icon: '🏥'}
];

const articles = articlesData.map((a, i) => ({
  id: 'a' + (i+1),
  title: a.title,
  category: a.category,
  image_url: kidImages[i % kidImages.length],
  summary: 'Khám phá bí kíp và kiến thức khoa học được tổng hợp từ các chuyên gia hàng đầu để giúp quá trình làm mẹ trở nên nhẹ nhàng, tự tin hơn.',
  icon: a.icon,
  content: \`Dưới đây là những nội dung chi tiết về chủ đề **\${a.title}**.

### 1. Kiến thức cơ bản
Chăm sóc trẻ em luôn đòi hỏi sự kiên nhẫn và khoa học. Mẹ cần hiểu rõ giai đoạn phát triển hiện tại của con để có những biện pháp phù hợp nhất. 
Trong mọi trường hợp, sự an toàn và khỏe mạnh của bé phải được đặt lên hàng đầu.

### 2. Lời khuyên từ chuyên gia
- **Luôn bình tĩnh**: Trẻ con rất nhạy cảm với cảm xúc của người mẹ.
- **Thực hành mỗi ngày**: Mọi thói quen đều cần từ 7-14 ngày để hình thành.
- **Tôn trọng sự khác biệt**: Không có em bé nào giống em bé nào, biểu đồ tăng trưởng chỉ là con số tham khảo.

> "Làm mẹ là bản năng, nhưng làm mẹ khoa học cần phải học."

### 3. Hướng dẫn chi tiết
- Bước 1: Chuẩn bị tâm lý và môi trường thoải mái nhất.
- Bước 2: Quan sát các phản ứng của bé, nếu bé hợp tác thì tiếp tục.
- Bước 3: Đừng ngần ngại nhờ sự trợ giúp từ gia đình và người thân.

*Chúc mẹ và bé luôn có những khoảnh khắc tuyệt vời bên nhau!*\`
}));

// Override content for WHO table
articles[3].content = \`Theo dõi biểu đồ tăng trưởng là cách tốt nhất để biết bé có khỏe mạnh không. Dưới đây là bảng tiêu chuẩn của WHO:

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

> *Lưu ý: Sự dao động xung quanh mức trung bình (±10%) là hoàn toàn bình thường. Điều quan trọng là bé phát triển đều đặn theo đường cong sinh trưởng của riêng mình.*\`;

const fileContent = \`'use server';
import pool, { NutritiousMeal, HandbookArticle } from './db';

const defaultMeals = \${JSON.stringify(meals, null, 2)};

const defaultArticles = \${JSON.stringify(articles, null, 2)};

export async function initDbAndSeed() {
  try {
    await pool.query(\\\`
      CREATE TABLE IF NOT EXISTS nutritious_meals (
          id VARCHAR(50) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          age_group VARCHAR(100) NOT NULL,
          ingredients TEXT NOT NULL,
          benefits TEXT NOT NULL,
          instructions TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    \\\`);
    
    await pool.query(\\\`ALTER TABLE nutritious_meals ADD COLUMN IF NOT EXISTS image_url VARCHAR(500) DEFAULT 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80';\\\`);

    await pool.query(\\\`
      CREATE TABLE IF NOT EXISTS handbook_articles (
          id VARCHAR(50) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          category VARCHAR(100) NOT NULL,
          summary TEXT NOT NULL,
          content TEXT NOT NULL,
          icon VARCHAR(10),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    \\\`);
    
    await pool.query(\\\`ALTER TABLE handbook_articles ADD COLUMN IF NOT EXISTS image_url VARCHAR(500) DEFAULT 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80';\\\`);

    const mealCount = await pool.query('SELECT COUNT(*) FROM nutritious_meals');
    if (parseInt(mealCount.rows[0].count) < 30) {
      console.log('Clearing old data and reseeding massive dataset...');
      await pool.query('DELETE FROM nutritious_meals;');
      
      for (const meal of defaultMeals) {
        await pool.query(\\\`
          INSERT INTO nutritious_meals (id, title, age_group, ingredients, benefits, instructions, image_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        \\\`, [meal.id, meal.title, meal.age_group, meal.ingredients, meal.benefits, meal.instructions, meal.image_url]);
      }
    }

    const articleCount = await pool.query('SELECT COUNT(*) FROM handbook_articles');
    if (parseInt(articleCount.rows[0].count) < 16) {
      await pool.query('DELETE FROM handbook_articles;');
      for (const article of defaultArticles) {
        await pool.query(\\\`
          INSERT INTO handbook_articles (id, title, category, summary, content, icon, image_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        \\\`, [article.id, article.title, article.category, article.summary, article.content, article.icon, article.image_url]);
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
\`;

fs.writeFileSync(path.join(__dirname, '../lib/actions.ts'), fileContent);
console.log('Successfully generated lib/actions.ts with massive unique data!');
