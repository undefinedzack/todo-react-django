from django.urls import path
from . import views

app_name = 'api'
urlpatterns = [
    path('', views.apiOverview, name='api overview'),
    path('tasks/', views.getTasks, name='get tasks'),
    path('addTask/', views.addTask, name='add task'),
    path('toggleTask/<int:key>', views.toggleComplete, name='toggle complete'),
    path('deleteTask/<int:key>', views.deleteTask, name='delete task'),
    path('updateTask/<int:key>', views.updateTask, name='update task')
]
