from rest_framework import serializers
from .models import *

class CafeteriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cafeteria
        fields = '__all__'


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = '__all__'

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'

class UsuariosSerializer(serializers.ModelSerializer):
    roles = RolesSerializer(source='id_roles', read_only=True)
    class Meta:
        model = Usuarios
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    usuario = UsuariosSerializer(source='id_usuario', read_only=True)
    
    # CORRECCIÓN: Fuerza a la API a enviar la fecha en formato local plano (sin la Z de UTC)
    fecha = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%S", required=False)

    class Meta:
        model = Pedido
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(source='id_categoria', read_only=True)
    class Meta:
        model = Producto
        fields = '__all__'

class DetallePedidoSerializer(serializers.ModelSerializer):
    pedido = PedidoSerializer(source='id_pedido', read_only=True)
    producto = ProductoSerializer(source='id_producto', read_only=True)
    class Meta:
        model = DetallePedido
        fields = '__all__'


class PagoSerializer(serializers.ModelSerializer):
    pedido = PedidoSerializer(source='id_pedido', read_only=True)
    class Meta:
        model = Pago
        fields = '__all__'