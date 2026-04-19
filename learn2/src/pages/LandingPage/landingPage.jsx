import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Car from '../../assets/car.png';
import axios from 'axios';
import {
  UserIcon,
  UsersIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';

// Fade-in on scroll hook
function useFadeIn() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

const FadeSection = ({ children, className = '', delay = 0 }) => {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const STATS = [
  { icon: UserIcon,        value: '200+',      label: 'Certified Instructors' },
  { icon: UsersIcon,       value: '2,334+',    label: 'Active Learners' },
  { icon: CalendarDaysIcon,value: '828k+',     label: 'Lessons Conducted' },
  { icon: CreditCardIcon,  value: '1,926+',    label: 'Successful Payments' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah',
    location: 'Parramatta',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Super easy to use and my instructor was amazing! The booking process was seamless and the lessons were exactly what I needed.',
  },
  {
    name: 'James',
    location: 'Sydney CBD',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'I was nervous about learning to drive, but my instructor made me feel comfortable right away. The platform made finding and booking lessons so simple.',
  },
  {
    name: 'Emma',
    location: 'North Sydney',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'The flexibility to choose my instructor and schedule was perfect for my busy lifestyle. I passed my test on the first try!',
  },
];

const SERVICES = [
  {
    title: 'Personalized Matching',
    image: 'https://images.unsplash.com/photo-1630406144797-821be1f35d75?q=80&w=800&auto=format&fit=crop',
    features: ['Matched by location & style', '1-on-1 support', 'Certified instructors only', 'Transparent process'],
    backTitle: 'Why Personalized Matching?',
    backText: 'Personalized matching ensures you\'re paired with the right instructor who fits your schedule, learning style, and location — making your journey smoother and more effective.',
  },
  {
    title: 'Easy Lesson Scheduling',
    image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop',
    features: ['Real-Time Booking', 'Flexible Time Slots', 'Instant Notifications', 'Calendar Integration'],
    backTitle: 'Why Easy Scheduling?',
    backText: 'Book lessons in real time based on instructor availability. Get instant confirmations, flexible rescheduling, and calendar reminders — all designed to keep your journey stress-free.',
  },
  {
    title: 'Progress Tracking',
    image: 'https://plus.unsplash.com/premium_photo-1682309553075-c84ea8d9d49a?q=80&w=800&auto=format&fit=crop',
    features: ['Lesson Completion Status', 'Skill Level Updates', 'Session Recap Logs', 'Goal Milestone Alerts'],
    backTitle: 'Why Progress Tracking?',
    backText: 'Stay on top of your journey with real-time progress tracking. Know exactly where you stand after every lesson and get timely reminders to hit key driving milestones.',
  },
];

const Learn2Drive = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [flipped, setFlipped] = useState([false, false, false]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Please enter a valid email';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/contact/submit`, formData);
      if (response.data.success) {
        setFormData({ name: '', email: '', message: '' });
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 3000);
      } else {
        setErrors({ submit: response.data.error || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setErrors({ submit: error.response?.data?.error || 'Failed to send message. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFlip = (i, val) => {
    setFlipped((prev) => prev.map((f, idx) => (idx === i ? val : f)));
  };

  return (
    <div className="w-full bg-[#080d1a] text-white overflow-x-hidden">

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#0f1829] border border-[#00d4df]/30 rounded-2xl p-10 max-w-sm w-full mx-4 shadow-[0_0_60px_rgba(0,212,223,0.15)] text-center">
            <div className="w-16 h-16 bg-[#00d4df]/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <CheckCircleIcon className="w-8 h-8 text-[#00d4df]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
            <p className="text-gray-400 text-sm">We'll get back to you as soon as possible.</p>
          </div>
        </div>
      )}

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background glow blobs */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[#00d4df]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-[#1b9aa0]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left — copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-[#00d4df]/10 border border-[#00d4df]/25 rounded-full px-4 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00d4df] animate-pulse" />
              <span className="text-[#00d4df] text-sm font-medium">Australia's #1 Driving Platform</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Learn to Drive
              <br />
              <span className="bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] bg-clip-text text-transparent">
                with Confidence
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg">
              Connect with certified instructors, book lessons instantly, and track your progress — all in one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/register')}
                className="group flex items-center gap-3 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(0,212,223,0.3)] hover:shadow-[0_0_50px_rgba(0,212,223,0.5)] transition-all duration-300 hover:scale-105"
              >
                Start Learning
                <ArrowRightIcon className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:bg-white/5"
              >
                Learn More
              </button>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-white/8">
              {[['200+', 'Instructors'], ['2,334+', 'Learners'], ['828k+', 'Lessons']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="text-2xl font-bold text-white">{val}</div>
                  <div className="text-gray-500 text-sm">{lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — car image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4df]/20 to-transparent rounded-3xl blur-2xl scale-110" />
              <img
                src={Car}
                alt="Car on Road"
                className="relative w-full max-w-lg drop-shadow-2xl hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────── */}
      <section className="py-28 px-6 md:px-10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080d1a] via-[#0a1020] to-[#080d1a] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <FadeSection className="text-center mb-20">
            <p className="text-[#00d4df] text-sm font-semibold tracking-widest uppercase mb-3">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-bold">Get Started in 3 Steps</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">From signup to your first lesson in minutes</p>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-14 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-transparent via-[#00d4df]/30 to-transparent" />

            {[
              { num: '01', icon: UserIcon,         title: 'Create Account',     desc: 'Sign up in minutes with just your basic details.' },
              { num: '02', icon: UsersIcon,         title: 'Find Instructor',    desc: 'Browse certified instructors and pick your perfect match.' },
              { num: '03', icon: CalendarDaysIcon,  title: 'Book & Drive',       desc: 'Schedule your first lesson and start building skills.' },
            ].map((step, i) => (
              <FadeSection key={step.num} delay={i * 120}>
                <div className="relative bg-white/[0.04] border border-white/8 rounded-2xl p-8 text-center hover:border-[#00d4df]/30 hover:bg-white/[0.07] transition-all duration-300 group">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#080d1a] px-3">
                    <span className="text-[#00d4df] text-xs font-bold tracking-widest">{step.num}</span>
                  </div>
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00d4df]/15 to-[#1b9aa0]/15 border border-[#00d4df]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:border-[#00d4df]/50 transition-all duration-300">
                    <step.icon className="w-7 h-7 text-[#00d4df]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeSection>
            ))}
          </div>

          <FadeSection className="text-center mt-14">
            <button
              onClick={() => navigate('/register')}
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold px-8 py-4 rounded-xl hover:shadow-[0_0_40px_rgba(0,212,223,0.35)] transition-all duration-300 hover:scale-105"
            >
              Start Your Journey
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </FadeSection>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="about" className="py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <FadeSection>
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#00d4df]/15 to-[#1b9aa0]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl border border-white/8">
                <img
                  src="https://images.unsplash.com/photo-1587808326264-bb8e737b1f4d?q=80&w=900"
                  alt="Instructor with student"
                  className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080d1a]/80 via-transparent to-transparent" />
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-5 py-3">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-gray-300 text-xs">Pass rate on first attempt</div>
                </div>
              </div>
            </div>
          </FadeSection>

          {/* Content */}
          <FadeSection delay={150}>
            <div className="space-y-8">
              <div>
                <p className="text-[#00d4df] text-sm font-semibold tracking-widest uppercase mb-3">About Us</p>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  We're passionate about
                  <span className="bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] bg-clip-text text-transparent"> safe driving</span>
                </h2>
              </div>

              <p className="text-gray-400 text-lg leading-relaxed">
                At Learn2Drive, we connect you with certified instructors who care about your progress and confidence on the road — whether you're starting from scratch or picking up where you left off.
              </p>

              <div className="space-y-4">
                {[
                  { icon: UserIcon,         text: 'Personalized lesson plans tailored to your pace' },
                  { icon: CalendarDaysIcon, text: 'Real-time availability and instant booking' },
                  { icon: CreditCardIcon,   text: 'Transparent, upfront pricing — no surprises' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#00d4df]/10 border border-[#00d4df]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#00d4df]" />
                    </div>
                    <p className="text-gray-300">{item.text}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-400 leading-relaxed">
                Our platform is built to make learning to drive flexible and stress-free. With a few clicks, find the right instructor, book a session, and start building your driving skills with confidence.
              </p>
            </div>
          </FadeSection>
        </div>
      </section>

      {/* ── SERVICES ──────────────────────────────────────── */}
      <section id="services" className="py-28 px-6 md:px-10 bg-[#0a1020]">
        <div className="max-w-7xl mx-auto">
          <FadeSection className="text-center mb-20">
            <p className="text-[#00d4df] text-sm font-semibold tracking-widest uppercase mb-3">Our Promise</p>
            <h2 className="text-4xl md:text-5xl font-bold">What We Offer</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Everything you need for a seamless learning experience</p>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((svc, i) => (
              <FadeSection key={svc.title} delay={i * 120}>
                {/* Flip card container */}
                <div className="w-full h-[520px]" style={{ perspective: '1200px' }}>
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: flipped[i] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    {/* FRONT */}
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden border border-white/8 bg-[#0f1829] flex flex-col"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <div className="relative h-48 flex-shrink-0 overflow-hidden">
                        <img src={svc.image} alt={svc.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1829] to-transparent" />
                      </div>
                      <div className="flex flex-col flex-1 p-7">
                        <h3 className="text-xl font-bold mb-4">{svc.title}</h3>
                        <ul className="space-y-2.5 flex-1">
                          {svc.features.map((f) => (
                            <li key={f} className="flex items-center gap-3 text-gray-400 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#00d4df] flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => toggleFlip(i, true)}
                          className="mt-6 w-full py-3 rounded-xl border border-[#00d4df]/30 text-[#00d4df] font-semibold text-sm hover:bg-[#00d4df]/10 transition-all duration-200"
                        >
                          Learn More
                        </button>
                      </div>
                    </div>

                    {/* BACK */}
                    <div
                      className="absolute inset-0 rounded-2xl border border-[#00d4df]/25 bg-gradient-to-br from-[#0f1e2e] to-[#0a1a2a] flex flex-col justify-center items-center text-center p-10"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <div className="w-14 h-14 bg-[#00d4df]/10 border border-[#00d4df]/25 rounded-2xl flex items-center justify-center mb-6">
                        <div className="w-6 h-6 bg-[#00d4df] rounded-full" />
                      </div>
                      <h3 className="text-xl font-bold mb-5">{svc.backTitle}</h3>
                      <p className="text-gray-300 leading-relaxed text-sm">{svc.backText}</p>
                      <button
                        onClick={() => toggleFlip(i, false)}
                        className="mt-8 flex items-center gap-2 text-[#00d4df] font-semibold text-sm hover:gap-3 transition-all duration-200"
                      >
                        <ChevronLeftIcon className="w-4 h-4" />
                        Go Back
                      </button>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────── */}
      <section className="py-28 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <FadeSection className="text-center mb-20">
            <p className="text-[#00d4df] text-sm font-semibold tracking-widest uppercase mb-3">Our Impact</p>
            <h2 className="text-4xl md:text-5xl font-bold">Numbers That Matter</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Join thousands of learners who've built their confidence on the road with us</p>
          </FadeSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <FadeSection key={stat.label} delay={i * 80}>
                <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-8 text-center hover:border-[#00d4df]/30 hover:bg-white/[0.07] transition-all duration-300 group">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#00d4df]/15 to-[#1b9aa0]/15 border border-[#00d4df]/20 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:border-[#00d4df]/50 transition-all">
                    <stat.icon className="w-6 h-6 text-[#00d4df]" />
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-28 px-6 md:px-10 bg-[#0a1020]">
        <div className="max-w-7xl mx-auto">
          <FadeSection className="text-center mb-20">
            <p className="text-[#00d4df] text-sm font-semibold tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="text-4xl md:text-5xl font-bold">What Learners Say</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Real stories from real students across Australia</p>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <FadeSection key={t.name} delay={i * 120}>
                <div className="bg-[#0f1829] border border-white/8 rounded-2xl p-8 hover:border-[#00d4df]/25 transition-all duration-300 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} className="w-4 h-4 text-[#00d4df]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed flex-1 text-sm">"{t.text}"</p>
                  <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/8">
                    <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover ring-2 ring-[#00d4df]/30" />
                    <div>
                      <div className="font-semibold text-white text-sm">{t.name}</div>
                      <div className="text-[#00d4df] text-xs">{t.location}</div>
                    </div>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <FadeSection className="text-center mb-16">
            <p className="text-[#00d4df] text-sm font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
            <h2 className="text-4xl md:text-5xl font-bold">Have a Question?</h2>
            <p className="text-gray-400 mt-4 max-w-xl mx-auto">Send us a message and we'll get back to you shortly.</p>
          </FadeSection>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Info panel */}
            <FadeSection className="md:col-span-2">
              <div className="bg-gradient-to-br from-[#00d4df]/10 to-[#1b9aa0]/10 border border-[#00d4df]/20 rounded-2xl p-8 h-full">
                <h3 className="text-xl font-bold mb-8">Contact Info</h3>
                <div className="space-y-6">
                  {[
                    {
                      label: 'Email',
                      value: 'support@learn2drive.com',
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Phone',
                      value: '+61 2 1234 5678',
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'Location',
                      value: 'Sydney, Australia',
                      icon: (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      ),
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#00d4df]/10 border border-[#00d4df]/20 rounded-xl flex items-center justify-center flex-shrink-0 text-[#00d4df]">
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-gray-400 text-xs mb-0.5">{item.label}</div>
                        <div className="text-white text-sm font-medium">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeSection>

            {/* Form */}
            <FadeSection className="md:col-span-3" delay={150}>
              <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errors.submit && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
                      {errors.submit}
                    </div>
                  )}

                  {[
                    { field: 'name',    type: 'text',  placeholder: 'Your full name' },
                    { field: 'email',   type: 'email', placeholder: 'you@example.com' },
                  ].map(({ field, type, placeholder }) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-300 mb-1.5 capitalize">{field}</label>
                      <input
                        type={type}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all"
                      />
                      {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all resize-none"
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold py-3.5 rounded-xl hover:shadow-[0_0_30px_rgba(0,212,223,0.3)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-10 bg-[#0a1020]">
        <FadeSection>
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-[#00d4df]/10 to-[#1b9aa0]/10 border border-[#00d4df]/20 rounded-3xl py-16 px-8 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-[#00d4df] to-transparent" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">Ready to Hit the Road?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Join over 2,000 learners across Australia who chose Learn2Drive.
            </p>
            <button
              onClick={() => navigate('/register')}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold px-10 py-4 rounded-xl text-lg shadow-[0_0_40px_rgba(0,212,223,0.3)] hover:shadow-[0_0_60px_rgba(0,212,223,0.5)] transition-all duration-300 hover:scale-105"
            >
              Get Started Free
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </FadeSection>
      </section>

      <Footer />
    </div>
  );
};

export default Learn2Drive;
