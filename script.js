let todasMusicas = [
    {titulo:'Iphone Branco', artista: 'Borges', src:'musicas/Borges - Iphone Branco.mp3', img:'imagens/Borges.jpg'},
    {titulo:'Cruzeiro da Revoada', artista: 'Hungria', src:'musicas/Hungria Hip Hop - Cruzeiro da Revoada.mp3', img:'imagens/Hungria.jpg'},
    {titulo:'Favela no Topo', artista: 'Hungria', src:'musicas/Hungria Hip - Favela no Topo.mp3', img:'imagens/Hungria - Favela no topo.png'},
    {titulo:'Outro Lugar', artista: 'L7NNON', src:'musicas/L7NNON - Outro Lugar.mp3', img:'imagens/L7nnon.jpg'},
    {titulo:'Real Underground', artista: 'NGC Daddy', src:'musicas/NGC Daddy - Real Underground.mp3', img:'imagens/Daddy.jpg'}
]


// Variaveis 
let musica = document.querySelector('audio');
let indexMusica = 0;
let duracaoMusica = 0;
let displayFinal = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.descricao h2');
let nomeArtista = document.querySelector('.descricao i');

// Eventos
renderizarMusica(indexMusica);

musica.onloadedmetadata = function() {
    duracaoMusica = musica.duration;
    displayFinal.textContent = segundosParaMinutos(Math.floor(duracaoMusica)); 
}

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--;
    if(indexMusica < 0){
        indexMusica = 4;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.proxima').addEventListener('click', () => {
    indexMusica++;
    if(indexMusica > 4){
        indexMusica = 0;
    }  
    renderizarMusica(indexMusica);
});

// Funções
function renderizarMusica(index){
    musica.setAttribute('src', todasMusicas[index].src);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = todasMusicas[index].titulo;
        nomeArtista.textContent = todasMusicas[index].artista;
        imagem.src = todasMusicas[index].img;
        displayFinal.textContent = segundosParaMinutos(Math.floor(duracaoMusica)); 
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.botao-play').style.display = 'none';
}

function pararMusica() {
    musica.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.botao-play').style.display = 'block';
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor( ( musica.currentTime / duracaoMusica ) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos( Math.floor(musica.currentTime) );
}

function segundosParaMinutos(segundos) {
    let numeroMinutos = Math.floor(segundos / 60);
    let numeroSegundos = segundos % 60;
    if( numeroSegundos < 10) {
        numeroSegundos = '0' + numeroSegundos;
    }
    return `${numeroMinutos}:${numeroSegundos}`
}
