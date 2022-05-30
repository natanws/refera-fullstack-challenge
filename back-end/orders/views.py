from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from categories.models import Categories
from orders.models import Order
from orders.serializers import OrderPatchSerializer, OrderSerializer

class OrdersView(APIView):
    def post(self, request: Request):
        serializer = OrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        category = Categories.objects.get(name=request.data['category']['name'])
    
        serializer.validated_data['category'] = category    
    
        order = Order.objects.create(**serializer.validated_data)
               
        serializer = OrderSerializer(order)
        
        return Response(serializer.data, status.HTTP_201_CREATED)
    
    def get(self, _: Request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        
        return Response({ 'orders': serializer.data }, status.HTTP_200_OK)
        
        
class SingleOrderView(APIView):
    def get(self, _: Request, id: int):
        order = Order.objects.filter(id=id)

        if not order.first():
            return Response({ 'message': 'Order not found' }, status.HTTP_404_NOT_FOUND)

        serializer = OrderSerializer(order.first())

        return Response({ 'order': serializer.data }, status.HTTP_200_OK)

    def patch(self, request: Request, id: int):
        order = Order.objects.filter(id=id).first()
        
        if not order:
            return Response({ 'message': 'Order not found' }, status.HTTP_404_NOT_FOUND)
        
        serializer = OrderPatchSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        if "category" in request.data:
            category = Categories.objects.get(name=request.data['category']['name'])
            serializer.validated_data['category'] = category

        Order.objects.filter(id=id).update(**serializer.validated_data)
        order = Order.objects.filter(id=id).first()
        
        serializer = OrderPatchSerializer(order)
                        
        return Response({ 'message': 'Order updated', 'order': serializer.data }, status.HTTP_200_OK)

    def delete(self, _: Request, id):        
        order = get_object_or_404(Order, pk=id)
        
        serializer = OrderSerializer(order)
        
        order.delete()
        
        return Response({ 'message': 'Order deleted', 'order': serializer.data }, status.HTTP_200_OK)
    