from django.db import models


class Player(models.Model):
    name = models.CharField(max_length=50, null=True)
    date = models.DateField(auto_now=True)
    email = models.EmailField(max_length=50, null=True, unique=True)

    def __str__(self):
        return self.name

class Item(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name
        
class Status(models.Model):
    message = models.CharField(max_length=4000)
    time = models.CharField(max_length=50, null=True)
    game = models.CharField(max_length=50, null=True)
    def __str__(self):
        return self.message
        
class Test(models.Model):
    test = models.CharField(max_length=32)

    def __str__(self):
        return self.test


