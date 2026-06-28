from rest_framework import viewsets
from .models import *
from .serializers import *

class CafeteriaViewSet(viewsets.ModelViewSet):
    queryset = Cafeteria.objects.all()
    serializer_class = CafeteriaSerializer

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class RolViewSet(viewsets.ModelViewSet):
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.select_related('id_rol').all()
    serializer_class = UsuariosSerializer
    
class PedidoViewSet(viewsets.ModelViewSet):
    # select_related optimiza la consulta SQL haciendo un JOIN con la tabla de usuarios
    queryset = Pedido.objects.select_related('id_usuario').all()
    serializer_class = PedidoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    # select_related optimiza la consulta SQL haciendo un JOIN con la tabla de categorías
    queryset = Producto.objects.select_related('id_categoria').all()
    serializer_class = ProductoSerializer

class DetallePedidoViewSet(viewsets.ModelViewSet):
    # select_related optimiza las consultas haciendo JOIN con pedidos y productos
    queryset = DetallePedido.objects.select_related('id_pedido', 'id_producto').all()
    serializer_class = DetallePedidoSerializer

class PagoViewSet(viewsets.ModelViewSet):
    # select_related optimiza la consulta SQL haciendo un JOIN con la tabla de pedidos
    queryset = Pago.objects.select_related('id_pedido').all()
    serializer_class = PagoSerializer