## 스프링 애플리케이션의 핵심 계층 구조
- 전체적인 흐름은 Controller -> Service -> DAO(Repository) -> Database 순서로 진행되며, 이 과정에서 데이터를 주고받기 위해 DTO와 Entity라는 객체를 사용

## Controller
- 역할: 사용자의 요청(HTTP Request)을 가장 먼저 받는 곳
- 기능: 요청에 담긴 파라미터를 읽고, 어떤 서비스(Service) 기능을 실행할지 결정한 뒤 결과를 반환
- 특징: 비지니스 로직을 직접 구현하지 않고, 서비스 계층으로 넘겨주는 '교환원'역할에 집중해야 함

## DTO (Data Transfer Object, 전달자)
- 역할: 계층 간(예: Controller <-> Service) 데이터를 전달하기 위해 사용하는 객체
- 기능: 화면에서 필요한 데이터만 골라 담거나, 보안상 중요한 정보(비밀번호 등)를 제외하고 데이터를 전달할 때 사용
- 특징: 오직 데이터를 담기 위한 바구니이므로 로직을 포함하지 않음

## Service (핵심 로직)
- 역할: 실제 비지니스 로직이 수행되는 곳
- 기능: "비밀번호가 일치하는가?", "재고가 남아있는가?" 같은 검증과 계산을 수행
- 특징: 하나의 서비스 기능은 하나의 트랜잭션(Transaction)단위로 관리되는 경우가 많음

## DAO (Data Access Object, 창고 관리자)
- 역할: 데이터베이스(DB)에 직접 접근하여 데이터를 저장하거나 조회하는 객체
- 기능: SQL을 시행하여 DB와 소통
- 참고: 최근 스프링 부트(Spring Data JPA)에서는 DAO 대신 Repository라는 인터페이스를 사용하여 더 간단하게 구현

## Entity (DB 테이블 그 자체)
- 역할: 실제 DB 테이블과 1:1로 매핑되는 클래스입니다.
- 주의: DTO와 비슷해 보이지만, Entity는 DB의 핵심 모델이므로 화면에 전달하는 용도로 직접 사용하지 않는 것이 원칙(DTO를 거쳐서 전달)

## 데이터의 이동 흐름(예: 회원가입)
- Client: 아이디/비번 입력 후 가입 버튼 클릭
- Controller: 가입 요청 수신 -> 데이터를 SingUpDTO에 담아 Service로 전달
- Service: "아이디 중복 확인" 등 로직 수행 -> DTO를 Entity로 변환하여 Repository(DAO)에 전달
- Repository: Entity를 기반으로 DB에 INSERT 쿼리 실행
- DB: 데이터 저장 완료

## 이렇게 나누어 관리하는 이유(분리하는 이유)
- 유지보수 용이성: DB 주소나 쿼리가 바뀌어도 DAO(Repository)만 수정하면 되고, 화면이 바뀌어도 Controller만 수정하면 됨
- 보안: Entity를 직접 화면에 노출하면 DB 구조가 드러나 위험함. DTO를 통해 필요한 정보만 선택해서 보여줌
- 테스트: 각 계층이 분리되어 있어 특정 부분만 떼어내어 오류를 찾기 쉬움

## Spring Security
- 장고는 django-allauth 같은 라이브러리가 많은 부분을 자동으로 처리해주지만, 스프링은 보안의 흐름(Filter Chain)을 개발자가 어느 정도 제어해야 합니다.

### Spring Security를 알아야 하는 이유
소셜 로그인이 진행될 때 Spring Security는 다음과 같은 복잡한 과정을 뒤에서 처리해줍니다.

- 인증 흐름 제어: 카카오나 구글에서 인증을 마치고 돌아온 유저를 가로채서 서비스의 유저로 등록할지, 기존 유저인지 판단합니다.

- 권한 부여 (Authorization): 로그인한 유저가 '일반 유저'인지 '관리자'인지 구분하여 특정 API(/api/v1/users/me) 접근 가능 여부를 결정합니다.

- JWT 발행 및 검증: 소셜 로그인 성공 후 JWT를 생성하여 클라이언트에 전달하고, 이후 요청마다 이 토큰이 유효한지 검사하는 '필터(Filter)' 역할을 수행합니다.

### 핵심 키워드 (이것 위주로 찾아보세요)
전체를 다 공부하기엔 양이 너무 많으므로, 프로젝트에 바로 적용할 수 있는 핵심 개념 3가지만 먼저 파악하시는 것을 추천합니다.

- Security Filter Chain: 요청이 컨트롤러에 도달하기 전 거치는 일련의 '검문소'입니다.

- OAuth2UserService: 소셜 서비스(카카오 등)에서 가져온 유저 정보를 우리 DB(MySQL)에 저장하거나 업데이트하는 로직을 담는 곳입니다.

- AuthenticationSuccessHandler: 소셜 로그인 성공 직후, JWT 토큰을 생성하고 프론트엔드(React)로 리다이렉트 시키는 로직을 작성하는 곳입니다.

Spring Security는 요청이 들어왔을 때 컨트롤러에 도달하기 전, **'여러 개의 필터(Filter)'**를 거치며 인증(Authentication)과 인가(Authorization)를 처리하는 거대한 성벽과 같습니다.

장고(Django)가 내부 미들웨어에서 많은 것을 자동으로 처리한다면, 스프링 시큐리티는 **필터 체인(Filter Chain)**이라는 구조를 통해 각 단계를 세밀하게 제어합니다.

### Spring Security의 핵심 흐름
요청이 들어오면 다음과 같은 순서로 처리가 진행됩니다.

- Http Request 수신: 사용자가 로그인을 시도하거나 데이터를 요청합니다.

- AuthenticationFilter: 요청을 가로채서 인증용 객체(UsernamePasswordAuthenticationToken 등)를 만듭니다.

- AuthenticationManager: 실제 인증을 담당하는 '관리자'입니다. 등록된 여러 AuthenticationProvider 중 적절한 것을 골라 인증을 맡깁니다.

- UserDetailsService & Entity: DB(MySQL)에서 사용자 정보를 조회합니다. 여기서 질문자님이 이해하신 Entity와 Repository가 사용됩니다.

- SecurityContextHolder: 인증이 성공하면 사용자 정보를 세션이나 컨텍스트에 저장하여, 이후 프로그램 어디서든 '로그인한 사용자'를 알 수 있게 합니다.

### 소셜 로그인(OAuth 2.0) 시의 특수 구조
- 소셜 로그인을 사용할 때는 일반적인 아이디/비밀번호 방식과 조금 다른 필터가 동작합니다.

- OAuth2LoginAuthenticationFilter: 카카오나 구글에서 보내준 인증 코드를 가로채서 액세스 토큰을 받아오는 역할을 합니다.

- OAuth2UserService: 가져온 소셜 프로필 데이터를 우리 서비스의 규칙에 맞게 가공합니다. 이때 Neo4j에 유저 노드를 생성하거나 MySQL에 유저 정보를 업데이트하는 비즈니스 로직을 넣게 됩니다.

### 컴포넌트,역할,관련 요구사항
- SecurityConfig: 어떤 URL을 보호할지, 어떤 필터를 쓸지 총괄 설정합니다.
- JwtAuthenticationFilter: 매 요청마다 헤더의 JWT가 유효한지 검사하는 커스텀 검문소입니다.
- SuccessHandler: 소셜 로그인 성공 직후 JWT를 발급하여 리액트로 보내주는 출구 역할을 합니다.