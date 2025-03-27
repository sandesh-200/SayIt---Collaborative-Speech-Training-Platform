// import React, { useState } from 'react';
// import { Eye, EyeOff, User, Mail, Lock, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';
// import { useNavigate } from 'react-router-dom'

// const RegisterPage = () => {

//     const {register} = useAuth()
//     const navigate = useNavigate()


//   // Form state
//   const [formData, setFormData] = useState({
//     first_name: '',
//     last_name: '',
//     username: '',
//     email: '',
//     password: '',
//     confirm_password: ''
//   });

//   // UI state
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Clear error when user types
//     if (errors[name]) {
//       setErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
    
//     // First name validation
//     if (!formData.first_name.trim()) {
//       newErrors.first_name = 'First name is required';
//     }
    
//     // Last name validation
//     if (!formData.last_name.trim()) {
//       newErrors.last_name = 'Last name is required';
//     }
    
//     // Username validation
//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     } else if (formData.username.length < 4) {
//       newErrors.username = 'Username must be at least 4 characters';
//     }
    
//     // Email validation
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters';
//     }
    
//     // Confirm password validation
//     if (!formData.confirm_password) {
//       newErrors.confirm_password = 'Please confirm your password';
//     } else if (formData.password !== formData.confirm_password) {
//       newErrors.confirm_password = 'Passwords do not match';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//    e.preventDefault()
//    setIsLoading(true)
//    register(formData)
//    setIsLoading(false)
//   };

  
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         {/* Logo and Header */}
//         <div className="text-center">
//           <img 
//             src="/sayit-logo.png" 
//             alt="Logo" 
//             className="mx-auto h-16 w-auto"
//           />
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             Join our community and start sharing your thoughts
//           </p>
//         </div>
        
//         {/* Success Message */}
//         {success && (
//           <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4 rounded">
//             <div className="flex items-center">
//               <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
//               <p className="text-sm text-green-700">
//                 Registration successful! You can now log in.
//               </p>
//             </div>
//           </div>
//         )}
        
//         {/* Form Error */}
//         {errors.form && (
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4 rounded">
//             <div className="flex items-center">
//               <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
//               <p className="text-sm text-red-700">{errors.form}</p>
//             </div>
//           </div>
//         )}
        
//         {/* Registration Form */}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             {/* Name Fields - Side by Side */}
//             <div className="flex gap-2 mb-2">
//               {/* First Name */}
//               <div className="flex-1">
//                 <label htmlFor="first_name" className="sr-only">First Name</label>
//                 <div className="relative">
//                   <input
//                     id="first_name"
//                     name="first_name"
//                     type="text"
//                     value={formData.first_name}
//                     onChange={handleChange}
//                     className={`appearance-none rounded-t-md relative block w-full px-3 py-3 pl-10 border ${
//                       errors.first_name ? 'border-red-300' : 'border-gray-300'
//                     } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm`}
//                     placeholder="First Name"
//                   />
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-teal-500" />
//                   </div>
//                 </div>
//                 {errors.first_name && (
//                   <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
//                 )}
//               </div>
              
//               {/* Last Name */}
//               <div className="flex-1">
//                 <label htmlFor="last_name" className="sr-only">Last Name</label>
//                 <div className="relative">
//                   <input
//                     id="last_name"
//                     name="last_name"
//                     type="text"
//                     value={formData.last_name}
//                     onChange={handleChange}
//                     className={`appearance-none rounded-t-md relative block w-full px-3 py-3 pl-10 border ${
//                       errors.last_name ? 'border-red-300' : 'border-gray-300'
//                     } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm`}
//                     placeholder="Last Name"
//                   />
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-teal-500" />
//                   </div>
//                 </div>
//                 {errors.last_name && (
//                   <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
//                 )}
//               </div>
//             </div>
            
//             {/* Username */}
//             <div className="mb-2">
//               <label htmlFor="username" className="sr-only">Username</label>
//               <div className="relative">
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className={`appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border ${
//                     errors.username ? 'border-red-300' : 'border-gray-300'
//                   } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm`}
//                   placeholder="Username"
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <UserPlus className="h-5 w-5 text-teal-500" />
//                 </div>
//               </div>
//               {errors.username && (
//                 <p className="text-red-500 text-xs mt-1">{errors.username}</p>
//               )}
//             </div>
            
