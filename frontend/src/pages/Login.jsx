// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router'; 
// import { loginUser } from "../authSlice";
// import { useEffect, useState } from 'react';


// const loginSchema = z.object({
//   emailId: z.string().email("Invalid Email"),
//   password: z.string().min(8, "Password is too weak") 
// });

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(loginSchema) }); // Using renamed schema

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const onSubmit = (data) => {
//     dispatch(loginUser(data));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4 bg-base-200"> {/* Added bg for contrast */}
//       <div className="card w-96 bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title justify-center text-3xl mb-6">Leetcode</h2> {/* Added mb-6 */}

          
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <div className="form-control"> {/* Removed mt-4 from first form-control for tighter spacing to title or global error */}
//               <label className="label"> {/* Removed mb-1, default spacing should be fine */}
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="john@example.com"
//                 className={`input input-bordered w-full ${errors.emailId ? 'input-error' : ''}`} 
//                 {...register('emailId')}
//               />
//               {errors.emailId && (
//                 <span className="text-error text-sm mt-1">{errors.emailId.message}</span>
//               )}
//             </div>

//             <div className="form-control mt-4">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
//                   {...register('password')}
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                   onClick={() => setShowPassword(!showPassword)}
//                   aria-label={showPassword ? "Hide password" : "Show password"}
//                 >
//                   {showPassword ? (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   ) : (
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <span className="text-error text-sm mt-1">{errors.password.message}</span>
//               )}
//             </div>

//             <div className="form-control mt-8 flex justify-center">
//               <button
//                 type="submit"
//                 className={`btn btn-primary ${loading ? 'loading btn-disabled' : ''}`} // Added btn-disabled for better UX with loading
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <>
//                     <span className="loading loading-spinner"></span>
//                     Logging in...
//                   </>
//                 ) : 'Login'}
//               </button>
//             </div>
//           </form>
//           <div className="text-center mt-6">
//             <span className="text-sm">
//               Don't have an account?{' '} {/* Adjusted text slightly */}
//               <NavLink to="/signup" className="link link-primary">
//                 Sign Up
//               </NavLink>
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, NavLink } from 'react-router';
// import { loginUser } from "../authSlice";
// import { useEffect, useState } from 'react';

// const loginSchema = z.object({
//   emailId: z.string().email("Invalid Email"),
//   password: z.string().min(8, "Password must be at least 8 characters")
// });

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: zodResolver(loginSchema) });

//   useEffect(() => {
//     if (isAuthenticated) navigate('/');
//   }, [isAuthenticated]);

//   const onSubmit = (data) => {
//     dispatch(loginUser(data));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4
//       bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">

//       {/* CARD */}
//       <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-gray-700">

//         {/* 🔥 TOP GRADIENT (MATCH HEADER) */}
//         <div className="bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 p-5 text-center">
//           <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
//             ⚡ CodeForge
//           </h1>
//           <p className="text-sm text-white/80 mt-1">
//            Think. Solve. Master.
//           </p>
//         </div>

//         {/* FORM AREA */}
//         <div className="bg-gray-900/90 backdrop-blur-lg p-8">

         

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

//             {/* EMAIL */}
//             <div>
//               <label className="text-sm text-gray-300 mb-1 block">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="you@codeforge.dev"
//                 className={`w-full px-4 py-2 rounded-lg bg-gray-800 border
//                   ${errors.emailId ? 'border-red-500' : 'border-gray-700'}
//                   focus:outline-none focus:ring-2 focus:ring-purple-500`}
//                 {...register('emailId')}
//               />
//               {errors.emailId && (
//                 <p className="text-red-400 text-xs mt-1">
//                   {errors.emailId.message}
//                 </p>
//               )}
//             </div>

//             {/* PASSWORD */}
//             <div>
//               <label className="text-sm text-gray-300 mb-1 block">
//                 Password
//               </label>

