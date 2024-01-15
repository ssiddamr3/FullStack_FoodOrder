
from rest_framework.test import APIClient
import pytest
from django.test import TestCase
from django.urls import reverse

@pytest.mark.django_db()
class TestRestaurantViewSet(TestCase):
    def setUp(self):
        from django.contrib.auth.models import User
        from rest_framework.authtoken.models import Token
        self.client = APIClient()
        self.user = User.objects.create(username='testuser')
        self.token, self.created = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')

    def test_available_restaurants_should_return_list(self):
        url = reverse('restaurants-list')
        response = self.client.get(url)
        assert response.status_code == 200
        

    def test_get_users_should_return_list(self):
        url = reverse('users-list')
        response = self.client.get(url)
        assert response.status_code == 200

    def test_get_menu_items_should_return_list(self):
        url = reverse('menu-list')
        response = self.client.get(url)
        assert response.status_code == 200
