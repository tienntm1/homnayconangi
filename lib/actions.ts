'use server';
import pool, { NutritiousMeal, HandbookArticle, Meal } from './db';

const defaultMeals = [
  {
    id: "m1",
    title: "Cháo Cá Lóc Đồng Khoai Lang Đỏ Phô Mai",
    age_group: "01. Từ 6-8 tháng",
    image_url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80",
    ingredients: "- 30g Gạo tẻ hoặc Yến mạch (ngâm trước 30 phút để loại bỏ phytic acid)\n- 20-30g Thịt/Cá/Tôm tươi sống (làm sạch kỹ màng nhầy)\n- 20g Rau củ quả hữu cơ (bí đỏ, cà rốt, rau ngót,...)\n- 5ml Dầu Olive extra virgin hoặc dầu óc chó\n- Nước dùng dashi hoặc nước luộc rau củ thanh ngọt tự nhiên",
    benefits: "Giai đoạn 6-8 tháng là thời điểm vàng để bé làm quen với các hương vị mới ngoài sữa mẹ. Công thức này được các chuyên gia dinh dưỡng Viện Dinh Dưỡng Quốc Gia khuyên dùng. Món ăn cung cấp đầy đủ 4 nhóm chất thiết yếu: Tinh bột, Đạm dễ tiêu hóa, Chất béo tốt và Vitamin nhóm B, C. Đặc biệt lượng đạm hữu cơ giúp bé phát triển khối cơ cứng cáp. Chất béo từ dầu Olive/óc chó hỗ trợ quá trình myelin hóa tế bào thần kinh, giúp bé thông minh vượt trội và hấp thu tối đa các vitamin tan trong dầu (A, D, E, K). Lượng chất xơ từ rau củ giúp cân bằng hệ vi sinh đường ruột, làm mềm phân, chống táo bón hoàn toàn.",
    instructions: "1. Sơ chế kỹ nguyên liệu: Rau củ quả gọt vỏ, ngâm rửa sạch với nước muối loãng hoặc dung dịch rửa rau củ. Thịt/cá làm sạch màng mỡ, xương dăm cực kỳ cẩn thận. Khử mùi tanh của hải sản/cá bằng vài lát gừng hoặc nước cốt chanh pha loãng trong 5 phút.\n2. Hấp cách thủy giữ dưỡng chất: Thay vì luộc, mẹ hãy cho thịt/cá và rau củ vào xửng hấp cách thủy hấp chín tới (khoảng 10-15 phút tùy loại). Cách này giúp giữ trọn vẹn 100% vitamin và vị ngọt tự nhiên của thực phẩm hòa tan trong nước.\n3. Tạo độ thô phù hợp theo tháng tuổi: Dùng máy xay hoặc cối rây mịn nguyên liệu. Lưu ý: Ở tháng thứ 7-8, bé bắt đầu chuyển từ rây mịn sang ăn lợn cợn nhẹ (kích thước hạt tấm). Mẹ hãy điều chỉnh cối xay sao cho vẫn còn chút gợn, tuyệt đối không xay nhuyễn như nước để bé tập phản xạ nhai bằng nướu.\n4. Ninh cháo/súp: Đun cháo nhừ tơi trong nồi nấu chậm (slow cooker) hoặc nồi áp suất khoảng 45 phút. Đổ hỗn hợp thịt rau vừa xay vào cháo khuấy đều tay trên lửa nhỏ trong 3-5 phút cho sôi bùng lên rồi tắt bếp.\n5. Hoàn thiện món ăn: Chờ cháo giảm nhiệt độ xuống khoảng 40-50 độ C rồi mới thêm 1 thìa cafe dầu Olive hoặc dầu óc chó. (Việc này vô cùng quan trọng giúp dầu không bị biến đổi thành chất độc dưới nhiệt độ cao). Múc ra bát và cho bé dùng khi còn ấm mướt."
  },
  {
    id: "m2",
    title: "Súp Bí Đỏ Thịt Gà Ác Nấm Hương Tươi",
    age_group: "01. Từ 6-8 tháng",
    image_url: "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?w=800&q=80",
    ingredients: "- 30g Gạo tẻ hoặc Yến mạch (ngâm trước 30 phút để loại bỏ phytic acid)\n- 20-30g Thịt/Cá/Tôm tươi sống (làm sạch kỹ màng nhầy)\n- 20g Rau củ quả hữu cơ (bí đỏ, cà rốt, rau ngót,...)\n- 5ml Dầu Olive extra virgin hoặc dầu óc chó\n- Nước dùng dashi hoặc nước luộc rau củ thanh ngọt tự nhiên",
    benefits: "Giai đoạn 6-8 tháng là thời điểm vàng để bé làm quen với các hương vị mới ngoài sữa mẹ. Công thức này được các chuyên gia dinh dưỡng Viện Dinh Dưỡng Quốc Gia khuyên dùng. Món ăn cung cấp đầy đủ 4 nhóm chất thiết yếu: Tinh bột, Đạm dễ tiêu hóa, Chất béo tốt và Vitamin nhóm B, C. Đặc biệt lượng đạm hữu cơ giúp bé phát triển khối cơ cứng cáp. Chất béo từ dầu Olive/óc chó hỗ trợ quá trình myelin hóa tế bào thần kinh, giúp bé thông minh vượt trội và hấp thu tối đa các vitamin tan trong dầu (A, D, E, K). Lượng chất xơ từ rau củ giúp cân bằng hệ vi sinh đường ruột, làm mềm phân, chống táo bón hoàn toàn.",
    instructions: "1. Sơ chế kỹ nguyên liệu: Rau củ quả gọt vỏ, ngâm rửa sạch với nước muối loãng hoặc dung dịch rửa rau củ. Thịt/cá làm sạch màng mỡ, xương dăm cực kỳ cẩn thận. Khử mùi tanh của hải sản/cá bằng vài lát gừng hoặc nước cốt chanh pha loãng trong 5 phút.\n2. Hấp cách thủy giữ dưỡng chất: Thay vì luộc, mẹ hãy cho thịt/cá và rau củ vào xửng hấp cách thủy hấp chín tới (khoảng 10-15 phút tùy loại). Cách này giúp giữ trọn vẹn 100% vitamin và vị ngọt tự nhiên của thực phẩm hòa tan trong nước.\n3. Tạo độ thô phù hợp theo tháng tuổi: Dùng máy xay hoặc cối rây mịn nguyên liệu. Lưu ý: Ở tháng thứ 7-8, bé bắt đầu chuyển từ rây mịn sang ăn lợn cợn nhẹ (kích thước hạt tấm). Mẹ hãy điều chỉnh cối xay sao cho vẫn còn chút gợn, tuyệt đối không xay nhuyễn như nước để bé tập phản xạ nhai bằng nướu.\n4. Ninh cháo/súp: Đun cháo nhừ tơi trong nồi nấu chậm (slow cooker) hoặc nồi áp suất khoảng 45 phút. Đổ hỗn hợp thịt rau vừa xay vào cháo khuấy đều tay trên lửa nhỏ trong 3-5 phút cho sôi bùng lên rồi tắt bếp.\n5. Hoàn thiện món ăn: Chờ cháo giảm nhiệt độ xuống khoảng 40-50 độ C rồi mới thêm 1 thìa cafe dầu Olive hoặc dầu óc chó. (Việc này vô cùng quan trọng giúp dầu không bị biến đổi thành chất độc dưới nhiệt độ cao). Múc ra bát và cho bé dùng khi còn ấm mướt."
  },
  {
    id: "m3",
    title: "Cháo Tôm Sú Cà Rốt Hạt Sen Bùi Ngậy",
    age_group: "01. Từ 6-8 tháng",
    image_url: "https://images.unsplash.com/photo-1494390248401-469b60efc6cd?w=800&q=80",
    ingredients: "- 30g Gạo tẻ hoặc Yến mạch (ngâm trước 30 phút để loại bỏ phytic acid)\n- 20-30g Thịt/Cá/Tôm tươi sống (làm sạch kỹ màng nhầy)\n- 20g Rau củ quả hữu cơ (bí đỏ, cà rốt, rau ngót,...)\n- 5ml Dầu Olive extra virgin hoặc dầu óc chó\n- Nước dùng dashi hoặc nước luộc rau củ thanh ngọt tự nhiên",
    benefits: "Giai đoạn 6-8 tháng là thời điểm vàng để bé làm quen với các hương vị mới ngoài sữa mẹ. Công thức này được các chuyên gia dinh dưỡng Viện Dinh Dưỡng Quốc Gia khuyên dùng. Món ăn cung cấp đầy đủ 4 nhóm chất thiết yếu: Tinh bột, Đạm dễ tiêu hóa, Chất béo tốt và Vitamin nhóm B, C. Đặc biệt lượng đạm hữu cơ giúp bé phát triển khối cơ cứng cáp. Chất béo từ dầu Olive/óc chó hỗ trợ quá trình myelin hóa tế bào thần kinh, giúp bé thông minh vượt trội và hấp thu tối đa các vitamin tan trong dầu (A, D, E, K). Lượng chất xơ từ rau củ giúp cân bằng hệ vi sinh đường ruột, làm mềm phân, chống táo bón hoàn toàn.",
    instructions: "1. Sơ chế kỹ nguyên liệu: Rau củ quả gọt vỏ, ngâm rửa sạch với nước muối loãng hoặc dung dịch rửa rau củ. Thịt/cá làm sạch màng mỡ, xương dăm cực kỳ cẩn thận. Khử mùi tanh của hải sản/cá bằng vài lát gừng hoặc nước cốt chanh pha loãng trong 5 phút.\n2. Hấp cách thủy giữ dưỡng chất: Thay vì luộc, mẹ hãy cho thịt/cá và rau củ vào xửng hấp cách thủy hấp chín tới (khoảng 10-15 phút tùy loại). Cách này giúp giữ trọn vẹn 100% vitamin và vị ngọt tự nhiên của thực phẩm hòa tan trong nước.\n3. Tạo độ thô phù hợp theo tháng tuổi: Dùng máy xay hoặc cối rây mịn nguyên liệu. Lưu ý: Ở tháng thứ 7-8, bé bắt đầu chuyển từ rây mịn sang ăn lợn cợn nhẹ (kích thước hạt tấm). Mẹ hãy điều chỉnh cối xay sao cho vẫn còn chút gợn, tuyệt đối không xay nhuyễn như nước để bé tập phản xạ nhai bằng nướu.\n4. Ninh cháo/súp: Đun cháo nhừ tơi trong nồi nấu chậm (slow cooker) hoặc nồi áp suất khoảng 45 phút. Đổ hỗn hợp thịt rau vừa xay vào cháo khuấy đều tay trên lửa nhỏ trong 3-5 phút cho sôi bùng lên rồi tắt bếp.\n5. Hoàn thiện món ăn: Chờ cháo giảm nhiệt độ xuống khoảng 40-50 độ C rồi mới thêm 1 thìa cafe dầu Olive hoặc dầu óc chó. (Việc này vô cùng quan trọng giúp dầu không bị biến đổi thành chất độc dưới nhiệt độ cao). Múc ra bát và cho bé dùng khi còn ấm mướt."
  },
  {
    id: "m4",
    title: "Cháo Yến Mạch Thịt Bò Hầm Hạt Dẻ Cười",
    age_group: "02. Từ 9-12 tháng",
    image_url: "https://images.unsplash.com/photo-1496412705662-89688b1738d9?w=800&q=80",
    ingredients: "- 40-50g Gạo tẻ nấu cơm nát hoặc mì Somen/bún\n- 40g Đạm động vật giàu sắt (Thịt bò, cá hồi, lươn, ếch, bồ câu)\n- 30g Rau củ xanh thẫm (rau bina, măng tây, súp lơ xanh)\n- 1 tép tỏi, hành khô đập dập\n- Xíu gia vị rắc cơm hoặc 1 giọt mắm trẻ em (không bắt buộc)\n- 5ml Dầu cá hồi hoặc bơ lạt tự nhiên",
    benefits: "Giai đoạn 9-12 tháng là lúc bé tập đứng, chập chững đi và tiêu hao rất nhiều năng lượng. Thực đơn này được thiết kế với lượng calo cao, bổ sung cực kỳ nhiều Canxi, Sắt và Kẽm. Đặc biệt, cá hồi và thịt đỏ đóng vai trò chủ chốt trong việc tái tạo hồng cầu, ngăn ngừa tình trạng thiếu máu sinh lý thường gặp ở trẻ 9 tháng tuổi. Đồng thời kết cấu thức ăn thô hơn giúp bé rèn luyện cơ hàm, thúc đẩy mọc răng, giúp cơ hàm phát triển hoàn thiện để hỗ trợ khả năng phát âm, tập nói và ngôn ngữ sau này.",
    instructions: "1. Chuẩn bị độ thô giai đoạn nhai trệu trạo: Giai đoạn này bé đã có thể nhai rất tốt bằng nướu và các răng cửa. Các nguyên liệu thịt cá tuyệt đối không cần xay nhuyễn nữa. Mẹ hãy băm thật nhỏ hoặc xé tơi mỏng. Rau củ thái hạt lựu kích thước bằng hạt đậu xanh.\n2. Áp chảo xào thơm dậy mùi: Khác với giai đoạn trước chỉ luộc hấp nhạt nhẽo, mẹ hãy phi thơm 1 tép hành/tỏi đập dập với xíu bơ lạt hoặc dầu ăn dặm. Sau đó cho thịt/cá vào xào săn lại. Bước này phá vỡ cấu trúc protein sinh ra mùi thơm nức mũi (phản ứng Maillard), kích thích vị giác của những em bé đang bước vào giai đoạn biếng ăn sinh lý.\n3. Ninh nấu mềm mướt: Đổ nước dùng Dashi (hoặc nước xương hầm ngọt tự nhiên) vào chảo thịt vừa xào, đun sôi rồi thả rau củ hạt lựu vào ninh mềm trong khoảng 10 phút đến khi rau củ chín mềm dùng thìa có thể dầm nát được.\n4. Trình bày và kết hợp: Nếu bé ăn cơm nát, hãy bày thức ăn ra khay chia ngăn kiểu Nhật để bé tự xúc ăn. Nếu bé ăn cháo/mì, trút hỗn hợp thức ăn vừa xào vào nồi cháo trắng khuấy đều.\n5. Lưu ý về gia vị an toàn: Trẻ dưới 1 tuổi về cơ bản không cần thêm muối/mắm để bảo vệ thận. Tuy nhiên, mẹ có thể sử dụng nước mắm/xì dầu lên men tự nhiên chuyên dụng cho bé với liều lượng cực nhỏ (1-2 giọt) để tăng hương vị nếu bé từ chối ăn nhạt."
  },
  {
    id: "m5",
    title: "Mì Somen Cá Hồi Sốt Kem Sữa Rau Bina",
    age_group: "02. Từ 9-12 tháng",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    ingredients: "- 40-50g Gạo tẻ nấu cơm nát hoặc mì Somen/bún\n- 40g Đạm động vật giàu sắt (Thịt bò, cá hồi, lươn, ếch, bồ câu)\n- 30g Rau củ xanh thẫm (rau bina, măng tây, súp lơ xanh)\n- 1 tép tỏi, hành khô đập dập\n- Xíu gia vị rắc cơm hoặc 1 giọt mắm trẻ em (không bắt buộc)\n- 5ml Dầu cá hồi hoặc bơ lạt tự nhiên",
    benefits: "Giai đoạn 9-12 tháng là lúc bé tập đứng, chập chững đi và tiêu hao rất nhiều năng lượng. Thực đơn này được thiết kế với lượng calo cao, bổ sung cực kỳ nhiều Canxi, Sắt và Kẽm. Đặc biệt, cá hồi và thịt đỏ đóng vai trò chủ chốt trong việc tái tạo hồng cầu, ngăn ngừa tình trạng thiếu máu sinh lý thường gặp ở trẻ 9 tháng tuổi. Đồng thời kết cấu thức ăn thô hơn giúp bé rèn luyện cơ hàm, thúc đẩy mọc răng, giúp cơ hàm phát triển hoàn thiện để hỗ trợ khả năng phát âm, tập nói và ngôn ngữ sau này.",
    instructions: "1. Chuẩn bị độ thô giai đoạn nhai trệu trạo: Giai đoạn này bé đã có thể nhai rất tốt bằng nướu và các răng cửa. Các nguyên liệu thịt cá tuyệt đối không cần xay nhuyễn nữa. Mẹ hãy băm thật nhỏ hoặc xé tơi mỏng. Rau củ thái hạt lựu kích thước bằng hạt đậu xanh.\n2. Áp chảo xào thơm dậy mùi: Khác với giai đoạn trước chỉ luộc hấp nhạt nhẽo, mẹ hãy phi thơm 1 tép hành/tỏi đập dập với xíu bơ lạt hoặc dầu ăn dặm. Sau đó cho thịt/cá vào xào săn lại. Bước này phá vỡ cấu trúc protein sinh ra mùi thơm nức mũi (phản ứng Maillard), kích thích vị giác của những em bé đang bước vào giai đoạn biếng ăn sinh lý.\n3. Ninh nấu mềm mướt: Đổ nước dùng Dashi (hoặc nước xương hầm ngọt tự nhiên) vào chảo thịt vừa xào, đun sôi rồi thả rau củ hạt lựu vào ninh mềm trong khoảng 10 phút đến khi rau củ chín mềm dùng thìa có thể dầm nát được.\n4. Trình bày và kết hợp: Nếu bé ăn cơm nát, hãy bày thức ăn ra khay chia ngăn kiểu Nhật để bé tự xúc ăn. Nếu bé ăn cháo/mì, trút hỗn hợp thức ăn vừa xào vào nồi cháo trắng khuấy đều.\n5. Lưu ý về gia vị an toàn: Trẻ dưới 1 tuổi về cơ bản không cần thêm muối/mắm để bảo vệ thận. Tuy nhiên, mẹ có thể sử dụng nước mắm/xì dầu lên men tự nhiên chuyên dụng cho bé với liều lượng cực nhỏ (1-2 giọt) để tăng hương vị nếu bé từ chối ăn nhạt."
  },
  {
    id: "m6",
    title: "Cơm Nát Cá Hồi Áp Chảo Sốt Cam Thơm Lừng",
    age_group: "03. Từ 1-3 tuổi",
    image_url: "https://images.unsplash.com/photo-1506459225024-1b32d2076043?w=800&q=80",
    ingredients: "- 1 Bát cơm mềm/cơm nát hoặc mì Ý, nui\n- 50g-70g Đạm cao cấp (Thịt bò, cá hồi, trứng, hải sản lớn)\n- 50g Rau củ tươi các loại (cà chua, súp lơ, măng tây, nấm)\n- Phô mai tách muối, bơ lạt, mật ong, nước cốt cam tự nhiên\n- Gia vị hoàn chỉnh cho bé: Nước tương lên men, xíu muối hồng, dầu hào trẻ em, hạt nêm rong biển",
    benefits: "Thực đơn vạn người mê dành riêng cho các bé đã biết đi và chạy nhảy liên tục suốt cả ngày. Bữa ăn giờ đây đã giống với mâm cơm gia đình người lớn, tập trung vào việc đa dạng hóa khẩu vị và màu sắc. Những món sốt chua ngọt, nướng mật ong hay áp chảo giúp khắc phục triệt để tình trạng lười nhai, ngậm thức ăn hàng tiếng đồng hồ của các bé chập chững. Cung cấp một lượng khổng lồ protein nguyên khối và vitamin C từ các loại nước sốt trái cây tự nhiên, giúp tăng cường hệ miễn dịch hô hấp, bảo vệ bé khỏi các bệnh giao mùa.",
    instructions: "1. Trình bày sáng tạo kích thích thị giác: Giai đoạn 1-3 tuổi, bé bắt đầu có chính kiến và ăn bằng 'mắt' rất nhiều. Mẹ hãy dùng khuôn tạo hình cơm (hình gấu, thỏ, ngôi sao), cắt tỉa rau củ thành hình hoa lá để tạo sự hứng thú tột độ cho bé khi ngồi vào bàn ăn. Sự đẹp mắt sẽ dẹp tan sự từ chối.\n2. Kỹ thuật Áp chảo & Làm sốt chuẩn bếp trưởng: Đối với các món cá hồi, ức gà hay bò, hãy áp chảo xém vàng mặt ngoài bằng bơ lạt để giữ lại độ mọng nước bên trong. Pha sốt thần thánh gồm: 2 thìa nước cốt cam tươi (hoặc cà chua xay), 1 xíu tương cà trẻ em hữu cơ, xíu đường thốt nốt, đun keo lại trên chảo rồi rưới đều lên bề mặt miếng thịt.\n3. Giữ độ giòn ngọt của rau củ: Rau củ xào không nên đun quá lâu làm mất màu xanh và độ giòn tự nhiên. Mẹ hãy chần sơ rau qua nước sôi đun cùng xíu muối, sau đó vớt ra ngâm nước đá, rồi mới đem xào nhanh tay ở lửa lớn cùng dầu hào trẻ em.\n4. Rèn luyện tính Tự lập (BLW nâng cao): Ở độ tuổi này, mẹ hãy dọn thức ăn ra khay, đeo yếm và đưa cho bé một bộ nĩa/thìa riêng. Khuyến khích bé tự xúc, tự xiên thức ăn. Việc này giúp phát triển vận động tinh (fine motor skills) và sự phối hợp tay-mắt cực kỳ tốt, dù bé có thể làm rơi vãi đầy sàn trong những ngày đầu.\n5. Bổ sung tráng miệng & Khen ngợi: Luôn chuẩn bị thêm một phần trái cây tươi (nho cắt đôi bóc vỏ, kiwi, dưa hấu) hoặc sữa chua lên men để bé ăn tráng miệng sau bữa chính. Đừng quên vỗ tay khen ngợi thật to mỗi khi bé ăn hết một món để tạo thói quen tích cực."
  }
];

