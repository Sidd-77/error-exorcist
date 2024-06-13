
  
  

# ErrorExorcist

  

ErrorExorcist is an advanced error resolution assistant that leverages the power of NLP and large language models (LLMs) to help developers solve coding errors. The application combines Stack Overflow search capabilities, custom URL data, and the Serper Search API to provide accurate and helpful solutions.

  

## Features

  

-  **NLP Integration**: Utilizes LangChain for natural language processing.

-  **LLM Support**: Supports multiple models including Gemini, Groq, and Ollama.

-  **Stack Overflow Search**: Automatically searches Stack Overflow for relevant solutions using the Serper Search API based on user input.

-  **Custom URL Parsing**: Users can provide custom URLs to fetch additional context or documentation.

-  **Modern Frontend**: Built with Next.js and Shadcn UI for a responsive and intuitive user interface.

-  **Efficient Backend**: Powered by FastAPI for quick and reliable server responses.

  

## Tech Stack

  

### Frontend

-  **Next.js**: A React framework for server-side rendering and static web applications.

-  **Shadcn UI**: A modern UI library for building visually appealing interfaces.

  

### Backend

-  **FastAPI**: A high-performance framework for building APIs with Python 3.6+ based on standard Python type hints.

-  **Serper API**: Used to scrape information from Stack Overflow and user provided url.

-  **LangChain**: A framework for developing applications powered by language models.

  

### LLM's used

-  **Gemini** : Gemini 1.5 Pro

-  **Groq** : LLaMA3 8b, LLaMA3 70b

-  **Ollama** : Runs on the user's device to ensure privacy.

  
  
  

## Getting Started

  

### Prerequisites

  

- Node.js and npm

- Python 3.6+

- FastAPI

- LangChain

- Access to Gemini, Groq API
- Ollama 
- Access to Serper Search API

  

### Installation

  

1.  **Clone the repository**

```bash

git clone https://github.com/yourusername/ErrorExorcist.git

cd ErrorExorcist

```

  

2.  **Install frontend dependencies**

```bash

cd frontend

npm install

```

  

3.  **Install backend dependencies**

```bash

cd ../backend

pip install -r requirements.txt

```

  

### Configuration

  

1.  **Set up environment variables**

  

Create a `.env` file in the root directory of the backend with the following variables:

```plaintext

LANGCHAIN_TRACING_V2="true"

LANGCHAIN_API_KEY=your_langchain_api_key

GOOGLE_API_KEY=your_gemini_api_key

GROQ_API_KEY=your_groq_api_key

SERPER_API_KEY=your_serper_api_key

LOCAL_LLAMA_MODEL=your_local_model_name

```

Create a `.env.local` file in the root directory of the frontend with the following variables:

```plaintext

NEXT_PUBLIC_BACKEND_URL=your_backend_url

```

  

### Running the Application

  

1.  **Start the backend server**

```bash

cd backend

fastapi run app.py

```

  

2.  **Start the frontend server**

```bash

cd ../frontend

npm run dev

```

  

3.  **Open your browser** and navigate to `http://localhost:3000` to see the application in action.

  

## Usage

  

1.  **Describe your issue**: Input a statement and code snippet describing the error you're encountering.

2.  **Get solutions**: The application will search Stack Overflow using the Serper Search API and parse provided custom URLs, utilizing the selected NLP models to give you the best possible solution.

3.  **Review and implement**: Review the suggested solutions and implement the fix in your code.

  

## Contributing

  

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

  

## License

  

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

  

## Acknowledgements

  

-  [Next.js](https://nextjs.org/)

-  [Shadcn UI](https://shadcn.dev/)

-  [FastAPI](https://fastapi.tiangolo.com/)

-  [LangChain](https://langchain.com/)

-  [Gemini](https://gemini.com/)

-  [Groq](https://groq.com/)

-  [Ollama](https://ollama.com/)

-  [Serper Search API](https://serper.dev/)

  

## Contact

  

For any questions or feedback, please reach out to [siddharthsalunkhe2003@gmail.com](mailto:yourname@yourdomain.com).

  

---

  

#### Happy coding with ErrorExorcist! May your bugs be exorcised swiftly.
