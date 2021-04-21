from django.urls import path, include
from . import views

# ViewSets
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('todo_api', views.TaskViewSet, basename='ToDo')

app_name = 'api'
urlpatterns = [
    #~~~~~~~~~~~~~~~~~~~~ Simple URL ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # path('', views.apiOverview, name='api overview'),
    # path('tasks/', views.getTasks, name='get tasks'),
    # path('addTask/', views.addTask, name='add task'),
    path('toggleTask/<int:key>', views.toggleComplete, name='toggle complete'),
    # path('deleteTask/<int:key>', views.deleteTask, name='delete task'),
    # path('updateTask/<int:key>', views.updateTask, name='update task'),

    #~~~~~~~~~~~~~~~~~~~ Using GenericViews and Mixins ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    # path('tasks/', views.TaskCreate.as_view()), ---------------------> no pagination
    # path('addTask/', views.TaskCreate.as_view()),
    # path('deleteTask/<int:pk>', views.TaskUpdateDelete.as_view()),
    # path('updateTask/<int:pk>', views.TaskUpdateDelete.as_view())

    #~~~~~~~~~~~~~~~~~~ Using ViewSets ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    path('', include(router.urls))
]
