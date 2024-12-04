document.addEventListener('DOMContentLoaded', function() {
    const adicionarAcaoUrl = "{% url 'adicionar_acao' %}";
    let table = $('#verbasTable').DataTable();

    // ... (código para buscar tipos de ação)

    document.getElementById('adicionarBtn').addEventListener('click', function(event) {
        event.preventDefault();

        const tipoAcaoId = document.getElementById('acao').value;
        const tipoAcaoText = document.getElementById('acao').options[document.getElementById('acao').selectedIndex].text;
        const dataPrevista = document.getElementById('dataPrevista').value;
        const investimento = document.getElementById('investimento').value;
        const investimentoFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(investimento);

        const formData = new FormData();
        formData.append('tipo_acao', tipoAcaoId);
        formData.append('data_prevista', dataPrevista);
        formData.append('investimento', investimento);
        formData.append('csrfmiddlewaretoken', document.querySelector('[name=csrfmiddlewaretoken]').value);

        fetch(adicionarAcaoUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log("Resposta completa:", response);
            console.log("Content-Type:", response.headers.get("Content-Type"));

            if (!response.ok) {  // Verificar se a resposta NÃO está OK (status >= 200 e < 300)
                 throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }
            return response.json(); // retorna o json
           })

        .then(data => {
            if (data.success) {
                // Adiciona a nova linha APÓS o sucesso da requisição
                let newRow = table.row.add([
                    tipoAcaoText, // Exibir o texto do tipo de ação
                    dataPrevista,
                    investimentoFormatado,
                    '<button type="button" class="btn btn-link editarBtn"><i class="bx bxs-edit-alt"></i></button>',
                    '<button type="button" class="btn btn-link excluirBtn"><i class="bx bxs-trash"></i></button>'
                ]).draw(false).node(); // Desenhar a tabela imediatamente

                $(newRow).attr('data-id', data.acao_id);
                console.log('Dados salvos com sucesso!');
                document.querySelector('form').reset();


            } else {
                // Lidar com erros de validação ou outros erros do servidor
                console.error(data.errors || data.error);

                if (data.errors) {
                   let errorMessages = [];
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
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
             alert("Erro na requisição: " + error.message); // Exibir a mensagem de erro
        });
    });

    // Limpar Formulário
    document.getElementById('limparBtn').addEventListener('click', function() {
        document.querySelector('form').reset();
    });

    // Excluir Linha
    $('#verbasTable tbody').on('click', '.excluirBtn', function () {
        table.row($(this).parents('tr')).remove().draw();
    });

    // Editar Linha (apenas preenche o formulário - adapte para salvar as alterações)
    $('#verbasTable tbody').on('click', '.editarBtn', function () {
        let data = table.row($(this).parents('tr')).data();
        document.getElementById('acao').value = data[0]; 
        document.getElementById('dataPrevista').value = data[1];
        document.getElementById('investimento').value = parseFloat(data[2].replace(/[R$\s,.]/g, '')) / 100;
    });


   


});

 // Estilo do DataTables
    $('#verbasTable').DataTable({
        searching: false,
        paging: false,
        info: false
    });
