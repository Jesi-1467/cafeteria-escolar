from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Inicializamos el enrutador automático
router = DefaultRouter()

# Registramos todas las rutas de la API
router.register(r'cafeteria', CafeteriaViewSet)
router.register(r'categorias', CategoriaViewSet)
router.register(r'roles', RolViewSet)
router.register(r'usuarios', UsuarioViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'detallepedidos', DetallePedidoViewSet)
router.register(r'pagos', PagoViewSet)

# Definimos los urlpatterns incluyendo las rutas generadas por el router
urlpatterns = [
    path('api/', include(router.urls)),
]