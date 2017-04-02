(function() {
    let url = 'http://localhost:3000/frases';

    let botao = $('#botao-frase');
    let botaoFraseId = $('#botao-frase-id');
    let frase = $('.frase');
    let spinner = $('#spinner');
    let campoIdFrase = $('#frase-id');

    $(() => {
        atualizaTamanhoFrase();
        botao.click(fraseAleatoria);
        botaoFraseId.click(buscaFrase);
    });

    function atualizaTamanhoFrase() {
        let textoFrase = frase.text();
        let tamanhoFrase = textoFrase.split(' ').length;
        $('#tamanho-frase').text(tamanhoFrase);
    }

    function fraseAleatoria() {
        spinner.show();
        frase.hide();

        $.get(url, trocaFrase)
            .fail(handleError)
            .always(() => {
                spinner.hide();
                frase.show();
            });
    }

    function buscaFrase() {
        spinner.show();
        frase.hide();

        let idFrase = campoIdFrase.val();
        let query = {id : idFrase}

        $.get(url, query, trocaFrase)
            .fail(handleError)
            .always(() => {
                spinner.hide();
                frase.show();
            });
    }

    function trocaFrase(data) {
        let fraseRecuperada;
        if(Array.isArray(data)) {
            let index = Math.floor(Math.random() * data.length);
            fraseRecuperada = data[index];
        } else {
            fraseRecuperada = data;
        }

        frase.text(fraseRecuperada.texto);
        atualizaTamanhoFrase();
        atualizaTempoInicial(fraseRecuperada.tempo);
    }

    function atualizaTempoInicial(tempo) {
        $("#tempo-digitacao").text(tempo);
    }
})();