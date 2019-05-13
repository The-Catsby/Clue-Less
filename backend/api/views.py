
from django.contrib.auth.models import User, Group
from rest_framework import status, viewsets
from api.serializers import UserSerializer, GroupSerializer, PlayerSerializer, ItemSerializer,StatusSerializer, RoomSerializer, TestSerializer, AccuseSerializer
from api.models import Player, Item, Status, Room, Character
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import action
from rest_framework.response import Response

# Note: the rest_framework class ModelViewSet automatically
#       provides `list`, `create`, `retrieve`,`update` and `destroy` actions.

#################################################
##  User
#################################################
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

#################################################
##  Group
#################################################
class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

#################################################
##  Player
#################################################
class PlayerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows players to be viewed or edited.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer


    '''http://127.0.0.1:8000/players/UpdateCards/'''
    @action(detail=False, methods=['POST'])
    def UpdateCards(self, request):

        players_set = Player.objects.all()
        pitem = set()
        proom = set()
        pChar = set()
        item_card = ''
        room_card = ''
        character_card  = ''

        for p in players_set:
            pitem.add(p.weapon_card)
            proom.add(p.room_card)
            pChar.add(p.character_card)

        for player in players_set:
            for i in Item.objects.all():
                if (i.name not in pitem) == True:
                    item_card = i

            for i in Room.objects.all():
                if not i.name in proom:
                    room_card = i

            for i in Character.objects.all():
                if not i.name in pChar:
                    character_card = i

            if player.room_card is None:
                player.room_card = room_card.name
            if player.weapon_card is None:
                player.weapon_card = item_card.name
            if player.character_card is None:
                player.character_card = character_card.name
            player.save()
            players_set.update()

        return JsonResponse({"status":"updated"}, safe=False)

    @action(detail=False, methods=['delete'])
    def mass_player_destroy(self, request):
        """Delete the user's password."""
        players = Player.objects.all()
        players.delete()

#################################################
##  Item
#################################################
class ItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows items to be viewed or edited.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

#################################################
##  Room
#################################################
class RoomViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Rooms to be viewed or edited.
    """
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

#################################################
##  Status
#################################################
class StatusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows items to be viewed or edited.
    """
    queryset = Status.objects.all()
    serializer_class = StatusSerializer

    @action(detail=False, methods=['delete'])
    def mass_status_destroy(self, request):
        """Delete the user's password."""
        status = Status.objects.all()
        status.delete()

#################################################
##  For Testing Purposes
#################################################
@csrf_exempt
def TestPoint(request):
    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True,context={'request': request})
        return JsonResponse(serializer.data, safe=False)

    #{
	#"test":"test"
    #}
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = TestSerializer(data=data)
        if serializer.is_valid():
            return JsonResponse(data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def Accuse(request):
    if request.method == 'POST':
        player_queryset = Player.objects.all()
        playerSerializer = PlayerSerializer(player_queryset, many=True)
        player_data = playerSerializer.data
        data = JSONParser().parse(request)
        accuse_serializer = AccuseSerializer(data=data)
        if accuse_serializer.is_valid():
            hasWeapon = any(accuse_serializer.data['weapon'] in player["weapon_card"] for player in player_data)
            hasCharacter = any(accuse_serializer.data['character'] in player["character_card"] for player in player_data)
            hasRoom = any(accuse_serializer.data['room'] in player["room_card"] for player in player_data)

            if hasCharacter or hasWeapon or hasRoom:
                return JsonResponse({'result': 'False'}, status=201)
            else:
                return JsonResponse({'result': 'True'}, status=201)
        return JsonResponse(accuse_serializer.errors, status=400)
