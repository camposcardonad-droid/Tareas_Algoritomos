def detectar_big_o(codigo):
    lineas = codigo.split("\n")
    ciclos = 0
    ciclos_anidados = 0
    division_log = False

    for linea in lineas:
        linea = linea.strip()

        if "for" in linea or "while" in linea:
            ciclos += 1

        if "for" in linea and "for" in linea:
            ciclos_anidados += 1

        if "/ 2" in linea or "// 2" in linea:
            division_log = True

    if division_log:
        return "O(log n)"
    elif ciclos >= 3:
        return "O(n^3)"
    elif ciclos == 2:
        return "O(n^2)"
    elif ciclos == 1:
        return "O(n)"
    else:
        return "O(1)"

codigo_ejemplo = """
for i in range(n):
    for j in range(n):
        print(i, j)
"""

print("Complejidad:", detectar_big_o(codigo_ejemplo))