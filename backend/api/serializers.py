from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import Player, Item, Test, Status


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
        fields = ('id', 'date', 'name', 'email')

#################################################
##  Item
#################################################
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
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
        fields = ('test')
