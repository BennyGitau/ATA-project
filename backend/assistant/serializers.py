from rest_framework import serializers

class QuerySerializer(serializers.Serializer):
    query = serializers.CharField()

    def create(self, validated_data):
        query = validated_data.pop('query')