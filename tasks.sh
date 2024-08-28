#!/bin/bash

# Define the project name (replace with your project's name or ID)
PROJECT_NAME='1'
OWNER='BennyGitau'
# Define the tasks as an array
tasks=(
  "User Registration and Login: Implement user authentication with JWT tokens."
  "Personalized Profile: Allow users to update their travel preferences, including budgets and desired destinations."
  "Flight Search and Booking: Integrate with flight APIs (like Skyscanner) to provide real-time flight search results and allow users to book flights directly."
  "Destination Recommendations: Offer personalized destination recommendations based on user preferences and interests."
  "Travel Itinerary Planning: Assist users in creating customized travel itineraries, including flights, accommodations, activities, and transportation."
  "Chatbot Interface: Implement a basic chatbot interface for answering frequently asked questions and providing initial assistance."
  "User-Friendly Interface: Design and implement an intuitive navigation system with a visually appealing design."
  "Easy Registration and Login: Streamline the signup process for new users and provide a secure login experience."
  "Saved Searches and Itineraries: Allow users to save their favorite searches and itineraries for future reference."
  "Secure Payments: Integrate with secure payment gateways for online transactions."
  "Customer Reviews and Ratings: Enable users to read and write reviews of travel experiences."
  "Mobile Optimization: Ensure the app is fully optimized for mobile devices with a responsive design."
  "Push Notifications: Implement push notifications to send real-time updates and notifications to users."
  "Offline Functionality: Allow users to access certain features, such as saved itineraries, even without an internet connection."
  "GPS Integration: Utilize GPS to provide location-based recommendations and services."
  "Social Media Integration: Enable users to share their travel experiences on social media platforms."
  "Natural Language Processing: Integrate NLP to enable users to interact with the chatbot using natural language."
  "Machine Learning: Implement machine learning algorithms to improve recommendations and predictions over time."
  "Predictive Analytics: Analyze user data to predict future travel preferences and offer personalized recommendations."
)


for task in "${tasks[@]}"; do
  IFS=":" read -r title description <<< "${task}"
  
  # Create an issue and capture the output
  issue_output=$(gh issue create --title "$title" --body "$description")

  # Extract the issue URL from the output using grep and awk
  issue_url=$(echo "$issue_output" | grep -oP 'https://github\.com/[^/]+/[^/]+/issues/[0-9]+')

  if [ -z "$issue_url" ]; then
    echo "Failed to create issue or extract URL for task: $title"
    continue
  fi
  
  # Add the issue to the project
  gh project item-add "$PROJECT_NAME" --url "$issue_url" --owner "$OWNER"
done


