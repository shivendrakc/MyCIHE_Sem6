import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuthSuccess = async () => {
      try {
        // Get URL parameters using location.search
        const searchParams = new URLSearchParams(location.search);
        const token = searchParams.get('token');
        const userInfo = searchParams.get('user');
        const error = searchParams.get('error');

        // Debug logs
        console.log('Raw URL search:', location.search);
        console.log('Auth success params:', {
          hasToken: !!token,
          hasUserInfo: !!userInfo,
          error,
          tokenValue: token,
          userInfoValue: userInfo
        });

        // Check for error parameter first
        if (error) {
          console.error('Authentication error:', error);
          toast.error('Authentication failed. Please try again.');
          navigate(`/login?error=${error}`);
          return;
        }

        // Validate required data
        if (!token || !userInfo) {
          console.error('Missing authentication data:', { 
            token: !!token, 
            userInfo: !!userInfo,
            rawToken: token,
            rawUserInfo: userInfo
          });
          toast.error('Authentication data is missing. Please try again.');
          navigate('/login?error=missing_auth_data');
          return;
        }

        // Parse user info
        let decodedUserInfo;
        try {
          decodedUserInfo = JSON.parse(decodeURIComponent(userInfo));
          console.log('Decoded user info:', decodedUserInfo);
        } catch (parseError) {
          console.error('Error parsing user data:', parseError);
          console.error('Raw user info:', userInfo);
          toast.error('Invalid user data received. Please try again.');
          navigate('/login?error=invalid_user_data');
          return;
        }

        // Validate user info structure
        if (!decodedUserInfo || !decodedUserInfo.role || !decodedUserInfo.id) {
          console.error('Invalid user data structure:', decodedUserInfo);
          toast.error('Invalid user data structure. Please try again.');
          navigate('/login?error=invalid_user_structure');
          return;
        }

        // Store auth data
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(decodedUserInfo));

        // Normalize role to lowercase for consistent comparison
        const normalizedRole = decodedUserInfo.role.toLowerCase();

        // Debug log before redirect
        console.log('Redirecting user with role:', normalizedRole);

        // Show success message
        toast.success('Successfully logged in!');

        // Redirect based on role
        switch (normalizedRole) {
          case 'admin':
            navigate('/dashboard');
            break;
          case 'instructor':
            navigate('/dashboard');
            break;
          case 'student':
            navigate('/dashboard');
            break;
          default:
            console.error('Unknown role:', normalizedRole);
            toast.error('Invalid user role. Please contact support.');
            navigate('/login?error=invalid_role');
        }
      } catch (error) {
        console.error('Auth error:', error);
        // Clear any partial auth data
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        toast.error('Authentication failed. Please try again.');
        navigate('/login?error=auth_failed');
      }
    };

    handleAuthSuccess();
  }, [navigate, location]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#CDF3FF]">
      <div className="text-center bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-[#2e667d]">Processing authentication...</h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2e667d] mx-auto"></div>
        <p className="mt-4 text-gray-600">Please wait while we log you in...</p>
      </div>
    </div>
  );
};

export default AuthSuccess; 