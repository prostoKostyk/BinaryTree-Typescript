class BinarySearchTree {
    constructor() {
        this.countElements = 0; // переменная, в которую будем записывать число элементов дерева
        // При создании дерева создаём пустой корень
        this.root = null;
    }
    // вывод дерева в констоль
    showTree() {
        console.log(JSON.stringify(this.root));
    }
    // добавление элемента
    insertNumberNode(key, value, left = null, right = null) {
        const Node = {
            key,
            value,
            left,
            right // null
        };
        let currentNumberNode;
        // Если дерево пусто, заменить его на дерево с одним корневым узлом ((K, V), null, null) и остановиться.
        if (!this.root) {
            this.root = Node;
            currentNumberNode = this.root;
            // Иначе сравнить K с ключом корневого узла X
        }
        else {
            currentNumberNode = this.root;
            while (true) {
                // Если K=X, изменяем value элемента.
                if (key === currentNumberNode["key"]) {
                    currentNumberNode["value"] = value;
                    break;
                }
                // Если K<X, рекурсивно добавить (K, V) в левое поддерево Т.
                if (key < currentNumberNode["key"]) {
                    if (!currentNumberNode["left"]) {
                        currentNumberNode["left"] = Node;
                        break;
                    }
                    currentNumberNode = currentNumberNode["left"];
                }
                else {
                    // Если K > X, рекурсивно добавить (K, V) в правое поддерево Т.
                    if (!currentNumberNode["right"]) {
                        currentNumberNode["right"] = Node;
                        break;
                    }
                    currentNumberNode = currentNumberNode["right"];
                }
            }
        }
        this.countElements++;
    }
    // поиск элемента по ключу, метод возвращает массив с найденным элементом и его родителем
    find(keyToFind) {
        let currentNumberNode = this.root;
        let parrent;
        // Если дерево пустое, сообщить, что узел не найден, и остановиться.
        if (this.root == null) {
            return { message: "Дерево пустое" };
        }
        for (let i = 0; i < this.countElements + 1; i++) {
            // Cравнить K со значением ключа корневого узла X.
            if (keyToFind === currentNumberNode["key"]) {
                // Если K=X, выдать ссылку на этот узел и остановиться.
                return [JSON.stringify(currentNumberNode), parrent];
            }
            // Если K>X, рекурсивно искать ключ K в правом поддереве Т.
            if (keyToFind > currentNumberNode["key"]) {
                parrent = currentNumberNode;
                currentNumberNode = currentNumberNode["right"];
            }
            // Если K<X, рекурсивно искать ключ K в левом поддереве Т.
            if (keyToFind < currentNumberNode["key"]) {
                parrent = currentNumberNode;
                currentNumberNode = currentNumberNode["left"];
            }
        }
        return { message: "Элемент не найден" };
    }
    // Удаление узла
    remove(keyToDelete) {
        // Если дерево пустое, сообщить, что узел не найден, и остановиться.;
        if (this.root == null) {
            return "Дерево пустое";
        }
        let valueToReturn;
        // Иначе сравнить K с ключом X корневого узла n.
        let currentNumberNode = this.root;
        while (true) {
            // Если K=X, то необходимо рассмотреть три случая.
            if (keyToDelete === currentNumberNode["key"]) {
                // Если обоих детей нет
                if (currentNumberNode["left"] == null && currentNumberNode["right"] == null) {
                    // то удаляем текущий узел и обнуляем ссылку на него у родительского узла
                    valueToReturn = JSON.stringify(currentNumberNode);
                    const parrent = this.find(currentNumberNode["key"])[1]; // находим родителя элемента
                    // в зависимости с какой стороны от родителя был элемент, обнуляем left или right родителя
                    if (currentNumberNode["key"] > parrent) {
                        parrent["rigth"] = null;
                    }
                    else {
                        parrent["left"] = null;
                    }
                    return "Был удалён элемент " + valueToReturn;
                }
                // Если одного из детей нет,
                if (currentNumberNode["left"] == null || currentNumberNode["right"] == null) {
                    // то значения полей ребёнка m ставим вместо соответствующих значений корневого узла, затирая его старые значения,
                    //  и освобождаем память, занимаемую узлом m;
                    if (currentNumberNode["left"] != null) {
                        valueToReturn = (currentNumberNode["key"]);
                        currentNumberNode["key"] = currentNumberNode["left"]["key"];
                        currentNumberNode["value"] = currentNumberNode["left"]["value"];
                        currentNumberNode["right"] = currentNumberNode["left"]["right"];
                        currentNumberNode["left"] = currentNumberNode["left"]["left"];
                        return "Был удалён элемент с ключом " + valueToReturn;
                    }
                    if (currentNumberNode["right"] != null) {
                        valueToReturn = (currentNumberNode["key"]);
                        currentNumberNode["key"] = currentNumberNode["right"]["key"];
                        currentNumberNode["value"] = currentNumberNode["right"]["value"];
                        currentNumberNode["left"] = currentNumberNode["right"]["left"];
                        currentNumberNode["right"] = currentNumberNode["right"]["right"];
                        return "Был удалён элемент с ключом " + valueToReturn;
                    }
                }
                // Если оба ребёнка присутствуют, то
                if (currentNumberNode["left"] != null && currentNumberNode["right"] != null) {
                    // Если левый узел m правого поддерева отсутствует (n->right->left)
                    if (currentNumberNode["right"]["left"] == null) {
                        // Копируем из правого узла в удаляемый поля K, V и ссылку на правый узел правого потомка, не меняя ссылки на левый узел
                        valueToReturn = (currentNumberNode["key"]);
                        currentNumberNode["key"] = currentNumberNode["right"]["key"];
                        currentNumberNode["value"] = currentNumberNode["right"]["value"];
                        currentNumberNode["right"] = currentNumberNode["right"]["right"];
                        return "Был удалён элемент с ключом " + valueToReturn;
                    } // Иначе
                    // Возьмём самый левый узел m, правого поддерева n->right;
                    let mostLeft; // самый левый узел правого поддерева
                    let currentNumberNodeLeft = currentNumberNode["right"]["left"];
                    while (true) {
                        if (currentNumberNodeLeft["left"] == null) {
                            mostLeft = currentNumberNodeLeft;
                            break;
                        }
                        currentNumberNodeLeft = currentNumberNodeLeft["left"];
                    }
                    // Скопируем данные (кроме ссылок на дочерние элементы) из m в n;
                    valueToReturn = (currentNumberNode["key"]);
                    currentNumberNode["key"] = mostLeft["key"];
                    currentNumberNode["value"] = mostLeft["value"];
                    // Рекурсивно удалим узел m.
                    // меняем ключ рекурсивно удаляемого элемента на другой, прибавляя к нему 0,1 чтобы не пытаться удалять элемент,
                    // на который был заменён первоначально удаляемый элемент
                    mostLeft["key"] += 0.1;
                    BSTtest.remove(mostLeft["key"]);
                    return "Был удалён элемент с ключом " + valueToReturn;
                }
            }
            else if (keyToDelete > currentNumberNode["key"]) {
                // Если K>X, рекурсивно удалить K из правого поддерева Т;
                currentNumberNode = currentNumberNode["right"];
            }
            else {
                // Если K<X, рекурсивно удалить K из левого поддерева Т;
                currentNumberNode = currentNumberNode["left"];
            }
        }
    }
    draw() {
    }
}
let BSTtest = new BinarySearchTree();
let arr = [12, 14, 7, 9, 6, 11, 8];
for (let i = 0; i < arr.length; i++) {
    BSTtest.insertNumberNode(arr[i], i + 1);
}
console.log("Заполним дерево");
BSTtest.showTree();
console.log("Найдем элемент с ключом 7");
console.log(BSTtest.find(7));
console.log("Удалим элемент с ключом 7");
console.log(BSTtest.remove(7));
BSTtest.showTree();
console.log("Добавим новый элемент с ключом 20 и value = SomeString");
BSTtest.insertNumberNode(20, "SomeString");
BSTtest.showTree();
//# sourceMappingURL=test.js.map