from flask import render_template, request, jsonify
from app.main import bp
from app.utils import generate_content

@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html', title='Space Travel Booking')

@bp.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        message = data.get('message', '')
        
        if not message:
            return jsonify({
                'status': 'error',
                'message': 'No message provided',
                'response': 'Please provide a message to continue our conversation.'
            })
        
        context = """You are NOVA, a highly knowledgeable AI space travel assistant for Dubai to the Stars. 
        You help customers plan their space travel journeys.
        
        Available destinations and pricing:
        - Orbital Hotel Artemis: 2-day journey, starting at $250,000
        - Lunar Colony Alpha: 5-day journey, starting at $450,000
        - Mars Base One: 8-month journey, starting at $1,200,000
        
        Travel classes:
        - Economy Shuttle: Shared accommodations, basic amenities, starts at base price
        - Business Class: Private cabin, premium dining, 1.5x base price
        - Luxury Cabin: Spacious suite, exclusive service, 2x base price
        - VIP Zero-G Suite: Ultimate luxury experience, personal chef, unlimited EVA, 3x base price
        
        Accommodations:
        - Standard Pod: Included in base price
        - Premium Suite: Additional $50,000
        - Deluxe Observatory: Additional $120,000
        
        Keep your responses concise (under 3 sentences when possible), friendly, and focused on space travel information.
        If asked about something unrelated to space travel, politely redirect the conversation back to space tourism.
        """
        
        # Generate AI response using Gemini
        response = generate_content(
            prompt=f"{context}\n\nUser: {message}\nNOVA:",
            model="gemini-1.5-flash",
            max_tokens=200
        )
        
        if not response.get('status'):
            raise Exception(response.get('error', 'Failed to generate response'))
            
        return jsonify({
            'status': 'success',
            'response': response['content']
        })
        
    except Exception as e:
        import traceback
        print(f"Chat error: {str(e)}")
        print(traceback.format_exc())
        
        return jsonify({
            'status': 'error',
            'message': str(e),
            'response': 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment.'
        })

@bp.route('/api/book', methods=['POST'])
def book_trip():
    try:
        data = request.get_json()
        
        # For a real application, we would save this to a database
        # For now, we'll just do some validation and return success
        required_fields = ['fullName', 'email', 'phone', 'destination', 
                          'departureDate', 'returnDate', 'travelers', 'travelClass']
        
        # Check for required fields
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    'status': 'error',
                    'message': f'Missing required field: {field}'
                }), 400
                
        # In a real application, validate email, phone, dates, etc.
        
        # Generate a unique booking ID
        import uuid
        booking_id = str(uuid.uuid4())[:8].upper()
        
        return jsonify({
            'status': 'success',
            'message': 'Booking confirmed',
            'booking_id': booking_id,
            'booking_details': {
                'reference': booking_id,
                'name': data.get('fullName'),
                'destination': data.get('destination'),
                'departure': data.get('departureDate'),
                'travelers': data.get('travelers')
            }
        })
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@bp.route('/api/destinations', methods=['GET'])
def get_destinations():
    destinations = [
        {
            'id': 'orbital-luxury',
            'name': 'Orbital Hotel Artemis',
            'price': 250000,
            'duration': '2 days',
            'description': 'Luxury accommodations with Earth views'
        },
        {
            'id': 'lunar-resort',
            'name': 'Lunar Colony Alpha',
            'price': 450000,
            'duration': '5 days',
            'description': 'First permanent settlement on the Moon'
        },
        {
            'id': 'mars-base',
            'name': 'Mars Base One',
            'price': 1200000,
            'duration': '8 months',
            'description': 'Be among the first tourists on Mars'
        }
    ]
    return jsonify(destinations)