from django import forms
from .models import Acao

class AcaoForm(forms.ModelForm):
    class Meta:
        model = Acao
        fields = ['tipo_acao', 'investimento', 'data_prevista']  # Campos do formulário
        widgets = {
            'data_prevista': forms.DateInput(attrs={'type': 'date'}), # Widget para o campo data
        }
