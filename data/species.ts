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
      '몸은 원통형이고 주둥이가 뭉툭하며, 등 쪽은 회갈색, 배 쪽은 은백색을 띤다. 몸 옆구리에는 노란 띠가 있어 자라면서 더 뚜렷해지며, 이 노란색 때문에 "황복"이라는 이름이 붙었다. 몸길이는 보통 20cm 안팎이며 최대 30cm 정도까지 자란다.',
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
      '몸길이는 15~24mm 정도지만, 암컷의 산란관이 몸길이의 몇 배(최대 18cm 이상)나 되게 가늘고 길게 뻗어 있어 마치 말의 꼬리털 같다고 해서 "말총벌"이라는 이름이 붙었다. 몸은 황적갈색을 띠고 날개는 적황색 바탕에 검은 무늬가 있으며, 더듬이는 검은색이다.',
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
      '근육질의 넓은 가슴과 몸통, 짧고 둥근 머리와 귀, 꼬리 끝의 털뭉치가 특징이다. 수사자는 머리부터 어깨까지 이어지는 풍성한 갈기를 가지고 있어 암사자와 쉽게 구별된다. 고양이과 동물 중 호랑이 다음으로 몸집이 크며 무리(프라이드)를 이루어 사는 습성이 있다.',
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
