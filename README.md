
# Blockchain-js
Local Blockchain 

## Implementação

Para a implementação da Blockchain foi utilizado o algoritmo de criptografia SHA256 da
biblioteca Crypto-js para o cálculo do hash de cada bloco criado.
Primeiro foi criado uma classe `Block()` , com os atributos: índice, dados,
nonce(variável responsável por garantir que um novo bloco criado com os mesmos dados
de um bloco existente não possua o mesmo hash e representa a quantidade de tentativas
até encontrar um hash com a dificuldade estabelecida), hashAnterior e hash(contendo o
hash do bloco).</br>
Foi implementado a função `calculaHash()` responsável por calcular os hashes.
Esta função utiliza o método `SHA256()` para gerar os códigos.
Os códigos hash devem ter sua dificuldade de mineração passada por atributo,
então foi criada a função `mineraBloco()` que possui um loop em seu código que permite
escolher o hash com a dificuldade passada por parâmetro.
A estrutura da Blockchain foi codificada pela `classe Blockchain()`, onde toda vez
que é inicializada a classe gera um registro de um bloco inicial. Esta classe possui os
métodos: `criaBloco0()`, `getBlocoRecente()`, `addBloco()` e `verificaValidez()`.
</br>

## Execução

Para executar o código basta ter uma versão recente do node.js instalado na máquina e
utilizar:

##### `node Blockchain.js`

##Testes
Os testes da blockchain são feitos no momento da execução do arquivo `blockchain.js` e
podem ser editados alterando o arquivo fonte.
No documento está especificado através de comentários as variações de testes
possíveis de se realizar. Podendo o usuário adicionar um novo bloco, alterar um bloco
existente e verificar a integridade do código após a alteração no bloco.
