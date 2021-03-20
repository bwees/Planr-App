export default class Bin {
    constructor(width, item) {
      this.data = item
      this.width = width
      this.packed = []
      this.remaining = width
    }
    
    add(item) {
        this.remaining -= item.width
        item.packed = true
        this.packed.push(item)
    }
}