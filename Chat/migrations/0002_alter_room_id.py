# Generated by Django 4.2.1 on 2023-05-10 15:00

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('Chat', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='id',
            field=models.UUIDField(default=uuid.UUID('b988e38a-ff51-4e2c-a3c6-017b712ea679'), primary_key=True, serialize=False),
        ),
    ]
