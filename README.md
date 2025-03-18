# Flask Web Application

A Flask web application with proper project structure following best practices.

## Setup

1. Clone the repository
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/Mac: `source venv/bin/activate`
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Run the application:
   ```
   python run.py
   ```

## Project Structure

- `app/`: Application package
  - `__init__.py`: Initialize Flask app
  - `main/`: Main blueprint with routes
  - `templates/`: HTML templates
  - `static/`: Static files (CSS, JS, images)
- `run.py`: Entry point for development server
- `wsgi.py`: WSGI entry point for production
- `config.py`: Configuration settings
- `vercel.json`: Vercel deployment configuration
- `package.json`: Build scripts for Vercel deployment

## Deployment

*Production deployment command:*
```bash 
    uvicorn run:app --host 0.0.0.0 --port 8000 --reload
```