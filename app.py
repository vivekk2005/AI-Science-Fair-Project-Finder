from flask import Flask, request, jsonify, render_template, send_from_directory
import os
import google.generativeai as genai
import json
import requests
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder="./")

# Configure Gemini API
try:
    genai.configure(api_key=os.environ.get("GEMINI_API_KEY", "your-api-key-here"))
    # Use Gemini 1.5 Pro model instead
    model = genai.GenerativeModel('gemini-1.5-pro')
    # As a fallback, try Gemini 1.0 Pro if available
    # model = genai.GenerativeModel('gemini-1.0-pro')  # Uncomment if needed
except Exception as e:
    print(f"Error configuring Gemini API: {e}")

@app.route('/')
def index():
    return send_from_directory('./', 'index.html')

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/images/<path:path>')
def send_image(path):
    return send_from_directory('images', path)

@app.route('/api/search', methods=['POST'])
def search_projects():
    data = request.json
    query = data.get('query', '')
    grade = data.get('grade', 'all')
    category = data.get('category', 'all')
    
    if not query:
        return jsonify({"error": "Please provide a search query"}), 400
    
    try:
        # Check if API key is set
        api_key = os.environ.get("GEMINI_API_KEY", "your-api-key-here")
        if api_key == "your-api-key-here":
            print("Warning: Using default API key. Please set GEMINI_API_KEY in .env file")
            return jsonify({
                "projects": get_fallback_projects(query, grade, category)
            })
        
        # Create a prompt for Gemini API
        grade_text = "" if grade == "all" else f"for {grade} level students "
        category_text = "" if category == "all" else f"in the category of {category} "
        
        prompt = f"""
        I need information about AI science fair projects {grade_text}{category_text}related to "{query}".
        
        Please provide the following information in JSON format:
        1. A list of EXACTLY 3 project ideas with the following details for each:
           - title: The name of the project
           - description: A short description (2-3 sentences)
           - difficulty: Beginner, Intermediate, or Advanced
           - gradeLevel: Elementary, Middle School, or High School
           - category: The AI category (e.g., Machine Learning, Computer Vision, NLP, Robotics, Data Science)
           - materials: A list of required materials/tools
           - steps: A detailed list of 8 comprehensive, professional steps to complete the project. Each step should:
              * Be numbered (e.g., "1. Research Phase: ...")
              * Have a descriptive title followed by a colon
              * Include in-depth details about techniques, tools, and methodologies
              * Be written in a professional, technical tone with field-specific terminology
              * Provide specific guidance that demonstrates expertise in the field
              * IMPORTANT: Each step must be a plain text string, not an object
           - resources: A list of helpful online resources (URLs and descriptions)
           - estimatedTime: Estimated time to complete (e.g., "2-3 weeks")
        
        Format the response as a valid JSON object with a key called "projects" containing the array of EXACTLY 3 projects.
        """
        
        try:
            # Get response from Gemini
            response = model.generate_content(prompt)
            
            # Extract JSON from the response
            response_text = response.text
            # Find JSON content (may be wrapped in markdown code blocks)
            if "```json" in response_text:
                json_content = response_text.split("```json")[1].split("```")[0].strip()
            elif "```" in response_text:
                json_content = response_text.split("```")[1].split("```")[0].strip()
            else:
                json_content = response_text
                
            try:
                # Parse JSON
                result = json.loads(json_content)
                return jsonify(result)
            except json.JSONDecodeError:
                # Fallback if JSON parsing fails
                return jsonify({
                    "projects": get_fallback_projects(query, grade, category)
                })
        except Exception as e:
            print(f"Error with Gemini API: {e}")
            return jsonify({
                "projects": get_fallback_projects(query, grade, category)
            })
    
    except Exception as e:
        print(f"General Error: {e}")
        return jsonify({
            "projects": get_fallback_projects(query, grade, category)
        })