//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   className={`w-full px-4 py-2 rounded-lg bg-gray-800 border pr-10
//                     ${errors.password ? 'border-red-500' : 'border-gray-700'}
//                     focus:outline-none focus:ring-2 focus:ring-pink-500`}
//                   {...register('password')}
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-pink-400"
//                 >
//                   {showPassword ? "🙈" : "👁️"}
//                 </button>
//               </div>

//               {errors.password && (
//                 <p className="text-red-400 text-xs mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             {/* BUTTON */}
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-2 rounded-lg font-semibold transition-all duration-300
//                 ${
//                   loading
//                     ? 'bg-gray-600 cursor-not-allowed'
//                     : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 shadow-lg'
//                 }`}
//             >
//               {loading ? "Signing in..." : "Login"}
//             </button>

//           </form>

//           {/* FOOTER */}
//           <p className="text-center text-sm text-gray-400 mt-6">
//             New to CodeForge?{" "}
//             <NavLink to="/signup" className="text-pink-400 hover:underline">
//               Create account
//             </NavLink>
//           </p>

//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router';
import { loginUser } from "../authSlice";
import { useEffect, useState, useRef } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
// Validation schema – no min length, but fields are required
const loginSchema = z.object({
  emailId: z.string().nonempty("Email is required").email("Invalid Email"),
  password: z.string().nonempty("Password is required")
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // banner text
  const timerRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,          // to clear react-hook-form errors if needed
  } = useForm({ resolver: zodResolver(loginSchema) });

   useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  // Auto‑hide banner after 3 seconds
  useEffect(() => {
    if (errorMessage) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setErrorMessage("");
        timerRef.current = null;
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [errorMessage]);

  const clearError = () => {
    setErrorMessage("");
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    clearErrors();
  };

  // When Redux error changes (server response), show it
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    clearError();

    await handleSubmit(
      (data) => dispatch(loginUser(data)),
      (formErrors) => {
        const firstError = formErrors.emailId || formErrors.password;
        if (firstError) setErrorMessage(firstError.message);
      }
    )();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4
      bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white">

      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-gray-700">

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-500 to-pink-500 p-5 text-center">
          <h1 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            ⚡ CodeForge
          </h1>
          <p className="text-sm text-white/80 mt-1">
            Think. Solve. Master.
          </p>
        </div>

        {/* Form Area */}
        <div className="bg-gray-900/90 backdrop-blur-lg p-8">

          {/* ⚠️ Big Transient Error Banner */}
        
    {errorMessage && (
  <div className="mb-6 rounded-xl border border-pink-500/40 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-pink-500/10 px-4 py-3 shadow-md backdrop-blur-sm">
    <p className="text-center text-sm font-semibold tracking-wide text-pink-200">
      ⚠️ Please provide a valid email and password.
    </p>
  </div>
)}
          <form onSubmit={handleFormSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Email</label>
              <input
                type="email"
                placeholder="you@codeforge.dev"
                className={`w-full px-4 py-2 rounded-lg bg-gray-800 border
                  ${errors.emailId ? 'border-red-500' : 'border-gray-700'}
                  focus:outline-none focus:ring-2 focus:ring-purple-500`}
                {...register('emailId')}
                onFocus={clearError}   // hide banner when user focuses the field
              />
              {/* No field‑specific error messages */}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 rounded-lg bg-gray-800 border pr-10
                    ${errors.password ? 'border-red-500' : 'border-gray-700'}
                    focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  {...register('password')}
                  onFocus={clearError}   // hide banner when user focuses the field
                />
                
               
                  <button
  type="button"
  onClick={() => setShowPassword(prev => !prev)}
  className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-pink-400"
>
  {showPassword ? "🙈" : "👁️"}
</button>
              </div>
              {/* No field‑specific error messages */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg font-semibold transition-all duration-300
                ${
                  loading
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 shadow-lg'
                }`}
            >
              {loading ? "Signing in..." : "Login"}
            </button>

          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-6">
            New to CodeForge?{" "}
            <NavLink to="/signup" className="text-pink-400 hover:underline">
              Create account
            </NavLink>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;