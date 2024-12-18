from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('obter_tipos_acao/', views.obter_tipos_acao, name='obter_tipos_acao'),
    path('adicionar_acao/', views.adicionar_acao, name='adicionar_acao'),
]
