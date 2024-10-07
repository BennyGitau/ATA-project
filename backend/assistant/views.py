# # assistant/views.py
# import os
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# from langchain.text_splitter import CharacterTextSplitter
# from langchain_community.document_loaders import TextLoader
# from langchain.prompts.chat import (
#     HumanMessagePromptTemplate,
#     SystemMessagePromptTemplate,
# )
# from langchain.prompts import ChatPromptTemplate
# from langchain.schema import StrOutputParser
# from langchain.schema.runnable import RunnablePassthrough
# from langchain_community.vectorstores import Chroma
# from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings

# from .serializers import QuerySerializer



# API_KEY = os.getenv("GEMINI_API_KEY")


# # Load environment variables

# # Set up the language model
# llm = ChatGoogleGenerativeAI(
#     model="gemini-pro",
#     temperature=0.6,
#     max_tokens=150,
#     top_p=1,
#     frequency_penalty=0.0,
#     presence_penalty=0.0,
#     api_key=API_KEY,
# )
# llm.invoke("Sing a ballad of LangChain.")


# template = """
#         You are a personal assistant Chatbot...
#         """  # Truncated for brevity, use the full template from the original code.

# system_message_prompt = SystemMessagePromptTemplate.from_template(template)
# human_message_prompt = HumanMessagePromptTemplate.from_template(
#     input_variables=["question", "context"],
#     template="{question}",
# )
# chat_prompt_template = ChatPromptTemplate.from_messages(
#     [system_message_prompt, human_message_prompt]
# )

# # LOCAl_FILE_PATH =  os.path.join(os.path.dirname(__file__), 'docs', 'info.txt')
# # Cache for loaded and split documents
# documents_cache = None

# from django.conf import settings

# def load_documents():
#     """Load and split documents if not already cached."""
#     global documents_cache
#     if documents_cache is None:
#         file_path = os.path.join(settings.BASE_DIR, 'assistant', 'docs', 'info.txt')

#         raw_documents = TextLoader(file_path).load()
#         text_splitter = CharacterTextSplitter(chunk_size=300, chunk_overlap=0)
#         documents_cache = text_splitter.split_documents(raw_documents)
#     return documents_cache

# def load_embeddings(documents, user_query):
#     """Create a vector store from documents."""
#     embeddings = GoogleGenerativeAIEmbeddings(
#         api_key=API_KEY,
#         model="gemini-pro",
#         scopes=["generativelanguage.embeddings"]

#     )
#     db = Chroma.from_documents(documents, embeddings)
#     docs = db.similarity_search(user_query)
#     return db.as_retriever()
# def generate_response(user_query, retriever):
#     """Generate response from user query and context."""
#     chain = (
#         {"context": retriever, "question": RunnablePassthrough()}
#         | chat_prompt_template
#         | llm
#         | StrOutputParser()
#     )
#     return chain.invoke(user_query)

# class QueryView(APIView):
    
#     """Django view to handle POST requests for the query."""

#     def post(self, request, *args, **kwargs):
#         serializer = QuerySerializer(data=request.data)
#         if serializer.is_valid():
#             user_query = serializer.validated_data['query']
#         if not user_query:
#             return Response({'error': 'Please enter a valid query.'}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             retriever = load_embeddings(load_documents(), user_query)
#             response = generate_response(user_query, retriever)
#             return Response({'response': response}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

import os
from dotenv import load_dotenv  
from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import TextLoader
from langchain.prompts.chat import (
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
)
from langchain.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser
from langchain.schema.runnable import RunnablePassthrough
from langchain_community.vectorstores import Chroma
from rest_framework.decorators import api_view, permission_classes


from .serializers import QuerySerializer


load_dotenv()


API_KEY = os.getenv("OPENAI_API_KEY")

llm = ChatOpenAI(
    model="gpt-4o",
    temperature=0.6,
    max_tokens=150,
    top_p=1,
    frequency_penalty=0.0,
    presence_penalty=0.0,
    api_key=API_KEY,
)

