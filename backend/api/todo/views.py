from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import ToDo
from .serializers import ToDoSerializer
from django.core.paginator import Paginator, EmptyPage

# GenericAPIView & Mixins
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, \
    DestroyModelMixin

# Viewsets
from rest_framework import viewsets


@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'tasks': '/tasks',
        'markComplete': '/markComplete',
        'add': '/add',
        'delete': '/delete'
    }

    return Response(api_urls)


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Basic Implementation ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
def toggleComplete(request, key):
    task = ToDo.objects.get(id=key)
    task.complete = not task.complete
    task.save()

    serializedTask = ToDoSerializer(task)
    return Response(serializedTask.data)


# @api_view(['GET', 'POST'])
# def addTask(request):
#     task = ToDoSerializer(data=request.data)
#     if task.is_valid():
#         task.save()
#
#     return Response(task.data)

# @api_view(['GET'])
# def deleteTask(request, key):
#     task = ToDo.objects.get(id=key)
#     task.delete()
#
#     return Response({'status': 'deleted!'})
#
#
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


# ~~~~~~~~~~~~~~~~~~~~~~~~ Implementation using GenericViews and Mixins ~~~~~~~~~~~~~~~~~~~~~~~~~

class TaskCreate(GenericAPIView, ListModelMixin, CreateModelMixin):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class TaskUpdateDelete(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = ToDo.objects.all()
    serializer_class = ToDoSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Implementation using ViewSets ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class TaskViewSet(viewsets.ViewSet):
    def list(self, request):
        tasks = ToDo.objects.all()

        pageNum = request.GET.get('page', 1)
        tasksPaginated = Paginator(tasks, 5)
        try:
            page = tasksPaginated.page(pageNum)
        except EmptyPage:
            page = tasksPaginated.page(1)

        serializedTasks = ToDoSerializer(page, many=True)

        return Response(serializedTasks.data)

    def retrieve(self, request, pk=None):
        task = ToDo.objects.get(id=pk)
        serializedtask = ToDoSerializer(task)
        return Response(serializedtask.data)

    def create(self, request):
        task = ToDoSerializer(data=request.data)
        if task.is_valid():
            task.save()

        return Response(task.data)

    def update(self, request, pk):
        task = ToDo.objects.get(id=pk)

        if request.method == 'PUT':
            sTask = ToDoSerializer(data=request.data, instance=task)
            if sTask.is_valid():
                sTask.save()
                return Response(sTask.data)

        serializedTask = ToDoSerializer(task)

        return Response(serializedTask.data)

    def destroy(self, request, pk):
        task = ToDo.objects.get(pk=pk)
        task.delete()

        return Response({'status': 'deleted!'})
