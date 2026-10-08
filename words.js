// 擴充版：每個月份精選 12 個節慶習俗、美食與情境單字
const festivals = [
  { 
    month: 1, 
    name: "1月 農曆新年 (Chinese New Year)", 
    img: "https://images.unsplash.com/photo-1546708973-b339540b5162?q=80&w=600", 
    words: [
      { w: "dumpling", m: "水餃" }, { w: "firecracker", m: "鞭炮" }, { w: "red envelope", m: "紅包" }, { w: "reunion", m: "團圓" },
      { w: "rice cake", m: "年糕" }, { w: "spring festival", m: "春節" }, { w: "tangerine", m: "橘子(大吉)" }, { w: "lion dance", m: "舞獅" },
      { w: "couplet", m: "春聯" }, { w: "prosperity", m: "繁榮富貴" }, { w: "lantern", m: "燈籠" }, { w: "ancestor", m: "祖先" }
    ]
  },
  { 
    month: 2, 
    name: "2月 元宵節 & 情人節 (Lantern & Valentines)", 
    img: "https://images.unsplash.com/photo-1582239454823-10e301d4a984?q=80&w=600", 
    words: [
      { w: "lantern", m: "提燈籠" }, { w: "sweet dumpling", m: "湯圓" }, { w: "riddle", m: "猜燈謎" }, { w: "dragon dance", m: "舞龍" },
      { w: "full moon", m: "滿月" }, { w: "chocolate", m: "巧克力" }, { w: "rose", m: "玫瑰花" }, { w: "cupid", m: "丘比特" },
      { w: "romance", m: "浪漫" }, { w: "bouquet", m: "花束" }, { w: "sweets", m: "甜食" }, { w: "affection", m: "喜愛" }
    ]
  },
  { 
    month: 3, 
    name: "3月 春分與植樹 (Spring & Arbor Day)", 
    img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=600", 
    words: [
      { w: "spring", m: "春天" }, { w: "blossom", m: "櫻花盛開" }, { w: "picnic", m: "野餐" }, { w: "green tea", m: "綠茶" },
      { w: "planting", m: "種植" }, { w: "sprout", m: "發芽" }, { w: "breeze", m: "微風" }, { w: "butterfly", m: "蝴蝶" },
      { w: "sunshine", m: "陽光" }, { w: "garden", m: "花園" }, { w: "seedling", m: "幼苗" }, { w: "nature", m: "大自然" }
    ]
  },
  { 
    month: 4, 
    name: "4月 兒童節 & 復活節 (Children's & Easter)", 
    img: "https://images.unsplash.com/photo-1588691866465-d6d7c49f874f?q=80&w=600", 
    words: [
      { w: "easter egg", m: "彩蛋" }, { w: "bunny", m: "復活節兔子" }, { w: "chocolate", m: "巧克力" }, { w: "candy", m: "糖果" },
      { w: "toy", m: "玩具" }, { w: "playground", m: "遊樂場" }, { w: "amusement", m: "娛樂" }, { w: "laughter", m: "笑聲" },
      { w: "cereal", m: "麥片" }, { w: "marshmallow", m: "棉花糖" }, { w: "gift", m: "禮物" }, { w: "innocence", m: "童心" }
    ]
  },
  { 
    month: 5, 
    name: "5月 母親節 (Mother's Day)", 
    img: "https://images.unsplash.com/photo-1621251910609-0d127dfc11f4?q=80&w=600", 
    words: [
      { w: "carnation", m: "康乃馨" }, { w: "gratitude", m: "感恩" }, { w: "hug", m: "擁抱" }, { w: "cake", m: "蛋糕" },
      { w: "blessing", m: "祝福" }, { w: "affection", m: "深情" }, { w: "warmth", m: "溫暖" }, { w: "family", m: "家庭" },
      { w: "breakfast", m: "早餐" }, { w: "card", m: "卡片" }, { w: "appreciation", m: "欣賞" }, { w: "devotion", m: "奉獻" }
    ]
  },
  { 
    month: 6, 
    name: "6月 端午節 (Dragon Boat Festival)", 
    img: "https://images.unsplash.com/photo-1560942485-b2a11cc13456?q=80&w=600", 
    words: [
      { w: "zongzi", m: "粽子" }, { w: "dragon boat", m: "龍舟" }, { w: "sachet", m: "香包" }, { w: "salted egg", m: "鹹鴨蛋" },
      { w: "sticky rice", m: "糯米" }, { w: "paddles", m: "船槳" }, { w: "race", m: "競賽" }, { w: "drumbeat", m: "鼓聲" },
      { w: "mugwort", m: "艾草" }, { w: "stand egg", m: "立蛋" }, { w: "herbal tea", m: "青草茶" }, { w: "tradition", m: "傳統" }
    ]
  },
  { 
    month: 7, 
    name: "7月 暑假與夏日 (Summer Vacation)", 
    img: "https://images.unsplash.com/photo-1506197392457-caabc9030096?q=80&w=600", 
    words: [
      { w: "summer", m: "夏天" }, { w: "vacation", m: "假期" }, { w: "ice cream", m: "冰淇淋" }, { w: "watermelon", m: "西瓜" },
      { w: "beach", m: "海灘" }, { w: "sunglasses", m: "太陽眼鏡" }, { w: "swimsuit", m: "泳衣" }, { w: "lemonade", m: "檸檬水" },
      { w: "coconut", m: "椰子" }, { w: "sunscreen", m: "防曬乳" }, { w: "seashore", m: "海岸" }, { w: "popsicle", m: "冰棒" }
    ]
  },
  { 
    month: 8, 
    name: "8月 中元節與七夕 (Ghost & Qixi Festival)", 
    img: "https://images.unsplash.com/photo-1601662528567-526cf06f6582?q=80&w=600", 
    words: [
      { w: "incense", m: "拜拜香" }, { w: "offering", m: "供品" }, { w: "ghost", m: "幽靈" }, { w: "lantern", m: "水燈" },
      { w: "starlight", m: "星光" }, { w: "galaxy", m: "銀河" }, { w: "magpie", m: "喜鵲" }, { w: "lovers", m: "戀人" },
      { w: "biscuit", m: "餅乾" }, { w: "peach", m: "水蜜桃" }, { w: "ritual", m: "儀式" }, { w: "tribute", m: "祭品" }
    ]
  },
  { 
    month: 9, 
    name: "9月 中秋節 (Mid-Autumn Festival)", 
    img: "https://images.unsplash.com/photo-1569424754160-b61a35791a99?q=80&w=600", 
    words: [
      { w: "mooncake", m: "月餅" }, { w: "pomelo", m: "柚子" }, { w: "barbecue", m: "烤肉" }, { w: "full moon", m: "滿月" },
      { w: "jade rabbit", m: "玉兔" }, { w: "cassia wine", m: "桂花酒" }, { w: "reunion", m: "團聚" }, { w: "tea", m: "熱茶" },
      { w: "grill", m: "烤架" }, { w: "charcoal", m: "木炭" }, { w: "sausage", m: "香腸" }, { w: "mid autumn", m: "中秋" }
    ]
  },
  { 
    month: 10, 
    name: "10月 萬聖節 (Halloween)", 
    img: "https://images.unsplash.com/photo-1540212727181-44bbab509748?q=80&w=600", 
    words: [
      { w: "pumpkin", m: "南瓜" }, { w: "candy", m: "糖果" }, { w: "costume", m: "變裝" }, { w: "trick or treat", m: "不給糖就搗蛋" },
      { w: "jack lantern", m: "南瓜燈" }, { w: "witch", m: "巫婆" }, { w: "vampire", m: "吸血鬼" }, { w: "spider web", m: "蜘蛛網" },
      { w: "haunted house", m: "鬼屋" }, { w: "skeleton", m: "骷髏" }, { w: "apple cider", m: "蘋果汁" }, { w: "mummy", m: "木乃伊" }
    ]
  },
  { 
    month: 11, 
    name: "11月 感恩節 (Thanksgiving)", 
    img: "https://images.unsplash.com/photo-1605333177303-a26cf5444a86?q=80&w=600", 
    words: [
      { w: "turkey", m: "火雞" }, { w: "pumpkin pie", m: "南瓜派" }, { w: "cornucopia", m: "豐收角" }, { w: "cranberry", m: "蔓越莓" },
      { w: "gravy", m: "肉汁" }, { w: "mashed potato", m: "馬鈴薯泥" }, { w: "stuffing", m: "填塞料" }, { w: "harvest", m: "豐收" },
      { w: "feast", m: "盛宴" }, { w: "gratitude", m: "感恩" }, { w: "family", m: "家人" }, { w: "blessing", m: "祝福" }
    ]
  },
  { 
    month: 12, 
    name: "12月 聖誕節 (Christmas)", 
    img: "https://images.unsplash.com/photo-1544277853-33e30d1d782c?q=80&w=600", 
    words: [
      { w: "santa claus", m: "聖誕老人" }, { w: "christmas tree", m: "聖誕樹" }, { w: "gingerbread", m: "薑餅人" }, { w: "reindeer", m: "麋鹿" },
      { w: "present", m: "禮物" }, { w: "snowflake", m: "雪花" }, { w: "stocking", m: "聖誕襪" }, { w: "fireplace", m: "壁爐" },
      { w: "hot chocolate", m: "熱巧克力" }, { w: "candy cane", m: "拐杖糖" }, { w: "carol", m: "聖誕頌歌" }, { w: "ornament", m: "飾品" }
    ]
  }
];