import React, { useState } from 'react';

const cities =  [
  "Agartala",
  "Ahmedabad",
  "Aizawl",
  "Ajmer",
  "Alappuzha",
  "Aligarh",
  "Ambala",
  "Ambassa",
  "Amritsar",
  "Aurangabad",
  "Baghmara",
  "Bardhaman",
  "Belagavi",
  "Bengaluru",
  "Berhampur",
  "Bhagalpur",
  "Bhopal",
  "Bhubaneswar",
  "Bilaspur",
  "Bishnupur",
  "Bokaro",
  "Chandigarh",
  "Champhai",
  "Chennai",
  "Churachandpur",
  "Coimbatore",
  "Cuttack",
  "Darjeeling",
  "Dehradun",
  "Delhi",
  "Dhanbad",
  "Dimapur",
  "Dibrugarh",
  "Durg",
  "Durgapur",
  "Faridabad",
  "Gangtok",
  "Gaya",
  "Guntur",
  "Guwahati",
  "Gwalior",
  "Gyalshing",
  "Hamirpur",
  "Haridwar",
  "Haldwani",
  "Hubballi",
  "Hoshiarpur",
  "Hyderabad",
  "Imphal",
  "Indore",
  "Itanagar",
  "Jaipur",
  "Jabalpur",
  "Jagdalpur",
  "Jalandhar",
  "Jamnagar",
  "Jammu",
  "Jamshedpur",
  "Jorhat",
  "Jodhpur",
  "Jowai",
  "Kakching",
  "Kailasahar",
  "Kanpur",
  "Karimnagar",
  "Karnal",
  "Kochi",
  "Kohima",
  "Kolkata",
  "Korba",
  "Kota",
  "Kozhikode",
  "Leh",
  "Lucknow",
  "Ludhiana",
  "Lunglei",
  "Madurai",
  "Madanapalle",
  "Mandi",
  "Mapusa",
  "Mangaluru",
  "Margao",
  "Mokokchung",
  "Mumbai",
  "Muzaffarpur",
  "Mysuru",
  "Nagpur",
  "Naharlagun",
  "Namchi",
  "Nashik",
  "Neemuch",
  "Nellore",
  "Nizamabad",
  "Panaji",
  "Panipat",
  "Pasighat",
  "Patiala",
  "Patna",
  "Ponda",
  "Prayagraj",
  "Puducherry",
  "Pune",
  "Purnia",
  "Rajkot",
  "Raigarh",
  "Raipur",
  "Rajkot",
  "Rangpo",
  "Ranchi",
  "Roorkee",
  "Rourkela",
  "Rudrapur",
  "Sambalpur",
  "Saiha",
  "Satara",
  "Shimla",
  "Siliguri",
  "Solan",
  "Solapur",
  "Srinagar",
  "Sambalpur",
  "Satara",
  "Surat",
  "Tezpur",
  "Thrissur",
  "Thoubal",
  "Tiruchirappalli",
  "Tiruvannamalai",
  "Tinsukia",
  "Tonk",
  "Tura",
  "Tuensang",
  "Udaipur",
  "Udaipur (Tripura)",
  "Ujjain",
  "Vadodara",
  "Varanasi",
  "Vasco da Gama",
  "Vellore",
  "Vijayawada",
  "Visakhapatnam",
  "Warangal",
  "Wokha",
  "Yavatmal",
  "Ziro"
];

const domains = [
  "Engineering", "Medicine", "Finance", "Management", "Law", "IT / Software", "Arts", 
  "Design", "Education", "Science", "Commerce", "Social Sciences", "Other"
];

const formCardStyle = {
  maxWidth: "95%",
  width: "1200px",
  margin: "2rem auto",
  padding: "2rem",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #e3f6fd 0%, #fafafa 100%)",
  boxShadow: "0 0 24px rgba(0,0,0,0.05)",
  border: "3px solid #1976d2",
  color: "#222",
  fontFamily: "Arial, sans-serif"
};
const labelStyle = {
  display: "block",
  marginBottom: ".25rem",
  color: "#262e3d",
  fontWeight: "bold",
  fontSize: "0.95rem"
};
const fieldStyle = {
  width: "100%",
  padding: ".75rem",
  borderRadius: "7px",
  border: "1px solid #b4dae6",
  marginBottom: "1.15rem",
  background: "#fff"
};
const buttonStyle = {
  background: "linear-gradient(90deg, #4fc3f7 0%, #1976d2 100%)",
  color: "#fff",
  border: "none",
  padding: "0.85rem 1.5rem",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "1.1rem",
  cursor: "pointer",
  marginTop: "1rem",
  width: "100%"
};
const rowStyle = {
  display: "flex",
  gap: "1rem",
  marginBottom: "1rem"
};
const colStyle = {
  flex: 1
};

function ProfileForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    city: '',
    education: '',
    domain: '',
    current_skills: '',
    career_goal: '',
    studyAbroad: '',
    preferredCities: []
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCityChange(e) {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setForm({ ...form, preferredCities: selected });
  }

  function handleRadio(e) {
    setForm({ ...form, studyAbroad: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (typeof onSubmit === "function") onSubmit(form);
  }

  return (
    <form style={formCardStyle} onSubmit={handleSubmit}>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ color: "#1976d2" }}>Profile Information</h2>
        <p style={{ color: "#666", fontSize: ".95rem" }}>Let us know about you!</p>
      </div>

      {/* Row 1: Name and Age */}
      <div style={rowStyle}>
        <div style={colStyle}>
          <label style={labelStyle} htmlFor="name">Full Name</label>
          <input style={fieldStyle} name="name" id="name" value={form.name} onChange={handleChange} placeholder="Enter your full name" required />
        </div>
        <div style={colStyle}>
          <label style={labelStyle} htmlFor="age">Age</label>
          <input style={fieldStyle} type="number" name="age" id="age" min="10" max="100" value={form.age} onChange={handleChange} placeholder="Enter your age" required />
        </div>
      </div>

      {/* Row 2: Gender and City */}
      <div style={rowStyle}>
        <div style={colStyle}>
          <label style={labelStyle}>Gender</label>
          <select style={fieldStyle} name="gender" value={form.gender} onChange={handleChange} required>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other / Prefer not to say</option>
          </select>
        </div>
        <div style={colStyle}>
          <label style={labelStyle}>City (India)</label>
          <select style={fieldStyle} name="city" value={form.city} onChange={handleChange} required>
            <option value="">Select your city</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3: Education and Domain */}
      <div style={rowStyle}>
        <div style={colStyle}>
          <label style={labelStyle}>Current Education Level</label>
          <input style={fieldStyle} name="education" value={form.education} onChange={handleChange} placeholder="Eg: B.Tech, MBBS, M.Com, etc." required />
        </div>
        <div style={colStyle}>
          <label style={labelStyle}>Field of Study / Interest (Domain)</label>
          <select style={fieldStyle} name="domain" value={form.domain} onChange={handleChange} required>
            <option value="">Select your field</option>
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Skills */}
      <div>
        <label style={labelStyle}>Current Skills</label>
        <textarea
          style={{ ...fieldStyle, height: "64px" }}
          name="current_skills"
          value={form.current_skills}
          onChange={handleChange}
          placeholder="List your main skills (comma separated)"
          required
        />
      </div>

      {/* Career Goal */}
      <div>
        <label style={labelStyle}>Career Goal</label>
        <input style={fieldStyle} name="career_goal" value={form.career_goal} onChange={handleChange} placeholder="What do you want to achieve in your career?" required />
      </div>

      {/* Study Abroad */}
      <div>
        <label style={labelStyle}>Would you like to study outside India?</label>
        <div>
          <label>
            <input
              type="radio"
              name="studyAbroad"
              value="Yes"
              checked={form.studyAbroad === "Yes"}
              onChange={handleRadio}
            /> Yes
          </label>
          <label style={{marginLeft:'24px'}}>
            <input
              type="radio"
              name="studyAbroad"
              value="No"
              checked={form.studyAbroad === "No"}
              onChange={handleRadio}
            /> No
          </label>
        </div>
      </div>

      {/* Preferred Cities */}
      <div>
        <label style={labelStyle}>Preferred Cities (in India) to move for studying</label>
        <select
          name="preferredCities"
          multiple
          style={{ ...fieldStyle, height: "80px", fontSize:"1rem" }}
          value={form.preferredCities}
          onChange={handleCityChange}
        >
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <small style={{color:'#697'}}>Hold Ctrl (Windows) or Cmd (Mac) to select multiple</small>
      </div>

      <button style={buttonStyle} type="submit">🚀 Generate my Skill Pathway</button>
    </form>
  );
}

export default ProfileForm;