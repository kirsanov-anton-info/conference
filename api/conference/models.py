from django.db import models
from django.contrib.auth.models import User


class Presentation(models.Model):
    title = models.CharField(max_length=40, default='')
    description = models.CharField(max_length=255, default='')
    presenters = models.ManyToManyField(User, related_name="presentations")


class Room(models.Model):
    room = models.CharField(max_length=40)


class Schedule(models.Model):
    presentation = models.ForeignKey(Presentation, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    date = models.DateField()
    start = models.TimeField()
    finish = models.TimeField()
