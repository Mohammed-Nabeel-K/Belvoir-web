"use client"


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../../../axios/axiosinstance/axiosInstance';
import Link from 'next/link';




 
  
const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters long'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleReg = async (values: { name: string; email: string; password: string; phone: string; }) => {
    try {
      setStatus('loading');
      setError(null);
      
      console.log(values)

      const response = await axiosInstance.post('/Auth/register', values);
      
      console.log(response.data);
      setStatus('succeeded');
      router.push('/login');
    } catch (error) {
      setError('signup failed');
      console.error("reg",error);
      setStatus('failed');
    }
  };
  
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 relative">
        <h1 className="text-white font-serif text-3xl pl-6 pt-4 z-10 relative">
          Belvoir.
        </h1>
        <div className="absolute left-0 top-0 h-screen  overflow-hidden">
          <Image
            src="/login/bg.jpg"
            alt="Elegant jacket display"
            className="object-cover object-center w-full h-full transform scale-110"
            width={400}
            height={400}
          />
          <div className="absolute inset-0 bg-black opacity-20"></div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="w-96 p-8">
          <div className="text-center mb-12">
            <h1 className="font-serif text-3xl mb-1">Belvoir.</h1>
            <p className="text-gray-600 text-sm">Create Account</p>
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleReg}
          >
            {({ }) => (
              <Form className="space-y-6">
                <div className="space-y-5">
                  <div>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="w-full px-4 py-3 bg-white border-b border-gray-200 focus:border-gray-800 transition-colors outline-none"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className="w-full px-4 py-3 bg-white border-b border-gray-200 focus:border-gray-800 transition-colors outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div>
                    <Field
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      className="w-full px-4 py-3 bg-white border-b border-gray-200 focus:border-gray-800 transition-colors outline-none"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>

                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      className="w-full px-4 py-3 bg-white border-b border-gray-200 focus:border-gray-800 transition-colors outline-none"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-gray-900 text-white py-3 rounded-sm hover:bg-gray-800 transition-colors text-sm relative flex justify-center"
                >
                  {status === "loading" ? (
                    <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                  ) : (
                    "Register"
                  )}
                </button>

                {error && (
                  <div className="text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}

                <div className="text-center text-xs text-gray-500">
                  Already have an account?
                  <Link href="/login" className="text-gray-800">
                    SignUp
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Registration;