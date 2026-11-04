// 포트폴리오 콘텐츠. 내용 수정은 이 파일에서만 하면 됩니다.
// tags: 사례의 분야 (backend | devops | data) — 필터와 배지에 사용
// TODO 표시는 게시 전에 확인할 항목입니다.

window.PROFILE = {
  name: "공병우",
  nameEn: "Gong Byeongwoo",
  email: "gongtiger1011@gmail.com",
  github: "https://github.com/gbw11/portfolio", // GitHub 버튼(상단·본문) 이동 주소
  photo: "assets/profile.jpg",
  education: [
    { title: "경상국립대학교 수학과 · 데이터사이언스학(복수전공)", sub: "2019.03 ~ 2026.02" },
    { title: "삼성 청년 SW·AI 아카데미 (SSAFY) 15기", sub: "2026.01 ~ 2026.12 (수료 예정)" }, // TODO 시작·종료 월 확인
  ],
  certs: ["정보처리기사", "빅데이터분석기사", "SQLD", "ADsP"],
};

// 한 페이지에 Backend · Infra/DevOps · Data를 모두 담습니다.
window.MAIN = {
  eyebrow: "Backend · Infra/DevOps · Data",
  tagline: "조용히 틀리는 지점을\n먼저 찾아 막습니다",
  intro:
    "성공 응답 뒤에 숨은 실패를 찾는 개발자입니다. 클라이언트가 보낸 값을 서버가 직접 검증하고, 배포의 헬스체크·롤백·스키마 게이트가 실제로 동작하는지 일부러 깨뜨려 확인하며, 감으로 정한 기준값은 실측 분포와 대조해 고칩니다.",
  highlights: [
    { value: "P0 차단", label: "클라이언트가 보고한 tx 해시를 체인 영수증으로 재검증" },
    { value: "25초", label: "깨진 이미지 배포 시 직전 이미지 자동 롤백 (실측)" },
    { value: "0건", label: "스키마 diff 게이트 거짓 양성 (42개 테이블 · 412개 컬럼)" },
    { value: "1.3초", label: "음성 대화 첫 소리 (직렬 처리 시 턴당 약 8초)" }, // TODO 기준선 확인
  ],
  projectOrder: ["circular", "potner", "finance"],
  // 처음부터 보이는 트러블슈팅 (나머지는 '더 보기')
  featured: {
    circular: ["forgery", "ufw", "rollback", "schema-gate", "char-varchar", "wallet-unique"],
    potner: ["mqtt-acl", "skipped", "latency", "device-id", "brightness", "awb"],
    finance: ["yf-version", "yf-dedupe", "wheel"],
  },
  skillOrder: ["backend", "infra", "data", "test", "frontend", "iot"],
};

// 트러블슈팅 분야 필터
window.FIELDS = {
  backend: "Backend",
  devops: "Infra / DevOps",
  data: "Data",
};

window.SKILLS = {
  backend: { title: "Backend", items: ["Java · Spring Boot", "Spring Security (JWT, @PreAuthorize)", "JPA · QueryDSL", "Python · Django REST · FastAPI", "MySQL 8", "MinIO (S3, AWS SDK v2)", "MQTT (paho, Mosquitto ACL)"] },
  infra: { title: "Infra / DevOps", items: ["Docker · Docker Compose", "Jenkins Multibranch · JCasC", "Nginx (HTTPS, HSTS, limit_req)", "Let's Encrypt", "Linux · UFW · systemd · cron(flock)", "GitLab Commit Status / Notes API"] },
  data: { title: "Data", items: ["Python", "SQL · information_schema", "yfinance", "ApexCharts", "SQLD · ADsP · 빅데이터분석기사"] },
  test: { title: "Test", items: ["JUnit5 · MockMvc · H2", "pytest", "Vitest · Testing Library"] },
  frontend: { title: "Frontend", items: ["React · TypeScript · Vite", "TanStack Query · Zustand", "Vue 3 · Pinia", "Next.js (App Router)", "ethers v6 · MetaMask (EIP-191)"] },
  iot: { title: "IoT / AI", items: ["Raspberry Pi · GPIO · PWM · I2C", "Picamera2", "ROS2 (rclpy)", "LLM Function Calling · SSE", "Whisper · faster-whisper · TTS"] },
};