def get_fallback_projects(query, grade, category):
    """Provide fallback project suggestions when API is not available"""
    grade_level = grade if grade != "all" else "All levels"
    project_category = category if category != "all" else "AI"
    
    # Convert from slug to display format
    if "-" in project_category:
        project_category = " ".join(word.capitalize() for word in project_category.split("-"))
    
    # Basic fallback projects based on common categories
    main_project = {
        "title": f"{project_category} Project with {query}",
        "description": f"Create an AI project that uses {query} to solve real-world problems. This project helps students understand the basics of artificial intelligence and its applications.",
        "difficulty": "Intermediate",
        "gradeLevel": grade_level,
        "category": project_category,
        "materials": ["Computer", "Python", "Internet access", "Basic programming knowledge"],
        "steps": [
            "1. Background Research: Conduct comprehensive research on AI fundamentals, focusing specifically on how they relate to your topic. Study relevant academic papers, industry applications, and existing implementations to build a solid theoretical foundation.",
            "2. Development Environment Setup: Install and configure all necessary software tools and libraries. Set up a Python environment with appropriate packages like NumPy, Pandas, Scikit-learn, or TensorFlow depending on your project requirements.",
            "3. Data Acquisition & Analysis: Collect or create a comprehensive dataset for your project. Perform exploratory data analysis to understand its characteristics, including distributions, patterns, and potential issues that need addressing.",
            "4. Model Architecture Design: Develop a well-structured AI model or algorithm tailored to your specific problem. Consider different architectural approaches and select the most appropriate for your data type and learning objectives.",
            "5. Implementation & Training: Translate your design into functional code, implementing data preprocessing, model construction, and training procedures. Incorporate best practices for efficient computation and effective learning.",
            "6. Evaluation Framework: Create a robust testing framework with appropriate metrics to assess your model's performance. Compare results against baseline approaches and analyze strengths and limitations.",
            "7. Optimization & Refinement: Systematically improve your implementation through hyperparameter tuning, feature engineering, or architectural modifications. Document the impact of each change on performance metrics.",
            "8. Documentation & Presentation: Thoroughly document your methodology, implementation details, and findings. Create a compelling presentation with visualizations, performance metrics, and clear explanations of your approach and results."
        ],
        "resources": [
            {"url": "https://www.sciencebuddies.org/", "description": "Science project ideas"},
            {"url": "https://www.kaggle.com/", "description": "Datasets and tutorials"},
            {"url": "https://www.tensorflow.org/tutorials", "description": "TensorFlow tutorials"}
        ],
        "estimatedTime": "2-3 weeks"
    }
    
    # Create exactly 3 projects
    fallback_projects = [main_project]
    
    # Add variations to ensure we have exactly 3 projects
    topics = ["image recognition", "voice assistant", "recommendation system", "prediction model", "natural language processing"]
    for topic in topics[:2]:  # Take exactly 2 more topics
        project = {
            "title": f"{topic.title()} using {query}",
            "description": f"Build a {topic} application that incorporates {query} technology. This project demonstrates how AI can enhance user experiences and solve practical problems.",
            "difficulty": "Intermediate",
            "gradeLevel": grade_level,
            "category": project_category,
            "materials": ["Computer", "Python", "Internet access", "Basic programming knowledge"],
            "steps": [
                f"1. Domain Research: Investigate existing solutions in the field, understanding core technologies, methodologies, and limitations. Analyze how your specific approach using {query} technology can address current challenges or enhance capabilities.",
                "2. Technical Requirements Analysis: Identify and document all software dependencies, hardware requirements, and development tools needed for your project. Create a structured development plan with clear milestones and deliverables.",
                "3. Architecture & Design Planning: Define the scope and technical requirements of your project. Create detailed system architecture diagrams showing components, data flow, and integration points between modules.",
                f"4. Core Implementation: Develop a functional prototype following software engineering best practices. Implement modular code structure with appropriate separation of concerns and comprehensive error handling for your {topic} system.",
                "5. Testing Methodology: Create a comprehensive testing strategy including unit tests, integration tests, and user acceptance criteria. Implement automated testing procedures where applicable to ensure functionality.",
                "6. Performance Optimization: Analyze system bottlenecks and performance issues. Apply optimization techniques such as caching, parallel processing, or algorithm refinement to improve efficiency and responsiveness.",
                "7. User Experience Enhancement: Refine the interface and interactions based on user feedback and usability principles. Ensure intuitive operation and appropriate feedback mechanisms for different user actions.",
                f"8. Technical Documentation: Create detailed documentation including system architecture, API references, installation instructions, and troubleshooting guides. Prepare a technical presentation highlighting innovative aspects of your {topic} solution using {query} technology."
            ],
            "resources": [
                {"url": "https://www.sciencebuddies.org/", "description": "Science project ideas"},
                {"url": "https://www.kaggle.com/", "description": "Datasets and tutorials"},
                {"url": "https://github.com/", "description": "Open source code examples"}
            ],
            "estimatedTime": "3-4 weeks"
        }
        fallback_projects.append(project)
    
    # Ensure we have exactly 3 projects
    assert len(fallback_projects) == 3, "Fallback projects should have exactly 3 items"
    
    return fallback_projects

if __name__ == '__main__':
    # Get port from environment variable or default to 5000
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 