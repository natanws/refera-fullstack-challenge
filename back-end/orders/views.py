from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from orders.models import Order
from orders.serializers import DeleteOrderSerializer, OrderPatchSerializer, OrderSerializer


class OrdersView(APIView):
    def post(self, request: Request):
        serializer = OrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        order = Order.objects.create(**serializer.validated_data)
        
        serializer = OrderSerializer(order)
        
        return Response(serializer.data, status.HTTP_201_CREATED)
    
    def get(self, _: Request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        
        return Response({ 'Orders': serializer.data }, status.HTTP_200_OK)
        
    def delete(self, request: Request):
        serializer = DeleteOrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        order = get_object_or_404(Order, pk=serializer.validated_data["id"])
        
        serializer = OrderSerializer(order)
        
        order.delete()
        
        return Response({ 'message': 'Order deleted', 'order': serializer.data }, status.HTTP_200_OK)
    
class SingleOrderView(APIView):
    def get(self, _: Request, id):
        order = Order.objects.filter(id=id)

        if not order.first():
            return Response({'message': 'Order not found'}, status.HTTP_404_NOT_FOUND)

        serializer = OrderSerializer(order.first())

        return Response({ 'order': serializer.data }, status.HTTP_200_OK)

    def patch(self, request: Request, id: int):
        order = Order.objects.filter(id=id).first()
        
        if not order:
            return Response({ 'message': 'Order not found' }, status.HTTP_404_NOT_FOUND)
        
        serializer = OrderPatchSerializer(request.data)
        
        Order.objects.filter(id=id).update(**serializer.data)
        
        order = Order.objects.filter(id=id).first()
        
        serializer = OrderPatchSerializer(order)
        
        return Response({'message': 'Order updated', 'order': serializer.data}, status.HTTP_200_OK)
