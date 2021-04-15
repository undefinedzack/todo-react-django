from django.db import models


class ToDo(models.Model):
    text = models.CharField(max_length=200)
    complete = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.text}'
