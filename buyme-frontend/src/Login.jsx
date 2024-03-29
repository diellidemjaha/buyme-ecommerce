import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const headers = {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/login', formData, { headers });

      if (response.status === 200) {
        console.log('Login successful');

        const token = response.data.token;
        const userId = response.data.user_id;

        localStorage.setItem('token', token);
        localStorage.setItem('user_id', userId);

        let timerInterval;
        Swal.fire({
          title: "Authenticated!",
          html: "Login Success!",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });

        window.location.href = "/";

      }
    } catch (error) {
      console.error('Login error:', error);
      console.log('Error response data:', error.response?.data);

      let timerInterval;
      Swal.fire({
        title: "Incorrect!",
        text: "Login Unsuccessful!",
        icon: "error",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login on BuyMe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Login</button>
        <div className="mt-3">
          <p>Not a user? <Link to="/register">Sign up here</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Login;
