from django.db import models


class Order(models.Model):
  contact_name = models.CharField(max_length=50)
  contact_phone = models.CharField(max_length=11)
  real_estate_agency = models.CharField(max_length=50)
  order_description = models.TextField()
  company = models.CharField(max_length=50)
  category = models.CharField(max_length=25)
  deadline = models.DateTimeField()
  