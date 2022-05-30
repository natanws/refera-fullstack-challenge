from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from categories.models import Categories
from categories.serializers import CategoryPatchSerializer, CategorySerializer


class CategoriesView(APIView):
    def post(self, request: Request):
        categories = Categories.objects.filter(name=request.data["name"])
        
        if categories:
            return Response({ 'message': 'Category already added' }, status.HTTP_409_CONFLICT)
        
        serializer = CategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        category = Categories.objects.create(**serializer.validated_data)
        
        serializer = CategorySerializer(category)
        
        return Response(serializer.data, status.HTTP_201_CREATED)
        
    def get(self, _: Request):
        categories = Categories.objects.all()
        serializer = CategorySerializer(categories, many=True)
        
        return Response({ 'categories': serializer.data }, status.HTTP_200_OK)
    
class SingleCategoryView(APIView):
    def get(self, _:Request, id: int):
        category = Categories.objects.filter(id=id)
        
        if not category.first():
            return Response({ 'message': 'Category not found' }, status.HTTP_404_NOT_FOUND)
        
        serializer = CategorySerializer(category.first())

        return Response({ 'category': serializer.data }, status.HTTP_200_OK)
    
    def patch(self, request: Request, id: int):
        category = Categories.objects.filter(id=id).first()
        
        if not category:
            return Response({ 'message': 'Category not found' }, status.HTTP_404_NOT_FOUND)
        
        serializer = CategoryPatchSerializer(request.data)
        
        Categories.objects.filter(id=id).update(**serializer.data)
        
        category = Categories.objects.filter(id=id).first()
        
        serializer = CategoryPatchSerializer(category)
        
        return Response({ 'message': 'Category updated', 'category': serializer.data }, status.HTTP_200_OK)

    def delete(self, _: Request, id: int):        
        category = get_object_or_404(Categories, pk=id)
        
        serializer = CategorySerializer(category)
        
        category.delete()

        return Response({ 'message': 'Category deleted', 'category': serializer.data }, status.HTTP_200_OK)
