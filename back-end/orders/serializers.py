from categories.serializers import CategorySerializer

from rest_framework import serializers


class OrderSerializer(serializers.Serializer):
  id = serializers.IntegerField(read_only=True)
  contact_name = serializers.CharField()
  contact_phone = serializers.CharField()
  real_estate_agency = serializers.CharField()
  order_description = serializers.CharField()
  company = serializers.CharField()
  deadline = serializers.DateTimeField()

  category = CategorySerializer()

  
class OrderPatchSerializer(serializers.Serializer):
  contact_name = serializers.CharField(required=False)
  contact_phone = serializers.CharField(required=False)
  real_estate_agency = serializers.CharField(required=False)
  order_description = serializers.CharField(required=False)
  company = serializers.CharField(required=False)
  deadline = serializers.DateTimeField(required=False)
  
  category = CategorySerializer(required=False)


class DeleteOrderSerializer(serializers.Serializer):
  id = serializers.IntegerField()
  