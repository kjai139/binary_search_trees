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

    deleteV = (value) => {
        
        
        this.root = this.deleteRec(this.root, value)


        
    }
    deleteRec = (root, data) => {
        if (root == null){
            return root
        }
        if (data < root.data) {
            root.left = this.deleteRec(root.left, data)
        } else if (data > root.data) {
            root.right = this.deleteRec(root.right, data)
        } else {
            if (root.left == null){
                return root.right
            } else if (root.right == null){
                return root.left
            } 
            console.log('smallest:', this.minV(root.right))
            root.data = this.minV(root.right)
            root.right = this.deleteRec(root.right, root.data)
            
        }
        console.log('return root', root)
        return root
    }

    //get the smallest in the right subtree
    minV = (root) => {
        let minV = root.data
        while (root.left != null){
            root = root.left
            minV = root.data
            console.log('root in while', root)
        }
        return minV
        console.log('minV', minV)
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
a.insertV(10)
a.insertV(214124)
prettyPrint(a.root)
a.deleteV(8)
prettyPrint(a.root)