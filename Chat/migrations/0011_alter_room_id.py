# Generated by Django 4.2.1 on 2023-05-14 15:38

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('Chat', '0010_alter_message_created_date_alter_room_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='id',
            field=models.UUIDField(default=uuid.UUID('5f6ff36a-37ea-4ac7-a70f-783760a0a471'), primary_key=True, serialize=False),
        ),
    ]
