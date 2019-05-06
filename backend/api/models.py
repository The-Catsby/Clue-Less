from django.db import models

#################################################
##  Player
#################################################


class Player(models.Model):
    name = models.CharField(max_length=50, null=True)
    date = models.DateField(auto_now=True)
    email = models.EmailField(max_length=50, null=True, unique=True)
    location = models.OneToOneField('Room', null=True, on_delete=False)
    room_card = models.CharField(max_length=50, null=True)
    weapon_card = models.CharField(max_length=50, null=True)
    character_card = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.name

#################################################
##  Item
#################################################


class Item(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name

#################################################
##  Room
#################################################


class Room(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

#################################################
##  character
#################################################


class Character(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

#################################################
##  GameState
#################################################


class GameState(models.Model):
    whose_turn = models.ForeignKey('Player', null=False, on_delete=False)


#################################################
##  Status
#################################################
class Status(models.Model):
    message = models.CharField(max_length=4000)
    time = models.CharField(max_length=50, blank=True)
    game = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.message

#################################################
##  Test
#################################################


class Test(models.Model):
    test = models.CharField(max_length=32)

    def __str__(self):
        return self.test


class Accuse(object):
    def __init__(self, player_id, player_name, character, weapon, room):
        self.player_id = player_id
        self.player_name = player_name
        self.character = character
        self.weapon = weapon
        self.room = room
