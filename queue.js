class Queue {

    constructor(maxLenght) {
        this.maxLenght = maxLenght;

        this.arr = []
    }

    push(id) {

        if (this.arr.length >= this.maxLenght) {
            this.arr.shift();
        }

        append(this.arr, id);
    }

    contains(targetId) {
        return this.arr.includes(targetId);
    }

}