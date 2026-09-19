// Capturar o evento de submit do formulário
const form = document.querySelector('#formulario');

const inputPeso = document.querySelector('#peso');
const inputAltura = document.querySelector('#altura');


// Máscara dinâmica para o peso
inputPeso.addEventListener('input', function () {

    // Remove tudo que não for número
    let valor = this.value.replace(/\D/g, '');

    // Limita para no máximo 5 números
    if (valor.length > 5) {
        valor = valor.slice(0, 5);
    }

    // Coloca o ponto antes dos dois últimos números
    if (valor.length >= 4) {
        valor = valor.slice(0, -2) + '.' + valor.slice(-2);
    }

    this.value = valor;

    // Validação dinâmica do peso
    const peso = Number(this.value);

    if (peso > 300) {
        this.setCustomValidity('Digite um peso válido de até 300 kg.');
    } else if (peso <= 0) {
        this.setCustomValidity('Digite um peso válido.');
    } else {
        this.setCustomValidity('');
    }
});


// Máscara automática para a altura
inputAltura.addEventListener('input', function () {

    // Remove tudo que não for número
    let valor = this.value.replace(/\D/g, '');

    // Limita para no máximo 3 números
    if (valor.length > 3) {
        valor = valor.slice(0, 3);
    }

    // Depois de 3 números, coloca o ponto depois do primeiro
    if (valor.length === 3) {
        valor = valor.slice(0, 1) + '.' + valor.slice(1);
    }

    this.value = valor;
});


// Capturar o evento de submit
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
    if (!/^\d+\.\d{2}$/.test(inputAltura.value)) {
        setResultado('Altura inválida. Digite sua altura corretamente.', false);
        return;
    }

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    // Colhendo a informação e imprimindo a mensagem
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