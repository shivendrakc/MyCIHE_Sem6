import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/* ── icons ──────────────────────────────────────── */
const SearchIcon  = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>;
const PinIcon     = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>;
const CarIcon     = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10l1.293 1.293A1 1 0 005 18h1m7-2h5l1.293-1.293A1 1 0 0020 14V8a1 1 0 00-1-1h-4l-2 2v7z"/></svg>;
const ClockIcon   = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
const StarIcon    = () => <svg className="w-3.5 h-3.5 text-[#00d4df]" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>;
const XIcon       = () => <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"/></svg>;
const FilterIcon  = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>;
const ChevronDown = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>;
const ChevronUp   = () => <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/></svg>;
const ArrowRight  = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>;
const CloseIcon   = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>;

/* ── select dropdown ────────────────────────────── */
const Select = ({ label, name, value, onChange, options }) => (
  <div className="relative">
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full appearance-none bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all cursor-pointer"
    >
      <option value="" className="bg-[#0f1829]">{label}</option>
      {options.map(({ value: v, label: l }) => (
        <option key={v} value={v} className="bg-[#0f1829]">{l}</option>
      ))}
    </select>
    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
      <ChevronDown />
    </div>
  </div>
);

/* ── tag chip ───────────────────────────────────── */
const Tag = ({ icon, label, onRemove }) => (
  <span className="inline-flex items-center gap-1.5 bg-[#00d4df]/10 border border-[#00d4df]/25 text-[#00d4df] text-xs font-medium px-2.5 py-1 rounded-full">
    {icon && <span>{icon}</span>}
    {label}
    {onRemove && (
      <button onClick={onRemove} className="ml-0.5 hover:text-white transition-colors">
        <XIcon />
      </button>
    )}
  </span>
);

