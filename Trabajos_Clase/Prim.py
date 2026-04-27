import heapq
import time
def prim(grafo, inicio):
	visitados = set()
	heap = [(0, inicio, None)]
	total = 0
	mst = []
	while heap:
		peso, nodo, padre = heapq.heappop(heap)
		if nodo in visitados:
			continue
		visitados.add(nodo)
		total += peso
		if padre is not None:
			mst.append((padre, nodo, peso))
		for vecino, costo in grafo[nodo]:
			if vecino not in visitados:
				heapq.heappush(heap, (costo, vecino, nodo))
	return total, mst
grafo_denso = {
    'A': [('B', 2), ('C', 3), ('D', 1)],
    'B': [('A', 2), ('C', 4), ('D', 2)],
    'C': [('A', 3), ('B', 4), ('D', 5)],
    'D': [('A', 1), ('B', 2), ('C', 5)]
}
inicio = time.perf_counter()
total_denso, mst_denso = prim(grafo_denso, 'A')
fin = time.perf_counter()
print("PRIM Denso:", total_denso, mst_denso)
print("Tiempo:", fin - inicio, "segundos")

grafo_disperso = {
    'A': [('B', 2)],
    'B': [('A', 2), ('C', 3)],
    'C': [('B', 3), ('D', 4)],
    'D': [('C', 4)]
}
inicio = time.perf_counter()
total_disp, mst_disp = prim(grafo_disperso, 'A')
fin = time.perf_counter()
print("PRIM Disperso:", total_disp, mst_disp)
print("Tiempo:", fin - inicio, "segundos")
