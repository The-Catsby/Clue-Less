# Generated by Django 2.1.7 on 2019-03-23 00:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('AppOne', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='accessrecord',
            name='date',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
