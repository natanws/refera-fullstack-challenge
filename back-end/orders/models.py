from django.db import models

from categories.models import Categories


class Order(models.Model):
  contact_name = models.CharField(max_length=50)
  contact_phone = models.CharField(max_length=11)
  real_estate_agency = models.CharField(max_length=50)
  order_description = models.TextField()
  company = models.CharField(max_length=50)
  deadline = models.DateTimeField()

  category = models.ForeignKey('categories.Categories', on_delete=models.CASCADE, related_name='orders')