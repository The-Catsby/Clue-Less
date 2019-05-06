from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Player, Item, Status, Room, Test

#################################################
##  User
#################################################


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

#################################################
##  Group
#################################################


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')

#################################################
##  Player
#################################################


class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'date', 'name', 'email', 'location', 'room_card', 'weapon_card', 'character_card')

#################################################
##  Item
#################################################


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id', 'name')

#################################################
##  Room
#################################################


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name')

#################################################
##  Character
#################################################


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'name')


#################################################
## Status
#################################################


class StatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Status
        fields = ('message', 'time', 'game')

#################################################
##  For Testing Purposes
#################################################


class TestSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'  # all model fields will be included


class AccuseSerializer(serializers.Serializer):
        player_id = serializers.CharField(max_length=50)
        player_name = serializers.CharField(max_length=50)
        character = serializers.CharField(max_length=50)
        weapon = serializers.CharField(max_length=200)
        room = serializers.CharField(max_length=50)