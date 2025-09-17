# import sys
# sys.stdin = open('input.txt')


def search(ci, cj, pi, pj, distance, cnt):  # 현재 위치와 이전 위치, 이동 거리, 수확한 사과 수
    global result

    distance += abs(ci - pi) + abs(cj - pj)

    if result <= distance:
        return

    if cnt == N:  # 모든 사과를 수확했다면
        distance += abs(ci - 0) + abs(cj - 0)
        if result > distance:
            result = distance
        return

    for i in range(N):
        if not visited[i]:
            visited[i] = True
            search(apples[i][0], apples[i][1], ci, cj, distance, cnt + 1)
            visited[i] = False


T = int(input())
for tc in range(1, T + 1):
    N = int(input())
    apples = [list(map(int, input().split())) for _ in range(N)]
    visited = [False] * N
    result = 200 * 10
    search(0, 0, 0, 0, 0, 0)
    print(result)







