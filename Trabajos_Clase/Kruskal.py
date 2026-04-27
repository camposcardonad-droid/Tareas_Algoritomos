import time
class UnionFind:
    def __init__(self, n):
        self.padre = list(range(n))
    def find(self, x):
        if self.padre[x] != x:
            self.padre[x] = self.find(self.padre[x])
        return self.padre[x]
    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx != ry:
            self.padre[ry] = rx
            return True
        return False
def kruskal(n, aristas):
    aristas.sort(key=lambda x: x[2])
    uf = UnionFind(n)
    total = 0
    mst = []
    for u, v, peso in aristas:
        if uf.union(u, v):
            total += peso
            mst.append((u, v, peso))
    return total, mst
aristas_denso = [
    (0,1,2),(0,2,3),(0,3,1),
    (1,2,4),(1,3,2),
    (2,3,5)
]
inicio = time.perf_counter()
total_denso_k, mst_denso_k = kruskal(4, aristas_denso)
fin = time.perf_counter()
print("KRUSKAL Denso:", total_denso_k, mst_denso_k)
print("Tiempo:", fin - inicio, "segundos")

aristas_disperso = [
    (0,1,2),
    (1,2,3),
    (2,3,4)
]
inicio = time.perf_counter()
total_disp_k, mst_disp_k = kruskal(4, aristas_disperso)
fin = time.perf_counter()
print("KRUSKAL Disperso:", total_disp_k, mst_disp_k)
print("Tiempo:", fin - inicio, "segundos")