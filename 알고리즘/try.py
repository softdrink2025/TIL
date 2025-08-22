N = 6
A = [i for i in range(1, N+1)]

key = 10
bit = [0] * N

def f(i, N):  # bit[i]를 결정하는 함수
    if i == N:
        print(bit)
    else:
        bit[i] = 1
        f(i + 1, N)
        bit[i] = 0
        f(i + 1, N)
f(0, N)