window.PROJECTS = {
  potner: {
    title: "Potner",
    subtitle: "반려식물 자율주행 로봇",
    period: "2026.07 ~ 2026.08",
    team: "SSAFY 15기 공통 프로젝트 · 6인 팀",
    role: "라즈베리파이 스테이션(센서·급수·송풍·촬영) 단독 설계·구현, 로봇 LLM·음성 파이프라인 구현",
    summary:
      "서버가 식물 상태를 판단하면 로봇(Jetson)이 스테이션까지 이동·도킹하고, 스테이션(Raspberry Pi)이 급수·송풍·촬영을 수행합니다. 장치와 서버는 MQTT 명령/회신으로 다음 단계를 잇습니다.",
    flow: ["센서 수집 (RPi)", "MQTT · Mosquitto ACL", "Spring Boot 판정", "command/{water·fan·capture}", "result/{cmd} 회신", "다음 단계 연결"],
    stack: ["Python", "Raspberry Pi", "MQTT", "FastAPI", "SSE", "Function Calling", "Whisper · TTS", "ROS2", "pytest", "systemd"],
    metrics: [
      { value: "13,200줄", label: "스테이션 코드·테스트·설정 (전부 본인 커밋)" },
      { value: "650+", label: "하드웨어·실제 API 없이 통과하는 테스트" },
      { value: "1.3초", label: "음성 대화 첫 소리 (직렬 처리 시 턴당 약 8초)" }, // TODO 기준선 표현 확인
      { value: "4중", label: "과급수 방지 안전 게이트" },
    ],
    results: [
      "platform: mock 설정만 바꾸면 하드웨어 없이 전체 로직을 검증하는 HAL 구조",
      "과급수 방지 4중 게이트 (1회 500ml · 최소 간격 300초 · 24시간 1000ml · 토양 70% 이상 스킵)",
      "Function Calling 6종(조회 전용) + 3단 팩트체크로 센서값 환각 응답 필터링",
      "원격 촬영 전 구간 실측: 서버 명령 → 촬영 → HTTP 201 → result/capture OK 회신",
      "테스트가 없던 모듈에 54건을 새로 작성해 실제 버그 3건 발견·수정",
    ],
    cases: [
      {
        id: "mqtt-acl", tags: ["backend", "devops"],
        title: "구독은 성공했는데 서버 명령이 오지 않음",
        problem: "SUBACK Granted로 구독이 성공했지만 서버→Pi 명령 메시지가 한 건도 수신되지 않았습니다.",
        cause: "하트비트(Pi→서버)는 정상이라 방향별로 나눠 점검했고, Mosquitto ACL은 read가 거부돼도 구독 성공을 돌려주고 메시지만 조용히 버린다는 점을 확인했습니다.",
        action: "발행/구독 왕복 진단 스크립트로 브로커 계정의 read 권한 누락을 특정하고 ACL을 배포했습니다.",
        result: "촬영 명령 → 업로드 → 결과 회신 전 구간을 실측으로 확인했습니다.",
      },
      {
        id: "skipped", tags: ["backend"],
        title: "안전 게이트에 걸린 급수(SKIPPED)에 자동 케어 체인이 멈춤",
        problem: "급수가 안전 게이트에 걸려 SKIPPED로 회신하면 서버 명령이 끝나지 않고 체인이 끊겼습니다.",
        cause: "서버 소스를 직접 읽어, 회신 상태가 OK/ERROR/BUSY만 허용돼 SKIPPED를 INVALID_STATUS로 버리고 완료 이벤트를 발행하지 않는 것을 확인했습니다.",
        action: "의미가 다른 ERROR로 낮춰 우회하지 않고, 'SKIPPED를 종료 상태로 추가해야 하는 근거'를 문서로 정리해 서버팀에 전달했습니다.",
        result: "서버팀이 반영했고, 서버 javadoc에 '라즈베리 구현이 기준'이라고 명시됐습니다.",
      },
      {
        id: "latency", tags: ["backend", "data"],
        title: "음성 대화의 첫 소리까지 긴 무음 구간",
        problem: "STT → LLM → TTS를 직렬로 처리해 답이 들리기까지 턴당 약 8초가 걸렸습니다.", // TODO 수치 확인
        cause: "LLM 게이트웨이 경유 첫 토큰 지연이 1.4~4.7초로 변동이 커서 직렬 구조로는 줄일 수 없었습니다.",
        action: "필러 음성 3개를 서버 시작 시 미리 합성하고, 문장 단위 병렬 TTS(스레드풀 2개)와 첫 조각 약 20자 조기 절단으로 파이프라인화했습니다. 구간별 지연은 모니터 페이지에 막대로 시각화했습니다.",
        result: "첫 소리까지 1.3초로 단축했습니다.",
        metric: "약 8초 → 1.3초",
      },
      {
        id: "mqtt-broker", tags: ["backend", "devops"],
        title: "실제 명령 왕복을 PC에서 검증할 수단이 없음",
        problem: "단위 테스트는 네트워크를 우회하고 운영 브로커 접속은 금지라, 브로커를 거치는 명령 왕복을 검증할 방법이 없었습니다.",
        cause: "테스트 경계가 브로커 앞에서 끊겨 있었습니다.",
        action: "표준 라이브러리만으로 MQTT 3.1.1 최소 브로커(254줄)를 작성하고, paho↔paho QoS1 왕복으로 브로커부터 교정한 뒤 프로젝트 코드를 연결했습니다. 실행 전 결과를 표로 예측하고 대조했습니다.",
        result: "정상/TOO_SOON/ERROR/비JSON/촬영/수위 게이트 전 구간을 PC에서 검증했고, 예측 11건 중 10건이 적중했습니다.",
      },
      {
        id: "nan", tags: ["backend"],
        title: "JSON NaN이 검증을 통과해 펌프 제어까지 흘러감",
        problem: "NaN/Infinity 값이 검증을 통과해 time.sleep(nan)과 PWM duty까지 전달됐습니다.",
        cause: "json.loads가 NaN을 허용하고, nan <= 0이 False라 범위 검사를 통과했습니다.",
        action: "펌프에 유한값 경계 검증을 추가하고, 전수 점검으로 팬에서도 같은 구멍을 찾아 막았습니다.",
        result: "물리 장치로 비정상 값이 전달되는 경로를 차단했습니다.",
      },
      {
        id: "idempotent", tags: ["backend"],
        title: "같은 날 재촬영 업로드가 오류로 처리됨",
        problem: "같은 날 다시 촬영하면 서버가 HTTP 409를 돌려주고 장치는 이를 실패로 보고했습니다.",
        cause: "하루 한 장 정책상 409는 '이미 저장됨'인데 장치가 이를 오류로 해석했습니다.",
        action: "409를 성공으로 처리하는 멱등 설계로 바꾸고, 업로드는 408/425/429/5xx만 지수 백오프로 최대 3회 재시도하도록 했습니다.",
        result: "중복 업로드 오류를 차단하고 업로드 실패를 촬영 성공과 분리해 회신합니다.",
      },
      {
        id: "device-id", tags: ["devops", "backend"],
        title: "Pi가 보낸 센서·하트비트를 서버가 전부 폐기",
        problem: "장치는 정상 발행 중인데 서버에 데이터가 하나도 쌓이지 않았습니다.",
        cause: "DEVICE_ID 환경변수가 설정값을 보드 시리얼로 덮어써, 토픽과 페이로드의 deviceId가 서로 달랐습니다.",
        action: "설정 파일에 deviceId를 고정하고, systemd 유닛에서 DEVICE_ID를 비우고 값이 있으면 시작을 거부하는 가드를 넣었습니다. client_id도 기능별 4종으로 분리해 서버와의 충돌을 막았습니다.",
        result: "같은 원인이 재발할 수 없도록 구조적으로 막았습니다.",
      },
      {
        id: "water-level", tags: ["data", "backend"],
        title: "물을 채워도 '물 부족' 알림이 풀리지 않음",
        problem: "물탱크를 채웠는데도 앱의 물 부족 알림이 계속 남아 있었습니다.",
        cause: "waterLow: true만 발행하고 false는 생략했습니다. 서버 코드를 읽어 매번 값을 덮어쓰는 구조임을 확인했습니다.",
        action: "매 주기 상태를 발행하고, 수집은 다수결 읽기(5표 · 0.06초 간격), 서버 발행은 10초 홀드 게이트로 역할을 나눠 채터링을 막았습니다.",
        result: "실기 로그에서 전환 후 10초 뒤 true 확정, 복구 시 false 재확정을 확인했습니다.",
      },
      {
        id: "brightness", tags: ["data"],
        title: "밝기 검사 실패 시 그날 사진이 통째로 사라짐",
        problem: "밝기 검사가 ERROR를 내면 서버가 촬영 체인 전체를 중단해 사진이 남지 않았습니다.",
        cause: "합성 이미지로 잡은 상한 215가 실기 사진 분포(200~246)와 맞지 않았습니다. 실기 4장 중 245.7이 탈락했습니다.",
        action: "실패 동작을 reject에서 warn으로 바꿔 사진을 보존하고, 노출 보정도 1.0에서 0.3으로 완화했습니다.",
        result: "기준값을 실측 분포에 맞춰 사진 유실을 막았습니다.",
      },
      {
        id: "awb", tags: ["data"],
        title: "촬영 사진 전체에 녹색빛이 섞임",
        problem: "실사진의 R/B 채널이 G 대비 15~20% 낮았습니다.",
        cause: "OV5647 자동 화이트밸런스가 잎(녹색) 위주 장면에서 오작동했고, daylight 프리셋으로도 색 편차가 남았습니다.",
        action: "Gray-world 기반 색편차 분석 도구를 만들어 고정 게인 colour_gains [1.548, 1.401]을 산출했습니다. 메타데이터 없는 JPEG에는 게인을 제안하지 않도록 안전장치를 두었습니다.",
        result: "무채색 기준으로 색 편차가 사라진 것을 확인했습니다. 관련 테스트 21건을 작성했습니다.",
      },
      {
        id: "factcheck", tags: ["data", "backend"],
        title: "LLM이 센서값을 지어내지 않도록 검증",
        problem: "LLM이 정답(영하 온도)을 말해도 팩트체크가 기각했고, 오래된 센서값이 답변에 섞일 위험이 있었습니다.",
        cause: "'영하 5도'를 +5로 파싱하는 버그가 있었고, '값 없음'과 '오래된 값'의 의미가 구분되지 않았습니다.",
        action: "파싱을 고치고 회귀 테스트 3건을 추가했습니다. 센서 상태를 NO_DATA(값 제외)와 STALE(값은 쓰되 재판정)로 나누고, 폴백 파일에 트랩값(99.9°C)을 심었습니다.",
        result: "'서버 실측 → 툴 → 팩트체크 → 답변' 경로가 폴백을 우회하지 않음을 E2E로 증명했습니다.",
      },
      {
        id: "cost", tags: ["data"],
        title: "LLM 비용 구조 실측",
        problem: "대화 기능의 비용이 어디서 발생하는지 근거 없이 추정하고 있었습니다.",
        cause: "턴마다 시스템 프롬프트와 대화 맥락이 반복 전송됩니다.",
        action: "10턴 대화의 크레딧·토큰을 실측하고, tool_calls와 tool 응답 쌍이 끊기지 않게 교환 단위로 맥락을 자르도록 했습니다.",
        result: "10턴 464크레딧(34,581토큰), 턴당 약 46크레딧이며 입력 토큰이 95%임을 파악했습니다.",
      },
      {
        id: "pi-ops", tags: ["devops"],
        title: "Pi 운영에서 '조용히' 실패하는 배포",
        problem: "systemctl restart가 실제로 반영되지 않은 사례가 두 번 있었고, Pi에서 직접 고친 미커밋 수정 4건이 로컬 작업과 충돌했습니다.",
        cause: "재시작 성공 여부를 확인하지 않았고, scp 덮어쓰기 배포라 장치 쪽 변경 이력이 남지 않았습니다.",
        action: "MainPID와 기동 시각 확인을 절차화하고, ssh pkill -f가 자기 셸을 죽이는 문제는 PID 파일 방식으로 바꿨습니다. 배포는 git push(ff-merge) 방식으로 재작성했습니다.",
        result: "systemd 유닛(Restart=always, network-online 이후 기동)과 git 기반 배포 스크립트로 정리했습니다.",
      },
      {
        id: "pytest-q", tags: ["devops"],
        title: "테스트 수를 85개로 잘못 읽음 (실제 373개)",
        problem: "CI 로그상 테스트 수가 실제보다 훨씬 적게 보였습니다.",
        cause: "pytest.ini의 addopts=-q에 -q를 더 붙여 -qq가 되면서 요약 줄이 사라졌습니다.",
        action: "경고 주석을 남기고, 라즈베리 Jenkinsfile에 pytest 스테이지를 추가했습니다. 라이브러리의 print() 8곳은 logger로 바꾸고 AST로 재발을 막는 테스트를 넣었습니다.",
        result: "CI에서 373 → 394개 테스트가 실행됩니다.",
      },
    ],
  },

  circular: {
    title: "Circular-Fashion",
    subtitle: "순환 패션 소재 유통 플랫폼",
    period: "2026.08 ~ 2026.09",
    team: "SSAFY 15기 특화 프로젝트 · 6인 팀",
    role: "인프라(EC2·Compose·Nginx·Jenkins·시크릿) 담당 + 지갑 서명 로그인, 공통 기능(시간대·파일 업로드·에러 응답·권한), Material 도메인",
    summary:
      "폐소재 등록부터 가공·생산·소비자 구매까지 소재 이력을 Hyperledger Besu에 기록하고, 제품 QR 여권으로 공개 검증하는 플랫폼입니다.",
    flow: ["공급자 소재 등록 · mint", "마켓 거래", "브랜드 가공 의뢰", "생산 배치 확정", "제품 QR", "소비자 QR 여권 조회"],
    stack: ["Spring Boot", "MySQL 8", "Docker Compose", "Nginx", "Jenkins (JCasC)", "Hyperledger Besu", "web3j", "MetaMask (EIP-191)", "MinIO", "React · TS"],
    metrics: [
      { value: "25초", label: "깨진 이미지 배포 시 직전 이미지 자동 롤백 (실측)" },
      { value: "+271", label: "권한 매트릭스 통합 테스트 (862 → 1,133)" },
      { value: "0건", label: "스키마 대조 거짓 양성 (412개 컬럼)" },
      { value: "P0 1 · P1 5", label: "테스트 스택 E2E 점검에서 발견·수정" },
    ],
    results: [
      "nginx · frontend · backend · ai · mysql · jenkins · minio Compose 오케스트레이션 + Let's Encrypt HTTPS",
      "Jenkins Multibranch(JCasC)로 5개 파트 독립 CI/CD, 배포 실패 시 자동 롤백",
      "develop 병합 시 자동 갱신되는 통합 테스트 스택(/test/) — DB·스토리지 운영과 격리",
      "병합 전 마이그레이션 CI 게이트, develop 빌드 실패 시 원래 MR에 자동 코멘트",
      "MySQL 매일 백업(14일 보관) + 오프사이트 반출, 복구 스크립트는 기본 dry-run",
      "지갑 서명 로그인(nonce 발급·검증) + 지갑 등록·조회·비활성화 API 단독 설계·구현",
    ],
    cases: [
      {
        id: "forgery", tags: ["backend"],
        title: "누구나 '블록체인 증명'을 위조할 수 있었음 (P0)",
        problem: "존재하지 않는 tx 해시 3건이 공개 QR 여권에 '검증됨'으로 표시되는 것을 E2E 점검에서 재현했습니다.",
        cause: "서버가 클라이언트가 보고한 tx 해시를 체인에서 확인하지 않고 저장했습니다.",
        action: "6개 기록 경로가 모두 거치는 ChainTransactionRecorder 한 곳에서 영수증 존재·status=0x1·컨트랙트 주소·서명자 일치를 저장 전에 검증하고, 블록 번호도 요청값이 아닌 영수증에서 가져오게 했습니다.",
        result: "검증 없이 통과하던 체인 테스트 36건이 처음으로 실패하는 것을 확인한 뒤 모두 바로잡았습니다.",
      },
      {
        id: "ufw", tags: ["devops"],
        title: "UFW로 막은 Jenkins가 인터넷에 평문 HTTP로 노출",
        problem: "방화벽으로 막았다고 생각한 Jenkins가 외부에서 HTTP로 접근 가능했습니다. docker.sock을 가진 root 컨테이너라 탈취되면 서버 전체가 넘어가는 구조였습니다.",
        cause: "Docker 포트 publish가 UFW 규칙을 우회합니다.",
        action: "publish 주소를 127.0.0.1로 묶고 Nginx HTTPS(/jenkins/)로만 접근하게 했습니다. 전 파일 감사로 backend·ai 컨테이너에 통째로 주입되던 시크릿(DB root·GitLab 토큰 등)을 제거하고, 비특권 uid 10001로 실행했습니다.",
        result: "외부 노출 경로를 HTTPS 프록시 하나로 줄이고, 컨테이너마다 필요한 키만 전달합니다.",
      },
      {
        id: "rollback", tags: ["devops"],
        title: "자동 롤백이 한 번도 동작하지 않았음",
        problem: "테스트 스택 배포가 실패해도 롤백이 일어나지 않았고, 헬스체크는 301 리다이렉트까지 정상으로 판정했습니다.",
        cause: ":test 단일 태그라 다음 빌드가 태그를 가져가면 이전 이미지가 롤백 대상에서 사라졌습니다.",
        action: ":test-$BUILD_NUMBER 이중 태그로 바꾸고, 헬스체크는 2xx만 통과하며 90초 동안 2초 간격으로 재시도하게 했습니다.",
        result: "깨진 이미지를 일부러 배포해 25초 안에 직전 이미지로 롤백되는 것을 실측했습니다.",
        metric: "롤백 25초",
      },
      {
        id: "schema-gate", tags: ["devops", "data"],
        title: "스키마 검사는 'OK'인데 백엔드가 크래시루프",
        problem: "배포 전 스키마 검증이 통과했는데 test 백엔드가 기동하지 못했습니다.",
        cause: "스크립트 안의 git fetch 실패를 '|| true'가 삼켜 오래된 기준으로 비교했습니다. Jenkins는 배포 디렉터리를 읽기 전용(:ro)으로 마운트해 fetch가 항상 실패했습니다.",
        action: "fetch 실패를 3회 재시도 후 fatal로 바꾸고, /tmp 임시 bare 저장소로 fetch해 :ro 경계는 유지했습니다. 병합 전 CI에서 임시 MySQL 두 개('HEAD schema' vs '기준 + 새 마이그레이션')를 만들어 information_schema로 대조합니다.",
        result: "타입·NULL 허용까지 대조해 실제 스키마 42개 테이블·412개 컬럼에서 거짓 양성 0건, 일부러 되돌린 사본은 정확히 검출했습니다.",
      },
      {
        id: "char-varchar", tags: ["backend", "devops"],
        title: "테스트 564건이 초록인데 운영 기동 실패",
        problem: "엔티티 하나 때문에 운영 백엔드가 뜨지 않아 롤백했습니다.",
        cause: "tx_hash 컬럼이 DB는 CHAR(66), 엔티티는 VARCHAR(66)를 기대했고, 테스트는 create-drop이라 원리적으로 이 차이를 잡을 수 없었습니다.",
        action: "columnDefinition을 지정하고 schema.sql 원문 기준 타입 대조 테스트를 추가했습니다. 수정한 jar를 운영 MySQL에 붙여 기동·health 200을 확인했습니다.",
        result: "운영 328개 컬럼에서 거짓 양성 0건, 일부러 틀린 6곳은 모두 검출했습니다.",
      },
      {
        id: "wallet-unique", tags: ["backend", "data"],
        title: "이력은 보존하면서 '활성 지갑 1개'만 강제",
        problem: "지갑 교체 이력을 남기면서 사용자당 활성 지갑은 하나만 허용해야 했습니다.",
        cause: "MySQL 8은 WHERE 절이 있는 부분 UNIQUE를 지원하지 않습니다.",
        action: "GENERATED ALWAYS AS (CASE WHEN ...) 생성 컬럼 + UNIQUE로 활성 단일성을 강제했습니다. nonce 1회용은 락 없이 조건부 UPDATE의 영향 행 수로 보장했습니다.",
        result: "엔티티의 unique=true가 H2에서만 제약을 걸어 운영과 어긋나는 것을 raw-schema 테스트로 확인하고 제거했습니다.",
      },
      {
        id: "nonce-rate", tags: ["backend", "devops"],
        title: "nonce API가 '등록된 지갑인가'를 알려주는 오라클",
        problem: "/auth/wallet/nonce 응답으로 지갑 주소의 등록 여부를 대량 조회할 수 있었습니다.",
        cause: "애플리케이션 앞단에 요청 제한이 없었습니다.",
        action: "Nginx에서 IP당 분당 10회(버스트 20, nodelay) 제한을 걸고, 응답은 429와 백엔드 ApiResponse 형태로 맞췄습니다.",
        result: "DB 조회 전에 요청을 거릅니다. 이후 테스트 스택 경로에 같은 설정이 빠진 것을 25회 연타 점검으로 찾아 동일하게 적용했습니다.",
      },
      {
        id: "authz-evidence", tags: ["backend"],
        title: "로그인한 누구나 남의 증빙 파일명을 볼 수 있었음",
        problem: "증빙 목록 API에서 파일명·해시·업로더가 노출돼 파일명만으로 거래 상대가 드러났습니다.",
        cause: "인증 여부만 보고 관계를 확인하지 않았습니다.",
        action: "업로더·등록자·현재 보유자면 FULL, 그 외는 종류별 개수만 SUMMARY로 응답하고 visibility 필드를 추가했습니다. 다운로드는 서버가 재해시해 일치할 때만 응답합니다.",
        result: "버린 대안과 판단 근거를 커밋에 기록했습니다.",
      },
      {
        id: "jackson", tags: ["backend"],
        title: "소수가 정수로 조용히 잘린 채 200 성공",
        problem: "수량 50.5가 50, 장바구니 2.7이 2로 저장되고 200이 응답됐습니다.",
        cause: "Jackson이 소수를 정수 필드에 맞춰 버리고, 필드 단위 대응은 다른 곳에서 재발했습니다. yml 설정은 test resources의 같은 이름 파일에 가려 동작하지 않았습니다.",
        action: "ObjectMapper 빈으로 전역 설정해 차단했습니다. 같은 MR에서 결제창 이탈 502→409, TEXT 초과 500→@Size 검증 등도 정리했습니다.",
        result: "잘못된 입력이 성공으로 저장되는 경로를 전역에서 막았습니다.",
      },
      {
        id: "startblock", tags: ["backend", "data"],
        title: "MetaMask 서명 확인까지 수십 초",
        problem: "서명 확인 지연이 해결된 뒤 다시 나타났습니다.",
        cause: "중복 발행 체크가 제네시스 블록부터 전체 로그를 훑었습니다. 시작 블록 환경변수가 Dockerfile ARG와 배포 .env 양쪽에서 빠져 0으로 폴백됐습니다.",
        action: "컨트랙트 배포 시각을 eth_getBlockByNumber 이진 탐색으로 블록 번호에 대응시켜 시작 블록(11,221,171)을 확정하고, 빌드 인자와 배포 환경변수 양쪽에 반영했습니다.",
        result: "전체 체인 스캔 없이 배포 이후 로그만 조회합니다.",
      },
      {
        id: "prune", tags: ["devops"],
        title: "다른 파트 배포가 내 빌드를 깨뜨림",
        problem: "Maven 테스트 466건이 통과한 뒤 이미지 export 단계에서만 빌드가 실패했습니다.",
        cause: "로그 타임스탬프를 대조해, 다른 파트 배포 스크립트의 prune(containerd GC)이 빌드 중인 블롭을 지운 것을 특정했습니다. disableConcurrentBuilds는 같은 job만 직렬화합니다.",
        action: "정리를 배포 흐름에서 분리해 cron(04:20, 24시간 경과분만, flock)으로 옮겼습니다.",
        result: "빌드 캐시 684MB를 회수하고 사용 중 이미지 5.3GB는 보존했습니다.",
      },
      {
        id: "env-recreate", tags: ["devops"],
        title: "MR은 초록인데 운영 AI 어시스턴트만 503",
        problem: "배선 MR은 병합됐는데 운영에서만 기능이 503을 냈습니다. 헬스체크도 통과해 기동 로그의 WARN 한 줄이 유일한 신호였습니다.",
        cause: "운영 .env에 키 줄 자체가 없었고, restart는 .env를 다시 읽지 않습니다.",
        action: ".env를 백업한 뒤 키 값을 출력하지 않고 길이 일치로만 검증해 복사하고, up -d --no-deps 재생성으로 복구했습니다. 배포 전 검증에 필수 환경변수 체크를 추가했습니다.",
        result: "당일 진단·복구하고 진단 절차를 문서화해 팀에 공지했습니다.",
      },
      {
        id: "clock", tags: ["backend", "devops"],
        title: "nonce 만료 시각이 9시간 어긋남",
        problem: "지갑 로그인 nonce가 예상과 다른 시각에 만료됐습니다.",
        cause: "호스트·MySQL·JDBC·JVM은 KST인데 Clock 빈만 UTC였습니다(주입 클래스 12개).",
        action: "ClockConfig로 통일하고 '한 곳만 다르게 하지 마라'를 회귀 테스트로 고정했습니다. Jenkins 컨테이너도 TZ를 맞췄습니다.",
        result: "서버·DB·CI 로그의 시간 기준이 하나로 맞춰졌습니다.",
      },
      {
        id: "minio", tags: ["backend"],
        title: "저장소 장애 시 봉투 없는 500",
        problem: "MinIO에 도달할 수 없을 때 원시 AWS SDK 예외가 그대로 500으로 나갔습니다.",
        cause: "S3Exception만 잡았는데, 컨테이너 정지·DNS 실패는 상속 관계가 없는 SdkClientException이었습니다. 가짜 S3 클라이언트가 모든 실패를 S3Exception으로 흉내 내 테스트도 통과했습니다.",
        action: "예외 처리와 테스트 더블을 함께 고치고, 수정 전 코드에서 새 테스트가 실패하는 것을 확인했습니다. MinIO 장애가 backend 기동을 막지 않도록 의존성도 완화했습니다.",
        result: "저장소 장애가 일관된 에러 응답으로 나갑니다.",
      },
    ],
  },

  finance: {
    title: "Richman",
    subtitle: "금융 통합 대시보드 · 주식 파트",
    period: "2026.04 ~ 2026.06",
    team: "SSAFY 15기 관통 프로젝트 · 3인 팀",
    role: "주식 파트 전체 설계·구현 (백엔드 API 10개, 뷰 3개, 컴포넌트 4개)",
    summary: "국내·미국 주식 시세와 HTS형 캔들 차트, 이동평균 기반 예측과 AI 코멘트를 제공하는 대시보드입니다.",
    flow: [],
    stack: ["Django REST Framework", "Vue 3", "Pinia", "ApexCharts", "yfinance"],
    metrics: [
      { value: "55+", label: "국내 30 · 미국 25+ 종목 10초 폴링 시세" },
      { value: "10~200", label: "마우스 휠 줌 캔들 범위" },
    ],
    results: [
      "MA5×0.6 + MA20×0.4 예측 모델 + OpenAI 코멘트 자동 생성",
      "비로그인 사용자도 메인 페이지에서 실시간 시세 확인",
      "공용 파일(NavBar, router, axios) 수정 전 팀원 최신본 확인 후 최소 변경 규칙 수립",
    ],
    cases: [
      {
        id: "yf-version", tags: ["backend", "data"],
        title: "yfinance 버전 호환 이슈",
        problem: "문서대로 작성한 스크리너 코드가 동작하지 않았습니다.",
        cause: "설치된 버전에 yf.Screener() 클래스가 없었습니다.",
        action: "screen 함수를 직접 임포트하고 size 파라미터를 count로 바꿨습니다.",
        result: "시가총액 상위 종목 조회를 복구했습니다.",
      },
      {
        id: "yf-dedupe", tags: ["data"],
        title: "미국 시가총액 순위에 해외 중복 종목 혼입",
        problem: "미국 시가총액 목록에 해외 상장 중복 종목이 섞였습니다.",
        cause: "조회 조건에 지역 제한이 없었습니다.",
        action: "EquityQuery에 region=us 조건을 추가하고 회사명 앞 두 단어 기준으로 중복을 제거했습니다. 국내 종목은 한글명 사전을 우선 조회하고 미등록 종목만 영문명으로 폴백했습니다.",
        result: "중복 없는 순위와 한글 종목명을 제공합니다.",
      },
      {
        id: "wheel", tags: ["frontend"],
        title: "마우스 휠 줌 미동작",
        problem: "차트 위에서 휠을 굴려도 줌 대신 페이지가 스크롤됐습니다.",
        cause: "브라우저가 wheel 리스너를 passive로 등록해 preventDefault()가 무시됐습니다.",
        action: "리스너 등록 시 { passive: false }를 명시했습니다.",
        result: "캔들 10~200개 범위를 휠로 자유롭게 조절합니다.",
      },
    ],
  },
};
