class Node {
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(){
        this.root = null
    }


    buildTree = (arr) => {
        let sortedArr = arr.sort(function (a,b) {
            return a - b
        })
        let noDupeSorted = [...new Set(sortedArr)]
        console.log('Sorted List', noDupeSorted)

        let startV = 0
        let endV = noDupeSorted.length - 1
        
        function sortedToBST (arr, start, end){
            if (start > end){
                return null
            }
    
            let mid = parseInt((start + end) / 2)
            let node = new Node(arr[mid])
    
            node.left = sortedToBST(noDupeSorted, start, mid - 1)
            node.right = sortedToBST(noDupeSorted, mid + 1, end )
            return node

        }
        this.root = sortedToBST(noDupeSorted, startV, endV)
        return sortedToBST(noDupeSorted, startV, endV)
    }

    insertV = (value) => {
        let node = new Node(value)
        let root = this.root

        
        function insertValue (r) {
            if (value > r.data) {
                if (r.right == null){
                    r.right = node
                } else {
                    return insertValue(r.right)
                }
                
            }
            else if (value < r.data){
                if (r.left == null){
                    r.left = node
                }
                return insertValue(r.left)
            }

        }
        return insertValue(root)
        
        
    }

}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }


let a = new Tree
a.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
prettyPrint(a.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]))
console.log(a)
a.insertV(50)
a.insertV(214124)
prettyPrint(a.root)