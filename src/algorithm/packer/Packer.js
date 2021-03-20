export default class Item {
    constructor(bins, items) {
      this.bins = bins;
      this.items = items;
      this.unpacked = []
    }

    pack() {
        this.items.forEach(item => {
            try {
                this.bins.forEach(bin => {
                    if (bin.remaining > item.width) {
                        bin.add(item)
                        throw Break
                    }
                })
            } catch {}
            if (!item.packed) {
                this.unpacked.push(item)
            }
        });
    }
}