from django.db import models

#################################################
## Name: Player
#################################################
class Player(models.Model):
    name = models.CharField(max_length=50, null=True)
    date = models.DateField(auto_now=True)
    email = models.EmailField(max_length=50, null=True, unique=True)

    def __str__(self):
        return self.name

#################################################
## Name: Item
#################################################
class Item(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name

#################################################
## Name: Room
#################################################
class Room(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

#################################################
## Name: Status
#################################################
class Status(models.Model):
    message = models.CharField(max_length=4000)
    time = models.CharField(max_length=50, blank=True)
    game = models.CharField(max_length=50, blank=True)
    def __str__(self):
        return self.message

#################################################
## Name: Test
#################################################
class Test(models.Model):
    test = models.CharField(max_length=32)

    def __str__(self):
        return self.test
