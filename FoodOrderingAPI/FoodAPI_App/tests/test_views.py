from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from FoodAPI_App.models import Restaurants, Menu
import pytest

class TestUserViews(TestCase):

    def setUp(self) -> None:
        from django.contrib.auth.models import User
        from rest_framework.authtoken.models import Token
        self.client = APIClient()
        self.user = User.objects.create(username='testuser')
        self.token, self.created = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        
    def test_GET_users_list_returns_list(self):
        response = self.client.get(reverse('users-list'))
        assert response.status_code == 200
    

class TestRestaurantViews(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()
        self.user = User.objects.create(username='testuser')
        self.token, self.created = Token.objects.get_or_create(user=self.user)
        Restaurants.objects.create(restaurant_id=1, restroName='Test Restaurant', location='Test Location', cuisine='Test Cuisine')
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

        
    def test_GET_restaurant_list_returns_list(self):
        url = reverse('restaurants-list')
        response = self.client.get(url)
        assert response.status_code == 200

    def test_GET_restaurant_by_id_returns_object(self):
        url = reverse('restaurants-detail', args=[1])
        response = self.client.get(url)
        assert response.status_code == 200

    def test_GET_restaurant_by_invalid_id_returns_not_found(self):
        url = reverse('restaurants-detail', args=[2])
        response = self.client.get(url)
        assert response.status_code == 404


class TestMenuViews(TestCase):
    def setUp(self) -> None:
        self.client = APIClient()

        # Create a user and obtain a token
        self.user = User.objects.create(username='testuser')
        self.token, self.created = Token.objects.get_or_create(user=self.user)

        # Create a restaurant for testing menu
        self.restaurant = Restaurants.objects.create(
            restaurant_id=1, restroName='Test Restaurant', location='Test Location', cuisine='Test Cuisine'
        )

        # Create a menu item for testing update and delete
        self.menu_item = Menu.objects.create(
            menuItem_id=1, restaurant_id=self.restaurant, itemName='Test Item', price=10.99, description='Test Description'
        )

        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_GET_menu_list_returns_list(self):
        url = reverse('menu-list')
        response = self.client.get(url)
        assert response.status_code == status.HTTP_200_OK

    def test_GET_menu_by_id_returns_object(self):
        url = reverse('menu-detail', args=[1]) 
        response = self.client.get(url)
        print(response.content)
        assert response.status_code == status.HTTP_200_OK

    def test_GET_menu_by_restaurant_id_returns_list(self):
        url = reverse('menu-list')
        response = self.client.get(url, {'restaurant_id': 1}) 
        assert response.status_code == status.HTTP_200_OK

    def test_delete_menu_item(self):
        url = reverse('menu-detail', args=[1]) 
        response = self.client.delete(url)
        assert response.status_code == status.HTTP_204_NO_CONTENT



