(function() {
    let frase = $('.frase');
    let campoDigitacao = $('.campo-digitacao');
    let tempoInicial = $('#tempo-digitacao').text();
    let botaoReiniciar = $('#botao-reiniciar');
    let selectUsuarios = $('#usuarios');

    $(() => {
        campoDigitacao.on('input', inicializaContadores);
        campoDigitacao.on('input', inicializaMarcadores);
        campoDigitacao.one('focus', inicializaCronometro);
        botaoReiniciar.click(reiniciaJogo);

        selectUsuarios.selectize({
            create : true,
            sortField : 'text'
        });

        $('.tooltip').tooltipster({
            trigger : 'custom'
        });
    });

    function inicializaContadores() {
        let valor = campoDigitacao.val();

        let quantidadeCaracteres = valor.length;
        $('#contador-caracteres').text(quantidadeCaracteres);

        let numeroPalavras = valor.split(/\S+/).length - 1;
        $('#contador-palavras').text(numeroPalavras);
    }

    function inicializaCronometro() {
        botaoReiniciar.attr("disabled", true);

        let tempoRestante = tempoInicial;
        let idCronometro = setInterval(() => {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);

            if(tempoRestante < 1) {
                clearInterval(idCronometro);
                finalizaJogo();
            }
        }, 1000);
    }

    function inicializaMarcadores() {
        let digitado = campoDigitacao.val();

        if(frase.text().startsWith(digitado)) {
            campoDigitacao.addClass('borda-verde');
            campoDigitacao.removeClass('borda-vermelha');
            return;
        }

        campoDigitacao.addClass('borda-vermelha');
        campoDigitacao.removeClass('borda-verde');
    }

    function finalizaJogo() {
        campoDigitacao.attr('disabled', true);
        botaoReiniciar.attr('disabled', false);
        campoDigitacao.addClass('campo-digitacao-desativado');
        inserePlacar();
    }

    function reiniciaJogo() {
        campoDigitacao.val('');
        campoDigitacao.attr('disabled', false);
        campoDigitacao.one('focus', inicializaCronometro);
        campoDigitacao.removeClass('campo-digitacao-desativado');
        campoDigitacao.removeClass('borda-verde');
        campoDigitacao.removeClass('borda-vermelha');
        $('#tempo-digitacao').text(tempoInicial);
        $('#contador-caracteres').text('0');
        $('#contador-palavras').text('0');
    }
})();