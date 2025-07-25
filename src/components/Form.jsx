import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { ShowToast } from '../utils/ShowToast'; 
import { useNavigate } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const FormContainer = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 32px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 600px;
  box-sizing: border-box;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #0467d5;
  margin-bottom: 0.5rem;
  text-align: center;
  font-weight: 700;

  @media (max-width: 470px) {
    font-size: 1.4rem;
  }

  @media (max-width: 380px) {
    font-size: 1.2rem;
  }
`;

const SubHead = styled.h4`
  text-align: center;
  font-style: italic;
  font-weight: 500;
  color: #666;
  margin: 0.2rem 0 0.8rem;
  letter-spacing: 0.3px;

  @media (max-width: 470px) {
    font-size: 0.8rem;
  }
  @media (max-width: 380px) {
    font-size: 0.6rem;
  }
`;

const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Input = styled.input`
  padding: 0.9rem 1.2rem;
  border-radius: 16px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
  transition: 0.2s ease;

  &:focus {
    border-color: #0467d5;
    box-shadow: 0 0 0 2px rgba(4, 103, 213, 0.2);
  }

  @media (max-width: 470px) {
    font-size: 0.8rem;
  }
  @media (max-width: 380px) {
    font-size: 0.6rem;
  }
`;

const TextArea = styled.textarea`
  padding: 0.9rem 1.2rem;
  border-radius: 16px;
  border: 1px solid #ccc;
  font-size: 1rem;
  resize: none;
  height: 150px;
  outline: none;

  &:focus {
    border-color: #0467d5;
    box-shadow: 0 0 0 2px rgba(4, 103, 213, 0.2);
  }
  @media (max-width: 470px) {
    font-size: 0.8rem;
  }
  @media (max-width: 380px) {
    font-size: 0.6rem;
  }
`;

const SubmitButton = styled.button`
  padding: 0.9rem 1.2rem;
  border-radius: 24px;
  background: #0467d5;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: #0357ba;
    transform: scale(1.03);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 380px) {
    padding: 0.8rem 1rem;
    font-size: 0.8rem;
  }
`;

const TestimonialForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    testimonial: '',
    affiliate: '',
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatEmailMessage = ({ name, email, testimonial, affiliate, id }) => {
    return `
      <div style="background-color: #f4f6f8; padding: 2rem; font-family: 'Segoe UI', sans-serif; color: #1e293b;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 12px; box-shadow: 0 6px 24px rgba(0,0,0,0.08); padding: 2rem;">
          <h2 style="color: #1c3d6e; font-size: 1.6rem; margin-bottom: 0.2rem;">New Testimonial Submitted</h2>
          <p style="font-size: 0.95rem; color: #66788a; margin-bottom: 1.8rem;">
            You’ve received a new testimonial via your portfolio website.
          </p>
  
          <div style="border: 1px solid #e2e8f0; border-radius: 10px; padding: 1.2rem; background: #f9fafb; color: black">
            <p style="margin: 0.4rem 0;"><strong>ID:</strong> ${id}</p>
            <p style="margin: 0.4rem 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 0.4rem 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1a73e8; text-decoration: none;">${email}</a></p>
            <p style="margin: 0.4rem 0;"><strong>Affiliation:</strong> ${affiliate || 'N/A'}</p>
          </div>
  
          <div style="margin-top: 2rem;">
            <p style="font-size: 1.1rem; font-weight: 600; color: #1c3d6e; margin-bottom: 0.6rem;">Testimonial:</p>
            <blockquote style="border-left: 4px solid #1a73e8; margin: 0; padding-left: 1rem; font-size: 1rem; line-height: 1.6; color: #333; background-color: #f1f5f9; border-radius: 8px; padding: 1rem;">
              ${testimonial}
            </blockquote>
          </div>
  
          <p style="margin-top: 2rem; font-size: 0.95rem; color: #475569; text-align: center;">
            Thank you for building meaningful relationships through your work. Keep up the great effort!
          </p>
          <p style="text-align: center; font-size: 0.85rem; color: #94a3b8; margin-top: 0.5rem;">
            — Portfolio Testimonial System
          </p>
        </div>
      </div>
    `;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, testimonial, affiliate } = form;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedTestimonial = testimonial.trim();
    const trimmedAffiliate = affiliate.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (trimmedName.length < 2) {
      ShowToast({
        type: 'error',
        title: 'Invalid Name',
        message: 'Please enter a valid name (at least 2 characters).',
      });
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      ShowToast({
        type: 'error',
        title: 'Invalid Email',
        message: 'Please enter a valid email address.',
      });
      return;
    }

    if (trimmedTestimonial.length < 10) {
      ShowToast({
        type: 'error',
        title: 'Testimonial Too Short',
        message: 'Please provide more details in your testimonial (min. 10 characters).',
      });
      return;
    }

    const BREVO_API_KEY = process.env.REACT_APP_BREVO_API;

    if (!BREVO_API_KEY) {
      ShowToast({
        type: 'error',
        title: 'Configuration Error',
        message: 'Email service not configured correctly.',
      });
      return;
    }

    setLoading(true);

    try {
      const testimonialId = uuidv4();

      const emailData = {
        sender: { name: 'Sahil Raza', email: 'connectwithsahil007@gmail.com' },
        to: [{ name: 'Sahil Raza', email: 'connectwithsahil007@gmail.com' }],
        subject: `New Testimonial from ${trimmedName}`,
        htmlContent: formatEmailMessage({ 
          name: trimmedName, 
          email: trimmedEmail, 
          testimonial: trimmedTestimonial,
          affiliate: trimmedAffiliate,
          id: testimonialId,
        }),
      };

      const response = await axios.post(
        process.env.REACT_APP_EMAIL_URL,
        emailData,
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': BREVO_API_KEY,
          },
        }
      );

      if (response.status === 201) {
        ShowToast({
          type: 'success',
          title: 'Testimonial Sent',
          message: 'Thanks for your feedback! It means a lot.',
        });
        setForm({ name: '', email: '', testimonial: '', affiliate: '' });
        
        navigate(`/thank-you/${testimonialId}`, { state: { name: trimmedName } });
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error('Email sending failed:', error);
      ShowToast({
        type: 'error',
        title: 'Failed to Send',
        message: 'There was an error sending your testimonial. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <FormContainer>
        <Title>Leave a Testimonial</Title>
        <SubHead>“Your feedback means a lot. Your words help me grow and guide others who may work with me.”</SubHead>
        <FormElement onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Your Name: eg. Praneet Kumar"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            placeholder="Your Email: eg. praneet@gmail.com"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            placeholder="Affiliate: eg. Director, Google"
            name="affiliate"
            value={form.affiliate}
            onChange={handleChange}
          />
          <TextArea
            placeholder="Your testimonial..."
            name="testimonial"
            value={form.testimonial}
            onChange={handleChange}
            required
          />
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Submit'}
          </SubmitButton>
        </FormElement>
      </FormContainer>
    </Wrapper>
  );
};

export default TestimonialForm;
