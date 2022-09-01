from django.db import models


class Team(models.Model):
    name = models.CharField(max_length=100)
    logo = models.CharField(max_length=200)


class Player(models.Model):
    name = models.CharField(max_length=100)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

class Account(models.Model):
    currentElo = models.IntegerField()
    pseudo = models.CharField(max_length=20)
    profilePicture = models.CharField(max_length=200)