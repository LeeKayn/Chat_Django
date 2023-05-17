import uuid

import pytz
from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone
import pytz

class Room(models.Model):
    id=models.UUIDField(primary_key=True,default=uuid.uuid4())
    first_user=models.ForeignKey(User,related_name="room_first",on_delete=models.CASCADE,null=True)
    second_user = models.ForeignKey(User, related_name="room_second", on_delete=models.CASCADE,null=True)

class Message(models.Model):
    user=models.ForeignKey(User,related_name="messages",verbose_name="User",on_delete=models.CASCADE)
    room=models.ForeignKey(Room,related_name="messages",verbose_name="Room",on_delete=models.CASCADE)
    content=models.TextField(verbose_name="Content Messages")
    created_date = models.DateTimeField(default=timezone.now)
    what_is_it=models.CharField(max_length=50,null=True)

    def get_time(self):
        if (self.created_date.hour+7<24 and self.created_date.minute<10):
            return str(self.created_date.hour+7)+":0"+str(self.created_date.minute)
        elif (self.created_date.hour+7<24 and self.created_date.minute>=10):
            return str(self.created_date.hour+7)+":"+str(self.created_date.minute)
        elif (self.created_date.hour+7>24 and self.created_date.minute<10):
            return str(self.created_date.hour + 7-24) + ":0" + str(self.created_date.minute)
        elif (self.created_date.hour+7>24 and self.created_date.minute>=10):
            return str(self.created_date.hour + 7-24) + ":" + str(self.created_date.minute)