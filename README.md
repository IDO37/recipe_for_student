# 🍳 Recipe Finder

Vite + Vue 3 + Supabase를 사용하여 만든 레시피 검색 웹사이트입니다.

## 🚀 주요 기능

- **사용자 인증**: Supabase Auth를 통한 로그인/회원가입
- **레시피 검색**: 제목, 카테고리, 난이도, 조리시간별 필터링
- **레시피 상세보기**: 재료, 조리방법, 팁, 영양정보 포함
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 UI
- **실시간 데이터**: Supabase를 통한 실시간 데이터 동기화

## 🛠️ 기술 스택

- **Frontend**: Vue 3, Vite, Vue Router, Pinia
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Auth, Database)
- **Package Manager**: pnpm

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
pnpm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 Supabase 설정을 추가하세요:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 개발 서버 실행
```bash
pnpm dev
```

### 4. 빌드
```bash
pnpm build
```

## 🗄️ 데이터베이스 설정

Supabase에서 다음 SQL을 실행하여 테이블을 생성하세요:

```sql
-- 레시피 테이블 생성
CREATE TABLE recipes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  cooking_time TEXT NOT NULL,
  ingredients TEXT[],
  instructions TEXT[],
  tips TEXT,
  nutrition JSONB,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS 활성화 및 정책 설정
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON recipes
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" ON recipes
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

## 📱 페이지 구조

- **랜딩 페이지** (`/`): 사이트 소개 및 로그인/회원가입 링크
- **로그인 페이지** (`/login`): 사용자 로그인
- **회원가입 페이지** (`/register`): 새 계정 생성
- **홈 페이지** (`/home`): 레시피 검색 및 목록 (인증 필요)
- **레시피 상세 페이지** (`/recipe/:id`): 레시피 상세 정보 (인증 필요)

## 🎨 UI 구성

- **히어로 섹션**: 사이트 소개 및 주요 기능 설명
- **검색 섹션**: 필터링 기능이 포함된 레시피 검색
- **레시피 카드**: 이미지, 제목, 카테고리, 난이도 표시
- **컨택트 섹션**: 연락처 정보

## 🔧 개발 가이드

### 컴포넌트 구조
```
src/
├── components/          # 재사용 가능한 컴포넌트
├── views/              # 페이지 컴포넌트
├── stores/             # Pinia 스토어
├── router/             # Vue Router 설정
├── lib/                # 유틸리티 및 설정
└── assets/             # 정적 자산
```

### 상태 관리
- `auth.js`: 사용자 인증 상태 관리
- `recipes.js`: 레시피 데이터 및 필터링 상태 관리

## 🚀 배포

### Vercel 배포
1. GitHub에 코드를 푸시
2. Vercel에서 프로젝트 연결
3. 환경 변수 설정
4. 배포 완료

### 환경 변수
- `VITE_SUPABASE_URL`: Supabase 프로젝트 URL
- `VITE_SUPABASE_ANON_KEY`: Supabase 익명 키

## 📄 라이선스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 연락처

- 이메일: recipe.finder@example.com
- 전화: 010-1234-5678
