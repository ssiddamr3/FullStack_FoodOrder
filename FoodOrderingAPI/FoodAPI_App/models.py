from django.db import models
from django.utils import timezone
from django.urls import reverse
# Create your models here.


class Restaurants(models.Model):
    restaurant_id = models.IntegerField(primary_key=True)
    restroName = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    cuisine = models.CharField(max_length=100)
    class Meta:
        app_label = 'FoodAPI_App'
        managed = True
        db_table = 'Available_Restaurants'

class Users(models.Model):
    user_id = models.IntegerField(primary_key=True)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    category = models.CharField(max_length=10,)  # Set your default value here
    restaurant_id = models.ForeignKey(Restaurants,on_delete=models.CASCADE,db_column='restaurant_id')
    class Meta:
        app_label = 'FoodAPI_App'
        managed = True
        db_table = 'Clients'
    

class Orders(models.Model):
    order_id = models.IntegerField(primary_key=True)
    restaurant_id = models.ForeignKey(Restaurants,on_delete=models.CASCADE,db_column='restaurant_id')
    user_id = models.ForeignKey(Users,on_delete=models.CASCADE,db_column='user_id')
    order_date = models.DateTimeField(auto_now_add=True)
    class Meta:
        app_label = 'FoodAPI_App'
        managed = True
        db_table = 'Orders'

class Menu(models.Model):
    menuItem_id = models.IntegerField(primary_key=True)
    restaurant_id = models.ForeignKey(Restaurants,on_delete=models.CASCADE,db_column='restaurant_id')
    itemName = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2) 
    description = models.CharField(max_length=100)
    class Meta:
        app_label = 'FoodAPI_App'
        managed = True
        db_table = 'Menu'

