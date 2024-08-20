import React, { useState, useEffect } from 'react';
import logo from './assets/La Villa.png';
import fontPath from './assets/CinzelDecorative-Regular.ttf';
import singleroom1 from './assets/singleroom1.jpg';
import singleroom2 from './assets/singleroom2.jpg';
import singleroom3 from './assets/singleroom3.jpg';
import singleroom4 from './assets/singleroom4.jpg';
import doubleroom1 from './assets/doubleroom1.jpg';
import doubleroom2 from './assets/doubleroom2.jpg';
import doubleroom3 from './assets/doubleroom3.jpg';
import doubleroom4 from './assets/doubleroom4.jpg';
import tripleroom1 from './assets/tripleroom1.jpg';
import tripleroom2 from './assets/tripleroom2.jpg';
import tripleroom3 from './assets/tripleroom3.jpg';
import tripleroom4 from './assets/tripleroom4.jpg';

const allRooms = {
  single: {
    category: 'Single Room',
    images: [singleroom1, singleroom2, singleroom3, singleroom4],
    details: 'Our Single Room featuring a comfortable single bed, a private balcony for relaxation, and an en-suite bathroom with modern amenities.',
    available: 10,
  },
  double: {
    category: 'Double Sharing Room',
    images: [doubleroom1, doubleroom2, doubleroom3, doubleroom4],
    details: 'Our Double Sharing Room offers spacious comfort with two single beds, perfect for friends or colleagues. Featuring a shared bathroom and a balcony.',
    available: 15,
  },
  triple: {
    category: 'Triple Sharing Room',
    images: [tripleroom1, tripleroom2, tripleroom3, tripleroom4],
    details: 'Ideal for groups or families, our Triple Sharing Room includes three single beds, providing ample space and comfort. With a well-appointed shared bathroom and a cozy, inviting atmosphere.',
    available: 25,
  },
};