/* ── star rating ────────────────────────────────── */
const Stars = ({ rating = 4.5 }) => (
  <div className="flex items-center gap-1">
    {[1,2,3,4,5].map((i) => (
      <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'text-[#00d4df]' : 'text-white/15'}`} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
    <span className="text-gray-400 text-xs ml-0.5">({rating})</span>
  </div>
);

/* ════════════════════════════════════════════════ */
const Instructors = () => {
  const navigate = useNavigate();
  const [instructors, setInstructors]           = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [error, setError]                       = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [expandedBio, setExpandedBio]           = useState({});
  const [filters, setFilters] = useState({ method: '', experience: '', priceRange: '', search: '', suburb: '' });

  const userInfo  = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const isInstructor = userInfo?.role === 'instructor';
  const isAdmin      = userInfo?.role === 'admin';

  useEffect(() => { fetchInstructors(); }, []);

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found');
      const { data } = await axios.get(`${BACKEND_URL}/api/instructors`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setInstructors(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch instructors');
      setInstructors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const clearFilters = () => setFilters({ method: '', experience: '', priceRange: '', search: '', suburb: '' });
  const toggleBio = (id) => setExpandedBio((p) => ({ ...p, [id]: !p[id] }));

  const filtered = instructors.filter((ins) => {
    const p = ins.profile;
    if (filters.method     && p.method !== filters.method) return false;
    if (filters.experience) {
      if (filters.experience === '0-5'   && p.experience > 5)  return false;
      if (filters.experience === '5-10'  && (p.experience <= 5 || p.experience > 10)) return false;
      if (filters.experience === '10+'   && p.experience <= 10) return false;
    }
    if (filters.priceRange) {
      if (filters.priceRange === '0-50'  && p.hourlyRate > 50)  return false;
      if (filters.priceRange === '50-70' && (p.hourlyRate <= 50 || p.hourlyRate > 70)) return false;
      if (filters.priceRange === '70+'   && p.hourlyRate <= 70) return false;
    }
    if (filters.search && !ins.user.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !p.bio?.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.suburb && !p.suburb?.toLowerCase().includes(filters.suburb.toLowerCase())) return false;
    return true;
  });

  const uniqueSuburbs = [...new Set(instructors.map((i) => i.profile.suburb).filter(Boolean))].sort();
  const hasActiveFilters = filters.method || filters.experience || filters.priceRange || filters.suburb;

  /* ── states ───────────────────────────────────── */
  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <svg className="animate-spin h-8 w-8 text-[#00d4df]" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
      </svg>
    </div>
  );

  if (error) return (
    <div className="p-6">
      <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-5 py-4 text-sm flex items-center gap-3">
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        {error}
      </div>
    </div>
  );

  /* ── main ─────────────────────────────────────── */
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-white">Find Instructors</h1>
          <p className="text-gray-400 text-sm mt-0.5">{filtered.length} instructor{filtered.length !== 1 ? 's' : ''} available</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0f1829] border border-white/8 rounded-2xl overflow-hidden">
        {/* Filter header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/8">
          <div className="flex items-center gap-2 text-sm font-semibold text-white">
            <span className="text-[#00d4df]"><FilterIcon /></span>
            Search & Filters
          </div>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="flex items-center gap-1.5 text-gray-400 hover:text-[#00d4df] text-xs font-medium transition-colors">
              <XIcon /> Clear all
            </button>
          )}
        </div>

        <div className="p-5 space-y-4">
          {/* Search bar */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name or bio…"
              className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:border-[#00d4df]/50 focus:ring-1 focus:ring-[#00d4df]/30 transition-all"
            />
            {filters.search && (
              <button
                onClick={() => setFilters((p) => ({ ...p, search: '' }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              >
                <CloseIcon />
              </button>
            )}
          </div>

          {/* Filter dropdowns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Select label="All Locations" name="suburb" value={filters.suburb} onChange={handleFilterChange}
              options={uniqueSuburbs.map((s) => ({ value: s, label: s }))} />
            <Select label="Transmission" name="method" value={filters.method} onChange={handleFilterChange}
              options={[{ value: 'Manual', label: 'Manual' }, { value: 'Automatic', label: 'Automatic' }, { value: 'Both', label: 'Both' }]} />
            <Select label="Experience" name="experience" value={filters.experience} onChange={handleFilterChange}
              options={[{ value: '0-5', label: '0–5 years' }, { value: '5-10', label: '5–10 years' }, { value: '10+', label: '10+ years' }]} />
            <Select label="Price Range" name="priceRange" value={filters.priceRange} onChange={handleFilterChange}
              options={[{ value: '0-50', label: '$0 – $50' }, { value: '50-70', label: '$50 – $70' }, { value: '70+', label: '$70+' }]} />
          </div>

          {/* Active filter tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-1">
              {filters.suburb    && <Tag label={`Location: ${filters.suburb}`}    onRemove={() => setFilters((p) => ({ ...p, suburb: '' }))} />}
              {filters.method    && <Tag label={`Transmission: ${filters.method}`} onRemove={() => setFilters((p) => ({ ...p, method: '' }))} />}
              {filters.experience && <Tag label={`Experience: ${filters.experience}`} onRemove={() => setFilters((p) => ({ ...p, experience: '' }))} />}
              {filters.priceRange && <Tag label={`Price: ${filters.priceRange}`}  onRemove={() => setFilters((p) => ({ ...p, priceRange: '' }))} />}
            </div>
          )}
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </div>
          <p className="text-white font-semibold mb-1">No instructors found</p>
          <p className="text-gray-400 text-sm">Try adjusting your filters</p>
        </div>
      )}

      {/* Instructor grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((instructor) => {
          const p   = instructor.profile;
          const img = p.profileImage
            ? `${BACKEND_URL}${p.profileImage}`
            : 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg';

          return (
            <div
              key={instructor._id}
              className="bg-[#0f1829] border border-white/8 rounded-2xl overflow-hidden flex flex-col hover:border-[#00d4df]/30 hover:shadow-[0_0_25px_rgba(0,212,223,0.08)] transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-44 flex-shrink-0 overflow-hidden">
                <img
                  src={img}
                  alt={instructor.user.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1829] via-transparent to-transparent" />
                {/* Price badge */}
                <div className="absolute top-3 right-3 bg-[#080d1a]/80 backdrop-blur-sm border border-[#00d4df]/30 rounded-lg px-2.5 py-1">
                  <span className="text-[#00d4df] text-xs font-bold">${p.hourlyRate}/hr</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-4 gap-3">
                {/* Name + location */}
                <div>
                  <h3 className="text-white font-bold text-base leading-tight">{instructor.user.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-gray-400">
                    <PinIcon />
                    <span className="text-xs">{p.suburb || 'Location not set'}</span>
                  </div>
                </div>

                {/* Stars */}
                <Stars rating={4.5} />

                {/* Bio */}
                <div>
                  <p className={`text-gray-400 text-xs leading-relaxed transition-all ${expandedBio[instructor._id] ? '' : 'line-clamp-2'}`}>
                    {p.bio || 'No bio available.'}
                  </p>
                  {p.bio && p.bio.length > 80 && (
                    <button
                      onClick={() => toggleBio(instructor._id)}
                      className="flex items-center gap-1 text-[#00d4df] text-xs mt-1 hover:underline"
                    >
                      {expandedBio[instructor._id] ? <><ChevronUp /> Show less</> : <><ChevronDown /> Read more</>}
                    </button>
                  )}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {p.car && (
                    <Tag icon={<CarIcon />}   label={`${p.car.make} ${p.car.model}`} />
                  )}
                  <Tag icon={<ClockIcon />}   label={`${p.experience}y exp`} />
                  <Tag icon={<CarIcon />}     label={p.method} />
                </div>

                {/* Book button */}
                {!isInstructor && !isAdmin && (
                  <button
                    onClick={() => setSelectedInstructor(instructor)}
                    className="mt-auto w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,223,0.3)] transition-all duration-200 hover:scale-[1.02] text-sm"
                  >
                    Book Now <ArrowRight />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking confirmation modal */}
      {selectedInstructor && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1829] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
              <h3 className="text-lg font-bold text-white">Book a Lesson</h3>
              <button onClick={() => setSelectedInstructor(null)} className="text-gray-400 hover:text-white transition-colors">
                <CloseIcon />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <img
                  src={selectedInstructor.profile.profileImage
                    ? `${BACKEND_URL}${selectedInstructor.profile.profileImage}`
                    : 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'}
                  alt={selectedInstructor.user.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[#00d4df]/30 flex-shrink-0"
                />
                <div>
                  <div className="text-white font-bold">{selectedInstructor.user.name}</div>
                  <div className="text-gray-400 text-sm">{selectedInstructor.profile.method} Instructor</div>
                  <div className="text-[#00d4df] text-sm font-semibold mt-0.5">${selectedInstructor.profile.hourlyRate}/hr</div>
                </div>
              </div>

              <p className="text-gray-400 text-sm">
                Would you like to proceed with booking a lesson with this instructor?
              </p>
            </div>

            {/* Modal footer */}
            <div className="flex items-center gap-3 px-6 py-4 border-t border-white/8">
              <button
                onClick={() => setSelectedInstructor(null)}
                className="flex-1 border border-white/15 text-gray-300 hover:text-white hover:border-white/30 font-semibold py-2.5 rounded-xl transition-all hover:bg-white/5 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  navigate('/dashboard/book-lessons', { state: { selectedInstructor } });
                  setSelectedInstructor(null);
                }}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#00d4df] to-[#1b9aa0] text-[#080d1a] font-bold py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(0,212,223,0.3)] transition-all text-sm"
              >
                Proceed <ArrowRight />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructors;
