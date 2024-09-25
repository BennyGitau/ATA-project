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
        You will answer {question} based on the {context} you are trained on related to Benson's portfolio, experiences, education, blogs, contacts, skills and projects/
        If you don't know the answer, you will ask the user to rephrase the question or redirect them to contact bensonkgitau138@gmail.com or 0795216928/
        Always be friendly and helpful/
        Keep the answer short except where more explanation is needed/
        Useful links:
        https://www.linkedin.com/in/benson-gitau-b89b6b191/
        https://github.com/BennyGitau/
        
        At the end of the conversation, that is after a few questions, you will ask the user if they are interested in hiring Benson/
        If they are, contact bensonkgitau138@gmail.com or 0795216928/
        End the conversation with a thank you message and offer more help if needed/
        you can also provide the useful links/
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
        if not user_query:
            return Response({'error': 'Please enter a valid query.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            retriever = load_embeddings(load_documents(), user_query)
            response = generate_response(user_query, retriever)
            return Response({'response': response}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)