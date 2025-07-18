# 프로그램 설치 및 git, 기타 등등
## python, git bash, vscode, vscode git bash 설정
	설치 과정은 SSAFY 14기 공용 노션 참조

## VS code에서 git 이용 기본 설정
 
	 Ctrl + j - 터미널 창 열기 -> + 옆에 있는 아래 방향 화살표 -> Select Default Profile -> git bash 선택하기


## git commit --amend
	- 메세지 수정 : vim 모드로 변경. 기본은 명령어 모드. i를 누르면 insert mode로 바꿀 수 있음
	-> 내용 수정 후 ESC 누르면 insert mode 종료 -> 명령어 모드로 : ( 쉬프트 + ; ) 누르면 하단에 : 뜨고 입력할 수 있음 -> 다음 행동 입력

	wq  - 저장 후 종료
	q   - 종료
	wq! - 저장 후 강제 종료
	q!  - 강제 종료

	- 직전 commit 수정 : 직전 수정 내용을 add로 추가함
	git commit --amend에 들어가면 수정 내용이 들어가 있는 것 확인. 위와 같은 방법으로 종료

## GitHub vs GitLab  
	GitHub - MS. 코드를 마소가 다 가져가버림
             오픈 소스들이 대부분 GitHub에 있음 ex: Django,  Vuejs

	GitLab - 서버를 사용자가 직접 만들어야 함
	         회사들이 주로 사용
	         배포 자동화가 유연함, 협업, 이슈관리

	Bitbucket - 유료 서비스
				5인 이하면 무료이다 (확실치 않음)
				GitLab과 비슷한 장점
				스타트업에서 사용하기 좋음

## GitHub 설정 변경 (공용 노션) 
	프로필 버튼 - setting - Repositories - main을 master로 수정

## 로컬 저장소에 원격 저장소 추가 
	붙여넣기 Ctrl V 잘 안되면 Shift Insert
	원격 저장소에서 clone으로 받은 프로젝트는 이미 git init이 되어 있음

## git rm --cached
	추적 중단 -> gitignore에 추가
	untrack..
	이미 버전관리에 추가 됐던 파일들은 deleted 에 표시됨
	애초에 관리 명단에 들어갔기 때문에 완전히 없어지게 하는 건 힘듦
    처음에 .gitignore 파일을 작성하기

## git revert 
	특정 commit을 없었던 일로 만드는 작업
	revert는 어디에 있던 hash값을 통해 log를 찾아오면 수정 가능
	log만 보고서는 중간에 어떤 버전이 삭제됐는지 알기 힘들다 -> 버전관리가 올바르게 되고 있다고 동의하기 힘듦
	revert는 최대한 기피해야 함 -> commit 하기 전에 staging area를 확인하고 또 확인!
	commit을 하고 나서도 확인하기
	git은 사실 그 버전을 완전히 지우는 게 아님 -> git reflog 명령어를 통해 지워진 commit도 복구 가능
	revert는 삭제를 했다는 새로운 commit을 남김 -> reset보다는 revert를 쓰는게 좋음
	revert를 하면 그 commit의 변경사항은 취소되지만 log에는 여전히 남아 있음
	amend와 revert, reset의 큰 차이점은 amend는 직전 commit에 대해서만 수정 가능

	- git revert <commit id> 로 실행
	지우고자 하는 commit의 해시 값이 123456이라면
	git revert 123456

## git reset
	특정 commit으로 되돌아가는 것
	되돌아간 commit 이후의 commit은 모두 삭제

## git reset의 3가지 옵션
### --soft
	삭제된 commit의 기록을 staging area에 남김
	변경했던 사항들이 status에 new file 상태로 존재
### --mixed
	삭제된 commit의 기록을 working directory에 남김 (기본 옵션 값)
	변경했던 사항들이 status에 untracked file 상태로 존재

### --hard
	삭제된 commit의 기록을 남기지 않음
	변경했던 사항들이 status에 남지 않음

## git restore
	modified 상태의 파일 되돌리기
	원래 파일로 덮어쓰는 원리이기 때문에 수정한 내용은 전부 사라짐
	-> git restore를 통해 수정 취소 후에는 해당 내용을 복원할 수 없음

## Unstage 하는 명령어
git status를 통해 어떤 명령어를 써야하는지 확인할 수도 있음

### git rm --cached
	staging area에서 working directory로 되돌리기
	-> git 저장소에 "commit이 없는 경우"

### git restore --staged
	staging area에서 working directory로 되돌리기
	-> git 저장소에 "commit이 존재하는 경우"

## 클라이언트와 서버

### 클라이언트(Client)
	서비스를 요청하는 쪽
	ex: 사용자의 웹 브라우저, 모바일 앱
### 서버(Server)
	요청을 받아서 처리하고, 결과를 응답해주는 쪽
	ex: 웹 서버, 데이터베이스 서버

## API(Application Programming interface)
	두 소프트웨어(또는 시스템)이 서로 통신할 수 있게 하는 메커니즘
	-> '약속된 방식의 인터페이스'로, 특정 규칙에 따라 데이터를 요청하고 응답하는 규칙을 제공

## Application
	특정 기능을 수행하는 모든 소프트웨어
	웹·모바일·데스크톱 앱 등, 우리가 만든 서비스나 프로그램도 모두 앱의 일종

## API 예시
	1. 인증 API (authentification API)
	소셜 로그인 - 특정 사이트에서 Google로 계속하기 등

	2. 날씨 앱
	기상청 서버로부터 데이터를 요청해서 응답 받음
	지정된 형식들이 작성되어 있음
	"이렇게 요청을 보내면, 이렇게 정보를 제공해줄 것이다"라는 매뉴얼

## API Key
### API Key란?
	API에게 요청을 보내는 애플리케이션을 구별하기 위한 고유한 식별 문자열
	랜덤하게 생성된 키를 서버가 발급하는 방식

### API Key가 필요한 이유
	- 보안강화
	무단 접근을 막고, 승인된 사용자(또는 앱)만 요청할 수 있도록

	- 데이터 관리
	API 호출 횟수, 사용량 모니터링
	일정량 이상의 사용 시 제한 또는 과금 정책 적용 가능

### API Key 사용 시 주의사항
	- 공개된 곳에 노출하지 말 것
	- 키가 유출될 경우 무단 사용 위험 -> 정기 갱신 필요
	- 서버-클라이언트 구조에서 키를 안전하게 저장하는 방법들 고려
	- .gitignore에 '파일' or 'env/'(환경변수 저장 파일) 포함시키기

### API 정리
	- API는 클라이언트와 서버 이 둘 사이의 "눈에 보이지 않는 인터페이스" 역할
	- API Key는 이 통신을 더욱 안전하게 만들기 위한 핵심 수단

