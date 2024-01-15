from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Users, Restaurants, Orders, Menu

admin.site.register(Users)
admin.site.register(Restaurants)
admin.site.register(Orders)
admin.site.register(Menu)
