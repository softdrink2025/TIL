import sys
sys.stdin = open('sample_input.txt')


def shoot(arr, point):
    global result

    if len(arr) == 2:
        if arr[0] > arr[1]:
            arr.pop(1)
        else:
            arr.pop(0)
        point += arr[0] * 2

        if result < point:
            result = point
        return

    if len(arr) >= 3:
        if arr[1] != min(arr):
            shoot(arr[1:], point + arr[1])  # 제일 왼쪽 풍선을 쏘는 경우
            # 가지치기 필요함

        for i in range(1, len(arr) - 1):
            shoot(arr[:i] + arr[i + 1:], point + arr[i - 1] * arr[i + 1])

        if arr[-2] != min(arr):
            shoot(arr[:-1], point + arr[-2])


T = int(input())
for tc in range(1, T + 1):
    N = int(input())    # 풍선의 개수
    balloons = list(map(int, input().split()))
    result = 0
    shoot(balloons, 0)
    print(result)