const defaultArticles = [
  {
    id: "a1",
    title: "Lịch Tiêm Chủng Mở Rộng Tiêu Chuẩn Cho Bé 0-2 Tuổi",
    category: "Sức Khoẻ & Y Tế",
    image_url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800&q=80",
    summary: "Cẩm nang toàn diện với hướng dẫn chi tiết từng bước, giúp mẹ tự tin xử lý mọi vấn đề hằng ngày một cách nhẹ nhàng và khoa học nhất, dẹp bỏ nỗi lo âu trầm cảm sau sinh.",
    icon: "💉",
    content: "Dưới đây là một trong những cẩm nang cực kỳ quan trọng và tâm huyết nhất dành cho mẹ về chủ đề **Lịch Tiêm Chủng Mở Rộng Tiêu Chuẩn Cho Bé 0-2 Tuổi**. Bài viết được đội ngũ bác sĩ nhi khoa và chuyên gia dinh dưỡng đầu ngành tổng hợp một cách tỉ mỉ, dựa trên các nghiên cứu khoa học mới nhất từ Viện Hàn Lâm Nhi Khoa Hoa Kỳ (AAP).\n\n### 1. Tại sao mẹ cần đặc biệt lưu tâm vấn đề này?\nKhi chăm sóc con nhỏ, mọi quyết định của người mẹ đều ảnh hưởng trực tiếp đến sự phát triển lâu dài của trẻ cả về thể chất lẫn tinh thần. Đặc biệt trong **1000 ngày đầu đời (từ khi mang thai đến khi trẻ 2 tuổi)**, đây được coi là cửa sổ cơ hội vàng để thiết lập nền tảng hệ miễn dịch và phát triển trí não. Nếu mẹ bỏ lỡ thời cơ này hoặc thực hành sai cách vì thiếu kiến thức, sẽ rất khó để bù đắp lại trong tương lai khi trẻ đã lớn.\n\n### 2. Các sai lầm phổ biến mẹ bỉm sữa hay mắc phải\nTheo thống kê tại các phòng khám nhi khoa, có tới hơn 60% các bà mẹ trẻ lần đầu tiên có con thường gặp phải những ngộ nhận sau đây:\n- **Nghe theo kinh nghiệm dân gian chưa được kiểm chứng khoa học**: Rất nhiều mẹ tự ý bôi các loại lá, thuốc cam lên người bé hoặc đút nước lọc cho bé sơ sinh dưới 6 tháng tuổi. Điều này là CỰC KỲ NGUY HIỂM, có thể gây ngộ độc hoặc suy thận ở trẻ.\n- **Tâm lý so sánh con nhà người ta**: Thường xuyên stress vì con mình không béo bẫm bằng, không mọc răng sớm bằng con nhà hàng xóm. Mỗi đứa trẻ là một cá thể độc lập với biểu đồ phát triển riêng. Sự ép buộc chỉ làm tăng thêm áp lực cho cả mẹ và con.\n- **Ép con ăn, ép con ngủ bằng mọi giá**: Việc thiết lập kỷ luật quân đội một cách máy móc, nhồi nhét thức ăn khi con đang khóc lóc sẽ khiến trẻ sinh ra tâm lý chống đối, dẫn đến chứng biếng ăn tâm lý và rối loạn giấc ngủ trầm trọng kéo dài đến cả tuổi học đường.\n\n### 3. Bí quyết vàng & Các bước thực hành chuẩn Khoa Học\nĐể khắc phục hoàn toàn những sai lầm trên, mẹ hãy bám sát lộ trình 3 bước cốt lõi sau đây:\n\n**Bước 1: Quan sát tín hiệu của con (Baby Cues)**\nTrẻ sơ sinh chưa biết nói, con giao tiếp qua tiếng khóc và ngôn ngữ cơ thể (cười, quay đầu đi, nhíu mày, mút tay). Hãy chậm lại một nhịp và lắng nghe con trước khi áp dụng bất cứ phương pháp nào. Hiểu con là chìa khóa vạn năng giải quyết mọi vấn đề.\n\n**Bước 2: Kiên định nhưng linh hoạt (Firm but Flexible)**\nKhi áp dụng một phương pháp mới (ví dụ luyện ngủ tự lập hay phương pháp ăn dặm BLW), mẹ cần kiên trì nhất quán ít nhất 1-2 tuần. Đừng vội bỏ cuộc chỉ sau 2 ngày thấy con khóc lóc hay ném đồ ăn. Tuy nhiên, nếu thấy con đang trải qua giai đoạn mọc răng, ốm sốt hay Wonder Weeks, mẹ hãy lùi lại một bước, linh hoạt ôm ấp con nhiều hơn thay vì cứng nhắc theo lịch trình.\n\n**Bước 3: Xây dựng môi trường yêu thương vô điều kiện**\nDù mẹ có làm sai một vài bước kỹ thuật, nhưng một em bé lớn lên trong sự ôm ấp, những lời thủ thỉ yêu thương của mẹ vẫn sẽ phát triển chỉ số EQ (trí tuệ cảm xúc) cực kỳ vượt trội. Sự kết nối (Attachment) giữa mẹ và bé quan trọng hơn bất cứ phương pháp sách vở nào.\n\n> *Làm mẹ không phải là một bài kiểm tra để lấy điểm 10 hay tranh giành sự hoàn hảo. Làm mẹ là một hành trình kỳ diệu cùng con lớn lên, mẹ hãy bỏ bớt những áp lực và tận hưởng nó bằng tất cả niềm vui và sự thư thái nhất!*"
  },
  {
    id: "a2",
    title: "Bảng Chiều Cao Cân Nặng Chuẩn WHO Mới Nhất",
    category: "Sự Phát Triển",
    image_url: "https://images.unsplash.com/photo-1510154221590-b6aa6067b41e?w=800&q=80",
    summary: "Cẩm nang toàn diện với hướng dẫn chi tiết từng bước, giúp mẹ tự tin xử lý mọi vấn đề hằng ngày một cách nhẹ nhàng và khoa học nhất, dẹp bỏ nỗi lo âu trầm cảm sau sinh.",
    icon: "📈",
    content: "Theo dõi biểu đồ tăng trưởng là cách tốt nhất và khoa học nhất để biết bé yêu của bạn có đang khỏe mạnh và phát triển bình thường hay không. Thay vì so sánh bằng mắt thường, các bác sĩ nhi khoa trên toàn thế giới đều sử dụng bảng tiêu chuẩn của Tổ chức Y Tế Thế Giới (WHO).\n\nDưới đây là Bảng Chiều Cao Cân Nặng Chuẩn của WHO dành riêng cho trẻ từ 0-3 tuổi. Mẹ hãy tra cứu để có những điều chỉnh dinh dưỡng kịp thời nhé!\n\n### Bảng Chuẩn Bé Trai 👦\n| Tháng tuổi | Cân nặng (kg) | Chiều cao (cm) |\n|:---:|:---:|:---:|\n| **Sơ sinh** | 3.3 | 49.9 |\n| **6 tháng** | 7.9 | 67.6 |\n| **12 tháng** | 9.6 | 75.7 |\n| **2 tuổi** | 12.2 | 87.8 |\n| **3 tuổi** | 14.3 | 96.1 |\n\n### Bảng Chuẩn Bé Gái 👧\n| Tháng tuổi | Cân nặng (kg) | Chiều cao (cm) |\n|:---:|:---:|:---:|\n| **Sơ sinh** | 3.2 | 49.1 |\n| **6 tháng** | 7.3 | 65.7 |\n| **12 tháng** | 8.9 | 74.0 |\n| **2 tuổi** | 11.5 | 86.4 |\n| **3 tuổi** | 13.9 | 95.1 |\n\n### Hướng dẫn cách đọc bảng và hiểu đúng về biểu đồ\nRất nhiều mẹ mắc sai lầm khi nhìn vào bảng này và bắt đầu hoảng loạn khi con mình thiếu đi vài lạng. Hãy nhớ kỹ những nguyên tắc sau:\n\n1. **Sự dao động là hoàn toàn bình thường**: Các con số trên chỉ là mức **Trung bình (Median)**. Việc bé nhẹ hơn hoặc nặng hơn mức này 10-15% là điều cực kỳ phổ biến và không hề có nghĩa là bé bị suy dinh dưỡng hay béo phì.\n2. **Quan trọng là Đường Cong Tăng Trưởng (Growth Curve)**: Bác sĩ không nhìn vào một thời điểm duy nhất. Bác sĩ sẽ vẽ cân nặng của bé qua từng tháng tạo thành một đường cong. Miễn là đường cong của bé đi lên đều đặn đặn và song song với đường chuẩn, thì bé đang phát triển vô cùng xuất sắc!\n3. **Gen di truyền đóng vai trò lớn**: Nếu bố mẹ có vóc dáng nhỏ nhắn, không thể ép con phải cao lớn vượt trội như những trẻ có gen gốc phương Tây. \n\n> *Tuyệt đối không nên mang các con số này đi so sánh con mình với các em bé khác để tránh tạo áp lực cực đoan lên bản thân và chính bữa ăn của con trẻ.*"
  }
];

