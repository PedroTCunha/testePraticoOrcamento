from django.db import models

class TipoAcao(models.Model):
    nome_acao = models.CharField(max_length=100, unique=True)  
    def __str__(self):
        return self.nome_acao

class Acao(models.Model):
    tipo_acao = models.ForeignKey(TipoAcao, on_delete=models.CASCADE)
    investimento = models.DecimalField(max_digits=10, decimal_places=2) 
    data_prevista = models.DateField()
    data_cadastro = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f"Ação {self.tipo_acao.nome_acao} - {self.data_prevista}"
