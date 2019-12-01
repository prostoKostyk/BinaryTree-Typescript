export interface Node <T> {
  key: number;
  value: T;
  left: object;
  right: object;
  level: number; // свойство level будет нужно для отрисовки дерева чтобы знать уровень вложености элемента и расчитать положение элемента по вертикали
  x: number; // свойство x определяет положение элемента по горизонтали, будет расчитываться при отрисовки дерева
}
class BinarySearchTree {
  root: object;
  constructor() {
    // При создании дерева создаём пустой корень
    this.root = null;
  }
  countElements: number = 0; // переменная, в которую будем записывать число элементов дерева
  // вывод дерева в констоль
  showTree(): void {
    console.log(JSON.stringify(this.root));
  }
  // добавление элемента
  insertNumberNode<T>(key: number, value: T): void {
    const nodeToAdd: Node <T> = {
      key: key,
      value: value,
      left: null,
      right: null,
      level: 1,
      x: 50
    };
    let currentNumberNode: object;
    // Если дерево пусто, заменить его на дерево с одним корневым узлом ((K, V), null, null) и остановиться.
    if (!this.root) {
      nodeToAdd["level"]--;
      this.root = nodeToAdd;
      currentNumberNode = this.root;
      // Иначе сравнить K с ключом корневого узла X
    } else {
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
            currentNumberNode["left"] = nodeToAdd;
            break;
          }
          nodeToAdd["level"]++;
          currentNumberNode = currentNumberNode["left"];
        } else {
          // Если K > X, рекурсивно добавить (K, V) в правое поддерево Т.
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
  // поиск элемента по ключу, метод возвращает массив с найденным элементом и его родителем
  find(keyToFind: number): object {
    let currentNumberNode = this.root;
    let parrent: object;
    // Если дерево пустое, сообщить, что узел не найден, и остановиться.
    if (this.root == null) {
      return { message: "Дерево пустое" };
    }
    for (let i = 0; i < this.countElements + 1; i++) {
      // Cравнить K со значением ключа корневого узла X.
      if (keyToFind === currentNumberNode["key"]) {
        // Если K=X, выдать ссылку на этот узел и остановиться.
        return [currentNumberNode, parrent];
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
  remove(keyToDelete: number): object {
    // Если дерево пустое, сообщить, что узел не найден, и остановиться.;
    if (this.root == null) {
      return { message: "Дерево пустое" };
    }
    let valueToReturn: object;
    // Иначе сравнить K с ключом X корневого узла n.
    let currentNumberNode = this.root;
    while (true) {
      // Если K=X, то необходимо рассмотреть три случая.
      if (keyToDelete === currentNumberNode["key"]) {
        // Если обоих детей нет
        if (currentNumberNode["left"] == null && currentNumberNode["right"] == null) {
          // то удаляем текущий узел и обнуляем ссылку на него у родительского узла
          valueToReturn = currentNumberNode;
          const parrent: object = this.find(currentNumberNode["key"])[1]; // находим родителя элемента
          // в зависимости с какой стороны от родителя был элемент, обнуляем left или right родителя
          if (currentNumberNode["key"] > parrent["key"]) {
            parrent["right"] = null;
          } else {
            parrent["left"] = null;
          }
          return valueToReturn;
        }
        // Если одного из детей нет,
        if (currentNumberNode["left"] == null || currentNumberNode["right"] == null) {
          // то значения полей ребёнка m ставим вместо соответствующих значений корневого узла, затирая его старые значения,
          //  и освобождаем память, занимаемую узлом m;
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
        // Если оба ребёнка присутствуют, то
        if (currentNumberNode["left"] != null && currentNumberNode["right"] != null) {
          // Если левый узел m правого поддерева отсутствует (n->right->left)
          if (currentNumberNode["right"]["left"] == null) {
            // Копируем из правого узла в удаляемый поля K, V и ссылку на правый узел правого потомка, не меняя ссылки на левый узел
            valueToReturn = currentNumberNode;
            currentNumberNode["key"] = currentNumberNode["right"]["key"];
            currentNumberNode["value"] = currentNumberNode["right"]["value"];
            currentNumberNode["right"] = currentNumberNode["right"]["right"];
            return valueToReturn;
          } // Иначе
          // Возьмём самый левый узел m, правого поддерева n->right;
          let mostLeft: object; // самый левый узел правого поддерева
          let currentNumberNodeLeft: object = currentNumberNode["right"]["left"];
          while (true) {
            if (currentNumberNodeLeft["left"] == null) {
              mostLeft = currentNumberNodeLeft;
              break;
            }
            currentNumberNodeLeft = currentNumberNodeLeft["left"];
          }
          // Скопируем данные (кроме ссылок на дочерние элементы) из m в n;
          valueToReturn = currentNumberNode;
          currentNumberNode["key"] = mostLeft["key"];
          currentNumberNode["value"] = mostLeft["value"];
          // Рекурсивно удалим узел m.
          // меняем ключ рекурсивно удаляемого элемента на другой, прибавляя к нему 0,1 чтобы не пытаться удалять элемент,
          // на который был заменён первоначально удаляемый элемент
          mostLeft["key"] += 0.1;
          BSTtest.remove(mostLeft["key"]);
          return valueToReturn;
        }
      } else if (keyToDelete > currentNumberNode["key"]) {
        // Если K>X, рекурсивно удалить K из правого поддерева Т;
        currentNumberNode = currentNumberNode["right"];
      } else {
        // Если K<X, рекурсивно удалить K из левого поддерева Т;
        currentNumberNode = currentNumberNode["left"];
      }
    }
  }
  // Метод для добавления элемента дерева на страницу
  addElement<T>(value: T, left: number, top: number): void {
    const div = document.createElement("div");
    div.innerHTML = String(value);
    div.id = String(value);
    div.style.cssText = "position: absolute; margin-left: " + left + "%; margin-top: " + top + "%";
    document.getElementById("tree").append(div);
    document.getElementById("select").innerHTML += "<option value= " + String(value) + ">" + String(value) + "</option>";
  }

  // Метод для отрисовки дерева
  drawTree(node: object): void {
    let top: number = 0;
    // Отрисовка самого первого элемента
    if (node["level"] === 0) {
      // очистка div, в который будет помещаться дерево и очистка select-a
      document.getElementById("tree").innerHTML = "";
      document.getElementById("select").innerHTML = "";
      document.getElementById("findedElement").innerHTML = "";
      BSTtest.showTree();
      this.addElement(node["key"], node["x"], top);
    }
    // Смотрим есть ли у элемента левая ветка
    if (node["left"]) {
      // Если есть, то расчитываем координаты первого элемента на этой ветке, отрисовываем элемент
      // и рекурсивно отрисовываем остальные элементы
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

const BSTtest = new BinarySearchTree();
const arr = [12, 14, 7, 9, 6, 11, 8, 20, 13, 20];
for (let i = 0; i < arr.length; i++) {
  BSTtest.insertNumberNode(arr[i], i + 1);
}

BSTtest.drawTree(BSTtest.root);

function insert(): void {
  const key: string = document.getElementById("insertValueKey")["value"];
  const value: string = document.getElementById("insertValueText")["value"];
  BSTtest.insertNumberNode(+key, value);
  BSTtest.drawTree(BSTtest.root);
}

function remove(): void {
  const key: string = document.getElementById("select")["value"];
  BSTtest.remove(+key);
  BSTtest.drawTree(BSTtest.root);
}
function find(): void {
  const key: string = document.getElementById("select")["value"];
  const element: object = BSTtest.find(+key);
  const str = "Значение элементам с ключом " + key + ": " + element[0]["value"];
  document.getElementById("findedElement").innerHTML = str;
}
