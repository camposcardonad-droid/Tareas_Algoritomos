const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let nodes = [];
let edges = [];
let mode = "node";
let selectedNode = null;
function setMode(m){
    mode = m;
}
canvas.addEventListener("click", function(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if(mode === "node") {
        nodes.push({
            id: letters[nodes.length % letters.length],
            x: x,
            y: y
        });
        draw();
    }
    else if(mode === "edge") {
        const clicked = getNode(x, y);
        if(clicked) {
            if(selectedNode === null) {
                selectedNode = clicked;
            }
            else {
                const weight = parseInt(prompt("Peso:"));
                if(!isNaN(weight)) {
                    edges.push({
                        from: nodes.indexOf(selectedNode),
                        to: nodes.indexOf(clicked),
                        weight: weight,
                        color: "black"
                    });
                }
                selectedNode = null;
                draw();
            }
        }
    }
});
function getNode(x, y) {
    let i = 0;
    while(i < nodes.length) {
        const node = nodes[i];
        const dx = node.x - x;
        const dy = node.y - y;
        if(Math.sqrt(dx * dx + dy * dy) < 20) {
            return node;
        }
        i++;
    }
    return null;
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let i = 0;
    while(i < edges.length) {
        const edge = edges[i];
        const from = nodes[edge.from];
        const to = nodes[edge.to];
        ctx.beginPath();
        ctx.strokeStyle = edge.color;
        ctx.lineWidth = edge.color !== "black" ? 4 : 2;
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        ctx.fillStyle = "red";
        ctx.font = "bold 16px Arial";
        ctx.fillText(
            edge.weight,
            (from.x + to.x) / 2,
            (from.y + to.y) / 2
        );
        i++;
    }
    i = 0;
    while(i < nodes.length) {
        const node = nodes[i];
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = "skyblue";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.id, node.x - 5, node.y + 5);
        i++;
    }
}
function resetColors() {
    let i = 0;
    while(i < edges.length) {
        edges[i].color = "black";
        i++;
    }
}
function prim() {
    resetColors();
    if(nodes.length === 0 || edges.length === 0) return;
    let visited = [0];
    while(visited.length < nodes.length) {
        let minEdge = null;
        let minWeight = Infinity;
        let i = 0;
        while(i < edges.length) {
            const e = edges[i];
            const condition1 = visited.includes(e.from) && !visited.includes(e.to);
            const condition2 = visited.includes(e.to) && !visited.includes(e.from);
            if((condition1 || condition2) && e.weight < minWeight) {
                minWeight = e.weight;
                minEdge = e;
            }
            i++;
        }
        if(minEdge === null) break;
        minEdge.color = "green";
        if(!visited.includes(minEdge.from)) visited.push(minEdge.from);
        if(!visited.includes(minEdge.to)) visited.push(minEdge.to);
    }
    draw();
}
function kruskal() {
    resetColors();
    if(nodes.length === 0 || edges.length === 0) return;
    let parent = [];
    let i = 0;
    while(i < nodes.length) {
        parent[i] = i;
        i++;
    }
    function find(x) {
        while(parent[x] !== x) {
            x = parent[x];
        }
        return x;
    }
    function union(a, b) {
        parent[find(a)] = find(b);
    }
    const sorted = [...edges].sort((a, b) => a.weight - b.weight);
    i = 0;
    while(i < sorted.length) {
        const e = sorted[i];
        if(find(e.from) !== find(e.to)) {
            union(e.from, e.to);
            e.color = "blue";
        }
        i++;
    }
    draw();
}
function dijkstra(start) {
    resetColors();
    if(nodes.length === 0) return;
    let dist = [];
    let visited = [];
    let parentEdge = [];
    let i = 0;
    while(i < nodes.length) {
        dist[i] = Infinity;
        visited[i] = false;
        parentEdge[i] = null;
        i++;
    }
    dist[start] = 0;
    i = 0;
    while(i < nodes.length - 1) {
        let min = Infinity;
        let u = -1;
        let j = 0;
        while(j < nodes.length) {
            if(!visited[j] && dist[j] < min) {
                min = dist[j];
                u = j;
            }
            j++;
        }
        if(u === -1) break;
        visited[u] = true;
        j = 0;
        while(j < edges.length) {
            const e = edges[j];
            if(e.from === u || e.to === u) {
                const v = e.from === u ? e.to : e.from;
                if(!visited[v] && dist[u] + e.weight < dist[v]) {
                    dist[v] = dist[u] + e.weight;
                    parentEdge[v] = e;
                }
            }
            j++;
        }
        i++;
    }
    i = 0;
    while(i < parentEdge.length) {
        if(parentEdge[i] !== null) {
            parentEdge[i].color = "orange";
        }
        i++
    }
    console.log("Distancias:", dist);
    draw();
}