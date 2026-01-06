import sys
sys.stdin = open('sample_input.txt')


def find_position(si, sj, ni, nj):
    ans = ''
    if ni < si and nj > sj:
        ans = 'top_right'

    elif ni > si and nj > sj:
        ans = 'bottom_right'

    elif ni > si and nj < sj:
        ans = 'bottom_left'
    
    elif ni < si and nj < sj:
        ans = 'top_left'

    return ans


T = int(input())

for tc in range(1, T + 1):
    N = int(input())    # 한 변의 길이
    arr = [list(map(int, input().split())) for _ in range(N)]
    apple = {}  # 사과 정보를 담을 딕셔너리
    for i in range(N):
        for j in range(N):
            if arr[i][j] != 0:
                apple[arr[i][j]] = (i, j)   # 키에는 사과 번호, 값에는 사과의 좌표

    # 현재 위치와 찾아가야 하는 사과의 위치에 대한 관계
    # 해당 위치일 때 해당 방향으로 진행중(키)일 때 최소 회전 횟수와 다음 진행 방향(값)
    position_dict = {
        'top_right': {'up': (1, 'right'), 'right': (3, 'up'), 'down': (3, 'right'), 'left': (2, 'right')},
        'bottom_right': {'up': (2, 'down'), 'right': (1, 'down'), 'down': (3, 'right'), 'left': (3, 'down')},
        'bottom_left': {'up': (3, 'left'), 'right': (2, 'left'), 'down': (1, 'left'), 'left': (3, 'down')},
        'top_left': {'up': (3, 'left'), 'right': (3, 'up'), 'down': (2, 'up'), 'left': (1, 'up')},
    }

    # 출발은 좌상단에서 시작, 오른쪽 방향으로 먼저 감
    si = 0
    sj = 0
    direction = 'right'
    turn = 0  # 회전 수를 담을 변수

    for k in range(len(apple)):
        ni, nj = apple[k + 1]   # 찾아가야 하는 사과 좌표, 사과는 1번부터 시작인데 k는 0부터 시작이라 1 더해줌
        position = find_position(si, sj, ni, nj)  # 위치 관계를 찾음
        turn += position_dict[position][direction][0]
        direction = position_dict[position][direction][1]
        si, sj = ni, nj  # k + 1 번째 사과로 이동했으니 시작 지점 갱신

    print(f'#{tc} {turn}')

