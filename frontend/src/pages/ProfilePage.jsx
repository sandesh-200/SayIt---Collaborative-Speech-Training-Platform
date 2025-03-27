import React from 'react';
import { Mail, MapPin, Calendar, Edit } from 'lucide-react';
import { useProfile } from '../context/ProfileContext';



const ProfilePage = ({ user = {
  name: "John Doe",
  username: "@johndoe",
  bio: "Product designer and developer based in New York. Passionate about creating intuitive user experiences and building accessible web applications.",
  email: "john.doe@example.com",
  location: "New York, USA",
  joinDate: "January 2020",
  profileImage: "/api/placeholder/200/200"
}}) => {

  const {profile} = useProfile()
  console.log(profile)

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-teal-600 h-32 md:h-48"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-20">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-6">
            {/* Profile Image */}
            <div className="relative">
              <img 
                src={user.profileImage} 
                alt={user.name} 
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-md object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-teal-600 text-white p-1 rounded-full shadow-sm hover:bg-teal-700 transition-colors">
                <Edit size={16} />
              </button>
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.user.first_name} {profile.user.last_name}</h1>
                  <p className="text-gray-500">{profile.user.username}</p>
                </div>
                <button className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                  Edit Profile
                </button>
              </div>
              
              {/* User Meta */}
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                {profile.user.email && <Mail size={16} />}

                  <span>{profile.user.email && profile.user.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>Set join date here</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200"></div>
          
          {/* Bio Section */} 
          {profile.bio &&
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Bio</h2>
            <p className="text-gray-700 whitespace-pre-line">{profile.bio}</p>
          </div>
            }
          
          {/* Additional Sections */}
          <div className="border-t border-gray-200"></div>
          
          <div className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="bg-gray-50 p-6 rounded-lg text-center text-gray-500">
              No recent activity to display
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;