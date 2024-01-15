
from rest_framework import mixins
from rest_framework import viewsets,permissions,status
from .models import Restaurants,Menu, Users
from .serializers import RestaurantsSerializer,MenuSerializer,UsersSerializer,UserSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse



class RestraurantViewSet(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)
    #permission_classes = [permissions.AllowAny]
    def list(self,request):
        restraurants = Restaurants.objects.all()
        serializer = RestaurantsSerializer(restraurants,many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, pk=None):
        queryset = Restaurants.objects.all()
        restaurant = get_object_or_404(queryset, pk=pk)  
        serializer = RestaurantsSerializer(restaurant)
        return Response(serializer.data)

class MenuViewSet(viewsets.ModelViewSet):
    serializer_class = MenuSerializer
    authentication_classes = (TokenAuthentication,)

    def get_queryset(self): # URL pattern is http://127.0.0.1:8000/menu/?restaurant_id=3
        restaurant_id = self.request.query_params.get('restaurant_id')
        if restaurant_id:
            return Menu.objects.filter(restaurant_id=restaurant_id)
        return Menu.objects.all()
    @csrf_exempt
    def update(self, request, pk=None):
        try:
            menu_item = Menu.objects.get(pk=pk)
        except Menu.DoesNotExist:
            return Response({'error': 'Menu item not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = MenuSerializer(menu_item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self,request, pk=None):
        menu_item = Menu.objects.get(pk=pk)
        menu_item.delete()
        return Response(status.HTTP_204_NO_CONTENT)


class UsersViewSet(viewsets.ViewSet):

    serializer_class = UsersSerializer
    authentication_classes = (TokenAuthentication,)
    def list(self,request):
        print('uuuuuu')
        users = Users.objects.all()
        serializer = UsersSerializer(users,many=True)
        return Response(serializer.data)
    
    def get_object(self, request, username):  # Modify to accept user_name
        print("***********")
        user = get_object_or_404(Users, username=username)
        serializer = UsersSerializer(user)
        return Response(serializer.data)


class UsernamesViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    @action(detail=False, methods=['get'])
    def get_allUsernames(self,request):
        permission_classes = [permissions.AllowAny]
        if request.method == 'GET':
            usernames = list(Users.objects.values_list('username',flat=True))
            return JsonResponse({'user_name':usernames},status=200)
        return JsonResponse({'error':'Method Not Allowed'},status=405)

    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    