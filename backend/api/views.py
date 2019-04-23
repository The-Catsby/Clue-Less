from django.contrib.auth.models import User, Group
from rest_framework import status, viewsets
from api.serializers import UserSerializer, GroupSerializer, PlayerSerializer, ItemSerializer, TestSerializer,StatusSerializer
from api.models import Player, Item, Status
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from rest_framework.decorators import action
from rest_framework.response import Response

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



class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class PlayerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows players to be viewed or edited.
    """
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer

    @action(detail=False, methods=['delete'])
    def mass_player_destroy(self, request):
        """Delete the user's password."""
        players = Player.objects.all()
        players.delete()



class ItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows items to be viewed or edited.
    """
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

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