template: str = """/
        You are a personal assistant Chatbot/
        You help users with questions /
        You will answer {question} based on the {context} you are trained on /
        If you don't know the answer, you will ask the user to rephrase the question or redirect them to contact bensonkgitau138@gmail.com or 0795216928/
        Always be friendly and helpful/
        Keep the answer short except where more explanation is needed/
        
        At the end of the conversation, that is after a few questions, you will ask the user if they are interested in hiring Benson/
        If they are, contact bensonkgitau138@gmail.com or 0795216928/
        End the conversation with a thank you message and offer more help if needed/
        """

system_message_prompt = SystemMessagePromptTemplate.from_template(template)
human_message_prompt = HumanMessagePromptTemplate.from_template(
    input_variables=["question", "context"],
    template="{question}",
)
chat_prompt_template = ChatPromptTemplate.from_messages(
    [system_message_prompt, human_message_prompt]
)

# Cache the loaded and split documents
documents_cache = None


from django.conf import settings

def load_documents():
    """Load and split documents if not already cached."""
    global documents_cache
    if documents_cache is None:
        file_path = os.path.join(settings.BASE_DIR, 'assistant', 'docs', 'info.txt')

        raw_documents = TextLoader(file_path).load()
        text_splitter = CharacterTextSplitter(chunk_size=300, chunk_overlap=0)
        documents_cache = text_splitter.split_documents(raw_documents)
    return documents_cache

def load_embeddings(documents, user_query):
    """Create a vector store from a set of documents."""
    db = Chroma.from_documents(documents, OpenAIEmbeddings())
    docs = db.similarity_search(user_query)
    return db.as_retriever()

def generate_response(user_query, retriever):
    """Run a query against the vector store."""
    chain = (
        {"context": retriever, "question": RunnablePassthrough()}
        | chat_prompt_template
        | llm
        | StrOutputParser()
    )
    return chain.invoke(user_query)

class QueryView(APIView):
    """Django view to handle POST requests for the query."""

    def post(self, request, *args, **kwargs):
        serializer = QuerySerializer(data=request.data)
        if serializer.is_valid():
            user_query = serializer.validated_data['query']
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if not user_query:
            return Response({'error': 'Please enter a valid query.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            retriever = load_embeddings(load_documents(), user_query)
            response = generate_response(user_query, retriever)
            return Response({'response': response}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

from google.cloud import dialogflow_v2beta1 as dialogflow
@api_view(["POST"])
def detect_intent_knowledge(request):
    data = request.data
    project_id = data.get("project_id")
    session_id = data.get("session_id")
    language_code = data.get("language_code")
    knowledge_base_id = data.get("knowledge_base_id")
    texts = data.get("texts")

    """Returns the result of detect intent with querying Knowledge Connector.

    Args:
    project_id: The GCP project linked with the agent you are going to query.
    session_id: Id of the session, using the same `session_id` between requests
              allows continuation of the conversation.
    language_code: Language of the queries.
    knowledge_base_id: The Knowledge base's id to query against.
    texts: A list of text queries to send.
    """

    session_client = dialogflow.SessionsClient( )

    session_path = session_client.session_path(project_id, session_id)
    responses = []

    for text in texts:
        text_input = dialogflow.TextInput(text=text, language_code=language_code)

        query_input = dialogflow.QueryInput(text=text_input)

        knowledge_base_path = dialogflow.KnowledgeBasesClient.knowledge_base_path(
            project_id, knowledge_base_id
        )

        query_params = dialogflow.QueryParameters(
            knowledge_base_names=[knowledge_base_path]
        )

        request = dialogflow.DetectIntentRequest(
            session=session_path, query_input=query_input, query_params=query_params
        )
        response = session_client.detect_intent(request=request)
        response_data = {
            "query_text": response.query_result.query_text,
            "intent": response.query_result.intent.display_name,
            "intent_confidence": response.query_result.intent_detection_confidence,
            "fulfillment_text": response.query_result.fulfillment_text,
        }

        responses.append(response_data)

        return Response(responses)

