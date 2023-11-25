from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://localhost:3000'])  # Enable CORS with credentials support

@app.route('/upload', methods=['POST'])
def upload_images():
    try:
        before_image = request.files['beforeImage']
        after_image = request.files['afterImage']

        # Process images as needed
        # For demonstration, save the images to the server
        before_image.save('before_image.jpg')
        after_image.save('after_image.jpg')

        # Send CORS headers
        response = jsonify({'success': True, 'message': 'Images uploaded successfully'})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
