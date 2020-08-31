const SHA256 =  require ('crypto-js/sha256');

class Block{
    constructor(indice, dados, hashAnterior = ' '){
        this.indice = indice;
        this.dados = dados;
        this.hashAnterior = hashAnterior;
        this.nonce = 0;
        this.hash = this.calculaHash();
    }

    calculaHash(){
        return SHA256(this.indice  + this.dados + this.hashAnterior +this.nonce).toString();
    }

    mineraBloco(dificuldade){
        while (this.hash.substring(0, dificuldade) !== Array(dificuldade + 1).join('0')) {
            this.nonce++;
            this.hash = this.calculaHash();
          }
          console.log("Bloco após a mineração: "+this.hash)
    }
}
class Blockchain{
    constructor(){
        this.chain = [this.criaBloco0()];
        this.dificuldade = 3;
    }

    criaBloco0(){
        return new Block(0, "Bloco0", "0");
    }

    getBlocoRecente(){
        return this.chain[this.chain.length - 1];
    }

    addBloco(novoBloco){
        novoBloco.hashAnterior = this.getBlocoRecente().hash;
        novoBloco.mineraBloco(this.dificuldade);
        this.chain.push(novoBloco);
    }

    verificaValidez() {
        for (let i = 1; i < this.chain.length; i++) {
          const currentBlock = this.chain[i];
    
          if (!currentBlock.hasValidTransactions()) {
            return false;
          }
    
          if (currentBlock.hash !== currentBlock.calculaHash()) {
            return false;
          }
        }
        return true;
    }
    
}


// let teste = new Blockchain();
// console.log(teste.verificaValidez()+"");
// console.log("bloco1");
// teste.addBloco(new Block(1, 'dado teste', ) );
// console.log("bloco2");
// teste.addBloco(new Block(2, 'dado teste2', ) );
//  console.log(JSON.stringify(teste, null, 2));
