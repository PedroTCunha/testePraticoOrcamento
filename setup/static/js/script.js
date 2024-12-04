$(document).ready(function() {
    // Inicializa a tabela DataTable
    let table = $('#verbasTable').DataTable({
        searching: false,
        paging: false,
        info: false
    });

    // Evento de clique para o botão "Adicionar"
    $('#adicionarBtn').click(function(event) {
        event.preventDefault(); // Previne o comportamento padrão do botão

        // Coleta os dados do formulário
        const tipoAcaoId = $('#acao').val();
        const tipoAcaoText = $('#acao option:selected').text();
        const dataPrevista = $('#dataPrevista').val();
        const investimento = $('#investimento').val();
        const investimentoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(investimento);

        // Cria um objeto FormData para enviar os dados
        const formData = new FormData();
        formData.append('tipo_acao', tipoAcaoId);
        formData.append('data_prevista', dataPrevista);
        formData.append('investimento', investimento);
        formData.append('csrfmiddlewaretoken', $('[name=csrfmiddlewaretoken]').val());

        // Envia os dados para o servidor
        fetch(adicionarAcaoUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                // Adiciona uma nova linha à tabela
                let newRow = table.row.add([
                    tipoAcaoText,
                    dataPrevista,
                    investimentoFormatado,
                    '<button type="button" class="btn btn-link editarBtn"><i class="bx bxs-edit-alt"></i></button>',
                    '<button type="button" class="btn btn-link excluirBtn"><i class="bx bxs-trash"></i></button>'
                ]).draw(false).node();

                $(newRow).attr('data-id', data.acao_id); // Atribui um ID à nova linha
                console.log('Dados salvos com sucesso!');
                $('form')[0].reset(); // Limpa o formulário
            } else {
                // Lida com erros retornados pelo servidor
                handleErrors(data);
            }
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            alert("Erro na requisição: " + error.message);
        });
    });

    // Função para lidar com erros
    function handleErrors(data) {
        console.error(data.errors || data.error);
        let errorMessages = [];

        if (data.errors) {
            for (const field in data.errors) {
                for (const error of data.errors[field]) {
                    errorMessages.push(`${field}: ${error}`);
                }
            }
            alert(errorMessages.join('\n'));
        } else if (data.error) {
            alert(data.error);
        } else {
            alert("Erro desconhecido no servidor.");
        }
    }

    // Limpar Formulário
    $('#limparBtn').click(function() {
        $('form')[0].reset(); // Limpa o formulário
    });

    // Excluir Linha
    $('#verbasTable tbody').on('click', '.excluirBtn', function() {
        table.row($(this).parents('tr')).remove().draw(); // Remove a linha da tabela
    });

    // Editar Linha (apenas preenche o formulário - adapte para salvar as alterações)
    $('#verbasTable tbody').on('click', '.editarBtn', function() {
        let data = table.row($(this).parents('tr')).data();
        $('#acao').val(data[0]); // Preenche o campo de tipo de ação
        $('#dataPrevista').val(data[1]); // Preenche a data prevista
        $('#investimento').val(parseFloat(data[2].replace(/[R$\s,.]/g, '')) / 100); // Preenche o investimento
    });
});