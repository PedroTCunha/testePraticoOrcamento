# Generated by Django 5.1.3 on 2024-12-18 14:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orcamento', '0002_alter_acao_investimento'),
    ]

    operations = [
        migrations.AlterField(
            model_name='acao',
            name='investimento',
            field=models.FloatField(),
        ),
    ]
