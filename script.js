
const estado = {
    numeros: [],
    rodada: 0,
    branco: false,
    voto: [],
    eleicao: [
        {
            titulo: "Prefeito",
            digitos: 2,
            candidatos: [
                {
                    nome: "Joe Biden",
                    numero: 10,
                    imgsrc: "images/10.jpg"
                },
                {
                    nome: "Donald Trump",
                    numero: 20,
                    imgsrc: "images/20.jpg"
                },
                {
                    nome: "NULO",
                    numero: 99,
                    imgsrc: "images/nulo.png"
                },
            ]
        },
        {
            titulo: "Vereador",
            digitos: 5,
            candidatos: [
                {
                    nome: "Papaléguas",
                    numero: 12345,
                    imgsrc: "images/12345.jpg"
                },
                {
                    nome: "Pernalonga",
                    numero: 54321,
                    imgsrc: "images/54321.jpg"
                },
                {
                    nome: "NULO",
                    numero: 99999,
                    imgsrc: "images/nulo.png"
                },
            ]
        }
  
    ]
}


function montaTela() {
    let qtNumeros = estado.eleicao[estado.rodada].digitos;
    let divNum = document.querySelector(".numeros-tela");
    divNum.innerHTML = "";
    estado.branco = false;
    let nomeCandidato = document.querySelector("#nome-candidato");
    let imgCandidato = document.querySelector("#img-candidato");
    let tituloCandidato = document.querySelector("#titulo-candidato");

    tituloCandidato.textContent = estado.eleicao[estado.rodada].titulo;
    nomeCandidato.textContent = "";
    imgCandidato.setAttribute("src", "images/cinza.jpg");

    for (let i = 0; i < qtNumeros; i++) {
        let num = document.createElement('div');
        num.setAttribute('class', 'numero--candidato');
        num.textContent = estado.numeros[i];
        divNum.appendChild(num);
    }

    if (estado.numeros.length == qtNumeros) {
        let candidato = estado.eleicao[estado.rodada].candidatos.filter((c) => c.numero == parseInt(estado.numeros.join('')))[0];
        if (candidato == undefined) {
            nomeCandidato.textContent = "Numero errado";
        } else {
            nomeCandidato.textContent = candidato.nome;
            imgCandidato.setAttribute("src", candidato.imgsrc);
        }
    }
}


var botoes = document.querySelectorAll('.teclado--botão');

botoes.forEach(element => {
    element.addEventListener("click", () => {
        if (estado.numeros.length < estado.eleicao[estado.rodada].digitos) {
            estado.numeros.push(element.textContent);
            montaTela();

        }
    });
});

var btnCorrige = document.querySelector(".botao--corrige");
btnCorrige.addEventListener("click", () => {
    estado.numeros = [];
    montaTela();

})
var btnBranco = document.querySelector(".botao--branco");
btnBranco.addEventListener("click", () => {
    estado.numeros = [];
    montaTela();
    estado.branco = true; //setado depois da função montatela
    document.querySelector("#nome-candidato").textContent = "BRANCO";

});

var btnConfirma = document.querySelector(".botao--confirma");
btnConfirma.addEventListener("click", () => {
    let candidato = estado.eleicao[estado.rodada].candidatos.filter((c) => c.numero == parseInt(estado.numeros.join('')))[0];

    if (candidato !== undefined || estado.branco) {
        if (estado.rodada + 1 < estado.eleicao.length) {
            estado.rodada++;

            estado.voto.push(estado.branco ? "branco" : estado.numeros.join(""));
            estado.numeros = [];
            montaTela();
        } else {
            estado.voto.push(estado.branco ? "branco" : estado.numeros.join(""));
            console.log(estado.voto);
            let tela = document.querySelector(".tela");
            tela.innerHTML = "";
            let fim = document.createElement("h1");

            fim.textContent = "FIM!"
            tela.appendChild(fim);
        }
    }
}
);



montaTela();

