class LinkedList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  insert(index, value) {
    if (index < 0 || index > this.length) {
      throw new Error("Index error");
    }

    const newNode = {
      value
    };

    if (index == 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // Find the node which we want to insert after
      const node = this._find(index - 1);
      newNode.next = node.next;
      node.next = newNode;
    }

    this.length++;
  }

  _find(index) {
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node.next;
    }
    return node;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }

    return this._find(index).value;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }

    if (index == 0) {
      this.head = this.head.next;
    } else {
      // Find the node before the one we want to remove
      const node = this._find(index - 1);
      node.next = node.next.next;
    }

    this.length--;
  }
}

let list = new LinkedList();
list.insert(0, "tadpole");
list.insert(0, "frog");
list.insert(0, "frogpole");
list.insert(0, list._find(1));
list.insert(0, "baby bat");
list.insert(0, "The Final Thing");

// Write an algorithm to find the middle element of a
// linked list without using the .length property

function findListLength(list) {
  let length = 0;
  for (let i = 0; list._find(i); i++) {
    length = i + 1;
  }
  return length;
}

function findMiddleValue(list) {
  let length = findListLength(list);
  let middleValue = list.get(Math.floor(length / 2));
  console.log("Middle Value", middleValue);
  return middleValue;
}

// findMiddleValue(list);

// Find third value from the end without using the .length property

function findThridFromEnd(list) {
  let length = findListLength(list);
  let thirdFromEnd = list.get(length - 4);
  console.log("Third From End", thirdFromEnd);
  return thirdFromEnd;
}

// findThridFromEnd(list);

// Write an algorithm to reverse a linked list

function reverseList(list) {
  let newlist = new LinkedList();
  for (let i = 0; i < list.length; i++) {
    newlist.insert(0, list.get(i));
  }
  return reverseList;
}

// reverseList(list);

// TODO This doesn't make sense to me
// Write an algorithm to find whether a linked list has a cycle
function listHasCycle(list) {
  let i = 0;
  while (list._find(i)) {
    i++;
    if (i > list.length) {
      return true;
    }
  }
  return false;
}

console.log(listHasCycle(list));
