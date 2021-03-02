
// foi utilizado a biblioteca Crypto-js, usando a função de hash sha256
const SHA256 = require('crypto-js/sha256');

// Aqui é definido o bloco e seus atributos
function Block(indice, dados, hashAnterior = '') {
    this.indice = indice;
    this.dados = dados;
    this.nonce = 0;
    this.hashAnterior = hashAnterior;
    this.hash = this.calculaHash(); //ao criar um bloco, automaticamente é calculado seu Hash com as informações no momento da criação
}

// Função para o calculo do hash dos dados de um bloco
Block.prototype.calculaHash = function () {
    return SHA256(this.indice + this.dados + this.nonce + this.hashAnterior).toString();
}

// Função responsável por receber a dificuldade de mineração
// e escolher um hash com a dificuldade selecionada
Block.prototype.mineraBloco = function (dificuldade) {
    while (this.hash.substring(0, dificuldade) !== Array(dificuldade + 1).join('0')) {
        this.nonce++;// Esta variável serve para garantir que um novo bloco criado com os mesmos dados de um bloco
        // existente não possua o mesmo hash.
        this.hash = this.calculaHash();
    }
}

// Estrutura da Blockchain onde um bloco inicial é criado ao instanciar
function Blockchain(dificuldade) {
    this.chain = [this.criaBloco0()];
    this.dificuldade = dificuldade;
}

// Função que cria o bloco inicial quando a blockchain é instanciada
Blockchain.prototype.criaBloco0 = function () {
    return new Block(0, "Bloco0", "0");
}

// Função que retorna o último bloco criado 
Blockchain.prototype.getBlocoRecente = function () {
    return this.chain[this.chain.length - 1];
}

// Função responsável adicionar um novo bloco
Blockchain.prototype.addBloco = function (novoBloco) {
    novoBloco.hashAnterior = this.getBlocoRecente().hash;
    novoBloco.mineraBloco(this.dificuldade);
    this.chain.push(novoBloco);
}

// Função de validação da Blockchain verificando a integridade
Blockchain.prototype.verificaValidez = function () {
    for (let i = 2; i < this.chain.length; i++) {
        const blocoAtual = this.chain[i];
        const blocoAnterior = this.chain[i - 1];

        if (blocoAtual.hashAnterior !== blocoAnterior.hash) {
            console.log("\nApós a alteração não possuem mais o mesmo Hash:  ");
            console.log(blocoAtual.hashAnterior);
            console.log(blocoAnterior.hash);
            return false;
        }
        if (blocoAtual.hash !== blocoAtual.calculaHash()) {
            console.log("\nApós a alteração não possuem mais o mesmo Hash:  ");
            console.log(blocoAtual.hash);
            console.log(blocoAtual.calculaHash());
            return false;
        }

    }
    console.log("\n");
    return true;
}
module.exports.Block = Block;
module.exports.Blockchain = Blockchain;

// TESTES em console
// Aqui estão os códigos para teste das funções.
// Primeiro deve-se setar a dificuldade da mineração:
let dificuldade = 1;

// Esta é a instância de uma nova blockchain para depois ter os blocos adicionados de acordo 
// com a dificuldade da mineração.
// Ao instanciar a Blockchain, um bloco inicial é gerado automaticamente
let teste = new Blockchain(dificuldade);

// Aqui são criados os blocos, basta criar um novo bloco e executar a função addBloco(bloco#)
let bloco1 = new Block(1, "Dado teste",);
let bloco2 = new Block(2, "Minha idade é 25 anos",);
let bloco3 = new Block(3, "Não foi possível implementar interface",);
let bloco4 = new Block(4, "Dado do bloco 4",);
teste.addBloco(bloco1)
teste.addBloco(bloco2)
// teste.addBloco(bloco3)
// teste.addBloco(bloco4)

// Testa se a blockchain é valida. Aqui não foi feito nenhuma alteração, portanto
// o resultado esperado é TRUE
console.log("Blockchain é válida:? " + teste.verificaValidez());

// Agora é feito uma alteração no terceiro bloco e depois de tirar as duas próximas linhas 
// de comando do comentário para executar, a nova validação vai acusar a alteração;

// teste.chain[2].dados="Minha idade é 18 anos";
// console.log("\nSegunda verificação, agora depois da alteração da Blockchain. Ela continua válida? " + teste.verificaValidez());

// Linha para exibir toda a Blockchain em String
console.log(JSON.stringify(teste, null, 2));


