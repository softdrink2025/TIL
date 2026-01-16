## HTTP 통신
- Hyper Text Transper Protocol
- 웹 서비스에서 Client - Server 간의 정보를 요청(request) / 응답(response) 받기 위해 만들어진 프로토콜
- Client가 요청이 있을 때만, Server에서 응답을 반환(단방향 통신)
- Statefuless protocol - Server가 Client의 상태를 저장하지 않음
- 반드시 DB를 거쳐 데이터를 주고 받음
- 서버 자체의 메모리에 유저 데이터를 들고 있지 않음

## Socket 통신
- 패킷이라는 형식화된 데이터 메모리 단위를 주고 받아 통신함
- Client와 Server가 특정 port를 열어서 실시간으로 양방향 통신을 하는 방식
- Stateful Protocol - Server가 Client의 상태를 저장하고 있음
(Client/Server 측에서 임의로 연결상태를 끊지 않는 한 서로 연결 유지)
- DB를 통해 데이터를 주고 받을 수도 있고, 임시로 데이터를 서버 프로그램 자체 내에서 생성해서 가지고 있을 수도 있음
- 서버 자체의 메모리에 유저 데이터를 저장하고 있음

## 소켓(Socket)이란?
- 소켓은 네트워크 상에서 돌아가는 두 개의 프로그램(Client-Server)간의 접속점
- Client측의 소켓 연결 요청 - Server간의 소켓 연결 수락이 이루어지면 양방향으로 데이터 전송 가능

### 연결 과정
- Server는 연결 대기중 (listen())
- Client가 연결 요청 (connect())
- Server의 연결 수락 (accept())
- Client가 패킷 전달 (send()/recv())
- Server는 명령어 분석 후 필요에 따라 DB 요청(send()/recv())
- Server나 Client가 연결 종료(close())

## WebSocket의 등장
- 웹 서비스에서는 그럼 양방향 통신을 할 수 있는 프로토콜은 존재하지 않는가?
- 웹 서비스에서 Client - Server 간의 정보를 양방향으로 통신하기 위해 만들어짐
- Stateful protocol - 한 번 Connection을 맺으면 일정 시간 동안 Connection을 유지할 수 있음
- 웹서버와 통신이 가능하다는 이점이 있음
- WebRTC는 P2P(peer to peer) 방식, WebSocket은 Client-Server 방식

- TCP...? HTTP를 거치고 통신. 처음에 연결에 시간이 걸릴 수 있어도 속도가 느리지는 않다

### WebRTC
- Signaling Server: 일종의 로비 서버
- STUN Server: 공인 IP 알아내주는 서버
- TURN Server: 방화벽으로 막힌 경우 우회로 통신 가능한 서버. 좀 느림
- 연결 뒤에는 P2P로 직접 통신(통신 방법은 UDP로)
    - UDP VS TCP?
        - UDP는 데이터가 제대로 도착했는데 검증하지 않음
        - TCP는 데이터가 제대로 도착했는지 검증. UDP보다 느림

### P2P
- Client 중에 하나가 Server가 되는 것


### 추가로
WAS