//             {/* Email */}
//             <div className="mb-2">
//               <label htmlFor="email" className="sr-only">Email address</label>
//               <div className="relative">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border ${
//                     errors.email ? 'border-red-300' : 'border-gray-300'
//                   } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm`}
//                   placeholder="Email address"
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-teal-500" />
//                 </div>
//               </div>
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//               )}
//             </div>
            
//             {/* Password */}
//             <div className="mb-2">
//               <label htmlFor="password" className="sr-only">Password</label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border ${
//                     errors.password ? 'border-red-300' : 'border-gray-300'
//                   } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm`}
//                   placeholder="Password"
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-teal-500" />
//                 </div>
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//               )}
//             </div>
            
//             {/* Confirm Password */}
//             <div className="mb-2">
//               <label htmlFor="confirm_password" className="sr-only">Confirm Password</label>
//               <div className="relative">
//                 <input
//                   id="confirm_password"
//                   name="confirm_password"
//                   type={showConfirmPassword ? "text" : "password"}
//                   value={formData.confirm_password}
//                   onChange={handleChange}
//                   className={`appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border ${
//                     errors.confirm_password ? 'border-red-300' : 'border-gray-300'
//                   } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm`}
//                   placeholder="Confirm Password"
//                 />
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-teal-500" />
//                 </div>
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400" />
//                   )}
//                 </button>
//               </div>
//               {errors.confirm_password && (
//                 <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>
//               )}
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
//                 isLoading ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'
//               } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Processing...
//                 </>
//               ) : (
//                 'Create Account'
//               )}
//             </button>
//           </div>
          
//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Already have an account?{' '}
//               <a href="#" className="font-medium text-teal-600 hover:text-teal-500">
//                 Sign in
//               </a>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;



import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    // First name validation
    if (!formData.first_name.trim()) {
      toast.error('First name is required');
      return false;
    }
    
    // Last name validation
    if (!formData.last_name.trim()) {
      toast.error('Last name is required');
      return false;
    }
    
    // Username validation
    if (!formData.username.trim()) {
      toast.error('Username is required');
      return false;
    } else if (formData.username.length < 4) {
      toast.error('Username must be at least 4 characters');
      return false;
    }
    
    // Email validation
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('Email is invalid');
      return false;
    }
    
    // Password validation
    if (!formData.password) {
      toast.error('Password is required');
      return false;
    } else if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return false;
    }
    
    // Confirm password validation
    if (!formData.confirm_password) {
      toast.error('Please confirm your password');
      return false;
    } else if (formData.password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      return false;
    }
    
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register(formData);
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <img 
            src="/sayit-logo.png" 
            alt="Logo" 
            className="mx-auto h-16 w-auto"
          />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our community and start sharing your thoughts
          </p>
        </div>
        
        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {/* Name Fields - Side by Side */}
            <div className="flex gap-2 mb-2">
              {/* First Name */}
              <div className="flex-1">
                <label htmlFor="first_name" className="sr-only">First Name</label>
                <div className="relative">
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="appearance-none rounded-t-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="First Name"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-teal-500" />
                  </div>
                </div>
              </div>
              
              {/* Last Name */}
              <div className="flex-1">
                <label htmlFor="last_name" className="sr-only">Last Name</label>
                <div className="relative">
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="appearance-none rounded-t-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                    placeholder="Last Name"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-teal-500" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Username */}
            <div className="mb-2">
              <label htmlFor="username" className="sr-only">Username</label>
              <div className="relative">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Username"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserPlus className="h-5 w-5 text-teal-500" />
                </div>
              </div>
            </div>
            
            {/* Email */}
            <div className="mb-2">
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-teal-500" />
                </div>
              </div>
            </div>
            
            {/* Password */}
            <div className="mb-2">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-teal-500" />
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            {/* Confirm Password */}
            <div className="mb-2">
              <label htmlFor="confirm_password" className="sr-only">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-teal-500" />
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                isLoading ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-teal-600 hover:text-teal-500">
                Sign in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
