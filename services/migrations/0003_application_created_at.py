# Generated by Django 3.2.12 on 2023-05-20 23:29

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0002_application'),
    ]

    operations = [
        migrations.AddField(
            model_name='application',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
