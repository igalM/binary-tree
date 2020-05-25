class Node {
    leftNode = null;
    rightNode = null;

    constructor(x, y, r, ctx, data) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.ctx = ctx;
        this.data = data;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.strokeText(this.data, this.x, this.y);
    };

    get getData() { return this.data; };
    get getX() { return this.x; };
    get getY() { return this.y; };
    get getRadius() { return this.r; };
    get leftCoordinate() {
        return { cx: (this.x - (3 * this.r)), cy: (this.y + (3 * this.r)) }
    };
    get rightCoordinate() {
        return { cx: (this.x + (3 * this.r)), cy: (this.y + (3 * this.r)) }
    };
}


class Line {
    draw(x, y, toX, toY, r, ctx) {
        const moveToX = x;
        const moveToY = y + r;
        const lineToX = toX;
        const lineToY = toY - r;
        ctx.beginPath();
        ctx.moveTo(moveToX, moveToY);
        ctx.lineTo(lineToX, lineToY);
        ctx.stroke();
    };
}


class BTree {
    constructor() {
        this.createTree();
    }

    createTree() {
        this.c = document.getElementById('my-canvas');
        this.ctx = this.c.getContext('2d');
        this.line = new Line();
        this.root = null;
    }

    add(data) {
        if (this.root) {
            this.recursiveAddNode(this.root, null, null, data);
        } else {
            this.root = this.addAndDisplayNode(200, 20, 15, this.ctx, data);
            return;
        }
    };

    recursiveAddNode(node, prevNode, coordinates, data) {
        if (!node) {
            const xy = coordinates;
            const newNode = this.addAndDisplayNode(xy.cx, xy.cy, 15, this.ctx, data);
            this.line.draw(prevNode.getX, prevNode.getY, xy.cx, xy.cy, prevNode.getRadius, this.ctx)
            return newNode;
        }
        else {
            if (data <= node.getData) {
                node.leftNode = this.recursiveAddNode(node.leftNode, node, node.leftCoordinate, data);
            }
            else {
                node.rightNode = this.recursiveAddNode(node.rightNode, node, node.rightCoordinate, data);
            }
            return node;
        }
    };

    addAndDisplayNode(x, y, r, ctx, data) {
        const node = new Node(x, y, r, ctx, data);
        node.draw();
        return node;
    };


}


function addToTree() {
    const value = parseInt(document.getElementById('tree-input').value);
    if (!value) return alert("Wrong input");
    btree.add(value);
}

const btree = new BTree();