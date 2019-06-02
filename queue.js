class Queue {

    constructor(maxLenght) {
        this.maxLenght = maxLenght;

        this.arr = new Array()

    }

    push(id) {

        if (this.arr.length >= this.maxLenght) {
            this.arr.shift();
        }

        append(this.arr, id);
    }

    isPresent(targetId) {

        console.log(this.arr.length)

        this.arr.forEac
        this.arr.forEach(id => {
     
            if(id === targetId) {
                return true;
            }
        });

        return false;
    }

}