from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RestraurantViewSet, MenuViewSet, UsersViewSet,UserViewSet, UsernamesViewSet

router = DefaultRouter()
router.register('restaurants', RestraurantViewSet, basename='restaurants')
router.register(r'menu', MenuViewSet, basename='menu')
router.register(r'users', UsersViewSet, basename='users')
router.register(r'user', UserViewSet, basename='user')
router.register(r'usernames',UsernamesViewSet,basename='usernames')

urlpatterns = [
    path('users/<str:username>/', UsersViewSet.as_view({'get': 'get_object'}), name='user-detail'),
    path('', include(router.urls)),
    # other paths...
]
for route in router.urls:
    print(route)