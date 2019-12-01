class BinarySearchTree {
    constructor() {
        this.countElements = 0;
        this.root = null;
    }
    showTree() {
        console.log(JSON.stringify(this.root));
    }
    insertNumberNode(key, value) {
        const nodeToAdd = {
            key: key,
            value: value,
            left: null,
            right: null,
            level: 1,
            x: 50
        };
        let currentNumberNode;
        if (!this.root) {
            nodeToAdd["level"]--;
            this.root = nodeToAdd;
            currentNumberNode = this.root;
        }
        else {
            currentNumberNode = this.root;
            while (true) {
                if (key === currentNumberNode["key"]) {
                    currentNumberNode["value"] = value;
                    break;
                }
                if (key < currentNumberNode["key"]) {
                    if (!currentNumberNode["left"]) {
                        currentNumberNode["left"] = nodeToAdd;
                        break;
                    }
                    nodeToAdd["level"]++;
                    currentNumberNode = currentNumberNode["left"];
                }
                else {
                    if (!currentNumberNode["right"]) {
                        currentNumberNode["right"] = nodeToAdd;
                        break;
                    }
                    nodeToAdd["level"]++;
                    currentNumberNode = currentNumberNode["right"];
                }
            }
        }
        this.countElements++;
    }
    find(keyToFind) {
        let currentNumberNode = this.root;
        let parrent;
        if (this.root == null) {
            return { message: "Дерево пустое" };
        }
        for (let i = 0; i < this.countElements + 1; i++) {
            if (keyToFind === currentNumberNode["key"]) {
                return [currentNumberNode, parrent];
            }
            if (keyToFind > currentNumberNode["key"]) {
                parrent = currentNumberNode;
                currentNumberNode = currentNumberNode["right"];
            }
            if (keyToFind < currentNumberNode["key"]) {
                parrent = currentNumberNode;
                currentNumberNode = currentNumberNode["left"];
            }
        }
        return { message: "Элемент не найден" };
    }
    remove(keyToDelete) {
        if (this.root == null) {
            return { message: "Дерево пустое" };
        }
        let valueToReturn;
        let currentNumberNode = this.root;
        while (true) {
            if (keyToDelete === currentNumberNode["key"]) {
                if (currentNumberNode["left"] == null && currentNumberNode["right"] == null) {
                    valueToReturn = currentNumberNode;
                    const parrent = this.find(currentNumberNode["key"])[1];
                    if (currentNumberNode["key"] > parrent["key"]) {
                        parrent["right"] = null;
                    }
                    else {
                        parrent["left"] = null;
                    }
                    return valueToReturn;
                }
                if (currentNumberNode["left"] == null || currentNumberNode["right"] == null) {
                    if (currentNumberNode["left"] != null) {
                        valueToReturn = currentNumberNode;
                        currentNumberNode["key"] = currentNumberNode["left"]["key"];
                        currentNumberNode["value"] = currentNumberNode["left"]["value"];
                        currentNumberNode["right"] = currentNumberNode["left"]["right"];
                        currentNumberNode["left"] = currentNumberNode["left"]["left"];
                        return valueToReturn;
                    }
                    if (currentNumberNode["right"] != null) {
                        valueToReturn = currentNumberNode;
                        currentNumberNode["key"] = currentNumberNode["right"]["key"];
                        currentNumberNode["value"] = currentNumberNode["right"]["value"];
                        currentNumberNode["left"] = currentNumberNode["right"]["left"];
                        currentNumberNode["right"] = currentNumberNode["right"]["right"];
                        return valueToReturn;
                    }
                }
                if (currentNumberNode["left"] != null && currentNumberNode["right"] != null) {
                    if (currentNumberNode["right"]["left"] == null) {
                        valueToReturn = currentNumberNode;
                        currentNumberNode["key"] = currentNumberNode["right"]["key"];
                        currentNumberNode["value"] = currentNumberNode["right"]["value"];
                        currentNumberNode["right"] = currentNumberNode["right"]["right"];
                        return valueToReturn;
                    }
                    let mostLeft;
                    let currentNumberNodeLeft = currentNumberNode["right"]["left"];
                    while (true) {
                        if (currentNumberNodeLeft["left"] == null) {
                            mostLeft = currentNumberNodeLeft;
                            break;
                        }
                        currentNumberNodeLeft = currentNumberNodeLeft["left"];
                    }
                    valueToReturn = currentNumberNode;
                    currentNumberNode["key"] = mostLeft["key"];
                    currentNumberNode["value"] = mostLeft["value"];
                    mostLeft["key"] += 0.1;
                    BSTtest.remove(mostLeft["key"]);
                    return valueToReturn;
                }
            }
            else if (keyToDelete > currentNumberNode["key"]) {
                currentNumberNode = currentNumberNode["right"];
            }
            else {
                currentNumberNode = currentNumberNode["left"];
            }
        }
    }
    addElement(value, left, top) {
        const div = document.createElement("div");
        div.innerHTML = String(value);
        div.id = String(value);
        div.style.cssText = "position: absolute; margin-left: " + left + "%; margin-top: " + top + "%";
        document.getElementById("tree").append(div);
        document.getElementById("select").innerHTML += "<option value= " + String(value) + ">" + String(value) + "</option>";
    }
    drawTree(node) {
        let top = 0;
        if (node["level"] === 0) {
            document.getElementById("tree").innerHTML = "";
            document.getElementById("select").innerHTML = "";
            document.getElementById("findedElement").innerHTML = "";
            BSTtest.showTree();
            this.addElement(node["key"], node["x"], top);
        }
        if (node["left"]) {
            node["left"]["x"] = node["x"] - (50 / node["left"]["level"] / 2);
            top = node["left"]["level"] * 5;
            this.addElement(node["left"]["key"], node["left"]["x"], top);
            this.drawTree(node["left"]);
        }
        if (node["right"]) {
            node["right"]["x"] = node["x"] + (50 / node["right"]["level"] / 2);
            top = node["right"]["level"] * 5;
            this.addElement(node["right"]["key"], node["right"]["x"], top);
            this.drawTree(node["right"]);
        }
    }
}
let BSTtest = new BinarySearchTree();
let arr = [12, 14, 7, 9, 6, 11, 8, 20, 13, 20];
for (let i = 0; i < arr.length; i++) {
    BSTtest.insertNumberNode(arr[i], i + 1);
}
BSTtest.drawTree(BSTtest.root);
function insert() {
    const key = document.getElementById("insertValueKey")["value"];
    const value = document.getElementById("insertValueText")["value"];
    BSTtest.insertNumberNode(+key, value);
    BSTtest.drawTree(BSTtest.root);
}
function remove() {
    const key = document.getElementById("select")["value"];
    BSTtest.remove(+key);
    BSTtest.drawTree(BSTtest.root);
}
function find() {
    const key = document.getElementById("select")["value"];
    const element = BSTtest.find(+key);
    const str = "Значение элементам с ключом " + key + ": " + element[0]["value"];
    document.getElementById("findedElement").innerHTML = str;
}
//# sourceMappingURL=test.js.map