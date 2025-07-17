# 각종 프로그램 설치
## python, git bash, vscode, vscode git bash 설정
	설치 과정은 SAFFY 14기 공용 노션 참조

### VS code에서 git 이용 기본 설정
 
	 Ctrl + j - 터미널 창 열기 -> + 옆에 있는 아래 방향 화살표 -> Select Default Profile -> git bash 선택하기


### git commit --amend
	- 메세지 수정 : 기본은 명령어 모드. i를 누르면 insert mode로 바꿀 수 있음 -> 내용 수정 후 ESC 누르면 insert mode 종료 -> 명령어 모드로 : ( 쉬프트 + ; ) 누르면 하단에 : 뜨고 입력할 수 있음 -> 다음 행동 입력

	wq  - 저장 후 종료
	q   - 종료
	wq! - 저장 후 강제 종료
	q!  - 강제 종료

	- 직전 commit 수정 : 직전 수정 내용을 add로 추가함
	git commit --amend에 들어가면 수정 내용이 들어가 있는 것 확인. 위와 같은 방법으로 종료

### GitHub vs GitLab  
	GitHub - MS. 코드를 마소가 다 가져가버림
             오픈 소스들이 대부분 GitHub에 있음 ex) Django,  Vuejs

	GitLab - 서버를 사용자가 직접 만들어야 함
	         회사들이 주로 사용
	         배포 자동화가 유연함, 협업, 이슈관리

	Bitbucket - 유료 서비스
				5인 이하면 무료이다 (확실치 않음)
				GitLab과 비슷한 장점
				스타트업에서 사용하기 좋음

### GitHub 설정 변경 (공용 노션) 
	프로필 버튼 - setting - Repositories - main을 master로 수정

### 로컬 저장소에 원격 저장소 추가 
	붙여넣기 Ctrl V 잘 안되면 Shift Insert
	원격 저장소에서 clone으로 받은 프로젝트는 이미 git init이 되어 있음

### git rm --cached
	추적 중단 -> gitignore에 추가
	untrack..
	이미 버전관리에 추가 됐던 파일들은 deleted 에 표시됨
	애초에 관리 명단에 들어갔기 때문에 완전히 없어지게 하는 건 힘듦
    처음에 .gitignore 파일을 작성하기

