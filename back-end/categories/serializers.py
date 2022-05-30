from rest_framework import serializers


class CategorySerializer(serializers.Serializer):
  id = serializers.IntegerField(read_only=True)
  name = serializers.CharField()

class CategoryPatchSerializer(serializers.Serializer):
  name = serializers.CharField(required=False)