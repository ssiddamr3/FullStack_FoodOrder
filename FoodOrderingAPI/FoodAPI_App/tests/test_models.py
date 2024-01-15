from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from FoodAPI_App.models import Restaurants, Menu,Users
import pytest



class TestRestaurantsModel(TestCase):
    def test_create_restaurant(self):
        restaurant = Restaurants.objects.create(
            restaurant_id=1, restroName='Test Restaurant', location='Test Location', cuisine='Test Cuisine'
        )
        assert restaurant.restaurant_id == 1
        assert restaurant.restroName== 'Test Restaurant'
        assert restaurant.location== 'Test Location'
        assert restaurant.cuisine== 'Test Cuisine'

class TestUsersModel(TestCase):
    def test_create_user(self):
        restaurant = Restaurants.objects.create(
            restaurant_id=1, restroName='Test Restaurant', location='Test Location', cuisine='Test Cuisine'
        )
        user = Users.objects.create(
            user_id=1, username='testuser', password='testpassword', category='customer', restaurant_id=restaurant
        )
        assert user.user_id== 1
        assert user.username== 'testuser'
        assert user.password== 'testpassword'
        assert user.category== 'customer'
        assert user.restaurant_id== restaurant

class TestMenuModel(TestCase):
    def test_create_menu_item(self):
        restaurant = Restaurants.objects.create(
            restaurant_id=1, restroName='Test Restaurant', location='Test Location', cuisine='Test Cuisine'
        )
        menu_item = Menu.objects.create(
            menuItem_id=1, restaurant_id=restaurant, itemName='Test Item', price=10.99, description='Test Description'
        )
        assert menu_item.menuItem_id == 1
        assert menu_item.restaurant_id == restaurant
        assert menu_item.itemName =='Test Item'
        assert menu_item.price == 10.99
        assert menu_item.description == 'Test Description'
