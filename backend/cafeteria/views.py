from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import *
from .serializers import *

# -------------------- VIEWSETS --------------------

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
    queryset = Pedido.objects.select_related('id_usuario').all()
    serializer_class = PedidoSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.select_related('id_categoria').all()
    serializer_class = ProductoSerializer

class DetallePedidoViewSet(viewsets.ModelViewSet):
    queryset = DetallePedido.objects.select_related('id_pedido', 'id_producto').all()
    serializer_class = DetallePedidoSerializer

class PagoViewSet(viewsets.ModelViewSet):
    queryset = Pago.objects.select_related('id_pedido').all()
    serializer_class = PagoSerializer


# -------------------- LOGIN REAL --------------------

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response(
            {"error": "Faltan datos"},
            status=400
        )

    try:
        user = Usuarios.objects.select_related('id_rol').get(
            email=email.strip().lower(),
            password=password.strip()
        )

        return Response({
            "id_usuario": user.id_usuario,
            "nombre": user.nombre,
            "email": user.email,
            "id_rol": user.id_rol.id_rol
        })

    except Usuarios.DoesNotExist:
        return Response(
            {"error": "Credenciales incorrectas"},
            status=400
        )