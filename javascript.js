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

    find = (value, root = this.root) => {
        if (root == null){
            return 'not found'
        }
        else if (value > root.data){
            return this.find(value, root.right)
        } else if (value < root.data){
            return this.find(value, root.left)
        } else if (value == root.data){
            return root
        }
    }

    levelOrder = (root = this.root, queue = [], result =[]) => {
        if (root == null){
            return
        }
        console.log(root.data)
        result.push(root.data)
        queue.shift()
        if (root.left != null){
            queue.push(root.left)
            
        }
        if (root.right != null) {
            queue.push(root.right)
            
        }
        while (queue.length > 0){
            this.levelOrder(queue[0], queue, result)
        }
        
        return result
        
    }

    inOrder = (root = this.root, result =[]) => {
        if (root == null) {
            return
        }
        this.inOrder(root.left, result)
        result.push(root.data)
        this.inOrder(root.right, result)
        // console.log('in order:', result)
        return result
    }

    preOrder = (root = this.root, result =[]) => {
        if (root == null){
            return
        }
        result.push(root.data)
        this.preOrder(root.left, result)
        this.preOrder(root.right, result)
        // console.log('pre order:', result)

        return result
    }

    postOrder = (root = this.root, result = []) => {
        if (root == null){
            return
        }
        this.postOrder(root.left, result)
        this.postOrder(root.right, result)
        result.push(root.data)
        // console.log('post order:', result)
        return result
    }

    checkHeight = (root = this.root) => {
        let leftHeight = 0
        let rightHeight = 0

        let nextLeft = root.left
        let nextRight = root.right
        
        let trueHeight
        while (nextLeft != null){
            leftHeight +=1 
            nextLeft = nextLeft.left
            
        }

        while (nextRight != null) {
            rightHeight += 1
            nextRight = nextRight.right
        }

        if (leftHeight > rightHeight) {
            trueHeight = leftHeight
        } else if (rightHeight > leftHeight){
            trueHeight = rightHeight
        } else if (rightHeight == leftHeight) {
            trueHeight = rightHeight
        }
        return trueHeight

    }
    checkDepth = (value = 0) => {
        let root = this.root
        let depth = 0

        while (root != null){
            if (value > root.data) {
                root = root.right
                depth += 1
            } else if (value < root.data) {
                root = root.left
                depth += 1
            } else if (value == root.data) {
                return depth
            }
        }
        return 'not found'
        
    }

    isBalanced = (root = this.root) => {
        if (this.checkHeight(root.left) - this.checkHeight(root.right) >= 1 || this.checkHeight(root.right) - this.checkHeight(root.left) >= 1) {
            return false
        }
        return true
    }

    rebalance = () => {
        this.root = this.buildTree(this.inOrder())
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

console.log(a.find(325))
console.log(a.levelOrder())

console.log('in order:', a.inOrder())
console.log('pre order', a.preOrder())
console.log('post order', a.postOrder())
// console.log(a.checkHeight())
// console.log(a.checkDepth(9))

// a.insertV(214125)
// prettyPrint(a.root)
console.log('balance:', a.isBalanced())

a.rebalance()
prettyPrint(a.root)
console.log('balance:', a.isBalanced())
console.log('in order:', a.inOrder())
console.log('pre order', a.preOrder())
console.log('post order', a.postOrder())
console.log('level order bfs:,', a.levelOrder())



