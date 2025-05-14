import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/userModel.js';
import InstructorProfile from '../models/InstructorModel.js';
import bcrypt from 'bcryptjs';

dotenv.config();

const fakeInstructors = [
  {
    user: {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      password: "Password123!",
      role: "instructor",
      isApproved: true,
      avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    },
    profile: {
      bio: "Experienced driving instructor with a passion for teaching. Specialized in defensive driving techniques and helping nervous drivers gain confidence.",
      car: {
        model: "Toyota Corolla",
        year: 2022
      },
      method: "Manual",
      experience: 8,
      nationality: "Australian",
      hourlyRate: 65,
      suburb: "Parramatta",
      availability: [
        {
          date: "2024-03-20",
          timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"]
        },
        {
          date: "2024-03-21",
          timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"]
        }
      ],
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    }
  },
  {
    user: {
      name: "Michael Chen",
      email: "michael.chen@example.com",
      password: "Password123!",
      role: "instructor",
      isApproved: true,
      avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    },
    profile: {
      bio: "Patient and detail-oriented instructor with expertise in both manual and automatic vehicles. Focus on building strong foundation skills.",
      car: {
        model: "Honda Civic",
        year: 2023  
      },
      method: "Both",
      experience: 5,
      nationality: "Australian",
      hourlyRate: 60,
      suburb: "Chatswood",
      availability: [
        {
          date: "2024-03-20",
          timeSlots: ["10:00", "11:00", "13:00", "14:00", "15:00"]
        },
        {
          date: "2024-03-21",
          timeSlots: ["10:00", "11:00", "13:00", "14:00", "15:00"]
        }
      ],
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    }
  },
  {
    user: {
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      password: "Password123!",
      role: "instructor",
      isApproved: true,
      avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    },
    profile: {
      bio: "Friendly and encouraging instructor specializing in helping new drivers. Strong focus on safety and confidence building.",
      car: {
        model: "Mazda 3",
        year: 2022
      },
      method: "Automatic",
      experience: 6,
      nationality: "Australian",
      hourlyRate: 55,
      suburb: "Bondi",
      availability: [
        {
          date: "2024-03-20",
          timeSlots: ["08:00", "09:00", "10:00", "13:00", "14:00"]
        },
        {
          date: "2024-03-21",
          timeSlots: ["08:00", "09:00", "10:00", "13:00", "14:00"]
        }
      ],
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    }
  },
  {
    user: {
      name: "David Kumar",
      email: "david.kumar@example.com",
      password: "Password123!",
      role: "instructor",
      isApproved: true,
      avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    },
    profile: {
      bio: "Professional instructor with extensive experience in advanced driving techniques. Specialized in highway and night driving.",
      car: {
        model: "Hyundai i30",
        year: 2023
      },
      method: "Manual",
      experience: 10,
      nationality: "Australian",
      hourlyRate: 70,
      suburb: "Manly",
      availability: [
        {
          date: "2024-03-20",
          timeSlots: ["11:00", "12:00", "14:00", "15:00", "16:00"]
        },
        {
          date: "2024-03-21",
          timeSlots: ["11:00", "12:00", "14:00", "15:00", "16:00"]
        }
      ],
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    }
  },
  {
    user: {
      name: "Lisa Thompson",
      email: "lisa.thompson@example.com",
      password: "Password123!",
      role: "instructor",
      isApproved: true,
      avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    },
    profile: {
      bio: "Calm and patient instructor with a focus on building confidence in new drivers. Specialized in urban driving and parking techniques.",
      car: {
        model: "Kia Cerato",
        year: 2022
      },
      method: "Both",
      experience: 7,
      nationality: "Australian",
      hourlyRate: 58,
      suburb: "Burwood",
      availability: [
        {
          date: "2024-03-20",
          timeSlots: ["09:00", "10:00", "11:00", "13:00", "14:00"]
        },
        {
          date: "2024-03-21",
          timeSlots: ["09:00", "10:00", "11:00", "13:00", "14:00"]
        }
      ],
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    }
  },
  {
    user: {
      name: "James Wilson",
      email: "james.wilson@example.com",
      password: "Password123!",
      role: "instructor",
      isApproved: true,
      avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    },
    profile: {
      bio: "Experienced instructor specializing in defensive driving and advanced techniques. Perfect for drivers looking to improve their skills.",
      car: {
        model: "Volkswagen Golf",
        year: 2023
      },
      method: "Manual",
      experience: 9,
      nationality: "Australian",
      hourlyRate: 68,
      suburb: "Hornsby",
      availability: [
        {
          date: "2024-03-20",
          timeSlots: ["10:00", "11:00", "12:00", "14:00", "15:00"]
        },
        {
          date: "2024-03-21",
          timeSlots: ["10:00", "11:00", "12:00", "14:00", "15:00"]
        }
      ],
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    }
  },
  {
    user: {
      name: "Sophie Anderson",
      email: "sophie.anderson@example.com",
      password: "Password123!",
      role: "instructor",
      isApproved: true,
      avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    },
    profile: {
      bio: "Friendly and patient instructor with a focus on building confidence. Specialized in helping nervous drivers overcome their fears.",
      car: {
        model: "Suzuki Swift",
        year: 2022
      },
      method: "Automatic",
      experience: 4,
      nationality: "Australian",
      hourlyRate: 52,
      suburb: "Ryde",
      availability: [
        {
          date: "2024-03-20",
          timeSlots: ["08:00", "09:00", "10:00", "13:00", "14:00"]
        },
        {
          date: "2024-03-21",
          timeSlots: ["08:00", "09:00", "10:00", "13:00", "14:00"]
        }
      ],
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    }
  },
  {
    user: {
      name: "Robert Martinez",
      email: "robert.martinez@example.com",
      password: "Password123!",
      role: "instructor",
      isApproved: true,
      avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    },
    profile: {
      bio: "Professional instructor with expertise in both manual and automatic vehicles. Focus on practical skills and real-world scenarios.",
      car: {
        model: "Ford Focus",
        year: 2023
      },
      method: "Both",
      experience: 6,
      nationality: "Australian",
      hourlyRate: 62,
      suburb: "Liverpool",
      availability: [
        {
          date: "2024-03-20",
          timeSlots: ["11:00", "12:00", "13:00", "15:00", "16:00"]
        },
        {
          date: "2024-03-21",
          timeSlots: ["11:00", "12:00", "13:00", "15:00", "16:00"]
        }
      ],
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    }
  },
  {
    user: {
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      password: "Password123!",
      role: "instructor",
      isApproved: true,
      avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    },
    profile: {
      bio: "Experienced instructor with a passion for teaching. Specialized in helping international drivers adapt to Australian roads.",
      car: {
        model: "Nissan Pulsar",
        year: 2022
      },
      method: "Manual",
      experience: 8,
      nationality: "Australian",
      hourlyRate: 65,
      suburb: "Bankstown",
      availability: [
        {
          date: "2024-03-20",
          timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"]
        },
        {
          date: "2024-03-21",
          timeSlots: ["09:00", "10:00", "11:00", "14:00", "15:00"]
        }
      ],
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    }
  },
  {
    user: {
      name: "Thomas Brown",
      email: "thomas.brown@example.com",
      password: "Password123!",
      role: "instructor",
      isApproved: true,
      avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    },
    profile: {
      bio: "Professional instructor with a focus on safety and confidence building. Specialized in advanced driving techniques.",
      car: {
        model: "Toyota Camry",
        year: 2023
      },
      method: "Both",
      experience: 7,
      nationality: "Australian",
      hourlyRate: 60,
      suburb: "Penrith",
      availability: [
        {
          date: "2024-03-20",
          timeSlots: ["10:00", "11:00", "12:00", "13:00", "14:00"]
        },
        {
          date: "2024-03-21",
          timeSlots: ["10:00", "11:00", "12:00", "13:00", "14:00"]
        }
      ],
      profileImage: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"
    }
  }
];

const createFakeInstructors = async () => {
  try {
    await mongoose.connect('mongodb+srv://cihe22394:M72oa0ksf0OxRE0n@cluster0.hfocu.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0');
    console.log('Connected to MongoDB Atlas');

    // Clear existing data
    await User.deleteMany({ role: 'instructor' });
    await mongoose.connection.collection('instructorprofiles').deleteMany({});
    console.log('Cleared existing instructor data');

    for (const instructor of fakeInstructors) {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(instructor.user.password, salt);

      // Create user
      const user = await User.create({
        ...instructor.user,
        password: hashedPassword
      });
      console.log(`Created user: ${instructor.user.name}`);

      // Create instructor profile with explicit collection name
      const profileData = {
        ...instructor.profile,
        userId: user._id
      };
      
      const result = await mongoose.connection.collection('instructorprofiles').insertOne(profileData);
      console.log(`Created instructor profile for ${instructor.user.name} with ID: ${result.insertedId}`);
    }

    // Verify the data was inserted
    const count = await mongoose.connection.collection('instructorprofiles').countDocuments();
    console.log(`Total instructor profiles in database: ${count}`);

    console.log('All instructors created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating instructors:', error);
    process.exit(1);
  }
};

createFakeInstructors(); 