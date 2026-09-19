// Capturar o evento de submit do formulário
const form = document.querySelector('#formulario');

const inputAltura = document.querySelector('#altura');

// Colocando o ponto automaticamente na altura
inputAltura.addEventListener('input', function () {
    let valor = this.value.replace(/\D/g, '');

    // Se o usuário digitar 154, transforma em 1.54
    if (valor.length === 3) {
        valor = valor.slice(0, 1) + '.' + valor.slice(1);
    }

    this.value = valor;
});

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const inputPeso = event.target.querySelector('#peso');
    const inputAltura = event.target.querySelector('#altura');

    // Verificando se o peso foi preenchido corretamente
    if (!/^\d+(\.\d+)?$/.test(inputPeso.value)) {
        setResultado('Peso inválido. Digite um valor válido.', false);
        return;
    }

    // Verificando se a altura foi preenchida corretamente
    if (!/^\d+\.\d{1,2}$/.test(inputAltura.value)) {
        setResultado('Altura inválida. Digite um valor válido, por exemplo: 1.70', false);
        return;
    }

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    // Colhendo a informação e imprimindo a mensagem.
    const imc = getIMC(peso, altura);
    const classificacao = getClassificacao(imc);

    const msg = `Seu IMC é ${imc} (${classificacao}).`;

    setResultado(msg, true);
});


// Validando a classificação que o usuário se encontra
function getClassificacao(imc) {
    const classificacao = [
        'Abaixo do peso',
        'Peso normal',
        'Sobrepeso',
        'Obesidade grau 1',
        'Obesidade grau 2',
        'Obesidade grau 3'
    ];

    if (imc >= 39.9) return classificacao[5];

    if (imc >= 34.9) return classificacao[4];

    if (imc >= 29.9) return classificacao[3];

    if (imc >= 24.9) return classificacao[2];

    if (imc >= 18.5) return classificacao[1];

    if (imc < 18.5) return classificacao[0];
}


// Função que calcula o peso e altura e coloca em duas casas decimais.
function getIMC(peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}


// Função para criar parágrafo.
function criaParagrafo() {
    const p = document.createElement('p');
    return p;
}


// Função que zera a constante resultado,
// adiciona o texto na constante p
// e imprime a mensagem na div de resultado do HTML.
function setResultado(msg, valida) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';

    const p = criaParagrafo();

    if (valida) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('wrong');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);
}