function Clientbooking() {
  const [selectedCategory, setSelectedCategory] = useState('single');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    maritalStatus: '',
    guardianName: '',
    guardianContact: '',
    address: '',
    checkInDate: '',
    checkOutDate: '',
    foodPreference: 'veg',
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch initial room data from the server
    fetch('http://localhost:3000/api/rooms')
      .then(response => response.json())
      .then(data => {
        const updatedCategories = data.map(room => ({
          id: room.block,
          label: room.block.charAt(0).toUpperCase() + room.block.slice(1).replace('triple', 'Triple Sharing'),
          numberOfRooms: data.filter(r => r.block === room.block && r.status === 'Available').length,
        }));
        setCategories(updatedCategories);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load room data.');
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleBookNowClick = () => {
    setShowForm(true);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.contact || !formData.email || !formData.maritalStatus || !formData.address || !formData.checkInDate || !formData.checkOutDate) {
      setError('Please fill in all required fields.');
      return;
    }

    fetch('http://localhost:3000/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...formData, category: selectedCategory }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || 'Network response was not ok');
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Form submitted successfully:', data);
        setFormData({
          name: '',
          contact: '',
          email: '',
          maritalStatus: '',
          guardianName: '',
          guardianContact: '',
          address: '',
          checkInDate: '',
          checkOutDate: '',
          foodPreference: 'veg',
        });
        setShowForm(false);

       
        setCategories(prevCategories => 
          prevCategories.map(cat =>
            cat.id === selectedCategory 
              ? { ...cat, numberOfRooms: cat.numberOfRooms - 1 }
              : cat
          )
        );
      })
      .catch((error) => {
        console.error('Error:', error);
        setError(`There was an issue with your submission. Please try again. ${error.message}`);
      });
  };

  const room = allRooms[selectedCategory];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + room.images.length) % room.images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.images.length);
  };

  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const fontFace = `
      @font-face {
        font-family: 'MyCustomFont';
        src: url('${fontPath}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `;
    styleSheet.insertRule(fontFace, styleSheet.cssRules.length);
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logoContainer}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h2 style={styles.logoText}>La Villa</h2>
        </div>
      </header>
      <main style={styles.main}>
        <h1 style={styles.heading}>Book Your Room</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div style={styles.categorySelection}>
            <label style={styles.categoryLabel}>
              <input
                type="radio"
                name="category"
                value="single"
                checked={selectedCategory === 'single'}
                onChange={handleCategoryChange}
                style={styles.radio}
              />
              Single Room 
            </label>
            <label style={styles.categoryLabel}>
              <input
                type="radio"
                name="category"
                value="double"
                checked={selectedCategory === 'double'}
                onChange={handleCategoryChange}
                style={styles.radio}
              />
              Double Room 
            </label>
            <label style={styles.categoryLabel}>
              <input
                type="radio"
                name="category"
                value="triple"
                checked={selectedCategory === 'triple'}
                onChange={handleCategoryChange}
                style={styles.radio}
              />
              Triple Room
            </label>
          </div>
        )}
        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.roomContainer}>
          <div style={styles.imageGallery}>
            {room.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${room.category} ${index + 1}`}
                style={{
                  ...styles.image,
                  opacity: index === currentImageIndex ? 1 : 0,
                }}
              />
            ))}
          </div>
          <div style={styles.imageControls}>
            <button onClick={handlePrevImage} style={styles.controlButton}>Previous</button>
            <button onClick={handleNextImage} style={styles.controlButton}>Next</button>
          </div>
          <div style={styles.details}>
            <h2>{room.category}</h2>
            <p>{room.details}</p>
            <p><strong>Available Rooms:</strong> {categories.find(cat => cat.id === selectedCategory)?.numberOfRooms || 0}</p>
            <button onClick={handleBookNowClick} disabled={categories.find(cat => cat.id === selectedCategory)?.numberOfRooms <= 0} style={styles.bookButton}>
              Book Now
            </button>
          </div>
        </div>
        {showForm && (
              <div style={styles.modal}>
                <div style={styles.modalContent}>
                  <span style={styles.closeButton} onClick={() => setShowForm(false)}>&times;</span>
                  <div style={styles.formContainer}>
                    <form onSubmit={handleFormSubmit} style={styles.form}>
                      <label>
                        Name:
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFormChange}
                          style={styles.input}
                        />
                      </label>
                      <label>
                        Contact:
                        <input
                          type="text"
                          name="contact"
                          value={formData.contact}
                          onChange={handleFormChange}
                          style={styles.input}
                        />
                      </label>
                      <label>
                        Email:
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          style={styles.input}
                        />
                      </label>
                      <label>
                        Marital Status:
                        <select
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleFormChange}
                          style={styles.select}
                        >
                          <option value="">Select</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                        </select>
                      </label>
                      <label>
                        Guardian Name (if applicable):
                        <input
                          type="text"
                          name="guardianName"
                          value={formData.guardianName}
                          onChange={handleFormChange}
                          style={styles.input}
                        />
                      </label>
                      <label>
                        Guardian Contact (if applicable):
                        <input
                          type="text"
                          name="guardianContact"
                          value={formData.guardianContact}
                          onChange={handleFormChange}
                          style={styles.input}
                        />
                      </label>
                      <label>
                        Address:
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleFormChange}
                          style={styles.textarea}
                        />
                      </label>
                      <label>
                        Check-In Date:
                        <input
                          type="date"
                          name="checkInDate"
                          value={formData.checkInDate}
                          onChange={handleFormChange}
                          style={styles.input}
                        />
                      </label>
                      <label>
                        Check-Out Date:
                        <input
                          type="date"
                          name="checkOutDate"
                          value={formData.checkOutDate}
                          onChange={handleFormChange}
                          style={styles.input}
                        />
                      </label>
                      <label>
                        Food Preference:
                        <select
                          name="foodPreference"
                          value={formData.foodPreference}
                          onChange={handleFormChange}
                          style={styles.select}
                        >
                          <option value="veg">Vegetarian</option>
                          <option value="nonveg">Non-Vegetarian</option>
                        </select>
                      </label>
                      <button type="submit" style={styles.submitButton}>Submit</button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      );
      }
    
            

const styles = {
  container: {
    fontFamily: 'MyCustomFont, Arial, sans-serif',
    padding: '20px',
    height: '130vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fce4ec', 
  },
  header: {
    backgroundColor: '#e91e63', 
    padding: '10px',
    color: '#fff', 
    textAlign: 'center',
    position: 'relative',
    top: 0,
    height: '70px', 
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '50px',
    height: 'auto',
  },
  logoText: {
    marginLeft: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff', 
  },
  heading: {
    textAlign: 'center',
    margin: '20px 0',
    color: '#e91e63', 
  },
  categorySelection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  categoryLabel: {
    margin: '0 10px',
    color: '#424242', 
  },
  radio: {
    marginRight: '5px',
  },
  roomContainer: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center', 
  },
  imageGallery: {
    position: 'relative',
    width: '400px',
    height: '300px',
    overflow: 'hidden',
    borderRadius: '10px',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.5s ease-in-out',
  },
  imageControls: {
    textAlign: 'center',
    marginTop: '10px', 
  },
  controlButton: {
    margin: '0 5px',
    backgroundColor: '#e91e63', 
    color: '#fff', 
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  details: {
    marginTop: '20px', 
    maxWidth: '500px',
    color: '#424242', 
    textAlign: 'center', 
  },
  bookButton: {
    backgroundColor: '#e91e63', 
    color: '#fff', 
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  form: {
    marginTop: '20px',
    maxHeight: '400px',
    overflowY: 'auto',
    backgroundColor: '#fce4ec', 
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  input: {
    display: 'block',
    margin: '10px 0',
    padding: '8px',
    width: '100%',
  },
  select: {
    display: 'block',
    margin: '10px 0',
    padding: '8px',
    width: '100%',
  },
  textarea: {
    display: 'block',
    margin: '10px 0',
    padding: '8px',
    width: '100%',
  },
  submitButton: {
    backgroundColor: '#e91e63', 
    color: '#fff', 
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: '#e91e63', 
    textAlign: 'center',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000, 
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '80%',
    maxWidth: '600px',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    fontSize: '24px',
    color: '#e91e63', 
  },
};



  
export default Clientbooking;
