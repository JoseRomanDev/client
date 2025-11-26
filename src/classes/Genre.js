//#text #value

export default class Genre{
    #text;
    #value;

    constructor(text,value){
        this.#text = text;
        this.#value = value;
    }

    get text(){
        return this.#text
    }

    get value(){
        return this.#value;
    }

    set text(newText){
        this.#text = newText;
    }

    set value(newValue){
        this.#value = newValue;
    }
}