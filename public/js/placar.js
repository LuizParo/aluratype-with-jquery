let placar = $('.placar');
let botaoSync = $('#botao-sync');
let bodyPlacar = $('tbody');
let campoErro = $('#erro');
let url = 'http://localhost:3000/placar';

$(() => {
    $('#botao-placar').click(mostraPlacar);
    botaoSync.click(sincronizaPlacar);
    atualizaPlacar();
});

function inserePlacar() {
    let usuario = $("#usuarios").val();
    let numPalavras = $('#contador-palavras').text();

    let corpoTabela = placar.find('tbody');
    let linha = novaLinha(usuario, numPalavras);

    corpoTabela.prepend(linha);

    placar.slideDown(600);
    scrollPlacar();
}

function novaLinha(usuario, numPalavras) {
    let linha = $('<tr>');
    let colunaUsuario = $('<td>').text(usuario);
    let colunaPalavras = $('<td>').text(numPalavras);
    let colunaRemover = $('<td>');
    let linkRemover = $('<a>').attr('href', '#').addClass('botao-remover');
    let icone = $('<i>').addClass('small').addClass('material-icons').text('delete');

    linkRemover.append(icone);
    colunaRemover.append(linkRemover);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    linha.find('.botao-remover').click(removeLinha);

    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    
    let linha = $(this).parent().parent();
    linha.fadeOut(600);
    setInterval(() => linha.remove(), 600);
}

function scrollPlacar() {
    let posicaoPlacar = placar.offset().top;

    $('body').animate({
        scrollTop : `${posicaoPlacar}px`
    }, 1000);
}

function mostraPlacar() {
    placar.stop().slideToggle(600);
}

function sincronizaPlacar() {
    let placar = [];
    let linhas = $("tbody>tr");

    linhas.each(function() {
        let usuario = $(this).find("td:nth-child(1)").text();
        let pontos = $(this).find("td:nth-child(2)").text();

        placar.push({
            usuario : usuario,
            pontos : pontos
        });
    });

    let data = {placar : placar};
    $.post(url, data, () => {
        console.log('Placar sincronizado com sucesso!')
        $('.tooltip').tooltipster('open');
    })
    .fail((error) => {
        handleError(error);
        $('.tooltip').tooltipster('open').tooltipster('content', 'Falha ao sincronizar');
    })
    .always(() => setTimeout(() => $('.tooltip').tooltipster('close'), 1200));
}

function atualizaPlacar() {
    $.get(url, (data) => {
        data.forEach(score => {
            let linha = novaLinha(score.usuario, score.pontos);
            bodyPlacar.append(linha);
        });
    })
    .fail(handleError);
}

function handleError(error) {
    console.log(JSON.stringify(error));
    campoErro.text(`${campoErro.text()}: ${error.responseText}`);
    campoErro.show();

    setTimeout(() => campoErro.hide(), 1500);
}