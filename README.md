# Gestão de Orçamentos

Aplicativo web de gestão de Orçamentos para evento

## Tutorial para execução da aplicação Django em sua máquina

### Pré requisitos

- Possuir Git instalado em seu sistema [Realize a instalação clicando aqui](https://git-scm.com/downloads)
- Requer Python 3.7 ou superior [Você pode instalar por aqui](https://www.python.org/downloads/)
- Docker Engine ou Desktop [Você pode instalar aqui](https://www.docker.com/)
- IDE VS Code

### Passos

1. Clonar o repositório

Abra seu terminal e navegue até o diretório onde deseja clonar o projeto e execute o comando:

       git clone https://github.com/PedroTCunha/testePraticoOrcamento.git

<hr>

2. Navegue até o seu diretório no projeto:

        cd "seu-repositorio"

<hr>

3. Criar um ambiente virtual (_venv_):
  
       py -m venv venv

Isso criará uma pasta chamada venv dentro do seu diretório de projeto, contendo uma cópia isolada do interpretador Python e de todas as dependências do projeto.

<hr>

4. Ativar o ambiente virtual:

- Linux/macOS:

        source venv/bin/activate

- Windows:
  
        venv\Scripts\activate


Você saberá que o ambiente virtual foi criado, pois poderá ser possível visualizar algo como: 
> (venv) C:/Users/seu-usuario/seu-repositório

<hr>

5. Instalar as dependências:
   
        pip install -r requirements.txt

Este comando irá instalar todas as bibliotecas Python necessárias listadas no arquivo **requirements.txt**

<hr>

6. Ativação do Docker:

- Linux/macOS

      sudo docker run -it --name PharmaBanco -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=PharmaBanco -e POSTGRES_USER=PharmaAdmin -p 5433:5432 -d postgres
      
- Windows:

      docker run -it --name PharmaBanco -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=PharmaBanco -e POSTGRES_USER=PharmaAdmin -p 5433:5432 -d postgres

<hr>

7. Executar o servidor de desenvolvimento:
   
        py manage.py runserver

Por fim, este comando irá lhe permitir acessar o aplicativo em seu navegador web padrão, geralmente em `http://127.0.0.1:8000`




