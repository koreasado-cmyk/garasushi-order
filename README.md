# 가라스시 발주 (모바일 웹앱)

가경점/방서점/전주점 발주 체크리스트 → 카톡으로 바로 전송.

## 배포

GitHub Pages에 그대로 올리면 됩니다:
1. GitHub.com 가입/로그인
2. 새 Repository 생성 (이름 예: `garasushi-order`, **Public**)
3. 이 폴더의 `index.html` 업로드
4. Repository → Settings → Pages → Source: `main branch` → Save
5. 1~2분 후 `https://[GitHub아이디].github.io/garasushi-order/` 에서 접속 가능

## 카카오 연동

1. https://developers.kakao.com 가입/로그인
2. 내 애플리케이션 → 애플리케이션 추가
3. 발급된 **JavaScript 키** 복사
4. 플랫폼 → Web 플랫폼 등록 → 위 GitHub Pages 주소 입력
5. 사이트에서 ⚙ 설정 → JavaScript 키 붙여넣기 → 저장

설정 후 [💬 카톡 전송] 누르면 카톡 채팅 선택 화면이 바로 뜹니다.

## 사용

1. 점포 선택 (가경/방서/전주) — 마지막 선택 자동 기억
2. 발주일자·작성자 입력
3. 품목별 + / − 또는 숫자 입력 (자동저장)
4. 하단 노란 버튼 [💬 카톡으로 보내기]
5. 미리보기 확인 → [💬 카톡 전송] → 채팅방 선택

## 데이터 갱신

품목·단가 데이터를 새로 반영하려면 `index.html` 을 다시 빌드해서 GitHub에 덮어쓰기.
