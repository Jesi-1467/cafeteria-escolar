from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r'cafeteria', CafeteriaViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'roles', RolViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'detallepedidos', DetallePedidoViewSet)
router.register(r'pagos', PagoViewSet)

urlpatterns = [
    path('api/', include(router.urls)),

    # 🔥 LOGIN AGREGADO AQUÍ
    path('api/login/', login),
]