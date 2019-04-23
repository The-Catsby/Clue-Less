from django.contrib import admin
from api.models import Player, Item, Status, Room, GameState

# Register your models here.
admin.site.register(Player)
admin.site.register(Item)
admin.site.register(Status)
admin.site.register(Room)
admin.site.register(GameState)
