from rest_framework import serializers
from .models import Users,Restaurants,Menu,Orders
from django.contrib.auth.models import User
from rest_framework.authtoken.views import Token


class RestaurantsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = ['restaurant_id','restroName','location','cuisine']

class UsersSerializer(serializers.ModelSerializer):
    restaurant_id = RestaurantsSerializer()
    class Meta:
        model = Users
        fields = ['user_id','username','password','category','restaurant_id']

class OrdersSerializer(serializers.ModelSerializer):
    restaurant_id = RestaurantsSerializer()
    user_id = UsersSerializer()
    class Meta:
        model = Orders
        fields =['order_id','restaurant_id','user_id','order_date']

class MenuSerializer(serializers.ModelSerializer):
    restaurant_id = serializers.PrimaryKeyRelatedField(queryset=Restaurants.objects.all())

    class Meta:
        model = Menu
        fields =['menuItem_id','restaurant_id','itemName','price','description']

# class UserTokenSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id','username','password']

#         # extra_kwargs = {'password':{
#         #     'write_only': True,
#         #     'required': True,
#         #     }}
    
#     # def create(self,validated_data): # We are overriding the create method of this class's serializer
#     #     user = User.objects.create_user(validated_data)
#     #     Token.objects.create(user=user)
#     #     return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True, 'required': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        token, created = Token.objects.get_or_create(user=user)
        return user


