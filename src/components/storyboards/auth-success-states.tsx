export default function AuthSuccessStatesStoryboard() {
  return (
    <div className="p-8 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Authentication Success States</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Sign Up Success</h3>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thanks for signing up! We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
            </p>
            
            <div className="p-4 bg-blue-50 rounded-md text-blue-700 mb-6">
              <p>You'll be able to access all features once your email is verified.</p>
            </div>
            
            <button 
              type="button" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Go to Sign In
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Email Verification Success</h3>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified. You now have full access to all features of the platform.
            </p>
            
            <button 
              type="button" 
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Password Reset Email Sent</h3>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to your email address. Please check your inbox and click the link to reset your password.
            </p>
            
            <div className="p-4 bg-blue-50 rounded-md text-blue-700 mb-6">
              <p>The link will expire in 24 hours for security reasons.</p>
            </div>
            
            <button 
              type="button" 
              className="bg-blue-600