# Generated by Django 4.2.1 on 2023-05-15 04:10

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('Chat', '0014_alter_room_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='id',
            field=models.UUIDField(default=uuid.UUID('d33f4202-fbb6-4742-b22c-a4ec5600452d'), primary_key=True, serialize=False),
        ),
    ]
