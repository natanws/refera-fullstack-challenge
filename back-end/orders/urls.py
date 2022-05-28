from django.urls import path

from orders.views import OrdersView, SingleOrderView

urlpatterns = [
    path('orders', OrdersView.as_view()),
    path('orders/<int:id>', SingleOrderView.as_view())
]
