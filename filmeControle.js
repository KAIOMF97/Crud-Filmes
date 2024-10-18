let listaFilme = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let filmeGlobal = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaFilme.length; i++) {
        const filme = listaFilme[i];
        if (filme.id == chave) {
            filme.posicaoNaLista = i;
            return listaFilme[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("id").value;
    if (id) { // se digitou um Placa
        filmeGlobal = procurePorChavePrimaria(id);
        if (filmeGlobal) { //achou na lista
            mostrarDadosFilme(filmeGlobal);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("id").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("id").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); // Apenas o botão Salvar fica visível
    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    let id;
    if (filmeGlobal == null) { // Corrigido para filmeGlobal
        id = document.getElementById("id").value;
    } else {
        id = filmeGlobal.id; // Corrigido para filmeGlobal
    }

    const nome = document.getElementById("nome").value;
    const genero = document.getElementById("genero").value;
    const dataLancamento = document.getElementById("dataLancamento").value;
    const duracao = parseInt(document.getElementById("duracao").value);
    const estudio = document.getElementById("estudio").value;
    const diretor = document.getElementById("diretor").value;
   
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (id && nome && genero && dataLancamento && duracao && estudio && diretor) { // se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                filmeGlobal = new Filme(id, nome, genero, dataLancamento, duracao, estudio, diretor);
                listaFilme.push(filmeGlobal);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                filmeAlterado = new Filme(id, nome, genero, dataLancamento, duracao, estudio, diretor);
                listaFilme[filmeGlobal.posicaoNaLista] = filmeAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                listaFilme.splice(filmeGlobal.posicaoNaLista, 1); // Simples e direto
                mostrarAviso("EXCLUÍDO");
                break;
            default:
                mostrarAviso("Erro aleatório");
        }
        
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("id").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }


//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.id + " - " +
            linha.nome + " - " +
            linha.genero + " - " +
            linha.dataLancamento + " - " +
            linha.duracao + " - " +
            linha.estudio + " - " +
            linha.diretor + 
            "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaFilme);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none'); // Resetar para o estado padrão
    mostrarAviso("Cancelou a operação de edição");
}
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do Carro nos campos
function mostrarDadosFilme(filme) {
    document.getElementById("id").value = filme.id;
    document.getElementById("nome").value = filme.nome;
    document.getElementById("genero").value = filme.genero;
    document.getElementById("dataLancamento").value = filme.dataLancamento;
    document.getElementById("duracao").value = filme.duracao;
    document.getElementById("estudio").value = filme.estudio;
    document.getElementById("diretor").value = filme.diretor;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("id").value = "";
    document.getElementById("nome").value = "";
    document.getElementById("genero").value = "";
    document.getElementById("dataLancamento").value = "";
    document.getElementById("duracao").value = "";
    document.getElementById("estudio").value = "";
    document.getElementById("diretor").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("id").readOnly = !soLeitura;
    document.getElementById("nome").readOnly = soLeitura;
    document.getElementById("genero").readOnly = soLeitura;
    document.getElementById("dataLancamento").readOnly = soLeitura;
    document.getElementById("duracao").readOnly = soLeitura;
    document.getElementById("estudio").readOnly = soLeitura;
    document.getElementById("diretor").readOnly = soLeitura;
}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = 'inline'; // Sempre visível junto com "Salvar"
}



