# Generated by Django 4.2.1 on 2023-05-14 03:58

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('Chat', '0003_room_first_user_room_second_user_alter_room_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='id',
            field=models.UUIDField(default=uuid.UUID('df448808-2d8b-47c4-89f2-d1342c5431f9'), primary_key=True, serialize=False),
        ),
    ]
