from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import ToDo
from .serializers import ToDoSerializer
from django.core.paginator import Paginator, EmptyPage


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'tasks': '/tasks',
        'markComplete': '/markComplete',
        'add': '/add',
        'delete': '/delete'
    }

    return Response(api_urls)


@api_view(['GET'])
def getTasks(request):
    tasks = ToDo.objects.all()

    pageNum = request.GET.get('page', 1)
    tasksPaginated = Paginator(tasks, 5)
    try:
        page = tasksPaginated.page(pageNum)
    except EmptyPage:
        page = tasksPaginated.page(1)

    serializedTasks = ToDoSerializer(page, many=True)

    return Response(serializedTasks.data)


@api_view(['GET', 'POST'])
def addTask(request):
    task = ToDoSerializer(data=request.data)
    if task.is_valid():
        task.save()

    return Response(task.data)


@api_view(['GET', 'POST'])
def toggleComplete(request, key):
    task = ToDo.objects.get(id=key)
    task.complete = not task.complete
    task.save()

    serializedTask = ToDoSerializer(task)
    return Response(serializedTask.data)


@api_view(['GET'])
def deleteTask(request, key):
    task = ToDo.objects.get(id=key)
    task.delete()

    return Response({'status': 'deleted!'})


@api_view(['GET', 'POST'])
def updateTask(request, key):
    task = ToDo.objects.get(id=key)

    if request.method == 'POST':
        sTask = ToDoSerializer(data=request.data, instance=task)
        if sTask.is_valid():
            sTask.save()
            return Response(sTask.data)

    serializedTask = ToDoSerializer(task)

    return Response(serializedTask.data)


