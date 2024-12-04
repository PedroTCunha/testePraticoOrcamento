from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.urls import reverse
from .models import Acao, TipoAcao
from .forms import AcaoForm 


def index(request):
    tipos_acao = TipoAcao.objects.all()
    adicionar_acao_url = reverse('adicionar_acao')  


    context = {'tipos_acao': tipos_acao, 'adicionar_acao_url': adicionar_acao_url}
    return render(request, "orcamento/index.html", context)


def obter_tipos_acao (request):
    tipos_acao = TipoAcao.objects.all()
    return JsonResponse({'tipos_acao': list(tipos_acao.values())})

def adicionar_acao (request):
    if request.method == 'POST':
        form = AcaoForm(request.POST)
        if form.is_valid():
            acao = form.save()
            return JsonResponse({'success': True, 'acao_id': acao.id})
        else:
            return JsonResponse({'success': False, 'errors': form.errors}) # Retornar erros de validação como JSON
    else:  # Lidar com outros métodos (GET, etc.)
      return JsonResponse({'success': False, 'error': 'Método inválido.'}, status=400) # Retornar um JSON com erro 400 - Bad Request

def visualizar_acoes (request):
    acoes = Acao.objects.all().select_related('tipo_acao') 
    return render(request, 'orcamento/index.html', {'acoes': acoes})
