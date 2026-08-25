export interface SpeciesTaxonomy {
  domain: string
  kingdom: string
  phylum: string
  class: string
  order: string
  family: string
  genus: string
  species: string
}

export interface Species {
  id: string
  scientificName: string
  koreanName: string
  taxonomy: SpeciesTaxonomy
  features: string
  food: string
  habitat: string
  /** 학명 표기가 출처마다 갈려 전시 라벨 대조가 필요한 경우 true */
  needsLabelVerification: boolean
}

export const SPECIES: Species[] = [
  {
    id: 'hwangbok',
    scientificName: 'Takifugu obscurus',
    koreanName: '황복',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '복어목',
      family: '참복과',
      genus: '참복속(Takifugu)',
      species: '황복(Takifugu obscurus)',
    },
    features:
      '몸은 원통형이고 주둥이가 뭉툭하며, 등 쪽은 회갈색, 배 쪽은 은백색을 띤다. 몸 옆구리에는 노란 띠가 있어 자라면서 더 뚜렷해진다. 몸길이는 보통 20cm 안팎이며 최대 30cm 정도까지 자란다.',
    food: '육식성으로 작은 물고기, 새우 등 갑각류, 조개류 등을 먹는다.',
    habitat:
      '평소에는 서해 바다에서 살다가 산란기(4~6월)에 알을 낳으러 한강, 임진강, 금강 등 민물 하천으로 거슬러 올라오는 회유성 어류다. 한반도 서해와 그로 흘러드는 하천에 주로 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'nongeo',
    scientificName: 'Lateolabrax japonicus',
    koreanName: '농어',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '반딧불게르치목',
      family: '농어과',
      genus: '농어속(Lateolabrax)',
      species: '농어(Lateolabrax japonicus)',
    },
    features:
      '몸길이는 크게는 1m가 넘게 자라는 대형 어종이다. 등 쪽은 푸른빛이 도는 회색, 배 쪽은 은백색이며, 어릴 때는 등지느러미 아래쪽에 검은 점이 많다가 자라면서 옅어진다. 입이 크고 몸이 길쭉해 빠르게 헤엄치며 사냥하기에 알맞은 몸매를 가졌다.',
    food: '육식성 어류로 작은 물고기와 새우 등 갑각류를 잡아먹는다.',
    habitat:
      '우리나라 전 연안과 일본, 중국, 대만 해역에 분포한다. 바다와 강 하구를 오가며 사는데, 어릴 때는 연안이나 강 하구까지 올라오기도 하고 자라면서 먼바다로 나간다.',
    needsLabelVerification: false,
  },
  {
    id: 'baduksol-bujeon-nabi',
    scientificName: 'Taraka hamada',
    koreanName: '바둑돌부전나비',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '나비목',
      family: '부전나비과',
      genus: '바둑돌부전나비속(Taraka)',
      species: '바둑돌부전나비(Taraka hamada)',
    },
    features:
      '날개를 편 길이가 3cm가 채 안 되는 작은 나비로, 흰 바탕 날개에 검은 바둑돌 무늬가 촘촘히 박혀 있어 이런 이름이 붙었다. 우리나라에 사는 나비 중 유일하게 애벌레와 어른벌레 모두 다른 곤충(진딧물)을 잡아먹는 육식성 나비로 유명하다.',
    food: '애벌레와 성충 모두 이대·조릿대 등 대나무류에 사는 진딧물을 잡아먹는다. 대부분의 나비와 달리 꽃꿀은 거의 빨지 않는다.',
    habitat: '절이나 마을 주변의 잡목림, 밭둑 등 이대·조릿대가 자라는 대나무 군락 주변에 서식하며, 우리나라 남부지방에 많이 분포한다.',
    needsLabelVerification: true,
  },
  {
    id: 'gajung-namu-gochi-nabang',
    scientificName: 'Samia cynthia',
    koreanName: '가중나무고치나방',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '나비목',
      family: '산누에나방과',
      genus: '사미아속(Samia)',
      species: '가중나무고치나방(Samia cynthia) — 한반도 개체군은 아종 Samia cynthia pryeri로 보기도 함',
    },
    features:
      '날개를 편 길이가 11~16cm에 이르는 우리나라의 대표적인 대형 나방이다. 날개는 갈색 바탕에 초승달 모양의 무늬와 희끄무레한 줄무늬가 있다. 누에나방처럼 성충은 입이 퇴화되어 있어 아무것도 먹거나 마시지 못하고, 짧은 기간 동안 짝짓기와 산란만 하다가 죽는다.',
    food: '성충은 먹이를 먹지 않는다. 애벌레는 가중나무(가죽나무), 소태나무, 붉나무, 상수리나무, 물푸레나무 등 다양한 나무의 잎을 먹는다.',
    habitat:
      '한반도와 중국이 원산지이며 일본 등 동아시아에 분포한다. 원래는 숲에 살았지만 먹이식물인 가죽나무가 도시에 많이 심어지면서 서울 등 대도시에서도 흔히 관찰된다.',
    needsLabelVerification: true,
  },
  {
    id: 'malchong-beol',
    scientificName: 'Euurobracon yokohamae',
    koreanName: '말총벌',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '벌목',
      family: '고치벌과',
      genus: '말총벌속(Euurobracon)',
      species: '말총벌(Euurobracon yokohamae)',
    },
    features:
      '몸길이는 15~24mm 정도지만, 암컷의 산란관이 몸길이의 몇 배(최대 18cm 이상)나 되게 가늘고 길게 뻗어 있어 마치 말의 꼬리털처럼 보인다. 몸은 황적갈색을 띠고 날개는 적황색 바탕에 검은 무늬가 있으며, 더듬이는 검은색이다.',
    food:
      '직접 먹이를 먹기보다는, 긴 산란관으로 나무 속에 숨어 있는 하늘소나 나방 등의 애벌레 몸속에 알을 낳는 기생벌이다. 알에서 깨어난 말총벌 애벌레가 숙주 애벌레를 먹으며 자란다.',
    habitat:
      '성충은 5~6월에 나타나며, 나무속에 사는 곤충 애벌레를 찾아 산란하기 위해 고사목이나 병든 나무 주변에서 활동한다. 우리나라를 비롯해 중국, 대만, 일본 등지에 분포한다.',
    needsLabelVerification: true,
  },
  {
    id: 'wangbadari',
    scientificName: 'Polistes rothneyi',
    koreanName: '왕바다리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '벌목',
      family: '말벌과',
      genus: '쌍살벌속(Polistes)',
      species: '왕바다리(Polistes rothneyi) — 한국 고유아종은 P. rothneyi koreanus',
    },
    features:
      '우리나라에 사는 쌍살벌(말벌과의 한 무리) 중에서 몸집이 가장 큰 종으로, 몸길이가 23~25mm에 이른다. 몸은 검은색 바탕에 황갈색에서 적갈색의 무늬가 있으며, 개체마다 무늬 변이가 심한 편이다. 종이로 만든 것처럼 얇은 집을 나뭇가지나 처마 밑에 짓고 무리 지어 산다.',
    food: '나비나 나방의 애벌레를 사냥해서 잡아먹으며, 5~10월 사이에 주로 활동한다.',
    habitat: '한반도, 중국, 일본 등 동아시아에 널리 분포하며, 한국 고유아종은 우리나라 전역의 숲과 인가 주변에서 볼 수 있다.',
    needsLabelVerification: true,
  },
  {
    id: 'bukgeukgom',
    scientificName: 'Ursus maritimus',
    koreanName: '북극곰',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '곰과',
      genus: '곰속(Ursus)',
      species: '북극곰(Ursus maritimus)',
    },
    features:
      '온몸이 두꺼운 흰 털로 덮여 있지만 실제 털 자체는 색이 없는 투명한 털이며, 코와 피부는 검은색이다. 피부 밑에 두꺼운 지방층이 있어 영하 40도의 혹한과 강한 바람도 견딜 수 있다. 곰 중에서 몸집이 가장 큰 편에 속하며 헤엄을 매우 잘 친다.',
    food: '거의 육식만 하는 곰으로, 주로 바다표범을 사냥해서 먹는다. 여름철에는 순록, 물고기, 바닷새, 해조류 등도 먹는다.',
    habitat:
      '북극해와 그 주변의 캐나다 북부, 알래스카, 러시아, 그린란드, 노르웨이 스발바르 제도 등 북극권에 서식하며 바다 위 얼음(해빙)에서 많은 시간을 보낸다. 우리나라에는 자연 서식하지 않으며, 과학관에서는 표본으로만 전시된다.',
    needsLabelVerification: false,
  },
  {
    id: 'pureun-badageobuk',
    scientificName: 'Chelonia mydas',
    koreanName: '푸른바다거북',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '파충강',
      order: '거북목',
      family: '바다거북과',
      genus: '바다거북속(Chelonia)',
      species: '푸른바다거북(Chelonia mydas)',
    },
    features:
      '몸길이가 1.5m까지 자라고 몸무게는 68~190kg에 이르는 대형 바다거북이다. 등딱지는 납작하고 매끈하며, 다리는 헤엄치기 좋게 노처럼 생긴 지느러미 모양으로 변형되어 있다. 몸속 지방이 초록빛을 띠어 "푸른(green)"이라는 이름이 붙었다고 알려져 있다.',
    food: '새끼일 때는 작은 동물도 잡아먹는 육식성이지만, 다 자란 성체는 해초와 해조류를 주로 먹는 초식성에 가깝다.',
    habitat:
      '전 세계 열대·아열대 바다에 넓게 분포하며 얕은 바다의 석호나 해초밭을 좋아한다. 우리나라 제주도와 남해 연안에서도 드물게 발견되며 멸종위기종으로 보호받고 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'saja',
    scientificName: 'Panthera leo',
    koreanName: '사자',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '고양이과',
      genus: '표범속(Panthera)',
      species: '사자(Panthera leo)',
    },
    features:
      '근육질의 넓은 가슴과 몸통, 짧고 둥근 머리와 귀, 꼬리 끝의 털뭉치가 특징이다. 수컷은 머리부터 어깨까지 이어지는 풍성한 갈기를 가지고 있어 암컷과 쉽게 구별된다. 고양이과 동물 중 호랑이 다음으로 몸집이 크며 무리(프라이드)를 이루어 사는 습성이 있다.',
    food: '누, 얼룩말, 물소, 기린 등 초원에 사는 중대형 초식동물을 사냥해서 먹는 육식동물이다. 무리를 이루어 협동으로 사냥하는 경우가 많다.',
    habitat:
      '현재는 사하라 사막 이남 아프리카의 초원·사바나·관목지에 주로 서식하며, 인도 서부 기르 국립공원 일대에도 아시아사자가 소수 남아 있다. 우리나라에는 자연 서식하지 않으며, 과학관에서는 표본으로만 전시된다.',
    needsLabelVerification: false,
  },
  {
    id: 'olppaemi',
    scientificName: 'Strix nivicolum',
    koreanName: '올빼미',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '올빼미목',
      family: '올빼미과',
      genus: '올빼미속(Strix)',
      species: '올빼미(Strix nivicolum)',
    },
    features:
      '머리에 귀처럼 솟은 깃털(귀깃)이 없어 둥글고 납작한 얼굴이 마스크를 쓴 것처럼 보이는 것이 특징이다. 검은 눈과 노란색 부리를 가지고 있으며, 어두운 색의 깃털과 짧고 줄무늬가 있는 꼬리를 갖고 있다. 밤에 활동하는 맹금류로 소리 없이 날 수 있다.',
    food: '쥐 등 작은 설치류를 비롯해 작은 새, 곤충 등을 사냥해서 잡아먹는 육식성 새이다.',
    habitat: '히말라야에서부터 우리나라, 대만에 이르는 아시아의 숲에 서식하며, 국내에서는 산림 지역에서 텃새로 살아간다.',
    needsLabelVerification: false,
  },
  {
    id: 'gorani',
    scientificName: 'Hydropotes inermis',
    koreanName: '고라니',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '우제목',
      family: '사슴과',
      genus: '고라니속(Hydropotes)',
      species: '고라니(Hydropotes inermis)',
    },
    features:
      '몸길이 약 90~100cm, 어깨높이 45~55cm 정도인 중소형 사슴류이다. 수컷은 머리에 뿔이 없는 대신 위턱에서 길게 자란 송곳니가 입 밖으로 삐죽 튀어나와 있는 것이 특징이다. 몸빛은 황갈색이고 겁이 많아 대부분 혼자 지내며 위협을 느끼면 빠르게 도망친다.',
    food: '풀, 나뭇잎, 어린 새순, 밭작물 등을 먹는 초식동물이다.',
    habitat:
      '하천 주변 갈대밭, 농경지, 낮은 야산 등에 서식한다. 세계적으로 개체수가 줄어 국제적으로는 취약종이지만, 세계 개체 대부분이 한반도(특히 남한)에 분포하며 이곳에서는 흔하게 볼 수 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'meotdwaeji',
    scientificName: 'Sus scrofa',
    koreanName: '멧돼지',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '우제목',
      family: '멧돼지과',
      genus: '멧돼지속(Sus)',
      species: '멧돼지(Sus scrofa)',
    },
    features:
      '몸통이 굵고 다리는 짧으며 주둥이가 길게 튀어나온 대형 포유류이다. 억센 회갈색 털로 몸이 덮여 있고, 수컷은 아래턱에서 자란 날카로운 엄니를 가지고 있다. 후각이 매우 예민하며 새끼들과 함께 무리를 지어 다니는 경우가 많다.',
    food: '나무뿌리, 도토리 같은 열매, 곤충, 지렁이 등을 가리지 않고 먹는 잡식동물이다.',
    habitat:
      '숲이 우거진 산지에 주로 서식하며, 한반도 전역의 산림에 널리 분포한다. 최근에는 먹이를 찾아 도시 근처까지 내려오는 경우도 늘고 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'neoguri',
    scientificName: 'Nyctereutes procyonoides',
    koreanName: '너구리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '개과',
      genus: '너구리속(Nyctereutes)',
      species: '너구리(Nyctereutes procyonoides)',
    },
    features:
      '몸이 통통하고 다리가 짧으며, 눈 주위에 검은 안대 모양의 무늬가 있는 개과 동물이다. 겨울에는 털이 길고 풍성해지며, 나무는 잘 타지 못하지만 헤엄은 능숙하게 친다.',
    food: '쥐, 곤충, 열매, 물고기, 죽은 동물 사체 등을 가리지 않고 먹는 잡식동물이다.',
    habitat:
      '하천가 숲, 농경지 주변 등 사람이 사는 곳 가까이에도 잘 적응하며 산다. 한반도 전역에 널리 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'osori',
    scientificName: 'Meles leucurus',
    koreanName: '오소리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '족제비과',
      genus: '오소리속(Meles)',
      species: '오소리(Meles leucurus)',
    },
    features:
      '몸이 통통하고 다리가 짧으며 주둥이가 뾰족한 편이다. 얼굴에는 눈을 가로지르는 검은 줄무늬가 있어 다른 동물과 쉽게 구분되며, 발톱이 튼튼해 땅을 잘 파고 굴을 만들어 생활한다.',
    food: '지렁이, 곤충 애벌레, 나무뿌리, 열매 등을 먹는 잡식동물이다.',
    habitat:
      '산기슭의 숲에 굴을 파고 무리를 지어 살며, 한반도 전역의 산지에 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'sudal',
    scientificName: 'Lutra lutra',
    koreanName: '수달',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '족제비과',
      genus: '수달속(Lutra)',
      species: '수달(Lutra lutra)',
    },
    features:
      '몸이 길고 유선형이며 발에 물갈퀴가 있고 방수가 잘 되는 두꺼운 털을 가진 반수생 동물이다. 헤엄과 잠수 솜씨가 뛰어나며 긴 꼬리로 방향을 조절하면서 물속을 자유롭게 움직인다.',
    food: '물고기를 주로 먹으며 게, 조개, 개구리 등도 잡아먹는다.',
    habitat:
      '맑은 하천과 강, 호수 주변 바위나 물가 굴에서 서식한다. 한반도 전역의 물가에 분포하지만 개체수가 적어 보호받고 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'dambi',
    scientificName: 'Martes flavigula',
    koreanName: '담비',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '족제비과',
      genus: '담비속(Martes)',
      species: '담비(Martes flavigula)',
    },
    features:
      '몸이 길고 날씬하며 목 아래쪽이 노란빛을 띠는 것이 특징으로, 족제비과 동물 중에서도 몸집이 큰 편에 속한다. 나무를 잘 타고 움직임이 매우 민첩하며, 여러 마리가 무리를 지어 함께 사냥하기도 한다.',
    food: '작은 포유류, 새, 곤충, 열매 등을 먹는 잡식동물이며, 무리를 지어 자기보다 몸집이 큰 동물을 사냥하기도 한다.',
    habitat:
      '깊은 산림에 서식하며 한반도의 산악 지역에 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'sanyang',
    scientificName: 'Naemorhedus caudatus',
    koreanName: '산양',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '우제목',
      family: '소과',
      genus: '산양속(Naemorhedus)',
      species: '산양(Naemorhedus caudatus)',
    },
    features:
      '험한 바위산에 사는 소과 동물로, 암수 모두 짧고 뒤로 살짝 굽은 검은 뿔을 가지고 있다. 몸은 회갈색 털로 덮여 있으며, 좁고 가파른 바위 절벽을 자유롭게 오르내리는 뛰어난 균형 감각을 가지고 있다.',
    food: '나뭇잎, 풀, 나무껍질, 이끼 등을 먹는 초식동물이다.',
    habitat:
      '험준한 바위산과 절벽 지대에 서식한다. 한반도에서는 강원도 산악 지역 등 일부 지역에만 남아 있는 희귀종이다.',
    needsLabelVerification: false,
  },
  {
    id: 'noru',
    scientificName: 'Capreolus pygargus',
    koreanName: '노루',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '우제목',
      family: '사슴과',
      genus: '노루속(Capreolus)',
      species: '노루(Capreolus pygargus)',
    },
    features:
      '몸집이 작고 다리가 가늘며 엉덩이에 흰 반점이 있는 사슴과 동물이다. 수컷에게는 짧고 가지가 적은 뿔이 있으며, 놀라면 흰 엉덩이 털을 세운 채 껑충껑충 뛰어 달아난다.',
    food: '풀, 어린 나뭇잎, 나무 열매 등을 먹는 초식동물이다.',
    habitat:
      '야산과 농경지 주변 숲에 서식하며 한반도 전역에 널리 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'bandalgaseumgom',
    scientificName: 'Ursus thibetanus',
    koreanName: '반달가슴곰',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '곰과',
      genus: '곰속(Ursus)',
      species: '반달가슴곰(Ursus thibetanus)',
    },
    features:
      '몸이 크고 검은 털로 덮여 있으며 가슴에 초승달 모양의 흰 무늬가 있는 대형 포유류이다. 나무를 잘 타고, 겨울이 되면 굴이나 나무 구멍 속에서 겨울잠을 잔다.',
    food: '도토리, 나무 열매, 곤충, 작은 동물 등을 먹는 잡식동물이다.',
    habitat:
      '깊은 산림 지역에 서식한다. 한반도에서는 지리산 등지에서 복원 사업을 통해 살고 있는 멸종위기종이다.',
    needsLabelVerification: false,
  },
  {
    id: 'yeou',
    scientificName: 'Vulpes vulpes',
    koreanName: '여우',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '개과',
      genus: '여우속(Vulpes)',
      species: '여우(Vulpes vulpes)',
    },
    features:
      '몸이 날씬하고 다리가 가늘며 귀가 크고 뾰족한 개과 동물이다. 붉은 갈색 털을 가지고 있으며 꼬리 끝이 흰 경우가 많고, 주로 밤에 혼자 활동한다.',
    food: '쥐, 토끼 등 작은 동물과 곤충, 열매를 먹는 잡식동물이다.',
    habitat:
      '산과 들판이 만나는 지역에 서식한다. 한반도에서는 과도한 포획 등으로 거의 사라졌다가 최근 복원 사업이 진행 중인 멸종위기종이다.',
    needsLabelVerification: false,
  },
  {
    id: 'africa-elephant',
    scientificName: 'Loxodonta africana',
    koreanName: '아프리카코끼리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '장비목',
      family: '코끼리과',
      genus: '아프리카코끼리속(Loxodonta)',
      species: '아프리카코끼리(Loxodonta africana)',
    },
    features:
      '육지에 사는 동물 중 몸집이 가장 크며, 커다란 귀와 긴 코(코와 윗입술이 합쳐진 기관)를 가지고 있다. 코로 물을 마시거나 나뭇잎을 뜯고, 상아라 불리는 긴 앞니를 무기이자 도구로 사용한다.',
    food: '풀, 나뭇잎, 나무껍질, 열매 등을 먹는 초식 동물로 하루의 대부분을 먹이를 찾는 데 쓴다.',
    habitat:
      '아프리카의 초원과 사바나, 숲에 무리를 지어 산다. 한국에는 자생하지 않으며, 이 전시물은 과학관에서 학습용으로 소개하는 것이다.',
    needsLabelVerification: false,
  },
  {
    id: 'giraffe',
    scientificName: 'Giraffa camelopardalis',
    koreanName: '기린',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '우제목',
      family: '기린과',
      genus: '기린속(Giraffa)',
      species: '기린(Giraffa camelopardalis)',
    },
    features:
      '목이 아주 길어서 육지 동물 중 키가 가장 크며, 이 덕분에 높은 나뭇가지의 잎도 쉽게 먹을 수 있다. 온몸에 얼룩덜룩한 무늬가 있는데, 이 무늬는 개체마다 조금씩 달라 사람의 지문처럼 서로 구별하는 데 쓰인다.',
    food: '주로 아카시아 나무의 잎을 즐겨 먹으며, 긴 혀로 가시가 있는 가지에서도 잎만 골라 뜯는다.',
    habitat:
      '아프리카의 초원과 사바나 지역에 무리를 지어 산다. 한국에는 자생하지 않으며, 이 전시물은 과학관에서 학습용으로 소개하는 것이다.',
    needsLabelVerification: false,
  },
  {
    id: 'plains-zebra',
    scientificName: 'Equus quagga',
    koreanName: '사바나얼룩말',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '기제목',
      family: '말과',
      genus: '말속(Equus)',
      species: '사바나얼룩말(Equus quagga)',
    },
    features:
      '말과 비슷하게 생겼지만 몸 전체에 검은색과 흰색 줄무늬가 있는 것이 특징이다. 줄무늬의 모양은 사람의 지문처럼 개체마다 달라서 서로를 구별하는 데 도움을 준다.',
    food: '풀을 뜯어 먹는 초식 동물로, 넓은 초원을 옮겨 다니며 먹이를 찾는다.',
    habitat:
      '아프리카 동부와 남부의 초원과 사바나에 무리를 지어 산다. 한국에는 자생하지 않으며, 이 전시물은 과학관에서 학습용으로 소개하는 것이다.',
    needsLabelVerification: false,
  },
  {
    id: 'giant-panda',
    scientificName: 'Ailuropoda melanoleuca',
    koreanName: '자이언트판다',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '곰과',
      genus: '자이언트판다속(Ailuropoda)',
      species: '자이언트판다(Ailuropoda melanoleuca)',
    },
    features:
      '검은색과 흰색이 뚜렷하게 나뉜 몸 색깔이 특징이며, 곰과에 속하지만 고기 대신 대나무를 주로 먹는다. 앞발에는 대나무를 쥐기 좋도록 발달한 여섯 번째 발가락 같은 뼈가 있다.',
    food: '먹이의 대부분(약 99%)이 대나무이며, 하루에 오랜 시간을 대나무를 씹어 먹는 데 쓴다.',
    habitat:
      '중국 중서부의 산악 지역 대나무 숲에 홀로 산다. 한국에는 자생하지 않으며, 이 전시물은 과학관에서 학습용으로 소개하는 것이다.',
    needsLabelVerification: false,
  },
  {
    id: 'white-rhino',
    scientificName: 'Ceratotherium simum',
    koreanName: '흰코뿔소',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '기제목',
      family: '코뿔소과',
      genus: '흰코뿔소속(Ceratotherium)',
      species: '흰코뿔소(Ceratotherium simum)',
    },
    features:
      '코 위에 뿔이 두 개 있으며, 코뿔소 다섯 종 가운데 몸집이 가장 크고 오늘날 살아있는 육지 동물 중에서도 손꼽히게 크다. 입이 넓적하고 평평하게 생겨 땅에 낮게 자란 풀을 뜯어 먹기에 알맞다.',
    food: '풀을 뜯어 먹는 초식 동물로, 넓적한 입 모양 덕분에 짧은 풀도 잘 먹을 수 있다.',
    habitat:
      '아프리카 남부와 동부의 초원에 산다. 한국에는 자생하지 않으며, 이 전시물은 과학관에서 학습용으로 소개하는 것이다.',
    needsLabelVerification: false,
  },
  {
    id: 'chimpanzee',
    scientificName: 'Pan troglodytes',
    koreanName: '침팬지',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '영장목',
      family: '사람과',
      genus: '침팬지속(Pan)',
      species: '침팬지(Pan troglodytes)',
    },
    features:
      '사람과 유전자가 매우 비슷한 영장류로, 도구를 만들어 사용하고 무리를 지어 협력하는 등 지능이 높은 것으로 알려져 있다. 팔이 다리보다 길어 나무를 오르내리는 데 능숙하다.',
    food: '과일을 가장 즐겨 먹으며, 잎과 씨앗뿐 아니라 곤충이나 작은 동물도 잡아먹는 잡식성 동물이다.',
    habitat:
      '아프리카 중서부의 열대 우림과 숲에 무리를 지어 산다. 한국에는 자생하지 않으며, 이 전시물은 과학관에서 학습용으로 소개하는 것이다.',
    needsLabelVerification: false,
  },
  {
    id: 'red-kangaroo',
    scientificName: 'Osphranter rufus',
    koreanName: '붉은캥거루',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '캥거루목',
      family: '캥거루과',
      genus: '오스프란터속(Osphranter)',
      species: '붉은캥거루(Osphranter rufus)',
    },
    features:
      '현재 살아있는 유대류 중 몸집이 가장 크며, 뒷다리와 꼬리가 튼튼해 껑충껑충 뛰어서 이동한다. 새끼는 아주 작게 태어난 뒤 어미 배에 있는 육아낭(주머니) 속에서 자란다.',
    food: '풀과 각종 식물을 뜯어 먹는 초식 동물이다.',
    habitat:
      '오스트레일리아 내륙의 건조한 초원과 사막 지역에 산다. 한국에는 자생하지 않으며, 이 전시물은 과학관에서 학습용으로 소개하는 것이다.',
    needsLabelVerification: false,
  },
  {
    id: 'hippopotamus',
    scientificName: 'Hippopotamus amphibius',
    koreanName: '하마',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '우제목',
      family: '하마과',
      genus: '하마속(Hippopotamus)',
      species: '하마(Hippopotamus amphibius)',
    },
    features:
      '몸집이 매우 크고 무겁지만 물속에서는 몸이 가벼워져 헤엄을 잘 치며, 낮 동안 대부분을 강이나 호수의 물속에서 보낸다. 몸집에 비해 다리가 짧고, 큰 입을 크게 벌려 위협하는 행동을 자주 보인다.',
    food: '밤이 되면 물 밖으로 나와 풀을 뜯어 먹는 초식 동물이다.',
    habitat:
      '아프리카의 강과 호수 주변에 무리를 지어 산다. 한국에는 자생하지 않으며, 이 전시물은 과학관에서 학습용으로 소개하는 것이다.',
    needsLabelVerification: false,
  },
  {
    id: 'siberian-tiger',
    scientificName: 'Panthera tigris altaica',
    koreanName: '시베리아호랑이',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '고양이과',
      genus: '표범속(Panthera)',
      species: '시베리아호랑이(Panthera tigris altaica)',
    },
    features:
      '호랑이의 여러 아종 가운데 몸집이 가장 크며, 추운 지역에 살아서 털이 두껍고 길다. 옛 백두산 일대에 살던 한국 호랑이와 유전적으로 같은 아종으로 밝혀져 있다.',
    food: '멧돼지, 사슴 등을 사냥하는 육식 동물이다.',
    habitat:
      '러시아 극동 지역과 중국 북동부의 추운 숲에 산다. 한국에는 현재 야생 개체가 없으며, 이 전시물은 과학관에서 학습용으로 소개하는 것이다.',
    needsLabelVerification: true,
  },
  {
    id: 'gray-wolf',
    scientificName: 'Canis lupus',
    koreanName: '회색늑대',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '개과',
      genus: '개속(Canis)',
      species: '회색늑대(Canis lupus)',
    },
    features:
      '개과 동물 중 몸집이 가장 크며, 무리를 지어 생활하면서 서로 협력해 사냥하는 습성이 있다. 오늘날 우리가 기르는 개는 이 동물을 조상으로 사람이 오랜 시간에 걸쳐 길들인 동물이다.',
    food: '사슴, 엘크 같은 큰 초식 동물부터 작은 동물까지 사냥해서 잡아먹는 육식 동물이다.',
    habitat:
      '북아메리카와 유라시아 대륙의 숲, 초원, 툰드라 등 다양한 환경에 무리를 지어 산다. 한국에는 현재 야생 개체가 없으며, 이 전시물은 과학관에서 학습용으로 소개하는 것이다.',
    needsLabelVerification: false,
  },
  {
    id: 'durumi',
    scientificName: 'Grus japonensis',
    koreanName: '두루미',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '두루미목',
      family: '두루미과',
      genus: '두루미속(Grus)',
      species: '두루미(Grus japonensis)',
    },
    features:
      '몸길이가 약 140cm에 이르는 대형 조류로, 몸은 흰색이고 목과 다리가 매우 길며 정수리에는 붉은 피부가 드러나 있다. 겨울철에 우리나라를 찾아오는 철새로, 짝을 지어 우아하게 춤을 추는 습성으로 유명하다.',
    food: '논과 습지에서 볍씨·풀씨·풀뿌리를 먹고, 갯벌이나 개천에서 미꾸라지·갯지렁이·수서곤충 등도 잡아먹는 잡식성이다.',
    habitat:
      '겨울철새로 비무장지대(DMZ), 강원도 철원, 한강하구·임진강 습지 등에서 무리 지어 겨울을 난다. 멸종위기 야생생물 I급으로 지정되어 보호받고 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'jeoeosae',
    scientificName: 'Platalea minor',
    koreanName: '저어새',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '사다새목',
      family: '저어새과',
      genus: '저어새속(Platalea)',
      species: '저어새(Platalea minor)',
    },
    features:
      '몸길이 60~78cm 정도이며 몸은 흰색이고 부리는 주걱처럼 넓적하게 생겼다. 번식기가 되면 머리 뒤에 노란색 벼슬깃이 생기고 가슴 깃털도 노랗게 물든다. 전 세계에 몇 천 마리밖에 남지 않은 희귀한 새로, 부리를 좌우로 저으며 먹이를 찾는 모습이 이름의 유래가 되었다.',
    food: '부리를 물속에서 좌우로 저어가며 물고기, 개구리 등 양서류, 새우 등 갑각류, 곤충류, 조개류를 찾아 잡아먹는다.',
    habitat:
      '인천 강화도·송도 등 서해안의 무인도서와 갯벌에서 번식하며, 내륙의 얕은 저수지·수로·논에서도 먹이를 찾는다. 멸종위기 야생생물 I급이자 천연기념물 제205-1호이다.',
    needsLabelVerification: false,
  },
  {
    id: 'wonang',
    scientificName: 'Aix galericulata',
    koreanName: '원앙',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '기러기목',
      family: '오리과',
      genus: '원앙속(Aix)',
      species: '원앙(Aix galericulata)',
    },
    features:
      '몸길이 약 43cm의 오리류로, 수컷은 화려한 색깔의 깃털과 위로 솟은 부채꼴 날개깃을 가지고 있어 매우 아름답다. 암컷은 전체적으로 갈색빛을 띠며 흰 점무늬가 있어 수컷과 색이 크게 다르다. 암수가 항상 붙어 다녀 예로부터 부부 금슬을 상징하는 새로 여겨져 왔다.',
    food: '도토리 등 나무열매와 곡식류를 즐겨 먹으며, 수생 곤충이나 작은 수서 동물도 먹는 잡식성이다.',
    habitat:
      '숲이 우거진 계곡·저수지·호수 등 물가 근처에 살며, 번식기에는 물가 나무의 구멍에 둥지를 튼다. 천연기념물 제327호로 지정되어 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'keunosaekddakttakguri',
    scientificName: 'Dendrocopos leucotos',
    koreanName: '큰오색딱따구리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '딱따구리목',
      family: '딱따구리과',
      genus: '딱따구리속(Dendrocopos)',
      species: '큰오색딱따구리(Dendrocopos leucotos)',
    },
    features:
      '오색딱따구리보다 몸집이 조금 더 크고, 등 아래쪽에 흰 부분이 넓게 나 있는 것이 특징이다. 부리로 나무를 두드려 구멍을 뚫고 길고 끈적한 혀를 넣어 나무속 벌레를 잡아먹는다. 꼬리 깃털로 몸을 지탱하며 나무줄기에 수직으로 붙어 이동한다.',
    food: '나무껍질이나 나무속에 사는 개미·딱정벌레 유충 등 곤충을 주로 먹으며, 가을부터 겨울에는 나무열매와 씨앗도 먹는다.',
    habitat:
      '개울가에서 멀지 않은 활엽수림·혼효림에 살며, 죽은 나무나 오래된 나무줄기에 구멍을 파서 둥지를 만든다. 한반도에는 이 종의 고유 아종인 울도큰오색딱따구리(Dendrocopos leucotos takahashii)가 서식한다.',
    needsLabelVerification: true,
  },
  {
    id: 'kkwong',
    scientificName: 'Phasianus colchicus karpowi',
    koreanName: '꿩',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '닭목',
      family: '꿩과',
      genus: '꿩속(Phasianus)',
      species: '꿩(Phasianus colchicus karpowi)',
    },
    features:
      '수컷은 몸길이 80~90cm로 긴 꼬리와 금속 광택이 나는 화려한 녹색·붉은색 깃털을 가지고 있고, 암컷은 몸길이 55~65cm로 수수한 황갈색 얼룩무늬를 띤다. 한반도 고유 아종으로, 사계절 내내 볼 수 있는 텃새이다.',
    food: '곡식·풀씨·나무열매 같은 식물성 먹이를 주로 먹고, 지렁이·곤충·거미류 등 작은 동물도 함께 먹는 잡식성이다.',
    habitat:
      '농경지, 초원, 낮은 산의 숲 가장자리 등 평지와 야산에 널리 서식한다.',
    needsLabelVerification: true,
  },
  {
    id: 'mae',
    scientificName: 'Falco peregrinus',
    koreanName: '매',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '매목',
      family: '매과',
      genus: '매속(Falco)',
      species: '매(Falco peregrinus)',
    },
    features:
      '몸길이 34~58cm의 맹금류로, 갈고리 모양의 부리와 날카로운 발톱을 가지고 있으며 날개가 길고 뾰족하다. 먹이를 사냥할 때 하늘 높이 날아올랐다가 시속 300km가 넘는 빠른 속도로 급강하하는 것으로 유명해 세계에서 가장 빠른 동물 중 하나로 꼽힌다.',
    food: '주로 꿩, 오리류 같은 다른 새를 공중에서 낚아채 잡아먹으며, 때때로 들쥐 같은 작은 포유류도 먹는다.',
    habitat:
      '무인도나 해안가의 가파른 절벽에 둥지를 틀고 번식한다. 천연기념물 제323-7호이자 멸종위기 야생생물 II급으로 보호받고 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'hwangjoroongi',
    scientificName: 'Falco tinnunculus',
    koreanName: '황조롱이',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '매목',
      family: '매과',
      genus: '매속(Falco)',
      species: '황조롱이(Falco tinnunculus)',
    },
    features:
      '몸길이 30~38cm 정도의 작은 맹금류로, 수컷은 머리와 꼬리가 회색이고 등은 붉은 갈색을 띠며, 암컷은 몸 전체가 갈색을 띤다. 공중에서 날개를 빠르게 퍼덕이며 한자리에 멈춰 떠 있는 정지비행을 하면서 먹이를 찾는 습성이 특징적이다.',
    food: '정지비행으로 지상을 살피다가 들쥐 같은 작은 설치류나 작은 새, 곤충을 덮쳐 잡아먹는다.',
    habitat:
      '도시의 고층 건물이나 절벽, 농경지 주변에서도 살아가는 텃새로, 사람이 사는 곳 가까이에서도 흔히 관찰된다.',
    needsLabelVerification: false,
  },
  {
    id: 'ppeokkugi',
    scientificName: 'Cuculus canorus',
    koreanName: '뻐꾸기',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '두견목',
      family: '두견과',
      genus: '두견속(Cuculus)',
      species: '뻐꾸기(Cuculus canorus)',
    },
    features:
      '몸길이 약 35cm로 회색빛 몸에 길쭉한 꼬리를 가지고 있어 날아갈 때 얼핏 매처럼 보이기도 한다. 자기 둥지를 만들지 않고 개개비 같은 다른 새의 둥지에 몰래 알을 낳아 대신 새끼를 기르게 하는 탁란 습성으로 잘 알려져 있다.',
    food: '나비·나방·메뚜기·매미 같은 곤충의 애벌레와 성충, 알을 주로 먹는다.',
    habitat:
      '여름철새로 5월에서 8월 사이 우리나라 전역의 산림, 하천, 농경지 주변에서 관찰되며 가을에는 아프리카로 이동해 겨울을 난다.',
    needsLabelVerification: false,
  },
  {
    id: 'waegari',
    scientificName: 'Ardea cinerea',
    koreanName: '왜가리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '사다새목',
      family: '백로과',
      genus: '왜가리속(Ardea)',
      species: '왜가리(Ardea cinerea)',
    },
    features:
      '몸길이 94~97cm로 우리나라에 사는 백로류 가운데 몸집이 가장 크며, 등은 회색이고 배와 머리는 흰색이다. 눈 뒤에서부터 검은 줄무늬가 길게 이어져 마치 댕기처럼 보인다. 목과 다리가 길어 얕은 물속에 가만히 서서 먹이를 기다리는 모습을 자주 볼 수 있다.',
    food: '물고기, 개구리, 올챙이, 새우 등 갑각류, 곤충류를 잡아먹으며 큰 개체는 황소개구리처럼 몸집이 큰 먹이도 삼킨다.',
    habitat:
      '하천, 강, 논, 습지, 갯벌 등 물가에서 살며, 높은 나무 위에 다른 백로류와 함께 무리 지어 둥지를 튼다. 예전에는 여름철새였지만 최근에는 겨울에도 남아 사는 개체가 늘고 있다.',
    needsLabelVerification: true,
  },
  {
    id: 'kkachi',
    scientificName: 'Pica sericea',
    koreanName: '까치',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '참새목',
      family: '까마귀과',
      genus: '까치속(Pica)',
      species: '까치(Pica sericea)',
    },
    features:
      '몸길이 약 45cm로 까마귀보다는 작지만 꼬리가 길게 뻗어 있으며, 어깨와 배는 흰색이고 나머지는 광택이 도는 검은색이다. 사람이 사는 마을 가까이에서 흔히 볼 수 있고, 예로부터 좋은 소식을 전해주는 길조로 여겨져 왔다. 지능이 높아 도구를 사용하거나 사람 얼굴을 구별하는 등 영리한 행동을 보이기도 한다.',
    food: '쥐, 뱀, 곤충, 다른 새의 알 등 동물성 먹이와 곡식, 과일 등 식물성 먹이를 가리지 않고 먹는 잡식성이다.',
    habitat:
      '제주도와 울릉도를 제외한 전국의 도시와 농경지에서 사는 대표적인 텃새로, 나무 높은 곳에 둥근 둥지를 짓는다.',
    needsLabelVerification: true,
  },
  {
    id: 'steller-sea-eagle',
    scientificName: 'Haliaeetus pelagicus',
    koreanName: '참수리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '수리목',
      family: '수리과',
      genus: '흰꼬리수리속(Haliaeetus)',
      species: '참수리(Haliaeetus pelagicus)',
    },
    features:
      '몸길이가 90~100cm에 이르는 대형 맹금류로, 노란색 부리와 쐐기 모양의 흰 꼬리가 특징이다. 몸은 짙은 갈색이며 어깨와 다리 쪽에 흰색 무늬가 있다.',
    food: '주로 물고기를 사냥하며, 오리나 갈매기 같은 물새와 작은 포유류도 먹는다.',
    habitat:
      '해안가 절벽이나 큰 나무에 둥지를 틀며, 러시아 극동 지역에서 번식하고 겨울에 한국을 찾는 겨울 철새다. 한국에서는 번식하지 않는 종이며 멸종위기 야생생물로 보호받는다.',
    needsLabelVerification: true,
  },
  {
    id: 'whooper-swan',
    scientificName: 'Cygnus cygnus',
    koreanName: '큰고니',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '기러기목',
      family: '오리과',
      genus: '고니속(Cygnus)',
      species: '큰고니(Cygnus cygnus)',
    },
    features:
      '몸길이가 140~160cm에 이르는 대형 물새로, 부리는 노란색과 검은색이 섞여 있고 목이 길다. 무리 중에서도 몸집이 크고 울음소리가 우렁차다.',
    food: '물풀의 뿌리와 줄기, 낟알 등을 주로 먹으며 물속에서 목을 길게 뻗어 먹이를 찾는다.',
    habitat:
      '하천 하구나 호수, 갯벌 등에서 무리 지어 겨울을 나는 겨울 철새로, 한국에서는 번식하지 않고 겨울에만 찾아온다.',
    needsLabelVerification: false,
  },
  {
    id: 'african-grey-parrot',
    scientificName: 'Psittacus erithacus',
    koreanName: '회색앵무',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '앵무목',
      family: '앵무과',
      genus: '회색앵무속(Psittacus)',
      species: '회색앵무(Psittacus erithacus)',
    },
    features:
      '몸 전체가 회색 깃털로 덮여 있고 꼬리만 붉은색인 중형 앵무새로, 사람 말소리를 비롯한 다양한 소리를 잘 흉내 내는 것으로 유명하다.',
    food: '야생에서는 다양한 열매와 씨앗, 견과류를 먹는다.',
    habitat:
      '아프리카 중서부의 열대 우림 지역에 서식하며, 한국에는 자생하지 않고 반려동물로 사육된다.',
    needsLabelVerification: false,
  },
  {
    id: 'common-ostrich',
    scientificName: 'Struthio camelus',
    koreanName: '타조',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '타조목',
      family: '타조과',
      genus: '타조속(Struthio)',
      species: '타조(Struthio camelus)',
    },
    features:
      '현재 살아있는 새 중 몸집이 가장 크며 날개가 퇴화하여 날지 못하지만, 다리 힘이 강해 매우 빠르게 달릴 수 있다.',
    food: '풀과 씨앗, 열매 등 식물을 주로 먹고 가끔 곤충이나 작은 동물도 먹는다.',
    habitat:
      '아프리카의 사바나와 사막 지역에 서식하며, 한국에는 자생하지 않는다.',
    needsLabelVerification: false,
  },
  {
    id: 'emperor-penguin',
    scientificName: 'Aptenodytes forsteri',
    koreanName: '황제펭귄',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '펭귄목',
      family: '펭귄과',
      genus: '황제펭귄속(Aptenodytes)',
      species: '황제펭귄(Aptenodytes forsteri)',
    },
    features:
      '펭귄 중에서 몸집이 가장 크며 날지 못하는 대신 헤엄을 아주 잘 치고, 혹독한 추위 속에서 무리를 지어 서로 몸을 붙여 체온을 유지한다.',
    food: '물고기와 오징어, 크릴새우 등을 잡아먹는다.',
    habitat:
      '남극 대륙의 얼음 위에서 서식하며, 한국에는 자생하지 않는다.',
    needsLabelVerification: false,
  },
  {
    id: 'oriental-scops-owl',
    scientificName: 'Otus sunia',
    koreanName: '소쩍새',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '올빼미목',
      family: '올빼미과',
      genus: '소쩍새속(Otus)',
      species: '소쩍새(Otus sunia)',
    },
    features:
      '몸길이가 약 20cm 정도인 작은 올빼미류로, 눈이 노랗고 밤에 활동하며 특유의 울음소리로 잘 알려져 있다.',
    food: '곤충과 거미 등을 주로 잡아먹는다.',
    habitat:
      '숲이나 마을 근처 나무 구멍에서 번식하는 여름 철새로, 한국에서 흔히 볼 수 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'daurian-redstart',
    scientificName: 'Phoenicurus auroreus',
    koreanName: '딱새',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '참새목',
      family: '딱새과',
      genus: '딱새속(Phoenicurus)',
      species: '딱새(Phoenicurus auroreus)',
    },
    features:
      '몸길이가 약 15cm인 작은 새로, 수컷은 배와 꼬리가 주황빛을 띠고 머리는 은회색을 띠어 색이 화려하다.',
    food: '곤충이나 거미 같은 작은 동물을 주로 먹고, 가을과 겨울에는 열매도 먹는다.',
    habitat:
      '도시 공원, 마을, 산기슭 등 사람 가까이에서도 흔히 볼 수 있으며 한국에서 사계절 살아가는 텃새다.',
    needsLabelVerification: true,
  },
  {
    id: 'common-kingfisher',
    scientificName: 'Alcedo atthis',
    koreanName: '물총새',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '파랑새목',
      family: '물총새과',
      genus: '물총새속(Alcedo)',
      species: '물총새(Alcedo atthis)',
    },
    features:
      '등은 파란빛과 초록빛이 도는 화려한 색이고 배는 주황색이며, 부리가 길고 뾰족해 물속으로 빠르게 뛰어들어 사냥한다.',
    food: '작은 물고기와 물속 곤충, 새우 등을 잡아먹는다.',
    habitat:
      '하천이나 저수지, 연못 등 물가에서 서식하며 한국 전역에서 볼 수 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'black-tailed-gull',
    scientificName: 'Larus crassirostris',
    koreanName: '괭이갈매기',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '도요목',
      family: '갈매기과',
      genus: '갈매기속(Larus)',
      species: '괭이갈매기(Larus crassirostris)',
    },
    features:
      '부리 끝에 검은 띠와 붉은 반점이 있고 꼬리 끝이 검은 것이 특징이며, 고양이 울음소리와 비슷한 소리를 내는 것으로 유명하다.',
    food: '물고기와 오징어 등을 주로 먹으며, 사람이 버린 음식물도 먹는 잡식성이다.',
    habitat:
      '한국 서해와 남해의 무인도 등에서 집단으로 번식하는 텃새로, 동아시아 해안 지역에 널리 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'eurasian-eagle-owl',
    scientificName: 'Bubo bubo',
    koreanName: '수리부엉이',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조강',
      order: '올빼미목',
      family: '올빼미과',
      genus: '수리부엉이속(Bubo)',
      species: '수리부엉이(Bubo bubo)',
    },
    features:
      '세계에서 가장 큰 올빼미류 중 하나로, 머리 양옆에 귀처럼 솟은 깃털 뭉치와 주황색 눈이 특징이다.',
    food: '쥐 같은 작은 포유류와 새, 파충류 등 다양한 동물을 사냥해 먹는다.',
    habitat:
      '바위 절벽이나 숲이 우거진 산지에서 서식하며 한국 전역에 사는 텃새다.',
    needsLabelVerification: false,
  },
  {
    id: 'crucian-carp',
    scientificName: 'Carassius auratus',
    koreanName: '붕어',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '잉어목',
      family: '잉어과',
      genus: '붕어속(Carassius)',
      species: '붕어(Carassius auratus)',
    },
    features:
      '몸은 옆으로 납작하고 등이 둥글게 솟아 있으며, 입 주위에 수염이 없는 것이 비슷하게 생긴 잉어와 다른 점이다. 몸빛은 대체로 황갈색이나 은빛을 띠며, 환경에 적응력이 강해 논, 저수지, 하천 등 다양한 물에서 흔히 볼 수 있다.',
    food: '동물성 플랑크톤, 실지렁이, 수서곤충, 물풀 등을 가리지 않고 먹는 잡식성 물고기이다.',
    habitat:
      '물살이 느린 강 하류, 저수지, 논도랑 등 우리나라 전역의 민물에 널리 서식한다.',
    needsLabelVerification: true,
  },
  {
    id: 'common-carp',
    scientificName: 'Cyprinus carpio',
    koreanName: '잉어',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '잉어목',
      family: '잉어과',
      genus: '잉어속(Cyprinus)',
      species: '잉어(Cyprinus carpio)',
    },
    features:
      '몸은 길쭉하고 옆으로 약간 납작하며, 입 주위에 두 쌍의 수염이 있어 붕어와 구별된다. 몸길이는 보통 40~50cm 정도이지만 크게는 1m까지도 자라는 대형 민물고기이다.',
    food: '물풀, 수서곤충, 조개류, 실지렁이 등을 먹으며 입으로 바닥의 흙을 빨아들여 먹이를 걸러 먹는 잡식성이다.',
    habitat:
      '큰 강의 중·하류나 호수, 저수지처럼 물이 깊고 흐름이 느린 곳에서 산다.',
    needsLabelVerification: true,
  },
  {
    id: 'amur-catfish',
    scientificName: 'Silurus asotus',
    koreanName: '메기',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '메기목',
      family: '메기과',
      genus: '메기속(Silurus)',
      species: '메기(Silurus asotus)',
    },
    features:
      '몸에 비늘이 없고 미끈거리는 점액으로 덮여 있으며, 입가에 긴 수염이 두 쌍 있어 어두운 물속에서도 먹이를 잘 찾는다. 몸통은 원통형이지만 꼬리 쪽으로 갈수록 옆으로 납작해진다.',
    food: '밤에 주로 활동하며 작은 물고기, 개구리, 새우, 수서곤충 등을 잡아먹는 육식성 물고기이다.',
    habitat:
      '물풀이 우거지고 흐름이 느린 하천, 저수지, 늪 등 우리나라 전역의 민물 바닥 근처에서 산다.',
    needsLabelVerification: false,
  },
  {
    id: 'mandarin-fish',
    scientificName: 'Siniperca scherzeri',
    koreanName: '쏘가리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '농어목',
      family: '쏘가리과',
      genus: '쏘가리속(Siniperca)',
      species: '쏘가리(Siniperca scherzeri)',
    },
    features:
      '입이 크고 날카로운 이빨을 가진 육식성 민물고기로, 몸에는 불규칙한 갈색 얼룩무늬가 있어 바위 사이에서 몸을 숨기기 좋다. 등지느러미 앞쪽에 단단한 가시가 있는 것도 특징이다.',
    food: '작은 물고기와 새우 등을 통째로 잡아먹는 육식성이며, 매복해 있다가 먹이가 지나가면 빠르게 덮친다.',
    habitat:
      '물이 맑고 바위와 자갈이 많은 강 상·중류의 여울과 소에서 산다.',
    needsLabelVerification: true,
  },
  {
    id: 'ayu-sweetfish',
    scientificName: 'Plecoglossus altivelis',
    koreanName: '은어',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '바다빙어목',
      family: '바다빙어과',
      genus: '은어속(Plecoglossus)',
      species: '은어(Plecoglossus altivelis)',
    },
    features:
      '몸이 가늘고 길며 은백색으로 빛나고, 특유의 수박 향 같은 냄새가 나는 것으로 유명하다. 돌에 붙은 조류를 갉아먹기 좋게 혀와 이빨 모양이 특이하게 발달했다.',
    food: '강바닥의 돌이나 자갈에 붙은 규조류 등 부착조류를 갉아먹는 초식성에 가까운 물고기이다.',
    habitat:
      '바다와 강을 오가며 사는 물고기로, 가을에 강 하류에서 알을 낳고 부화한 새끼는 바다에서 자란 뒤 봄에 다시 강을 거슬러 올라온다.',
    needsLabelVerification: false,
  },
  {
    id: 'mud-loach',
    scientificName: 'Misgurnus anguillicaudatus',
    koreanName: '미꾸리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '잉어목',
      family: '미꾸리과',
      genus: '미꾸리속(Misgurnus)',
      species: '미꾸리(Misgurnus anguillicaudatus)',
    },
    features:
      '몸이 둥글고 길며 비늘이 매우 작아 미끈미끈하고, 입 주위에 짧은 수염이 여러 쌍 있다. 아가미뿐 아니라 장(창자)으로도 공기 호흡을 할 수 있어 산소가 적은 진흙 속에서도 잘 견딘다.',
    food: '진흙 속의 유기물, 작은 수서곤충, 미생물 등을 걸러 먹는 잡식성이다.',
    habitat:
      '논, 저수지, 도랑처럼 물이 얕고 바닥이 진흙으로 된 곳에서 주로 산다.',
    needsLabelVerification: true,
  },
  {
    id: 'northern-snakehead',
    scientificName: 'Channa argus',
    koreanName: '가물치',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '농어목',
      family: '가물치과',
      genus: '가물치속(Channa)',
      species: '가물치(Channa argus)',
    },
    features:
      '몸이 길고 둥글며 머리 모양이 뱀을 닮아 영어 이름도 \'snakehead\'이다. 아가미뿐 아니라 공기 호흡 기관이 있어 물 밖에서도 한동안 숨을 쉴 수 있다.',
    food: '작은 물고기, 개구리, 물벌레 등을 잡아먹는 육식성 물고기이다.',
    habitat:
      '물풀이 많고 흐름이 느린 저수지, 늪, 하천의 정체 수역에서 산다.',
    needsLabelVerification: false,
  },
  {
    id: 'sailfin-sandfish',
    scientificName: 'Arctoscopus japonicus',
    koreanName: '도루묵',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '농어목',
      family: '도루묵과',
      genus: '도루묵속(Arctoscopus)',
      species: '도루묵(Arctoscopus japonicus)',
    },
    features:
      '비늘이 없어 몸이 매끈하며, 눈이 머리 위쪽에 붙어 있고 입이 위를 향해 있다. 늦가을에서 초겨울 사이 해안 가까이로 몰려와 알을 낳는 습성으로 잘 알려져 있다.',
    food: '작은 갑각류와 플랑크톤, 어린 물고기 등을 먹는 육식성 바닷물고기이다.',
    habitat:
      '동해와 같은 차가운 바다의 모래 바닥 근처에서 살며, 산란기에는 연안 얕은 곳으로 이동한다.',
    needsLabelVerification: true,
  },
  {
    id: 'olive-flounder',
    scientificName: 'Paralichthys olivaceus',
    koreanName: '넙치',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '가자미목',
      family: '넙치과',
      genus: '넙치속(Paralichthys)',
      species: '넙치(Paralichthys olivaceus)',
    },
    features:
      '몸이 매우 납작하고 두 눈이 모두 몸의 왼쪽에 몰려 있으며, \'광어\'라는 이름으로도 널리 불린다. 어릴 때는 다른 물고기처럼 양쪽에 눈이 있지만 자라면서 한쪽 눈이 반대편으로 이동한다.',
    food: '작은 물고기와 새우, 오징어 등을 잡아먹는 육식성 물고기이다.',
    habitat:
      '바다 밑 모래나 뻘 바닥에 몸을 숨기고 살며, 우리나라 전 해역의 연안에서 흔히 발견된다.',
    needsLabelVerification: true,
  },
  {
    id: 'great-white-shark',
    scientificName: 'Carcharodon carcharias',
    koreanName: '백상아리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '연골어강',
      order: '악상어목',
      family: '악상어과',
      genus: '백상아리속(Carcharodon)',
      species: '백상아리(Carcharodon carcharias)',
    },
    features:
      '몸길이가 보통 4~5m에 이르는 대형 상어로, 등은 회색, 배는 흰색을 띠어 위아래 어느 방향에서 봐도 눈에 잘 띄지 않는다. 뼈가 아닌 물렁뼈(연골)로 이루어진 골격을 가진 연골어류의 대표적인 예이다.',
    food: '물개, 바다사자 같은 해양 포유류와 물고기, 오징어 등을 잡아먹는 바다 최상위 포식자이다.',
    habitat:
      '전 세계 온대와 아열대 바다의 연안에서 대양까지 폭넓게 분포하며, 우리나라 근해에서는 매우 드물게 발견된다.',
    needsLabelVerification: false,
  },
  {
    id: 'namsaengi',
    scientificName: 'Mauremys reevesii',
    koreanName: '남생이',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '파충강',
      order: '거북목',
      family: '돌거북과',
      genus: '남생이속(Mauremys)',
      species: '남생이(Mauremys reevesii)',
    },
    features:
      '등딱지 길이가 25~45cm 정도 되는 민물 거북으로, 등딱지는 짙은 갈색이고 가운데와 양옆에 세 줄의 뚜렷한 돌기 줄(용골)이 있다. 머리 옆면에는 눈 뒤부터 목까지 이어지는 노란 줄무늬가 여러 개 있다. 우리나라에서는 개체수가 매우 적어 멸종위기 야생생물 II급이자 천연기념물로 보호받고 있다.',
    food: '잡식성으로 물풀과 수면에 떨어진 곤충, 다슬기·우렁이 같은 고둥류, 갑각류, 죽은 물고기 등을 가리지 않고 먹는다.',
    habitat:
      '하천, 호수, 저수지, 연못처럼 물살이 느린 민물에 살며 한국 전역에 분포하지만 서식지 파괴로 야생 개체는 매우 드물다.',
    needsLabelVerification: false,
  },
  {
    id: 'jara',
    scientificName: 'Pelodiscus maackii',
    koreanName: '자라',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '파충강',
      order: '거북목',
      family: '자라과',
      genus: '자라속(Pelodiscus)',
      species: '자라(Pelodiscus maackii)',
    },
    features:
      '등딱지가 딱딱한 뼈판 대신 부드럽고 가죽 같은 피부로 덮여 있는 것이 가장 큰 특징이며, 목이 길게 늘어나고 코끝이 대롱처럼 튀어나와 있어 물속에서 코만 내밀고 숨을 쉴 수 있다. 몸이 납작하고 발에 물갈퀴가 있어 헤엄을 매우 잘 친다.',
    food: '육식성에 가까운 잡식성으로 물고기, 새우, 다슬기, 수서 곤충 등을 활발히 사냥해서 먹는다.',
    habitat:
      '물살이 느린 강, 저수지, 습지의 진흙 바닥에 몸을 반쯤 파묻고 지내며 러시아 극동, 중국 동북부, 한반도에 분포한다.',
    needsLabelVerification: true,
  },
  {
    id: 'dorongnyong',
    scientificName: 'Hynobius leechii',
    koreanName: '도롱뇽',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '양서강',
      order: '도롱뇽목',
      family: '도롱뇽과',
      genus: '도롱뇽속(Hynobius)',
      species: '도롱뇽(Hynobius leechii)',
    },
    features:
      '몸통이 길쭉하고 네 개의 짧은 다리가 있어 얼핏 도마뱀처럼 보이지만 개구리와 더 가까운 양서류이다. 어릴 때는 물속에서 아가미로 숨을 쉬다가 자라면서 아가미가 사라지고 폐로 숨을 쉬게 되며, 앞다리가 뒷다리보다 먼저 자라는 것이 올챙이와 다른 점이다.',
    food: '어린 유생일 때는 물속의 작은 곤충 애벌레나 물벼룩 등을 먹고, 다 자란 뒤에는 지렁이·거미·곤충 같은 작은 무척추동물을 잡아먹는다.',
    habitat:
      '산기슭의 계곡이나 논, 물이 고인 웅덩이 등 습기가 많은 곳에 살며 한반도 전역과 중국 동북부, 러시아 연해주 일부에 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'dukkeobi',
    scientificName: 'Bufo sachalinensis',
    koreanName: '두꺼비',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '양서강',
      order: '개구리목',
      family: '두꺼비과',
      genus: '두꺼비속(Bufo)',
      species: '두꺼비(Bufo sachalinensis)',
    },
    features:
      '몸길이가 8~11cm에 이르러 한반도에 사는 개구리목 양서류 중 가장 크다. 등에는 오돌토돌한 돌기가 가득하고 피부는 대체로 짙은 갈색을 띠며, 다리 힘이 약해 잘 뛰지 못하고 엉금엉금 기어 다닌다. 피부에서 \'부포톡신\'이라는 독 물질을 내뿜어 천적으로부터 몸을 지킨다.',
    food: '밤에 주로 활동하며 지렁이, 달팽이, 곤충 등 땅 위의 작은 동물을 혀로 잡아먹는다.',
    habitat:
      '숲, 풀밭, 논밭 주변의 습한 땅에 살고 번식기에만 물웅덩이나 연못을 찾으며 한반도와 중국 동북부, 러시아 연해주 등에 분포한다.',
    needsLabelVerification: true,
  },
  {
    id: 'cheonggaeguri',
    scientificName: 'Dryophytes japonicus',
    koreanName: '청개구리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '양서강',
      order: '개구리목',
      family: '청개구리과',
      genus: '청개구리속(Dryophytes)',
      species: '청개구리(Dryophytes japonicus)',
    },
    features:
      '몸길이가 2~4cm로 작고, 등은 밝은 녹색이나 황록색 바탕에 짙은 무늬가 있으며 주변 환경에 따라 몸 색깔을 바꿀 수 있다. 발가락 끝에 동그란 흡반이 발달해 있어 나뭇잎이나 유리처럼 매끈한 곳에도 잘 붙어 있을 수 있다.',
    food: '곤충이나 거미 같은 작은 벌레를 혀로 잡아먹는 육식성이다.',
    habitat:
      '번식기에는 논이나 웅덩이 같은 물가에서 지내지만 평소에는 나무나 풀잎 위에서 생활하며, 한반도를 포함한 동아시아 저지대 평지에 널리 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'yuhyeolmogi',
    scientificName: 'Rhabdophis tigrinus',
    koreanName: '유혈목이',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '파충강',
      order: '유린목',
      family: '뱀과',
      genus: '유혈목이속(Rhabdophis)',
      species: '유혈목이(Rhabdophis tigrinus)',
    },
    features:
      '몸길이 50~120cm 정도로, 몸통 앞쪽에는 붉은 무늬가 목 부분에는 노란 무늬가 있어 \'꽃뱀\'이라는 별명으로도 불린다. 예전에는 독이 없는 뱀으로 알려졌지만 사실은 입 안쪽 뒤쪽에 독니가 있는 독사여서 함부로 만지면 위험하다.',
    food: '개구리와 두꺼비를 가장 즐겨 먹고 그 밖에 도롱뇽이나 쥐도 잡아먹는다.',
    habitat:
      '논이나 하천 주변, 낮은 산지에서 흔히 볼 수 있으며 한반도, 일본, 중국 동부, 대만, 러시아 극동 지역 등에 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'neungguryeongi',
    scientificName: 'Lycodon rufozonatus',
    koreanName: '능구렁이',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '파충강',
      order: '유린목',
      family: '뱀과',
      genus: '능구렁이속(Lycodon)',
      species: '능구렁이(Lycodon rufozonatus)',
    },
    features:
      '몸길이가 120cm 정도로 붉은빛이 도는 갈색 몸통에 굵고 검은 띠무늬가 50~70개나 있어 화려한 무늬가 특징이다. 낮에는 돌 밑이나 굴속에 숨어 있다가 밤이 되면 나와 움직인다.',
    food: '다른 뱀을 즐겨 잡아먹는 것으로 유명하며, 그 밖에도 개구리, 두꺼비, 물고기, 알, 작은 새와 포유류까지 다양하게 먹는다.',
    habitat:
      '평지, 산기슭, 논 주변에 살며 한반도, 중국, 대만, 베트남 등지에 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'nailagoe',
    scientificName: 'Crocodylus niloticus',
    koreanName: '나일악어',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '파충강',
      order: '악어목',
      family: '크로코딜루스과',
      genus: '크로코딜루스속(Crocodylus)',
      species: '나일악어(Crocodylus niloticus)',
    },
    features:
      '몸길이가 수컷은 3.5~5m, 암컷은 2.4~4m에 이르는 대형 파충류로 몸무게는 보통 225~500kg이며 큰 개체는 750kg까지도 나간다. 등은 어두운 구릿빛에 검은 점무늬가 있고 턱 힘이 매우 강해 아프리카에서 가장 위협적인 포식자 중 하나로 꼽힌다.',
    food: '물고기, 파충류, 양서류, 갑각류부터 물가에 접근한 얼룩말이나 영양 같은 포유류까지 다양한 동물을 사냥해 먹는다.',
    habitat:
      '강, 호수, 습지 등 다양한 민물 환경에 살며 사하라 사막 이남 아프리카 여러 나라에 널리 분포한다. 한국에는 서식하지 않으며 동물원에서만 볼 수 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'chorogiguana',
    scientificName: 'Iguana iguana',
    koreanName: '초록이구아나',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '파충강',
      order: '유린목',
      family: '이구아나과',
      genus: '이구아나속(Iguana)',
      species: '초록이구아나(Iguana iguana)',
    },
    features:
      '머리부터 꼬리까지 몸길이가 최대 1.7~2m에 이르는 대형 도마뱀으로 몸은 대체로 초록빛을 띠지만 개체에 따라 색이 다양하다. 등을 따라 톱니 모양의 돌기가 줄지어 나 있고 목 아래에는 늘어진 큰 피부주름(턱주머니)이 있다.',
    food: '어릴 때는 곤충도 조금 먹지만 자라면서 점점 나뭇잎, 꽃, 열매 같은 식물을 주로 먹는 초식성으로 바뀐다.',
    habitat:
      '열대 우림의 나무 위에서 주로 생활하며 중남미의 멕시코 남부부터 브라질, 파라과이까지 넓게 분포한다. 한국에는 서식하지 않으며 반려동물이나 동물원에서 볼 수 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'pyobeomchameleon',
    scientificName: 'Furcifer pardalis',
    koreanName: '표범카멜레온',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '파충강',
      order: '유린목',
      family: '카멜레온과',
      genus: '카멜레온속(Furcifer)',
      species: '표범카멜레온(Furcifer pardalis)',
    },
    features:
      '몸길이가 약 23cm 정도이며 수컷은 빨강, 초록, 청록 등 매우 화려한 색과 세로 줄무늬를 갖고 있는 반면 암컷은 대체로 연한 초록이나 분홍빛을 띤다. 눈은 양쪽이 따로 움직여 넓은 범위를 볼 수 있고, 긴 혀를 순식간에 뻗어 먹이를 잡는다.',
    food: '귀뚜라미, 밀웜, 바퀴벌레 등 살아있는 곤충만 잡아먹는 완전한 육식성이다.',
    habitat:
      '저지대의 건조한 낙엽수림이나 강가, 길가의 나무숲을 좋아하며 아프리카 마다가스카르섬에서만 자연적으로 서식한다. 한국에는 서식하지 않으며 반려동물로 기르거나 동물원에서 볼 수 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'jangsu-pungdengi',
    scientificName: 'Allomyrina dichotoma',
    koreanName: '장수풍뎅이',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '딱정벌레목',
      family: '풍뎅이과',
      genus: '장수풍뎅이속(Allomyrina)',
      species: '장수풍뎅이(Allomyrina dichotoma)',
    },
    features:
      '수컷 머리에는 코뿔소처럼 크게 갈라진 뿔이 있어 다른 수컷과 힘을 겨루는 데 쓴다. 몸은 광택이 나는 짙은 갈색이며, 딱정벌레 무리 중에서도 몸집이 크고 힘이 세서 자기 몸무게의 수십 배를 끌 수 있다. 애벌레(굼벵이)로 겨울을 나고 여름에 어른벌레가 되어 활동한다.',
    food: '어른벌레는 참나무 등에서 흘러나오는 나무 수액을 핥아 먹고, 애벌레는 썩은 나뭇잎이나 부엽토(퇴비)를 먹으며 자란다.',
    habitat:
      '참나무가 많은 활엽수림이나 그 주변 야산에서 살며, 낮에는 나무껍질 틈이나 흙 속에 숨어 있다가 밤에 활동한다. 한국 전역의 저지대 숲에서 여름철에 흔히 볼 수 있다.',
    needsLabelVerification: true,
  },
  {
    id: 'wang-saseumbeolle',
    scientificName: 'Dorcus hopei',
    koreanName: '왕사슴벌레',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '딱정벌레목',
      family: '사슴벌레과',
      genus: '사슴벌레속(Dorcus)',
      species: '왕사슴벌레(Dorcus hopei)',
    },
    features:
      '수컷은 사슴뿔처럼 크게 발달한 큰턱(큰 이빨 모양의 턱)을 가지고 있어 다른 수컷과 밀어내기 싸움을 벌인다. 몸은 광택이 있는 검은색이며, 한국에 사는 사슴벌레 중에서도 크고 힘이 세다. 성충 수명이 3~4년으로 비교적 길어 여러 해를 사는 편이다.',
    food: '어른벌레는 참나무류의 상처 난 부위에서 나오는 나무 수액을 먹고, 애벌레는 오래되어 썩은 참나무 고목(죽은 나무) 속을 파먹으며 자란다.',
    habitat:
      '참나무가 우거진 산림, 특히 고목이나 그루터기가 있는 활엽수림에서 서식한다. 한국, 중국, 일본에 걸쳐 분포한다.',
    needsLabelVerification: true,
  },
  {
    id: 'chammaemi',
    scientificName: 'Hyalessa maculaticollis',
    koreanName: '참매미',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '노린재목',
      family: '매미과',
      genus: '참매미속(Hyalessa)',
      species: '참매미(Hyalessa maculaticollis)',
    },
    features:
      '몸은 검은빛을 띠고 등에 초록빛 무늬가 있으며, 날개는 투명하다. 수컷은 배 속의 발음 기관을 울려 \'맴맴맴\' 하는 크고 리드미컬한 소리를 내어 짝을 찾는다. 여름철 한낮에 가장 활발하게 우는 대표적인 매미 중 하나이다.',
    food: '애벌레(굼벵이)는 땅속에서 여러 해 동안 나무뿌리의 즙을 빨아 먹고, 어른벌레는 나무줄기에 침처럼 생긴 입을 꽂아 나무의 수액을 빨아 먹는다.',
    habitat:
      '도시 공원이나 산의 활엽수림 등 나무가 많은 곳에서 서식하며, 애벌레 시기 대부분을 땅속에서 보내다가 여름에 땅 위로 나와 나무에서 허물을 벗고 성충이 된다.',
    needsLabelVerification: true,
  },
  {
    id: 'bangakkaebi',
    scientificName: 'Acrida cinerea',
    koreanName: '방아깨비',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '메뚜기목',
      family: '메뚜기과',
      genus: '방아깨비속(Acrida)',
      species: '방아깨비(Acrida cinerea)',
    },
    features:
      '몸이 가늘고 길며 초록색이나 회갈색을 띠어 풀숲에 잘 숨는다. 뒷다리가 매우 길고 튼튼해서 멀리뛰기를 잘하며, 뒷다리를 잡고 있으면 몸을 위아래로 흔드는 모습이 마치 방아를 찧는 것 같다 하여 이름이 붙었다. 암컷이 수컷보다 몸집이 훨씬 크다.',
    food: '볏과 식물이나 억새, 강아지풀 등 여러 종류의 풀잎을 갉아 먹으며 산다.',
    habitat:
      '햇볕이 잘 드는 풀밭이나 논밭 주변, 강둑 등 풀이 무성한 곳에서 서식하며 한국 전역에서 여름부터 가을까지 볼 수 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'wang-samagwi',
    scientificName: 'Tenodera sinensis',
    koreanName: '왕사마귀',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '사마귀목',
      family: '사마귀과',
      genus: '사마귀속(Tenodera)',
      species: '왕사마귀(Tenodera sinensis)',
    },
    features:
      '삼각형 머리를 자유롭게 돌릴 수 있고, 앞다리에 날카로운 가시가 나 있어 먹이를 낚아채듯 붙잡는다. 몸빛은 초록색이거나 갈색이며, 한국에 사는 사마귀 중 몸집이 가장 크다. 늦가을에 거품 모양의 알집을 나뭇가지 등에 붙여 알을 낳고 겨울을 난다.',
    food: '메뚜기, 파리, 나방 등 다른 곤충을 앞다리로 붙잡아 잡아먹는 육식성 곤충이다.',
    habitat:
      '풀밭, 숲 가장자리, 논밭 주변 등 먹이가 되는 곤충이 많은 곳에서 서식하며 한국 전역에 널리 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'muljanggun',
    scientificName: 'Lethocerus deyrollei',
    koreanName: '물장군',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '노린재목',
      family: '물장군과',
      genus: '물장군속(Lethocerus)',
      species: '물장군(Lethocerus deyrollei)',
    },
    features:
      '한국 수생 곤충 중 몸집이 가장 크며, 낫처럼 굽은 강한 앞다리로 먹이를 붙잡는다. 뒷다리는 넓적하고 털이 나 있어 노처럼 저어 헤엄친다. 물속에서 숨을 쉬기 위해 꼬리 끝을 물 밖으로 내밀어 공기를 저장한다.',
    food: '올챙이, 작은 물고기, 다른 물속 곤충 등을 앞다리로 붙잡아 체액을 빨아 먹는 육식성 곤충이다.',
    habitat:
      '물풀이 많고 물이 깨끗한 저수지나 연못, 논에서 서식하나, 서식지가 크게 줄어 현재 멸종위기 야생생물 II급으로 지정되어 보호받고 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'neut-bandutbuli',
    scientificName: 'Pyrocoelia rufa',
    koreanName: '늦반딧불이',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '딱정벌레목',
      family: '반딧불이과',
      genus: '늦반딧불이속(Pyrocoelia)',
      species: '늦반딧불이(Pyrocoelia rufa)',
    },
    features:
      '배 끝에 있는 발광 기관에서 노란빛이나 초록빛을 내는데, 다른 반딧불이처럼 깜빡이지 않고 은은하게 계속 빛을 내는 것이 특징이다. 다른 종보다 늦은 늦여름(8월 중순~9월 중순)에 나타나 짧은 시간 동안만 활동한다.',
    food: '애벌레는 달팽이 등을 잡아먹는 육식성이며, 어른벌레는 입이 퇴화하여 거의 먹이를 먹지 않고 짧은 기간 동안 살다가 짝짓기 후 죽는다.',
    habitat:
      '농약을 쓰지 않는 깨끗한 물과 흙이 있는 습한 산기슭이나 계곡 주변에서 서식하며, 환경 오염에 민감해 청정 지역의 지표종으로 여겨진다.',
    needsLabelVerification: false,
  },
  {
    id: 'baechu-huinnabi',
    scientificName: 'Pieris rapae',
    koreanName: '배추흰나비',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '나비목',
      family: '흰나비과',
      genus: '흰나비속(Pieris)',
      species: '배추흰나비(Pieris rapae)',
    },
    features:
      '날개는 전체적으로 흰색이며 앞날개 끝과 가장자리에 검은 무늬가 있다. 애벌레는 초록색 몸에 짧은 털이 나 있으며, 배추나 무 같은 십자화과 채소의 잎을 갉아 먹어 농작물 해충으로도 잘 알려져 있다. 봄부터 가을까지 여러 세대를 거치며 번식한다.',
    food: '애벌레는 배추, 무, 양배추 등 십자화과 채소의 잎을 먹고, 어른벌레는 여러 꽃에서 꿀을 빨아 먹는다.',
    habitat:
      '채소밭, 들판, 공원 등 사람이 사는 곳 가까이에서 흔히 볼 수 있으며 한국 전역에 널리 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'horang-nabi',
    scientificName: 'Papilio xuthus',
    koreanName: '호랑나비',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '나비목',
      family: '호랑나비과',
      genus: '호랑나비속(Papilio)',
      species: '호랑나비(Papilio xuthus)',
    },
    features:
      '노란빛이 도는 날개에 검은 줄무늬가 있어 호랑이 무늬처럼 보인다고 하여 이름이 붙었다. 뒷날개 끝에는 꼬리처럼 뾰족하게 튀어나온 부분이 있다. 봄에 나오는 개체(봄형)는 여름에 나오는 개체(여름형)보다 크기가 작다.',
    food: '애벌레는 귤나무, 산초나무, 황벽나무 등 운향과 식물의 잎을 갉아 먹고, 어른벌레는 여러 꽃의 꿀을 빨아 먹는다.',
    habitat:
      '산과 들, 과수원, 공원 등 먹이식물이 자라는 곳이라면 어디서나 볼 수 있으며 한국을 포함해 동아시아에 널리 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'chilseong-mudangbeolle',
    scientificName: 'Coccinella septempunctata',
    koreanName: '칠성무당벌레',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '딱정벌레목',
      family: '무당벌레과',
      genus: '무당벌레속(Coccinella)',
      species: '칠성무당벌레(Coccinella septempunctata)',
    },
    features:
      '붉은 딱지날개에 검은 점이 7개 있어 이런 이름이 붙었으며, 학명도 \'점이 7개\'라는 뜻의 라틴어에서 왔다. 반구 모양의 동그란 몸을 가지고 있으며, 위협을 느끼면 다리 관절에서 노란 액체를 내어 나쁜 냄새로 적을 쫓는다.',
    food: '진딧물을 매우 많이 잡아먹는 육식성 곤충으로, 애벌레와 어른벌레 모두 하루에 수십 마리의 진딧물을 먹어치워 농작물을 지키는 익충으로 알려져 있다.',
    habitat:
      '진딧물이 많은 풀밭, 밭, 정원, 나무 위 등에서 흔히 볼 수 있으며 한국을 포함한 유라시아 전역에 널리 분포한다.',
    needsLabelVerification: false,
  },
  {
    id: 'yeochi',
    scientificName: 'Gampsocleis sedakovii obscura',
    koreanName: '여치',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '메뚜기목',
      family: '여치과',
      genus: '여치속(Gampsocleis)',
      species: '여치(Gampsocleis sedakovii obscura)',
    },
    features:
      '몸길이는 33~45mm 정도이며 몸빛깔은 대체로 녹색을 띠고 몸통이 통통하다. 성충이 되면 육식성이 강해져 다른 곤충을 잡아먹기도 하며, 수컷은 앞날개를 비벼 \'찌르르 찌르르\' 하는 큰 울음소리를 낸다.',
    food: '잡식성으로 어릴 때는 풀잎이나 꽃도 먹지만, 성충이 되면 다른 곤충을 잡아먹는 육식성이 강해진다.',
    habitat:
      '햇볕이 잘 드는 산 가장자리의 덤불이나 풀숲, 초지에서 산다.',
    needsLabelVerification: false,
  },
  {
    id: 'wangjamjari',
    scientificName: 'Anax parthenope julius',
    koreanName: '왕잠자리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '잠자리목',
      family: '왕잠자리과',
      genus: '왕잠자리속(Anax)',
      species: '왕잠자리(Anax parthenope julius)',
    },
    features:
      '몸길이 48~54mm에 이르는 대형 잠자리로 가슴은 녹색이며 무늬가 없다. 배에는 선명한 남색 무늬가 있어 암수 구별이 쉽다.',
    food: '유충(수채)일 때는 물속에서 작은 곤충이나 올챙이를 잡아먹고, 성충이 되면 날아다니며 모기 등 작은 곤충을 사냥한다.',
    habitat:
      '수초가 많은 저수지나 연못에 살며, 물살이 느린 하천 가장자리에서도 발견된다.',
    needsLabelVerification: false,
  },
  {
    id: 'kkulbeol',
    scientificName: 'Apis mellifera',
    koreanName: '양봉꿀벌',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '벌목',
      family: '꿀벌과',
      genus: '꿀벌속(Apis)',
      species: '양봉꿀벌(Apis mellifera)',
    },
    features:
      '여왕벌, 일벌, 수벌로 역할이 나뉘어 무리를 지어 사회생활을 하며 벌집을 짓고 함께 살아간다. 몸에 난 털에 꽃가루가 잘 달라붙어 식물의 꽃가루받이(수분)를 돕는 중요한 곤충이다.',
    food: '꽃에서 얻은 꿀과 꽃가루를 먹으며, 이를 모아 벌집에 저장해 둔다.',
    habitat:
      '원래 유럽과 아프리카가 원산지이며, 오늘날에는 사람이 기르는 벌통이나 나무 구멍 등에 집을 짓고 산다.',
    needsLabelVerification: false,
  },
  {
    id: 'ilbonwanggaemi',
    scientificName: 'Camponotus japonicus',
    koreanName: '일본왕개미',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '벌목',
      family: '개미과',
      genus: '왕개미속(Camponotus)',
      species: '일본왕개미(Camponotus japonicus)',
    },
    features:
      '몸 전체가 검은빛을 띠며 여왕개미, 수개미, 일개미로 역할이 나뉘어 무리 생활을 하는, 우리나라에서 흔히 볼 수 있는 대형 개미이다. 땅속에 굴을 파고 그 안에서 집단으로 산다.',
    food: '곤충의 사체 등 단백질이 풍부한 먹이를 특히 좋아하며, 곡물이나 꽃의 꿀 등도 가리지 않고 먹는다.',
    habitat:
      '놀이터, 운동장, 인도 주변 등 흙이 드러난 공터나 산과 들에 굴을 파고 산다.',
    needsLabelVerification: false,
  },
  {
    id: 'mulbanggae',
    scientificName: 'Cybister japonicus',
    koreanName: '물방개',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '딱정벌레목',
      family: '물방개과',
      genus: '물방개속(Cybister)',
      species: '물방개(Cybister japonicus)',
    },
    features:
      '몸길이 35~40mm의 대형 물속 딱정벌레로, 등 쪽은 광택이 있는 녹갈색을 띤 검은색이고 배 쪽은 황갈색이다. 뒷다리가 노처럼 납작하게 발달해 물속에서 헤엄치기에 알맞다.',
    food: '육식성으로 물속의 작은 곤충, 올챙이, 작은 물고기 등을 잡아먹는다.',
    habitat:
      '농약이 없고 물풀이 많은 깨끗한 저수지, 연못, 물웅덩이에 산다.',
    needsLabelVerification: false,
  },
  {
    id: 'sogeumjaengi',
    scientificName: 'Aquarius paludum',
    koreanName: '소금쟁이',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '노린재목',
      family: '소금쟁이과',
      genus: '소금쟁이속(Aquarius)',
      species: '소금쟁이(Aquarius paludum)',
    },
    features:
      '다리 끝에 촘촘히 난 잔털 덕분에 물의 표면장력을 이용해 물 위를 미끄러지듯 걸어 다닐 수 있다. 몸은 흑갈색 바탕에 은빛 잔털이 빽빽하게 나 있다.',
    food: '물 위에 떨어진 작은 곤충 등을 다리로 붙잡아 체액을 빨아먹는다.',
    habitat:
      '큰 물고기를 피해 작은 물웅덩이나 논, 연못 가장자리처럼 잔잔한 물에서 산다.',
    needsLabelVerification: false,
  },
  {
    id: 'haneulso',
    scientificName: 'Batocera lineolata',
    koreanName: '참나무하늘소',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '딱정벌레목',
      family: '하늘소과',
      genus: 'Batocera속(Batocera)',
      species: '참나무하늘소(Batocera lineolata)',
    },
    features:
      '몸길이 45~54mm에 이르는 대형 딱정벌레로, 몸빛깔은 검은색이나 흙갈색이며 딱지날개에 흰색 무늬가 흩어져 있다. 더듬이가 매우 길어서 수컷은 몸길이의 2배에 가깝다.',
    food: '성충은 어린 나뭇가지의 나무껍질을 갉아먹고, 애벌레는 나무줄기 속을 파먹으며 자란다.',
    habitat:
      '울창한 숲이나 숲 가장자리, 벌채된 나무 주변에서 볼 수 있다.',
    needsLabelVerification: true,
  },
  {
    id: 'pungdeng-i',
    scientificName: 'Mimela splendens',
    koreanName: '풍뎅이',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '곤충강',
      order: '딱정벌레목',
      family: '풍뎅이과',
      genus: '풍뎅이속(Mimela)',
      species: '풍뎅이(Mimela splendens)',
    },
    features:
      '몸길이 15~21mm이며 광택이 강한 녹갈색이나 구릿빛을 띠어 마치 금속처럼 반짝인다. 위협을 느끼면 풀숲에서 아래로 뚝 떨어지는 습성이 있다.',
    food: '성충은 활엽수의 잎을 갉아먹고, 애벌레는 땅속에서 나무뿌리와 부식토를 먹는다.',
    habitat:
      '활엽수가 많은 숲이나 풀숲에서 살며, 애벌레는 흙 속에서 겨울을 난다.',
    needsLabelVerification: true,
  },
  {
    id: 'mudanggeomi',
    scientificName: 'Trichonephila clavata',
    koreanName: '무당거미',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '거미강',
      order: '거미목',
      family: '무당거미과',
      genus: '무당거미속(Trichonephila)',
      species: '무당거미(Trichonephila clavata)',
    },
    features:
      '암컷은 몸길이 17~30mm로 수컷보다 훨씬 크며, 배에 노란색과 녹색, 파란색이 섞인 화려한 가로줄무늬가 있다. 나뭇가지 사이에 크고 튼튼한 둥근 그물을 쳐서 먹이를 잡는다.',
    food: '그물에 걸린 파리, 꿀벌, 작은 나비 등 날아다니는 곤충을 먹이로 삼는다.',
    habitat:
      '산이나 들판, 인가 부근의 나뭇가지 사이에 그물을 치고 산다.',
    needsLabelVerification: true,
  },
  {
    id: 'asiawangjeongal',
    scientificName: 'Heterometrus longimanus',
    koreanName: '아시아왕전갈',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '거미강',
      order: '전갈목',
      family: '이형전갈과',
      genus: 'Heterometrus속(Heterometrus)',
      species: '아시아왕전갈(Heterometrus longimanus)',
    },
    features:
      '몸길이 10~12cm에 이르는 대형 전갈로 온몸이 광택 있는 검은색이며 집게발이 매우 크고 힘이 세다. 독침의 독성은 비교적 약한 편이지만 튼튼한 집게로 먹이를 붙잡아 사냥한다.',
    food: '곤충이나 작은 절지동물을 집게로 붙잡아 잡아먹는 육식성이다.',
    habitat:
      '동남아시아의 습한 열대우림에 살며, 낮에는 굴이나 낙엽 밑에 숨어 있다가 밤에 활동한다. 한국에는 서식하지 않으며 전갈류를 대표하는 종으로 소개하는 것이다.',
    needsLabelVerification: true,
  },
  {
    id: 'wangjine',
    scientificName: 'Scolopendra mutilans',
    koreanName: '왕지네',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '순각강',
      order: '왕지네목',
      family: '왕지네과',
      genus: '왕지네속(Scolopendra)',
      species: '왕지네(Scolopendra mutilans)',
    },
    features:
      '몸이 여러 개의 마디로 이루어져 있고 마디마다 다리가 한 쌍씩 붙어 있는 다지류이다. 머리 쪽은 붉은빛을 띠고 몸통은 짙은 갈색이나 초록빛을 띠어 눈에 잘 띈다. 첫 번째 다리가 독을 주입하는 턱다리로 변형되어 있어 먹이를 잡거나 몸을 지킬 때 사용한다.',
    food: '곤충, 거미, 지렁이 같은 작은 동물을 독으로 마비시켜 잡아먹는 육식성이다.',
    habitat:
      '돌 밑, 낙엽 더미, 축축한 흙속처럼 어둡고 습한 곳에 숨어 살며, 한국 전역의 산과 들에서 발견된다.',
    needsLabelVerification: false,
  },
  {
    id: 'myeongjudalpaengi',
    scientificName: 'Acusta despecta',
    koreanName: '명주달팽이',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '연체동물문',
      class: '복족강',
      order: '병안목',
      family: '달팽이과',
      genus: '명주달팽이속(Acusta)',
      species: '명주달팽이(Acusta despecta)',
    },
    features:
      '둥글고 납작한 나선형 껍데기를 등에 지고 다니며, 몸이 말랑말랑하고 두 쌍의 더듬이가 있다. 위쪽 긴 더듬이 끝에 눈이 달려 있고, 기어갈 때 끈적한 점액을 남긴다.',
    food: '채소나 풀잎, 낙엽 등 부드러운 식물을 갉아 먹는다.',
    habitat:
      '밭 주변 돌 밑이나 풀숲, 낙엽 더미처럼 습기가 많은 곳에 살며 한국 전역에서 흔히 볼 수 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'byeolbulgasari',
    scientificName: 'Patiria pectinifera',
    koreanName: '별불가사리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '극피동물문',
      class: '불가사리강',
      order: '연변목',
      family: '별불가사리과',
      genus: '별불가사리속(Patiria)',
      species: '별불가사리(Patiria pectinifera)',
    },
    features:
      '몸은 별 모양이며 등 쪽은 짙은 남색 바탕에 붉은색이나 주황색 얼룩무늬가 있고, 배 쪽은 대체로 밝은 주황색이다. 보통 팔이 5개이며 팔 끝이 뾰족하고, 몸 아래쪽에 있는 관족이라는 작은 발들을 이용해 천천히 움직인다.',
    food: '작은 조개나 죽은 물고기, 유기물 찌꺼기를 먹는 잡식성으로 특히 어린 조개류를 즐겨 먹는다.',
    habitat:
      '수심이 얕은 바다의 바위나 모래, 진흙 지역에 살며 한국 서해와 남해 연안에서 흔히 볼 수 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'boreumdalmulhaepari',
    scientificName: 'Aurelia aurita',
    koreanName: '보름달물해파리',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '자포동물문',
      class: '해파리강',
      order: '깃대해파리목',
      family: '유령해파리과',
      genus: '물해파리속(Aurelia)',
      species: '보름달물해파리(Aurelia aurita)',
    },
    features:
      '몸이 투명해서 속이 비쳐 보이며, 둥근 우산 모양의 몸통 가운데에 말굽 모양의 생식소 네 개가 비쳐 보이는 것이 특징이다. 우산 가장자리에 짧고 가는 촉수가 촘촘히 나 있다.',
    food: '촉수로 플랑크톤이나 작은 물고기 알을 걸러서 잡아먹는다.',
    habitat:
      '얕은 바다부터 먼바다까지 넓게 떠다니며 살고, 여름철 한국 연안에서 자주 나타난다.',
    needsLabelVerification: false,
  },
  {
    id: 'chammuneo',
    scientificName: 'Octopus sinensis',
    koreanName: '참문어',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '연체동물문',
      class: '두족강',
      order: '문어목',
      family: '문어과',
      genus: '문어속(Octopus)',
      species: '참문어(Octopus sinensis)',
    },
    features:
      '몸이 둥글고 말랑말랑하며 8개의 긴 다리를 가지고 있고, 다리 안쪽에는 빨판이 두 줄로 늘어서 있다. 몸 색깔을 주변 환경에 맞춰 재빠르게 바꿀 수 있어 몸을 숨기는 데 능숙하다.',
    food: '게, 조개, 새우 같은 갑각류와 작은 물고기를 잡아먹는다.',
    habitat:
      '한국 전 연안의 수심이 얕은 암초 지대나 바위틈에 숨어 살며 야행성이다.',
    needsLabelVerification: true,
  },
  {
    id: 'sarojingeo',
    scientificName: 'Todarodes pacificus',
    koreanName: '살오징어',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '연체동물문',
      class: '두족강',
      order: '살오징어목',
      family: '빨강오징어과',
      genus: '살오징어속(Todarodes)',
      species: '살오징어(Todarodes pacificus)',
    },
    features:
      '몸이 길쭉한 원뿔 모양이고 몸통 양옆에 세모난 지느러미가 있다. 10개의 다리 중 2개는 다른 다리보다 길게 뻗어 있어 먹이를 잡을 때 사용하며, 몸 색깔을 빠르게 바꿀 수 있다.',
    food: '작은 물고기와 새우, 다른 오징어 같은 두족류를 잡아먹는 육식성이다.',
    habitat:
      '동해를 비롯한 한국 근해에서 무리를 지어 헤엄치며 살고, 계절에 따라 먼 거리를 이동한다.',
    needsLabelVerification: false,
  },
  {
    id: 'daege',
    scientificName: 'Chionoecetes opilio',
    koreanName: '대게',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '연갑강',
      order: '십각목',
      family: '물맞이게과',
      genus: '대게속(Chionoecetes)',
      species: '대게(Chionoecetes opilio)',
    },
    features:
      '등딱지가 둥근 삼각형 모양이며 한국에서 나는 게 가운데 몸집이 가장 큰 편에 속한다. 걷는 다리가 대나무 마디처럼 길고 곧게 뻗어 있어 이런 이름이 붙었으며, 수컷이 암컷보다 훨씬 크다.',
    food: '작은 조개, 갯지렁이, 죽은 물고기 등 바닥에 있는 다양한 먹이를 먹는 잡식성이다.',
    habitat:
      '차가운 물을 좋아해 수심이 깊은 진흙이나 모래 바닥에 살며, 한국 동해가 대표적인 서식지이다.',
    needsLabelVerification: false,
  },
  {
    id: 'jipge',
    scientificName: 'Pagurus minutus',
    koreanName: '긴발가락참집게',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '절지동물문',
      class: '연갑강',
      order: '십각목',
      family: '집게과',
      genus: '참집게속(Pagurus)',
      species: '긴발가락참집게(Pagurus minutus)',
    },
    features:
      '배가 말랑말랑해서 스스로를 보호하기 위해 다른 고둥이 버리고 간 빈 껍데기를 짊어지고 다닌다. 몸이 자라면 더 큰 껍데기로 갈아타며, 오른쪽 집게발이 왼쪽보다 크다.',
    food: '죽은 물고기나 해조류 조각 등을 가리지 않고 먹는 잡식성이다.',
    habitat:
      '갯벌이나 얕은 바다의 조간대에 무리 지어 살며, 한국 서해와 남해 갯벌에서 흔히 볼 수 있다.',
    needsLabelVerification: true,
  },
  {
    id: 'haema',
    scientificName: 'Hippocampus haema',
    koreanName: '해마',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '조기어강',
      order: '실고기목',
      family: '실고기과',
      genus: '해마속(Hippocampus)',
      species: '해마(Hippocampus haema)',
    },
    features:
      '몸이 말의 머리를 닮았고 꼬리는 길고 유연해서 해초 줄기를 감아 몸을 고정할 수 있다. 등지느러미를 빠르게 흔들며 헤엄치고, 몸 색깔은 회색, 갈색부터 노랑, 주황까지 개체마다 다양하다.',
    food: '작은 플랑크톤이나 새끼 새우 같은 작은 갑각류를 입으로 빨아들여 먹는다.',
    habitat:
      '모자반이나 잘피 같은 해초가 자라는 수심 18m 이내의 얕은 바다에 숨어 살며, 한국 연안에 사는 대표적인 토종 해마이다.',
    needsLabelVerification: false,
  },
  {
    id: 'borasseonggae',
    scientificName: 'Heliocidaris crassispina',
    koreanName: '보라성게',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '극피동물문',
      class: '성게강',
      order: '공치성게목',
      family: '만두성게과',
      genus: '보라성게속(Heliocidaris)',
      species: '보라성게(Heliocidaris crassispina)',
    },
    features:
      '몸은 반구형이고 겉은 단단한 껍데기로 덮여 있으며, 표면에 밤송이처럼 짙은 보라색 가시가 촘촘히 나 있다. 가시 사이에 있는 관족을 이용해 바위 표면을 천천히 움직인다.',
    food: '바위에 붙어 자라는 미역이나 다시마 같은 해조류를 갉아 먹는다.',
    habitat:
      '수심이 얕은 바다의 바위 지대에 붙어 살며, 한국 남해와 제주 연안에서 흔히 볼 수 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'siberian-chipmunk',
    scientificName: 'Tamias sibiricus',
    koreanName: '다람쥐',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '설치목',
      family: '다람쥣과',
      genus: '다람쥐속(Tamias, 일부 문헌은 Eutamias)',
      species: '다람쥐(Tamias sibiricus)',
    },
    features:
      '몸통에 등을 따라 5개의 짙은 줄무늬가 있어 다른 설치류와 쉽게 구별된다. 몸집이 작고 볼주머니가 발달해 있어 먹이를 볼에 저장해 옮길 수 있다. 겨울에는 굴을 파고 겨울잠을 자며, 늦가을에 모은 먹이를 굴 속에 저장해 두고 조금씩 깨어 먹는다.',
    food: '도토리, 밤 같은 나무 열매와 씨앗을 주로 먹으며 곤충이나 버섯도 먹는 잡식성이다.',
    habitat:
      '한반도 전역의 산림, 특히 참나무류가 많은 낙엽활엽수림과 바위가 많은 지역에 굴을 파고 산다.',
    needsLabelVerification: false,
  },
  {
    id: 'korean-squirrel',
    scientificName: 'Sciurus vulgaris',
    koreanName: '청설모',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '설치목',
      family: '다람쥣과',
      genus: '청설모속(Sciurus)',
      species: '청설모(Sciurus vulgaris)',
    },
    features:
      '몸 전체가 회갈색이나 회색을 띠고 배 쪽은 흰색이며, 다람쥐보다 몸집이 훨씬 크고 줄무늬가 없다. 귀 끝에 털이 뭉쳐 있어 뾰족하게 보이며, 나무를 잘 타고 나뭇가지 사이를 빠르게 뛰어다닌다. 한반도에 사는 개체는 한때 한반도 고유 아종으로 여겨졌으나 유전자 분석 결과 만주 지역 아종과 거의 같다는 것이 밝혀졌다.',
    food: '잣, 도토리, 호두 같은 나무 열매와 씨앗을 주로 먹으며 나무껍질이나 곤충도 먹는다.',
    habitat:
      '침엽수림과 활엽수림이 섞인 한반도 전역의 산림에 살며, 나무 위에 둥지를 틀고 겨울잠을 자지 않고 활동한다.',
    needsLabelVerification: false,
  },
  {
    id: 'korean-mole',
    scientificName: 'Mogera robusta',
    koreanName: '두더지',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '진무맹장목',
      family: '두더지과',
      genus: '두더지속(Mogera)',
      species: '두더지(Mogera robusta)',
    },
    features:
      '눈이 매우 작아 거의 보이지 않고 대신 예민한 코와 촉각으로 땅속 환경을 파악한다. 앞발이 삽처럼 넓고 발톱이 튼튼해 땅을 파는 데 알맞게 발달했으며, 온몸이 짧고 부드러운 벨벳 같은 털로 덮여 있어 좁은 굴속을 앞뒤로 자유롭게 오갈 수 있다.',
    food: '지렁이와 굼벵이 같은 땅속 곤충의 애벌레를 주로 먹으며 하루에도 자기 몸무게만큼 먹이를 먹는다.',
    habitat:
      '한반도 전역의 논밭이나 부드러운 흙이 있는 산림, 초지의 땅속에 굴을 파고 평생을 지하에서 생활한다.',
    needsLabelVerification: true,
  },
  {
    id: 'greater-horseshoe-bat',
    scientificName: 'Rhinolophus ferrumequinum',
    koreanName: '관박쥐',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '익수목',
      family: '관박쥐과',
      genus: '관박쥐속(Rhinolophus)',
      species: '관박쥐(Rhinolophus ferrumequinum)',
    },
    features:
      '코 주위에 말발굽 모양의 독특한 피부 돌기가 있어 초음파를 더 정확하게 내보낼 수 있다. 낮에는 동굴 천장에 거꾸로 매달려 잠을 자고 밤에 날아다니며 초음파를 이용해 어둠 속에서도 먹이의 위치를 정확히 찾아낸다. 한반도에는 내륙에 사는 무리와 제주도에 사는 무리가 아종으로 나뉘어 알려져 있다.',
    food: '나방, 딱정벌레, 풍뎅이 같은 곤충을 날아다니며 잡아먹는다.',
    habitat:
      '한반도 전역의 동굴이나 폐광 같은 어둡고 습한 공간에 무리 지어 살며 겨울에는 동굴 속에서 겨울잠을 잔다.',
    needsLabelVerification: false,
  },
  {
    id: 'amur-hedgehog',
    scientificName: 'Erinaceus amurensis',
    koreanName: '고슴도치',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '진무맹장목',
      family: '고슴도치과',
      genus: '고슴도치속(Erinaceus)',
      species: '고슴도치(Erinaceus amurensis)',
    },
    features:
      '등과 옆구리가 짧고 뾰족한 가시털로 덮여 있어 적을 만나면 몸을 동그랗게 말아 가시를 세워 몸을 보호한다. 밤에 주로 활동하는 야행성 동물이며 겨울에는 낙엽 밑이나 굴 속에서 겨울잠을 잔다.',
    food: '곤충, 지렁이, 달팽이 같은 작은 동물을 주로 먹고 나무 열매나 버섯도 먹는 잡식성이다.',
    habitat:
      '러시아 아무르·연해주, 중국 동북부, 한반도에 걸쳐 분포하며 숲 가장자리나 풀숲, 농경지 주변에 산다.',
    needsLabelVerification: false,
  },
  {
    id: 'siberian-weasel',
    scientificName: 'Mustela sibirica',
    koreanName: '족제비',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '족제비과',
      genus: '족제비속(Mustela)',
      species: '족제비(Mustela sibirica)',
    },
    features:
      '몸이 길고 다리가 짧으며 온몸이 황갈색 털로 덮여 있어 날렵하게 움직인다. 위협을 느끼면 항문샘에서 냄새나는 액체를 내뿜어 적을 쫓아내며, 헤엄도 잘 치고 나무도 잘 타는 등 다양한 환경에 잘 적응한다.',
    food: '쥐, 새, 개구리 같은 작은 동물을 사냥해 먹는 육식성이다.',
    habitat:
      '한반도 전역의 산림과 하천 주변, 농경지, 심지어 인가 근처에서도 흔히 볼 수 있다.',
    needsLabelVerification: false,
  },
  {
    id: 'leopard-cat',
    scientificName: 'Prionailurus bengalensis',
    koreanName: '삵',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '고양이과',
      genus: '삵속(Prionailurus)',
      species: '삵(Prionailurus bengalensis)',
    },
    features:
      '몸에 표범처럼 검은 반점 무늬가 흩어져 있어 집고양이와 구별되며, 우리나라에 사는 고양잇과 야생동물 중 대표적인 종이다. 단독으로 생활하며 야행성으로 밤에 주로 사냥 활동을 한다. 서식지 파괴와 로드킬 등으로 개체 수가 줄어 환경부 멸종위기 야생생물 2급으로 지정되어 보호받고 있다.',
    food: '쥐, 꿩, 토끼 같은 작은 포유류와 조류를 사냥해 먹는 육식성이다.',
    habitat:
      '한반도 전역의 산림과 농경지, 하천 주변의 수풀 등 비교적 다양한 환경에서 서식한다.',
    needsLabelVerification: false,
  },
  {
    id: 'spotted-seal',
    scientificName: 'Phoca largha',
    koreanName: '점박이물범',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '물범과',
      genus: '물범속(Phoca)',
      species: '점박이물범(Phoca largha)',
    },
    features:
      '몸통 전체에 짙은 회색 또는 검은색의 둥근 반점 무늬가 흩어져 있어 이런 이름이 붙었다. 다리가 지느러미 모양으로 변해 물속에서 헤엄치기에 알맞으며, 얼음 위에서 새끼를 낳고 기른다. 서해 백령도 앞바다에 찾아오는 개체가 국내에서는 천연기념물 제331호이자 멸종위기 야생생물 2급으로 지정되어 보호받고 있다.',
    food: '물고기와 오징어, 새우 같은 갑각류를 주로 잡아먹는다.',
    habitat:
      '북태평양의 오호츠크해와 베링해, 서해 백령도 인근 등 한반도 서해안 일대를 오가며 얼음이 있는 바다에서 번식한다.',
    needsLabelVerification: false,
  },
  {
    id: 'steller-sea-lion',
    scientificName: 'Eumetopias jubatus',
    koreanName: '바다사자',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '물개과',
      genus: '큰바다사자속(Eumetopias)',
      species: '바다사자(큰바다사자)(Eumetopias jubatus)',
    },
    features:
      '몸집이 매우 크고 목 주위에 갈기처럼 두꺼운 털이 나 있어 수컷은 사자와 비슷한 인상을 준다. 물개나 물범과 달리 뒷지느러미를 앞으로 돌려 육지에서도 비교적 잘 걸어 다닐 수 있다. 큰 소리로 울부짖는 습성이 있으며 무리를 지어 바위나 해안가에서 쉰다.',
    food: '물고기, 오징어, 문어 같은 해양 동물을 잡아먹는다.',
    habitat:
      '북태평양 연안의 알래스카, 러시아, 일본 해역에 주로 서식하며 겨울철에는 드물게 동해 연안까지 내려오기도 한다.',
    needsLabelVerification: true,
  },
  {
    id: 'sea-otter',
    scientificName: 'Enhydra lutris',
    koreanName: '해달',
    taxonomy: {
      domain: '진핵생물역',
      kingdom: '동물계',
      phylum: '척삭동물문',
      class: '포유강',
      order: '식육목',
      family: '족제비과',
      genus: '해달속(Enhydra)',
      species: '해달(Enhydra lutris)',
    },
    features:
      '포유류 중 가장 촘촘하고 두꺼운 털을 가지고 있어 지방층 없이도 차가운 바닷물 속에서 체온을 유지할 수 있다. 물 위에 누운 채 배 위에 돌을 올려놓고 조개를 깨 먹는 등 도구를 사용하는 몇 안 되는 동물로 알려져 있으며, 잠잘 때는 해조류로 몸을 감아 물살에 떠내려가지 않도록 한다.',
    food: '성게, 조개, 게 같은 갑각류와 연체동물, 작은 물고기를 주로 먹는다.',
    habitat:
      '북태평양 연안, 특히 알래스카와 러시아 캄차카반도 등의 차가운 바다에 살며 한반도 연안에는 서식하지 않는다.',
    needsLabelVerification: false,
  },
]

export function findSpeciesById(id: string): Species | undefined {
  return SPECIES.find((s) => s.id === id)
}

export function searchSpeciesByName(query: string): Species[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return SPECIES.filter(
    (s) => s.koreanName.toLowerCase().includes(q) || s.scientificName.toLowerCase().includes(q)
  )
}