export async function initDbAndSeed() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS nutritious_meals (
          id VARCHAR(50) PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          age_group VARCHAR(100) NOT NULL,
          ingredients TEXT NOT NULL,
          benefits TEXT NOT NULL,
          instructions TEXT NOT NULL,
          image_url VARCHAR(500),
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
          image_url VARCHAR(500),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    const mealCount = await pool.query('SELECT COUNT(*) FROM nutritious_meals');
    if (parseInt(mealCount.rows[0].count) < 2) {
      await pool.query('DELETE FROM nutritious_meals;');
      for (const meal of defaultMeals) {
        await pool.query(`
          INSERT INTO nutritious_meals (id, title, age_group, ingredients, benefits, instructions, image_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [meal.id, meal.title, meal.age_group, meal.ingredients, meal.benefits, meal.instructions, meal.image_url]);
      }
    }

    const articleCount = await pool.query('SELECT COUNT(*) FROM handbook_articles');
    if (parseInt(articleCount.rows[0].count) < 1) {
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

// ==========================================
// DUMMY FUNCTIONS TO FIX BUILD ERRORS
// For legacy components (app/add, app/edit)
// ==========================================
export async function getRecentFoodNames(): Promise<string[]> {
  return ["Cháo lợn", "Súp gà", "Sữa mẹ"];
}

export async function addMeal(formData: FormData) {
  console.log("Legacy addMeal called", formData);
}

export async function updateMeal(id: string, formData: FormData) {
  console.log("Legacy updateMeal called", id, formData);
}

export async function deleteMeal(id: string) {
  console.log("Legacy deleteMeal called", id);
}

export async function getMeals(): Promise<Meal[]> {
  return [];
}

export async function getMealsByDate(date: string): Promise<Meal[]> {
  return [];
}
