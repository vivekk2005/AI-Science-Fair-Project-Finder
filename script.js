/*
 * AI Science Fair Project Finder
 * 2015-style JavaScript with modern API integration and dark mode
 */

$(document).ready(function() {
    // Initialize saved projects from localStorage
    var savedProjects = JSON.parse(localStorage.getItem('savedProjects')) || [];
    updateSavedCount();

    // Static project data for the demo projects
    var staticProjects = {
        "1": {
            "title": "Image Recognition System",
            "description": "Build a machine learning model that can identify objects in images using TensorFlow.",
            "difficulty": "Advanced",
            "gradeLevel": "High School",
            "category": "Computer Vision",
            "materials": [
                "Computer with internet access",
                "Python installed",
                "TensorFlow and related libraries",
                "Digital camera or smartphone",
                "Image dataset (can be downloaded)"
            ],
            "steps": [
                "1. Research Phase: Thoroughly investigate image recognition concepts and convolutional neural networks (CNNs). Study research papers on state-of-the-art architectures like ResNet, Inception, and EfficientNet to understand their design principles.",
                "2. Environment Setup: Install Python 3.x, along with TensorFlow, Keras, NumPy, Matplotlib, and OpenCV. Configure a virtual environment to ensure package compatibility and reproducibility.",
                "3. Dataset Acquisition: Source a properly labeled dataset such as CIFAR-10, ImageNet, or create your own custom dataset. Ensure sufficient examples per class (100+ images) for robust model training.",
                "4. Data Preprocessing: Implement a data processing pipeline to normalize, resize, and augment images. Apply techniques like random cropping, rotation, and color shifting to improve model generalization.",
                "5. Model Architecture: Design or adapt a CNN architecture suitable for your specific recognition task. Define the layer structure, activation functions, and hyperparameters.",
                "6. Training Implementation: Create a training script with appropriate batch size, learning rate, and optimizer settings. Implement checkpointing to save model states and early stopping to prevent overfitting.",
                "7. Validation & Testing: Evaluate model performance using precision, recall, F1-score, and confusion matrices. Test with completely new images to assess real-world applicability.",
                "8. Documentation & Presentation: Create comprehensive documentation including methodology, challenges, results, and potential improvements. Prepare a visual presentation with performance metrics and sample predictions."
            ],
            "resources": [
                {"url": "https://www.tensorflow.org/tutorials/images/classification", "description": "TensorFlow Image Classification Tutorial"},
                {"url": "https://www.kaggle.com/datasets", "description": "Kaggle Datasets for images"},
                {"url": "https://www.youtube.com/watch?v=QfNvhPx5Px8", "description": "Machine Learning for Image Classification"}
            ],
            "estimatedTime": "4-6 weeks"
        },
        "2": {
            "title": "Sentiment Analysis Tool",
            "description": "Create a program that can determine whether text is positive, negative, or neutral.",
            "difficulty": "Intermediate",
            "gradeLevel": "Middle School",
            "category": "NLP",
            "materials": [
                "Computer with internet access",
                "Python installed",
                "NLTK or TextBlob libraries",
                "Text dataset (can be downloaded)"
            ],
            "steps": [
                "1. NLP Fundamentals Research: Study the principles of natural language processing and sentiment analysis. Understand key concepts like tokenization, stemming, lemmatization, and sentiment lexicons.",
                "2. Development Environment Setup: Install Python 3.x and essential NLP libraries such as NLTK, TextBlob, or spaCy. Set up a project structure with separate modules for data processing, analysis, and visualization.",
                "3. Dataset Collection & Exploration: Acquire a sentiment-labeled dataset such as Amazon reviews, Twitter sentiment corpus, or movie reviews. Perform exploratory data analysis to understand class distribution and text characteristics.",
                "4. Text Preprocessing: Implement a robust preprocessing pipeline to clean text data. This should include removing special characters, converting to lowercase, eliminating stop words, and implementing either stemming or lemmatization.",
                "5. Feature Engineering: Extract meaningful features from the text using techniques like bag-of-words, TF-IDF, n-grams, or word embeddings. Explore how different features impact model performance.",
                "6. Model Development: Build a classifier using approaches ranging from rule-based methods to machine learning algorithms (Naive Bayes, SVM, or neural networks). Compare multiple approaches to find the optimal solution.",
                "7. Evaluation & Refinement: Assess model performance with cross-validation using precision, recall, and F1-score metrics. Identify and address misclassifications through error analysis and model tuning.",
                "8. User Interface Development: Create a simple web or desktop interface where users can input text and receive sentiment analysis results. Include visualization of confidence scores and key sentiment terms."
            ],
            "resources": [
                {"url": "https://www.nltk.org/howto/sentiment.html", "description": "NLTK Sentiment Analysis Tutorial"},
                {"url": "https://textblob.readthedocs.io/en/dev/", "description": "TextBlob Library Documentation"},
                {"url": "https://www.kaggle.com/datasets/crowdflower/twitter-airline-sentiment", "description": "Twitter Sentiment Dataset"}
            ],
            "estimatedTime": "2-3 weeks"
        },
        "3": {
            "title": "Smart Plant Monitor",
            "description": "Build a simple device that monitors soil moisture and automatically waters plants.",
            "difficulty": "Beginner",
            "gradeLevel": "Elementary",
            "category": "Robotics",
            "materials": [
                "Arduino or Raspberry Pi",
                "Soil moisture sensor",
                "Small water pump",
                "Tubing",
                "Jumper wires",
                "Breadboard",
                "9V battery or power supply"
            ],
            "steps": [
                "1. Background Research: Conduct thorough research on plant physiology, optimal soil moisture levels for different plant species, and existing automated watering systems. Document ideal moisture thresholds for your target plants.",
                "2. Component Selection & Circuit Design: Carefully select appropriate components including a microcontroller (Arduino/Raspberry Pi), quality soil moisture sensors, reliable water pump, and proper power supply. Create a detailed circuit diagram.",
                "3. Hardware Assembly: Systematically assemble the circuit on a breadboard following your diagram. Ensure proper connections and adequate power distribution. Implement safety measures to prevent water-electronic contact.",
                "4. Sensor Calibration: Calibrate the soil moisture sensor by taking readings in dry soil, water, and various moisture levels. Create a mapping between sensor readings and meaningful moisture percentages.",
                "5. Software Development: Write modular code that reads sensor data, applies filtering algorithms to reduce noise, makes watering decisions based on configurable thresholds, and implements safety timeouts to prevent overwatering.",
                "6. Power Management: Implement power-saving features like sleep modes and optimized sensor reading intervals to extend battery life if using portable power sources.",
                "7. Enclosure & Integration: Design and build a weather-resistant enclosure to protect electronic components. Integrate the pump system with proper tubing and water reservoir with appropriate capacity.",
                "8. Testing & Refinement: Conduct extensive testing with actual plants, monitoring soil moisture changes over time. Create a data logging system to track readings and watering events. Fine-tune thresholds and timing based on observed plant health."
            ],
            "resources": [
                {"url": "https://www.arduino.cc/en/Tutorial/BuiltInExamples", "description": "Arduino Tutorials"},
                {"url": "https://learn.adafruit.com/adafruit-arduino-lesson-10-making-sounds", "description": "Adafruit Arduino Tutorials"},
                {"url": "https://create.arduino.cc/projecthub/team-arduinotronics/arduino-automatic-plant-watering-system-bfc8c1", "description": "Example Plant Watering Project"}
            ],
            "estimatedTime": "1-2 weeks"
        }
    };
    
    // Populate "All Projects" modal with additional projects
    var allProjects = {
        ...staticProjects,
        "4": {
            "title": "Voice Activated Assistant",
            "description": "Create a simple voice assistant that can respond to basic commands.",
            "difficulty": "Intermediate",
            "gradeLevel": "High School",
            "category": "NLP",
            "materials": ["Computer", "Microphone", "Python", "Speech recognition library"],
            "steps": [
                "1. Speech Recognition Research: Conduct comprehensive research on speech recognition technologies, APIs, and techniques. Understand the fundamentals of audio processing, feature extraction, and language modeling.",
                "2. Development Environment Setup: Install Python 3.x along with speech_recognition, PyAudio, pyttsx3, and other required libraries. Configure proper audio input/output devices and establish a project structure.",
                "3. Audio Capture System: Develop a robust audio capture module that efficiently records user voice commands with appropriate sampling rates and audio quality. Implement noise reduction techniques.",
                "4. Speech-to-Text Implementation: Integrate speech recognition services (like Google Speech Recognition, CMU Sphinx, or Mozilla DeepSpeech) with error handling and fallback mechanisms for reliable transcription.",
                "5. Command Parser Development: Create an intelligent command parsing system that can identify intents from natural language input. Implement keyword extraction, context understanding, and entity recognition.",
                "6. Response Generation: Build a modular response system that can handle various command categories (information queries, system controls, calculations, etc.) with appropriate feedback mechanisms.",
                "7. Text-to-Speech Integration: Implement natural-sounding voice responses using text-to-speech engines. Allow for voice customization and expression parameters for more natural interaction.",
                "8. Continuous Improvement System: Create a feedback loop where unrecognized commands are logged for future improvements. Implement a learning mechanism to adapt to the user's voice and command patterns over time."
            ],
            "resources": [
                {"url": "https://pypi.org/project/SpeechRecognition/", "description": "Speech Recognition Library"}
            ],
            "estimatedTime": "3-4 weeks"
        },
        "5": {
            "title": "Handwritten Digit Recognizer",
            "description": "Build a neural network that can recognize handwritten digits.",
            "difficulty": "Intermediate",
            "gradeLevel": "High School",
            "category": "Machine Learning",
            "materials": ["Computer", "Python", "TensorFlow or PyTorch", "MNIST dataset"],
            "steps": [
                "1. Neural Networks Fundamentals: Study the mathematical foundations of neural networks, focusing on the specific architectures used for digit recognition. Understand the MNIST dataset structure and benchmark performance.",
                "2. Development Environment Configuration: Set up a Python environment with TensorFlow/PyTorch, NumPy, Matplotlib, and Jupyter for interactive development. Configure GPU acceleration if available.",
                "3. Data Acquisition & Exploration: Download and explore the MNIST dataset, examining the distribution of digits, pixel intensities, and variations in handwriting styles. Create visualizations of sample digits.",
                "4. Data Preprocessing Pipeline: Implement preprocessing functions for normalization, reshaping, and augmentation. Set up proper train/validation/test splits with stratified sampling.",
                "5. Model Architecture Design: Design a neural network architecture appropriate for the task, such as a multilayer perceptron or convolutional neural network. Define layers, activation functions, and regularization techniques.",
                "6. Training Framework: Develop a comprehensive training system with learning rate scheduling, gradient clipping, and proper loss functions. Monitor and visualize training dynamics to ensure proper convergence.",
                "7. Evaluation & Optimization: Create a thorough evaluation protocol using confusion matrices, precision/recall metrics, and misclassification analysis. Optimize model hyperparameters systematically.",
                "8. Interactive Interface Development: Build a user-friendly interface where users can draw digits and see real-time predictions. Display confidence scores for each digit class and visualization of network activations."
            ],
            "resources": [
                {"url": "https://www.tensorflow.org/tutorials/quickstart/beginner", "description": "TensorFlow Beginner Tutorial"}
            ],
            "estimatedTime": "2-3 weeks"
        },
        "6": {
            "title": "Weather Prediction Model",
            "description": "Create a machine learning model to predict local weather patterns.",
            "difficulty": "Advanced",
            "gradeLevel": "High School",
            "category": "Data Science",
            "materials": ["Computer", "Python", "Weather dataset", "Scikit-learn"],
            "steps": [
                "1. Meteorological Research: Conduct thorough research on weather patterns, meteorological principles, and the factors affecting local climate. Understand the relationship between various weather parameters.",
                "2. Data Collection Strategy: Identify reliable sources of historical weather data such as NOAA, Weather Underground, or local weather stations. Develop a systematic data collection pipeline with appropriate API integrations.",
                "3. Data Cleaning & Preprocessing: Implement robust preprocessing techniques to handle missing values, outliers, and inconsistencies in weather data. Create derived features like moving averages and seasonal indicators.",
                "4. Exploratory Data Analysis: Perform comprehensive analysis of weather patterns, identifying correlations, seasonal trends, and anomalies. Create visualizations to understand the relationships between different weather parameters.",
                "5. Feature Selection & Engineering: Identify the most predictive features for your target weather parameters. Engineer advanced features incorporating temporal patterns, cyclical features, and domain-specific knowledge.",
                "6. Model Development: Implement and compare multiple forecasting approaches including statistical methods (ARIMA, exponential smoothing), machine learning models (Random Forests, Gradient Boosting), and deep learning approaches (RNNs/LSTMs).",
                "7. Evaluation Framework: Design a rigorous evaluation system using appropriate metrics (RMSE, MAE, etc.) and cross-validation techniques specific to time-series data. Implement backtesting over multiple time periods.",
                "8. Deployment & Visualization: Create an interactive dashboard to visualize predictions alongside historical data, uncertainty estimates, and model performance metrics. Implement automated retraining as new data becomes available."
            ],
            "resources": [
                {"url": "https://www.ncdc.noaa.gov/cdo-web/", "description": "NOAA Climate Data"}
            ],
            "estimatedTime": "3-5 weeks"
        }
    };
    
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(e) {
        // Skip for theme toggle
        if ($(this).attr('id') === 'theme-toggle') return;
        
        e.preventDefault();
        
        var target = this.hash;
        
        // Skip if it's just "#"
        if (target === '#') return;
        
        var $target = $(target);
        
        // Show the target section if it's hidden
        if (target === '#saved-projects') {
            showSavedProjects();
        }
        
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 70
        }, 900, 'swing', function() {
            window.location.hash = target;
        });
    });
    
    // Toggle active class in navbar
    $(window).on('scroll', function() {
        var scrollDistance = $(window).scrollTop();
        
        // Assign active class to nav links based on scroll position
        $('section:visible').each(function(i) {
            if ($(this).position().top <= scrollDistance + 100) {
                $('.navbar-nav a.active').removeClass('active');
                $('.navbar-nav a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
    }).scroll();
    
    // Add fixed navbar class on scroll
    $(window).scroll(function() {
        if ($(document).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scroll');
        } else {
            $('.navbar').removeClass('navbar-scroll');
        }
    });
    
    // Initialize tooltips
    $('[data-toggle="tooltip"]').tooltip();
    
    // Search form submission
    $('#search-form').submit(function(e) {
        e.preventDefault();
        
        var searchQuery = $('#search-input').val().trim();
        var gradeLevel = $('#grade').val();
        var category = $('#category').val();
        
        if (searchQuery.length === 0) {
            alert('Please enter a search term');
            return;
        }
        
        // Show loading indicator
        $('#loading-indicator').show();
        // Hide results section if it was previously shown
        $('#search-results').hide();
        // Hide saved projects section if it was visible
        $('#saved-projects').hide();
        
        // Scroll to loading indicator
        $('html, body').animate({
            scrollTop: $('#loading-indicator').offset().top - 100
        }, 500);
        
        // Call the backend API
        $.ajax({
            url: '/api/search',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                query: searchQuery,
                grade: gradeLevel,
                category: category
            }),
            success: function(response) {
                // Hide loading indicator
                $('#loading-indicator').hide();
                
                // Clear previous results
                $('#results-container').empty();
                
                // Store search results globally for reference
                window.lastSearchResults = response;
                
                // Check if we have projects
                if (response.projects && response.projects.length > 0) {
                    // Display each project
                    $.each(response.projects, function(i, project) {
                        var projectHtml = createProjectCard(project, i);
                        $('#results-container').append(projectHtml);
                    });
                    
                    // Show results section
                    $('#search-results').show();
                    
                    // Scroll to results
                    $('html, body').animate({
                        scrollTop: $('#search-results').offset().top - 100
                    }, 500);
                    
                    // Initialize view project buttons
                    $('.view-project-btn').click(function() {
                        var projectIndex = $(this).data('project-index');
                        showProjectDetails(response.projects[projectIndex]);
                    });
                    
                    // Initialize save project buttons
                    $('.save-project-btn').click(function() {
                        var projectIndex = $(this).data('project-index');
                        saveProject(response.projects[projectIndex]);
                    });
                } else {
                    // Show no results message
                    $('#results-container').html('<div class="col-md-12 text-center"><h3>No projects found. Please try a different search term.</h3></div>');
                    $('#search-results').show();
                }
            },
            error: function(xhr, status, error) {
                // Hide loading indicator
                $('#loading-indicator').hide();
                
                console.error('Error:', error);
                alert('An error occurred while searching for projects. Please try again later.');
            }
        });
    });
    
    // Theme toggle
    $('#theme-toggle').click(function(e) {
        e.preventDefault();
        
        var lightTheme = $('#theme-light');
        var darkTheme = $('#theme-dark');
        var icon = $(this).find('i');
        
        if (darkTheme.prop('disabled')) {
            // Switch to dark mode
            lightTheme.prop('disabled', true);
            darkTheme.prop('disabled', false);
            icon.removeClass('fa-moon-o').addClass('fa-sun-o');
            $(this).html('Light Mode <i class="fa fa-sun-o"></i>');
            localStorage.setItem('theme', 'dark');
        } else {
            // Switch to light mode
            lightTheme.prop('disabled', false);
            darkTheme.prop('disabled', true);
            icon.removeClass('fa-sun-o').addClass('fa-moon-o');
            $(this).html('Dark Mode <i class="fa fa-moon-o"></i>');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Load saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        $('#theme-light').prop('disabled', true);
        $('#theme-dark').prop('disabled', false);
        $('#theme-toggle').html('Light Mode <i class="fa fa-sun-o"></i>');
    }
    
    // View All Projects button
    $('#view-all-projects').click(function(e) {
        e.preventDefault();
        
        // Clear previous results
        $('#all-projects-container').empty();
        
        // Populate with all projects
        $.each(allProjects, function(id, project) {
            var projectHtml = `
                <div class="col-md-4 project-item" 
                     data-grade="${project.gradeLevel.toLowerCase()}" 
                     data-category="${project.category.toLowerCase().replace(/ /g, '-')}">
                    <div class="thumbnail">
                        <img src="images/image.png" alt="${project.title}" onerror="this.src='https://placehold.it/800x500?text=${encodeURIComponent(project.title)}'">
                        <div class="caption">
                            <h3>${project.title}</h3>
                            <p class="text-muted">
                                <span class="label label-primary">${project.gradeLevel}</span> 
                                <span class="label label-info">${project.category}</span>
                                <span class="label ${getDifficultyClass(project.difficulty)}">${project.difficulty}</span>
                            </p>
                            <p>${project.description}</p>
                            <p>
                                <button class="btn btn-primary view-all-project" data-project-id="${id}">View Project</button>
                                <button class="btn btn-default save-all-project" data-project-id="${id}">Save <i class="fa fa-bookmark-o"></i></button>
                            </p>
                        </div>
                    </div>
                </div>
            `;
            $('#all-projects-container').append(projectHtml);
        });
        
        // Initialize filters
        $('#all-projects-grade, #all-projects-category, #all-projects-search').on('change keyup', function() {
            filterAllProjects();
        });
        
        // Initialize buttons
        $('.view-all-project').click(function() {
            var projectId = $(this).data('project-id');
            showProjectDetails(allProjects[projectId]);
        });
        
        $('.save-all-project').click(function() {
            var projectId = $(this).data('project-id');
            saveProject(allProjects[projectId]);
        });
        
        // Show the modal
        $('#all-projects-modal').modal('show');
    });
    
    // Filter function for all projects modal
    function filterAllProjects() {
        var grade = $('#all-projects-grade').val();
        var category = $('#all-projects-category').val();
        var search = $('#all-projects-search').val().toLowerCase();
        
        $('.project-item').each(function() {
            var $item = $(this);
            var itemGrade = $item.data('grade');
            var itemCategory = $item.data('category');
            var itemText = $item.text().toLowerCase();
            
            var gradeMatch = grade === 'all' || itemGrade.includes(grade);
            var categoryMatch = category === 'all' || itemCategory === category;
            var searchMatch = search === '' || itemText.includes(search);
            
            if (gradeMatch && categoryMatch && searchMatch) {
                $item.show();
            } else {
                $item.hide();
            }
        });
    }
    
    // View static project details
    $('.view-static-project').click(function() {
        var projectId = $(this).data('project-id');
        showProjectDetails(staticProjects[projectId]);
    });
    
    // Save static project
    $('.save-project').click(function() {
        var projectId = $(this).data('project-id');
        saveProject(staticProjects[projectId]);
    });
    
    // Save project from modal
    $('#modal-save-project').click(function() {
        var projectTitle = $('#modal-title').text();
        var project = null;
        
        // Find the project by title
        $.each(allProjects, function(id, p) {
            if (p.title === projectTitle) {
                project = p;
                return false; // Break the loop
            }
        });
        
        if (project) {
            saveProject(project);
        }
    });
    
    // Newsletter form submission
    $('#newsletter-form').submit(function(e) {
        e.preventDefault();
        
        var emailInput = $(this).find('input[type="email"]');
        
        if (validateEmail(emailInput.val())) {
            // Display success message
            $('#success-message').text('Thank you for subscribing to our newsletter!');
            $('#success-modal').modal('show');
            $(this)[0].reset();
        } else {
            alert('Please enter a valid email address');
        }
    });
    
    // Helper function to get difficulty class
    function getDifficultyClass(difficulty) {
        switch(difficulty.toLowerCase()) {
            case 'beginner':
                return 'label-success';
            case 'intermediate':
                return 'label-warning';
            case 'advanced':
                return 'label-danger';
            default:
                return 'label-default';
        }
    }
    
    // Function to create a project card HTML
    function createProjectCard(project, index) {
        var difficultyClass = getDifficultyClass(project.difficulty);
        var gradeLevelClass = 'label-primary';
        var categoryClass = 'label-info';
        
        // Check if the project is already saved
        var isSaved = savedProjects.some(function(p) {
            return p.title === project.title;
        });
        
        var saveButtonIcon = isSaved ? 
            '<i class="fa fa-bookmark"></i>' : 
            '<i class="fa fa-bookmark-o"></i>';
        
        var saveButtonText = isSaved ? 'Saved' : 'Save';
        
        return `
            <div class="col-md-4">
                <div class="thumbnail">
                    <img src="images/image.png" alt="${project.title}" onerror="this.src='https://placehold.it/800x500?text=${encodeURIComponent(project.title)}'">
                    <div class="caption">
                        <h3>${project.title}</h3>
                        <p class="text-muted">
                            <span class="label ${gradeLevelClass}">${project.gradeLevel}</span> 
                            <span class="label ${categoryClass}">${project.category}</span>
                            <span class="label ${difficultyClass}">${project.difficulty}</span>
                        </p>
                        <p>${project.description}</p>
                        <p>
                            <button class="btn btn-primary view-project-btn" data-project-index="${index}">View Project</button>
                            <button class="btn btn-default save-project-btn" data-project-index="${index}">${saveButtonText} ${saveButtonIcon}</button>
                        </p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Function to show project details in modal
    function showProjectDetails(project) {
        $('#modal-title').text(project.title);
        
        var materialsHtml = '<ul class="list-group">';
        $.each(project.materials, function(i, material) {
            materialsHtml += '<li class="list-group-item">' + material + '</li>';
        });
        materialsHtml += '</ul>';
        
        var stepsHtml = '<ol class="list-group">';
        $.each(project.steps, function(i, step) {
            // Handle step as either string or object
            var stepContent = step;
            if (typeof step === 'object' && step !== null) {
                // Try to extract meaningful content from the object
                if (step.description) {
                    stepContent = step.description;
                } else if (step.text) {
                    stepContent = step.text;
                } else if (step.content) {
                    stepContent = step.content;
                } else {
                    // Convert object to string representation
                    stepContent = JSON.stringify(step);
                }
            }
            stepsHtml += '<li class="list-group-item">' + stepContent + '</li>';
        });
        stepsHtml += '</ol>';
        
        var resourcesHtml = '<div class="list-group">';
        $.each(project.resources, function(i, resource) {
            if (typeof resource === 'string') {
                resourcesHtml += '<a href="' + resource + '" target="_blank" class="list-group-item">' + resource + '</a>';
            } else if (resource.url && resource.description) {
                resourcesHtml += '<a href="' + resource.url + '" target="_blank" class="list-group-item">' + resource.description + '</a>';
            }
        });
        resourcesHtml += '</div>';
        
        var modalHtml = `
            <div class="row">
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Project Information</h3>
                        </div>
                        <div class="panel-body">
                            <p><strong>Difficulty:</strong> ${project.difficulty}</p>
                            <p><strong>Grade Level:</strong> ${project.gradeLevel}</p>
                            <p><strong>Category:</strong> ${project.category}</p>
                            <p><strong>Estimated Time:</strong> ${project.estimatedTime}</p>
                            <p><strong>Description:</strong> ${project.description}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Materials Needed</h3>
                        </div>
                        <div class="panel-body">
                            ${materialsHtml}
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Project Steps</h3>
                </div>
                <div class="panel-body">
                    ${stepsHtml}
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Helpful Resources</h3>
                </div>
                <div class="panel-body">
                    ${resourcesHtml}
                </div>
            </div>
        `;
        
        $('#modal-body').html(modalHtml);
        
        // Check if project is already saved
        var isSaved = savedProjects.some(function(p) {
            return p.title === project.title;
        });
        
        if (isSaved) {
            $('#modal-save-project').text('Saved').attr('disabled', true);
        } else {
            $('#modal-save-project').text('Save Project').attr('disabled', false);
        }
        
        $('#project-modal').modal('show');
    }
    
    // Function to save a project
    function saveProject(project) {
        // Check if project is already saved
        var isSaved = savedProjects.some(function(p) {
            return p.title === project.title;
        });
        
        if (!isSaved) {
            // Add progress field to project
            project.progress = 0;
            project.completedSteps = [];
            project.notes = "";  // Initialize empty notes
            
            // Add to saved projects
            savedProjects.push(project);
            
            // Save to localStorage
            localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
            
            // Update UI
            updateSavedCount();
            
            // Show success message
            $('#success-message').text('Project saved successfully!');
            $('#success-modal').modal('show');
            
            // Update all save buttons for this project
            updateSaveButtons(project.title, true);
        } else {
            alert('This project is already saved!');
        }
    }
    
    // Function to show saved projects
    function showSavedProjects() {
        // Hide other sections
        $('#search-results').hide();
        
        // Clear container
        $('#saved-projects-container').empty();
        
        if (savedProjects.length > 0) {
            // Display each saved project
            $.each(savedProjects, function(i, project) {
                var difficultyClass = getDifficultyClass(project.difficulty);
                var progress = project.progress || 0;
                var progressBarClass = progress < 33 ? "progress-bar-danger" : 
                                      progress < 67 ? "progress-bar-warning" : 
                                      "progress-bar-success";
                
                var projectHtml = `
                    <div class="col-md-4 saved-project" data-project-id="${i}">
                        <div class="thumbnail">
                            <img src="images/image.png" alt="${project.title}" onerror="this.src='https://placehold.it/800x500?text=${encodeURIComponent(project.title)}'">
                            <div class="caption">
                                <h3>${project.title}</h3>
                                <p class="text-muted">
                                    <span class="label label-primary">${project.gradeLevel}</span>
                                    <span class="label label-info">${project.category}</span>
                                    <span class="label ${difficultyClass}">${project.difficulty}</span>
                                </p>
                                <p>${project.description}</p>
                                <div class="progress">
                                    <div class="progress-bar ${progressBarClass}" role="progressbar" 
                                         aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" 
                                         style="width: ${progress}%;">
                                        ${progress}% Complete
                                    </div>
                                </div>
                                <p>
                                    <button class="btn btn-primary view-saved-project" data-project-id="${i}">View Project</button>
                                    <button class="btn btn-danger remove-saved-project" data-project-id="${i}">Remove <i class="fa fa-trash"></i></button>
                                </p>
                            </div>
                        </div>
                    </div>
                `;
                $('#saved-projects-container').append(projectHtml);
            });
            
            // Initialize buttons
            $('.view-saved-project').click(function() {
                var projectId = $(this).data('project-id');
                showSavedProjectDetails(savedProjects[projectId], projectId);
            });
            
            $('.remove-saved-project').click(function() {
                var projectId = $(this).data('project-id');
                var projectTitle = savedProjects[projectId].title;
                
                // Remove from array
                savedProjects.splice(projectId, 1);
                
                // Save to localStorage
                localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
                
                // Update UI
                updateSavedCount();
                $(this).closest('.saved-project').fadeOut(function() {
                    $(this).remove();
                    
                    // Check if we need to show no saved projects message
                    if (savedProjects.length === 0) {
                        $('#saved-projects-container').html('<div class="col-md-12 text-center"><h3>No saved projects found.</h3></div>');
                    } else {
                        // Re-render saved projects to update indexes
                        showSavedProjects();
                    }
                });
                
                // Update save buttons for this project
                updateSaveButtons(projectTitle, false);
                
                // Show success message
                $('#success-message').text('Project removed successfully!');
                $('#success-modal').modal('show');
            });
            
        } else {
            $('#saved-projects-container').html('<div class="col-md-12 text-center"><h3>No saved projects found.</h3></div>');
        }
        
        // Show saved projects section
        $('#saved-projects').show();
        
        // Update active nav
        $('.navbar-nav a.active').removeClass('active');
        $('#saved-projects-link').addClass('active');
    }
    
    // Function to show saved project details with progress tracking
    function showSavedProjectDetails(project, projectId) {
        $('#modal-title').text(project.title);
        
        var materialsHtml = '<ul class="list-group">';
        $.each(project.materials, function(i, material) {
            materialsHtml += '<li class="list-group-item">' + material + '</li>';
        });
        materialsHtml += '</ul>';
        
        var stepsHtml = '<ol class="list-group">';
        $.each(project.steps, function(i, step) {
            // Handle step as either string or object
            var stepContent = step;
            if (typeof step === 'object' && step !== null) {
                // Try to extract meaningful content from the object
                if (step.description) {
                    stepContent = step.description;
                } else if (step.text) {
                    stepContent = step.text;
                } else if (step.content) {
                    stepContent = step.content;
                } else {
                    // Convert object to string representation
                    stepContent = JSON.stringify(step);
                }
            }
            
            // Check if step is completed
            var isCompleted = project.completedSteps && project.completedSteps.includes(i);
            var checkboxChecked = isCompleted ? 'checked' : '';
            
            stepsHtml += `
                <li class="list-group-item ${isCompleted ? 'list-group-item-success' : ''}">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" class="step-checkbox" data-step-index="${i}" ${checkboxChecked}>
                            ${stepContent}
                        </label>
                    </div>
                </li>
            `;
        });
        stepsHtml += '</ol>';
        
        var resourcesHtml = '<div class="list-group">';
        $.each(project.resources, function(i, resource) {
            if (typeof resource === 'string') {
                resourcesHtml += '<a href="' + resource + '" target="_blank" class="list-group-item">' + resource + '</a>';
            } else if (resource.url && resource.description) {
                resourcesHtml += '<a href="' + resource.url + '" target="_blank" class="list-group-item">' + resource.description + '</a>';
            }
        });
        resourcesHtml += '</div>';
        
        var progress = project.progress || 0;
        var progressBarClass = progress < 33 ? "progress-bar-danger" : 
                              progress < 67 ? "progress-bar-warning" : 
                              "progress-bar-success";
        
        var notes = project.notes || "";
        
        var modalHtml = `
            <div class="row">
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Project Information</h3>
                        </div>
                        <div class="panel-body">
                            <p><strong>Difficulty:</strong> ${project.difficulty}</p>
                            <p><strong>Grade Level:</strong> ${project.gradeLevel}</p>
                            <p><strong>Category:</strong> ${project.category}</p>
                            <p><strong>Estimated Time:</strong> ${project.estimatedTime}</p>
                            <p><strong>Description:</strong> ${project.description}</p>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">Materials Needed</h3>
                        </div>
                        <div class="panel-body">
                            ${materialsHtml}
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Progress Tracker</h3>
                </div>
                <div class="panel-body">
                    <div class="progress">
                        <div class="progress-bar ${progressBarClass}" role="progressbar" 
                             aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100" 
                             style="width: ${progress}%;">
                            ${progress}% Complete
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">My Notes</h3>
                </div>
                <div class="panel-body">
                    <textarea id="project-notes" class="form-control" rows="4" placeholder="Add your personal notes for this project here...">${notes}</textarea>
                    <button id="save-notes" class="btn btn-success btn-sm pull-right" style="margin-top: 10px;">Save Notes</button>
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Project Steps</h3>
                </div>
                <div class="panel-body">
                    <p class="text-muted">Check steps as you complete them to track your progress.</p>
                    ${stepsHtml}
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Helpful Resources</h3>
                </div>
                <div class="panel-body">
                    ${resourcesHtml}
                </div>
            </div>
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Export & Share</h3>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-6">
                            <h4>Share This Project</h4>
                            <div class="input-group">
                                <input type="text" id="share-link" class="form-control" readonly value="https://aiscience.fair/project/${encodeURIComponent(project.title.replace(/\s+/g, '-').toLowerCase())}">
                                <span class="input-group-btn">
                                    <button id="copy-link" class="btn btn-info" type="button">Copy Link</button>
                                    <button id="share-email" class="btn btn-primary" type="button">Share by Email</button>
                                </span>
                            </div>
                            <div class="share-buttons" style="margin-top: 15px;">
                                <button class="btn btn-sm btn-primary share-btn" data-platform="facebook"><i class="fa fa-facebook"></i> Facebook</button>
                                <button class="btn btn-sm btn-info share-btn" data-platform="twitter"><i class="fa fa-twitter"></i> Twitter</button>
                                <button class="btn btn-sm btn-danger share-btn" data-platform="pinterest"><i class="fa fa-pinterest"></i> Pinterest</button>
                                <button class="btn btn-sm btn-success share-btn" data-platform="whatsapp"><i class="fa fa-whatsapp"></i> WhatsApp</button>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <h4>Export Project</h4>
                            <p>Download this project as a PDF document for offline reference.</p>
                            <button id="export-pdf" class="btn btn-danger btn-block"><i class="fa fa-file-pdf-o"></i> Export as PDF</button>
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" id="current-project-id" value="${projectId}">
        `;
        
        $('#modal-body').html(modalHtml);
        
        // Initialize step checkboxes
        $('.step-checkbox').change(function() {
            var stepIndex = parseInt($(this).data('step-index'));
            var projectId = parseInt($('#current-project-id').val());
            var project = savedProjects[projectId];
            
            // Initialize completedSteps array if it doesn't exist
            if (!project.completedSteps) {
                project.completedSteps = [];
            }
            
            if ($(this).is(':checked')) {
                // Add step to completed steps if not already there
                if (!project.completedSteps.includes(stepIndex)) {
                    project.completedSteps.push(stepIndex);
                    $(this).closest('li').addClass('list-group-item-success');
                }
            } else {
                // Remove step from completed steps
                var index = project.completedSteps.indexOf(stepIndex);
                if (index > -1) {
                    project.completedSteps.splice(index, 1);
                    $(this).closest('li').removeClass('list-group-item-success');
                }
            }
            
            // Calculate progress percentage
            project.progress = Math.round((project.completedSteps.length / project.steps.length) * 100);
            
            // Update progress bar
            var progressBarClass = project.progress < 33 ? "progress-bar-danger" : 
                                  project.progress < 67 ? "progress-bar-warning" : 
                                  "progress-bar-success";
            
            $('.progress-bar')
                .css('width', project.progress + '%')
                .attr('aria-valuenow', project.progress)
                .text(project.progress + '% Complete')
                .removeClass('progress-bar-danger progress-bar-warning progress-bar-success')
                .addClass(progressBarClass);
            
            // Save to localStorage
            localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
        });
        
        // Save notes button
        $('#save-notes').click(function() {
            var projectId = parseInt($('#current-project-id').val());
            var notes = $('#project-notes').val();
            
            // Save notes to project
            savedProjects[projectId].notes = notes;
            
            // Save to localStorage
            localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
            
            // Show success message
            $('#success-message').text('Notes saved successfully!');
            $('#success-modal').modal('show');
        });
        
        // Copy link button
        $('#copy-link').click(function() {
            var copyText = document.getElementById("share-link");
            copyText.select();
            document.execCommand("copy");
            
            // Change button text temporarily
            var $btn = $(this);
            $btn.text('Copied!');
            setTimeout(function() {
                $btn.text('Copy Link');
            }, 2000);
        });
        
        // Share by email button
        $('#share-email').click(function() {
            var projectTitle = savedProjects[projectId].title;
            var subject = "Check out this AI Science Fair Project: " + projectTitle;
            var body = "I found this interesting AI science fair project that you might like:\n\n" + 
                       projectTitle + "\n\n" + 
                       savedProjects[projectId].description + "\n\n" +
                       "Click here to view: https://aiscience.fair/project/" + 
                       encodeURIComponent(projectTitle.replace(/\s+/g, '-').toLowerCase());
            
            window.location.href = "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        });
        
        // Social media share buttons
        $('.share-btn').click(function() {
            var platform = $(this).data('platform');
            var projectTitle = savedProjects[projectId].title;
            var projectUrl = "https://aiscience.fair/project/" + encodeURIComponent(projectTitle.replace(/\s+/g, '-').toLowerCase());
            var shareUrl = "";
            
            switch(platform) {
                case 'facebook':
                    shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(projectUrl);
                    break;
                case 'twitter':
                    shareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("Check out this AI Science Fair Project: " + projectTitle) + 
                               "&url=" + encodeURIComponent(projectUrl);
                    break;
                case 'pinterest':
                    shareUrl = "https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(projectUrl) + 
                               "&media=&description=" + encodeURIComponent("AI Science Fair Project: " + projectTitle);
                    break;
                case 'whatsapp':
                    shareUrl = "https://api.whatsapp.com/send?text=" + encodeURIComponent("Check out this AI Science Fair Project: " + projectTitle + " " + projectUrl);
                    break;
            }
            
            // Open share window
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
        
        // PDF Export functionality
        $('#export-pdf').click(function() {
            var projectToExport = savedProjects[projectId];
            exportProjectToPDF(projectToExport);
        });
        
        // Update button to remove instead of save
        $('#modal-save-project').text('Remove Project').removeClass('btn-primary').addClass('btn-danger');
        
        // Update button click handler
        $('#modal-save-project').off('click').click(function() {
            var projectId = parseInt($('#current-project-id').val());
            var projectTitle = savedProjects[projectId].title;
            
            // Remove project
            savedProjects.splice(projectId, 1);
            
            // Save to localStorage
            localStorage.setItem('savedProjects', JSON.stringify(savedProjects));
            
            // Update UI
            updateSavedCount();
            
            // Close modal
            $('#project-modal').modal('hide');
            
            // Update save buttons for this project
            updateSaveButtons(projectTitle, false);
            
            // Show success message
            $('#success-message').text('Project removed successfully!');
            $('#success-modal').modal('show');
            
            // Re-render saved projects
            showSavedProjects();
        });
        
        $('#project-modal').modal('show');
    }
    
    // Function to update saved count
    function updateSavedCount() {
        $('#saved-count').text(savedProjects.length);
    }
    
    // Function to update save buttons for a project
    function updateSaveButtons(projectTitle, isSaved) {
        // Update all save buttons for this project by matching title
        $('.save-project-btn, .save-all-project').each(function() {
            var projectIndex = $(this).data('project-index');
            var projectId = $(this).data('project-id');
            var project;
            
            // Get the project either from the response.projects array or the allProjects object
            if (projectIndex !== undefined) {
                project = window.lastSearchResults && window.lastSearchResults.projects ? 
                          window.lastSearchResults.projects[projectIndex] : null;
            } else if (projectId !== undefined) {
                project = allProjects[projectId];
            }
            
            if (project && project.title === projectTitle) {
                if (isSaved) {
                    $(this).html('Saved <i class="fa fa-bookmark"></i>').attr('disabled', true);
                } else {
                    $(this).html('Save <i class="fa fa-bookmark-o"></i>').attr('disabled', false);
                }
            }
        });
    }
    
    // Function to export project to PDF
    function exportProjectToPDF(project) {
        // Create a window object for printing
        var printWindow = window.open('', '_blank', 'height=600,width=800');
        
        // Build HTML content
        var htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${project.title} - AI Science Fair Project</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #3f51b5; }
                    h2 { color: #5c6bc0; margin-top: 20px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
                    .section { margin-bottom: 20px; }
                    .project-meta { display: flex; flex-wrap: wrap; margin: 15px 0; }
                    .meta-item { margin-right: 20px; margin-bottom: 10px; }
                    .meta-label { font-weight: bold; }
                    ul, ol { margin-left: 20px; padding-left: 0; }
                    li { margin-bottom: 8px; }
                    .completed { text-decoration: line-through; color: #888; }
                    .footer { margin-top: 30px; text-align: center; font-size: 12px; color: #888; }
                    @media print {
                        body { margin: 0.5in; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="no-print" style="text-align: right; margin-bottom: 20px;">
                    <button onclick="window.print();" style="padding: 5px 10px;">Print/Save PDF</button>
                </div>
                
                <h1>${project.title}</h1>
                <p>${project.description}</p>
                
                <div class="project-meta">
                    <div class="meta-item">
                        <span class="meta-label">Difficulty:</span> ${project.difficulty}
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Grade Level:</span> ${project.gradeLevel}
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Category:</span> ${project.category}
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Estimated Time:</span> ${project.estimatedTime}
                    </div>
                </div>
                
                <div class="section">
                    <h2>Materials Needed</h2>
                    <ul>
        `;
        
        // Add materials
        $.each(project.materials, function(i, material) {
            htmlContent += `<li>${material}</li>`;
        });
        
        htmlContent += `
                    </ul>
                </div>
                
                <div class="section">
                    <h2>Project Steps</h2>
                    <ol>
        `;
        
        // Add steps
        $.each(project.steps, function(i, step) {
            var stepContent = step;
            if (typeof step === 'object' && step !== null) {
                if (step.description) {
                    stepContent = step.description;
                } else if (step.text) {
                    stepContent = step.text;
                } else if (step.content) {
                    stepContent = step.content;
                } else {
                    stepContent = JSON.stringify(step);
                }
            }
            
            var isCompleted = project.completedSteps && project.completedSteps.includes(i);
            htmlContent += `<li class="${isCompleted ? 'completed' : ''}">${stepContent}</li>`;
        });
        
        htmlContent += `
                    </ol>
                </div>
        `;
        
        // Add resources
        htmlContent += `
                <div class="section">
                    <h2>Helpful Resources</h2>
                    <ul>
        `;
        
        $.each(project.resources, function(i, resource) {
            if (typeof resource === 'string') {
                htmlContent += `<li><a href="${resource}">${resource}</a></li>`;
            } else if (resource.url && resource.description) {
                htmlContent += `<li><a href="${resource.url}">${resource.description}</a></li>`;
            }
        });
        
        htmlContent += `
                    </ul>
                </div>
        `;
        
        // Add notes if available
        if (project.notes && project.notes.trim() !== '') {
            htmlContent += `
                <div class="section">
                    <h2>My Notes</h2>
                    <p style="white-space: pre-wrap;">${project.notes}</p>
                </div>
            `;
        }
        
        // Add progress if available
        if (project.progress !== undefined) {
            htmlContent += `
                <div class="section">
                    <h2>Progress</h2>
                    <p>Project Completion: ${project.progress}%</p>
                </div>
            `;
        }
        
        // Footer
        htmlContent += `
                <div class="footer">
                    Generated by AI Science Fair Project Finder on ${new Date().toLocaleDateString()}
                </div>
            </body>
            </html>
        `;
        
        // Write to the new window
        printWindow.document.write(htmlContent);
        printWindow.document.close();
        
        // Focus the window for printing
        printWindow.focus();
    }
});