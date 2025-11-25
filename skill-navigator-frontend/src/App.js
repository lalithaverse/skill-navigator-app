import React, { useState, useEffect } from 'react';
import ProfileForm from './Components/ProfileForm';

// --- STYLES ---
const BG_ANIMATION = {
  position: "fixed",
  top:0, left:0,
  width:"100vw", height:"100vh",
  zIndex:0,
  pointerEvents: "none",
  background: "radial-gradient(circle, #fffbe7 0%, #e9f8ed 40%, #ffecd2 100%)",
  animation: "bgMove 22s linear infinite alternate"
};
const keyframes = `
@keyframes bgMove {
  0% {background-position: 0% 50%;}
  100% {background-position: 100% 50%;}
}`;
const IndiaBanner = {
  width:"100%", padding:"1rem 0",
  background:"linear-gradient(90deg,#ff671f 0%,#fff 35%,#46b729 80%)",
  textAlign:"center",
  fontWeight:"bold",
  fontSize:"2.24rem",
  letterSpacing:".04em",
  color:"#0c232e",
  boxShadow:"0 4px 16px #f1f1f1"
};
const topMotivationSection = {
  textAlign: "center",
  padding: "2rem 0",
  zIndex: 1,
  position: "relative"
};
const bigMotivationText = {
  fontSize: "3rem",
  fontWeight: "bold",
  background: "linear-gradient(90deg, #e76f51, #fb8500)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: "0.5rem"
};
const analysisBox = {
  maxWidth: "95%",
  width: "1200px",
  margin: "1.5rem auto",
  padding: "1.5rem",
  background: "#fff",
  borderRadius: "12px",
  border: "2px solid #e3f6fd",
  boxShadow: "0 2px 10px #e3e3e3",
  fontWeight: "normal",
  color: "#231a18",
  lineHeight: 1.7,
  fontSize: "1.05rem"
};
const separator = {
  height: "3px",
  margin: "1.8rem 0",
  background: "linear-gradient(90deg,#ff671f 0%,#fff 70%,#46b729 100%)",
  border: "none",
  borderRadius: "2px"
};
const downloadButtonStyle = {
  background: "linear-gradient(90deg, #46b729 0%, #2e7d32 100%)",
  color: "#fff",
  border: "none",
  padding: "0.85rem 1.5rem",
  borderRadius: "10px",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "1rem"
};

// --- MAIN COMPONENT ---
function App() {
  const [output, setOutput] = useState(null);
  const [userName, setUserName] = useState('');
  const [userCity, setUserCity] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [mentors, setMentors] = useState([]);

  // Load mentors from mentors.json in /public
  useEffect(() => {
    fetch('/mentors.json')
      .then(res => res.json())
      .then(data => setMentors(data))
      .catch(err => console.error('Error loading mentors:', err));
  }, []);

  async function handleSubmit(form) {
    setUserName(form.name);
    setUserCity(form.city);
    const res = await fetch("https://skill-navigator-app.onrender.com/api/analyze", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(form)
    });
    const data = await res.json();
    setOutput(data.response);
  }

  // Filter mentor cards by user's city
  const cityMentors = mentors.filter(mentor => mentor.city === userCity);

  // Download the AI guidance (with translated headers) as a Word document
  async function downloadAsWord() {
    if (!output) return;

    const translatedContent = await translateContent(output, selectedLanguage, userName);

    const blob = new Blob([translatedContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Career_Guidance_Report_${selectedLanguage}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Translation logic for the report headers
  async function translateContent(output, language, name) {
    const translations = {
      'English': {
        title: 'Career Guidance Report',
        greeting: `Hi ${name}`,
        forecast: 'General Analysis (Job Market Forecast):',
        skills: 'Skills Required:',
        gap: 'Skill Gap:',
        courses_city: 'Recommended Courses and Resources (Your City):',
        courses_abroad: 'Recommended Courses and Resources (Outside India):',
        opportunities: 'Career Opportunities (Your City, 0–3 Years):'
      },
      'Hindi': {
        title: 'करियर मार्गदर्शन रिपोर्ट',
        greeting: `नमस्ते ${name}`,
        forecast: 'सामान्य विश्लेषण (नौकरी बाजार पूर्वानुमान):',
        skills: 'आवश्यक कौशल:',
        gap: 'कौशल अंतर:',
        courses_city: 'अनुशंसित पाठ्यक्रम और संसाधन (आपका शहर):',
        courses_abroad: 'अनुशंसित पाठ्यक्रम और संसाधन (भारत के बाहर):',
        opportunities: 'करियर अवसर (आपका शहर, 0-3 वर्ष):'
      },
      'Tamil': {
        title: 'தொழில் வழிகாட்டுதல் அறிக்கை',
        greeting: `வணக்கம் ${name}`,
        forecast: 'பொதுவான பகுப்பாய்வு (வேலை சந்தை முன்னறிவிப்பு):',
        skills: 'தேவையான திறன்கள்:',
        gap: 'திறன் இடைவெளி:',
        courses_city: 'பரிந்துரைக்கப்பட்ட பாடநெறிகள் மற்றும் ஆதாரங்கள் (உங்கள் நகரம்):',
        courses_abroad: 'பரிந்துரைக்கப்பட்ட பாடநெறிகள் மற்றும் ஆதாரங்கள் (இந்தியாவிற்கு வெளியே):',
        opportunities: 'தொழில் வாய்ப்புகள் (உங்கள் நகரம், 0-3 ஆண்டுகள்):'
      },
      'Telugu': {
        title: 'కెరీర్ మార్గదర్శకత్వ నివేదిక',
        greeting: `నమస్కారం ${name}`,
        forecast: 'సాధారణ విశ్లేషణ (ఉద్యోగ మార్కెట్ అంచనా):',
        skills: 'అవసరమైన నైపుణ్యాలు:',
        gap: 'నైపుణ్య అంతరం:',
        courses_city: 'సిఫార్సు చేయబడిన కోర్సులు మరియు వనరులు (మీ నగరం):',
        courses_abroad: 'సిఫార్సు చేయబడిన కోర్సులు మరియు వనరులు (భారతదేశం వెలుపల):',
        opportunities: 'కెరీర్ అవకాశాలు (మీ నగరం, 0-3 సంవత్సరాలు):'
      },
      'Kannada': {
        title: 'ವೃತ್ತಿ ಮಾರ್ಗದರ್ಶನ ವರದಿ',
        greeting: `ನಮಸ್ಕಾರ ${name}`,
        forecast: 'ಸಾಮಾನ್ಯ ವಿಶ್ಲೇಷಣೆ (ಉದ್ಯೋಗ ಮಾರುಕಟ್ಟೆ ಮುನ್ಸೂಚನೆ):',
        skills: 'ಅಗತ್ಯವಿರುವ ಕೌಶಲ್ಯಗಳು:',
        gap: 'ಕೌಶಲ್ಯ ಅಂತರ:',
        courses_city: 'ಶಿಫಾರಸು ಮಾಡಲಾದ ಕೋರ್ಸ್‌ಗಳು ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳು (ನಿಮ್ಮ ನಗರ):',
        courses_abroad: 'ಶಿಫಾರಸು ಮಾಡಲಾದ ಕೋರ್ಸ್‌ಗಳು ಮತ್ತು ಸಂಪನ್ಮೂಲಗಳು (ಭಾರತದ ಹೊರಗೆ):',
        opportunities: 'ವೃತ್ತಿ ಅವಕಾಶಗಳು (ನಿಮ್ಮ ನಗರ, 0-3 ವರ್ಷಗಳು):'
      },
      'Bengali': {
        title: 'ক্যারিয়ার নির্দেশনা প্রতিবেদন',
        greeting: `নমস্কার ${name}`,
        forecast: 'সাধারণ বিশ্লেষণ (চাকরির বাজার পূর্বাভাস):',
        skills: 'প্রয়োজনীয় দক্ষতা:',
        gap: 'দক্ষতার ফাঁক:',
        courses_city: 'প্রস্তাবিত কোর্স এবং সম্পদ (আপনার শহর):',
        courses_abroad: 'প্রস্তাবিত কোর্স এবং সম্পদ (ভারতের বাইরে):',
        opportunities: 'ক্যারিয়ারের সুযোগ (আপনার শহর, 0-3 বছর):'
      },
      'Marathi': {
        title: 'करिअर मार्गदर्शन अहवाल',
        greeting: `नमस्कार ${name}`,
        forecast: 'सामान्य विश्लेषण (नोकरी बाजार अंदाज):',
        skills: 'आवश्यक कौशल्ये:',
        gap: 'कौशल्य अंतर:',
        courses_city: 'शिफारस केलेले अभ्यासक्रम आणि संसाधने (तुमचे शहर):',
        courses_abroad: 'शिफारस केलेले अभ्यासक्रम आणि संसाधने (भारताबाहेर):',
        opportunities: 'करिअर संधी (तुमचे शहर, 0-3 वर्षे):'
      },
      'Gujarati': {
        title: 'કારકિર્દી માર્ગદર્શન અહેવાલ',
        greeting: `નમસ્તે ${name}`,
        forecast: 'સામાન્ય વિશ્લેષણ (નોકરી બજાર પૂર્વાનુમાન):',
        skills: 'જરૂરી કૌશલ્યો:',
        gap: 'કૌશલ્ય અંતર:',
        courses_city: 'ભલામણ કરેલ અભ્યાસક્રમો અને સંસાધનો (તમારું શહેર):',
        courses_abroad: 'ભલામણ કરેલ અભ્યાસક્રમો અને સંસાધનો (ભારતની બહાર):',
        opportunities: 'કારકિર્દીની તકો (તમારું શહેર, 0-3 વર્ષ):'
      }
    };

    const t = translations[language] || translations['English'];

    let content = `${t.title}\n\n${t.greeting},\n\n`;

    if (output.job_market_forecast) {
      content += `${t.forecast}\n${output.job_market_forecast}\n\n`;
    }

    if (output.skills_needed) {
      content += `${t.skills}\n`;
      output.skills_needed.forEach(skill => {
        content += `• ${skill}\n`;
      });
      content += `\n`;
    }

    if (output.skill_gap) {
      content += `${t.gap}\n`;
      output.skill_gap.forEach(gap => {
        content += `• ${gap}\n`;
      });
      content += `\n`;
    }

    if (output.recommended_courses_city) {
      content += `${t.courses_city}\n`;
      if (Array.isArray(output.recommended_courses_city)) {
        output.recommended_courses_city.forEach(course => {
          content += `• ${course}\n`;
        });
      } else {
        content += `${output.recommended_courses_city}\n`;
      }
      content += `\n`;
    }

    if (output.recommended_courses_abroad && output.recommended_courses_abroad !== "N/A as per candidate's preference to not study abroad.") {
      content += `${t.courses_abroad}\n`;
      if (Array.isArray(output.recommended_courses_abroad)) {
        output.recommended_courses_abroad.forEach(course => {
          content += `• ${course}\n`;
        });
      } else {
        content += `${output.recommended_courses_abroad}\n`;
      }
      content += `\n`;
    }

    if (output.city_opportunities) {
      content += `${t.opportunities}\n${output.city_opportunities}\n\n`;
    }

    return content;
  }

  return (
    <>
      <div style={BG_ANIMATION}></div>
      <style>{keyframes}</style>
      <div style={IndiaBanner}>
        🇮🇳 <span style={{color:"#ff671f"}}>India Upfront</span> – Skilling India <span style={{color:"#46b729"}}>🚀</span>
      </div>
      <div style={topMotivationSection}>
        <div style={bigMotivationText}>💡 Vision to Reality</div>
        <div style={{...bigMotivationText, background: "linear-gradient(90deg, #46b729, #2e7d32)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>
          🏆 Achieve Your Dreams
        </div>
        <p style={{fontSize:"1.3rem", color:"#274777", marginTop:"0.5rem"}}>
          "Skill up, step up." Your vision needs action! 🇮🇳 🚀
        </p>
      </div>
      <div style={{width:"100%", zIndex:2, position:"relative"}}>
        <ProfileForm onSubmit={handleSubmit} />

        {output && (
          <div style={analysisBox}>
            <h2 style={{color: "#1976d2", textAlign: "center"}}>
              🤖 AI-Powered Guidance Analysis
            </h2>
            <h3 style={{color: "#fb8500", textAlign: "center"}}>Hi {userName}! 👋</h3>
            {output.job_market_forecast && (
              <div style={{marginBottom:"1.5rem"}}>
                <b>General Analysis (Job Market Forecast):</b><br/>
                {output.job_market_forecast}
              </div>
            )}
            <hr style={separator}/>
            {output.skills_needed && (
              <div style={{marginBottom:"1.5rem"}}>
                <b>Skills Required:</b>
                <ul>
                  {output.skills_needed.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
            <hr style={separator}/>
            {output.skill_gap && (
              <div style={{marginBottom:"1.5rem"}}>
                <b>Skill Gap:</b>
                <ul>
                  {output.skill_gap.map((gap, idx) => (
                    <li key={idx}>{gap}</li>
                  ))}
                </ul>
              </div>
            )}
            <hr style={separator}/>
            {output.recommended_courses_city && (
              <div style={{marginBottom:"1.5rem"}}>
                <b>Recommended Courses and Resources (Your City):</b>
                {Array.isArray(output.recommended_courses_city) ? (
                  <ul>
                    {output.recommended_courses_city.map((course, idx) => (
                      <li key={idx}>{course}</li>
                    ))}
                  </ul>
                ) : (
                  <div>{output.recommended_courses_city}</div>
                )}
              </div>
            )}
            <hr style={separator}/>
            {output.recommended_courses_abroad && output.recommended_courses_abroad !== "N/A as per candidate's preference to not study abroad." && (
              <>
                <div style={{marginBottom:"1.5rem"}}>
                  <b>Recommended Courses and Resources (Outside India):</b>
                  {Array.isArray(output.recommended_courses_abroad) ? (
                    <ul>
                      {output.recommended_courses_abroad.map((course, idx) => (
                        <li key={idx}>{course}</li>
                      ))}
                    </ul>
                  ) : (
                    <div>{output.recommended_courses_abroad}</div>
                  )}
                </div>
                <hr style={separator}/>
              </>
            )}
            {output.city_opportunities && (
              <div style={{marginBottom:"1.5rem"}}>
                <b>Career Opportunities (Your City, 0–3 Years):</b><br/>
                {output.city_opportunities}
              </div>
            )}

            {/* Local Mentors Section */}
            <div style={{
              marginTop: "2rem",
              padding: "1.5rem",
              borderRadius: "12px",
              background: "linear-gradient(120deg, #e3f6fd 65%, #fdfbe3 100%)",
              boxShadow: "0 2px 10px #e3e3e3",
              textAlign: "center"
            }}>
              <h2 style={{fontSize: "2rem", color: "#4fc3f7", marginBottom: "1rem"}}>
                🏅 Connect with Local Career Champions
              </h2>
              <p style={{fontSize: "1.08rem", marginBottom: "1.3rem", color:"#222"}}>
                Want real-world advice? Connect with mentors in {userCity}!
              </p>

              {cityMentors.length > 0 ? (
                cityMentors.map((mentor, idx) => (
                  <div key={idx} style={{
                    background:"#ebf8ff",
                    padding:"1rem",
                    borderRadius:"10px",
                    margin:"1rem 0",
                    boxShadow: "0 2px 6px #ddd",
                    textAlign: "left"
                  }}>
                    <h3 style={{color: "#1976d2", marginBottom: "0.5rem"}}>
                      👤 {mentor.name}
                    </h3>
                    <p style={{margin: "0.3rem 0"}}>
                      <b>Role:</b> {mentor.role}
                    </p>
                    <p style={{margin: "0.3rem 0"}}>
                      <b>LinkedIn:</b> <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">View Profile</a>
                    </p>
                    <p style={{margin: "0.3rem 0"}}>
                      <b>WhatsApp:</b> <a href={`https://wa.me/${mentor.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">Message Now</a>
                    </p>
                  </div>
                ))
              ) : (
                <p style={{color: "#666"}}>
                  No mentors found for {userCity} yet. We're expanding our network!
                </p>
              )}
            </div>

            {/* Language Selection and Download */}
            <div style={{textAlign:"center", marginTop:"2rem"}}>
              <label style={{fontWeight:"bold", marginRight:"1rem"}}>Select Language for Download:</label>
              <select 
                value={selectedLanguage} 
                onChange={(e) => setSelectedLanguage(e.target.value)}
                style={{padding:"0.5rem", borderRadius:"5px", marginRight:"1rem"}}
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी (Hindi)</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
                <option value="Bengali">বাংলা (Bengali)</option>
                <option value="Marathi">मराठी (Marathi)</option>
                <option value="Gujarati">ગુજરાતી (Gujarati)</option>
              </select>
              <button style={downloadButtonStyle} onClick={downloadAsWord}>
                📥 Download Career Guidance Report
              </button>
            </div>
            <div style={{
              marginTop:"2.5rem",
              padding: "1.5rem",
              borderRadius: "12px",
              background: "linear-gradient(120deg, #fffbe7 70%, #e3f6fd 100%)",
              boxShadow: "0 2px 10px #e3e3e3",
              }}>
                <h2 style={{ color:"#1976d2", marginBottom:"1rem" }}>🎓 Top Free Scholarships & Skilling Resources (India)</h2>
                <ul>
                  <li>
                    <b>🇮🇳 National Scholarship Portal:</b> <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer">scholarships.gov.in</a>
                    <br/><span style={{color:'#222'}}>Govt. of India central, state, SC/ST/OBC/minority, post-matric and means-based scholarships—apply here for almost all official schemes!</span>
                  </li>
                  <li>
                    <b>👍 Google India Scholarships:</b> <a href="https://buildyourfuture.withgoogle.com/scholarships" target="_blank" rel="noopener noreferrer">Google Scholarships</a>
                    <br/><span style={{color:'#222'}}>For women in tech, students from underserved backgrounds, career certificates (includes stipend/support).</span>
                  </li>
                    <li>
                      <b>💼 TATA, Aditya Birla, Reliance Foundation, Infosys Foundation, Microsoft:</b>
                        <ul>
                          <li><a href="https://www.vidyasaarathi.co.in/" target="_blank" rel="noopener noreferrer">Vidyasaarathi (by NSDL, supports TATA, Birla, etc)</a></li>
                          <li><a href="https://scholarship.reliancefoundation.org/" target="_blank" rel="noopener noreferrer">Reliance Foundation Scholarships</a></li>
                          <li><a href="https://www.adityabirlascholars.net/" target="_blank" rel="noopener noreferrer">Aditya Birla Scholarships</a></li>
                          <li><a href="https://microsoft.com/en-in/diversity/scholarships" target="_blank" rel="noopener noreferrer">Microsoft Scholarships India</a></li>
                          <li><a href="https://www.infosys.com/scholarships" target="_blank" rel="noopener noreferrer">Infosys Scholarships</a></li>
                        </ul>
                    </li>
                    <li>
                      <b>📚 NPTEL Free Online Courses (IIT/IISc):</b> <a href="https://nptel.ac.in/courses" target="_blank" rel="noopener noreferrer">nptel.ac.in/courses</a>
                          <br/><span style={{color:'#222'}}>India’s largest MOOC platform—engineering, science, management, social sciences, languages. Government-endorsed, accessible in multiple regional languages. Free lectures, paid optional certification.</span>
                    </li>
                    <li>
                      <b>🚀 Google Career Certificates (Coursera):</b> <a href="https://grow.google/intl/en_in/certificates/" target="_blank" rel="noopener noreferrer">grow.google/intl/en_in/certificates</a>
                      <br/><span style={{color:'#222'}}>Free for eligible youth—Data Analytics, IT Support, Project Management, Digital Marketing.</span>
                    </li>
                    <li>
                        <b>🌍 Udemy, Coursera, edX, FutureLearn:</b> Massive free and subsidized courses regularly available. (Try <a href="https://www.classcentral.com/" target="_blank" rel="noopener noreferrer">ClassCentral.com</a> for latest free offers).
                    </li>
                    <li>
                        <b>🗺️ State Govt/Minority Schemes:</b> Check your <a href="https://www.india.gov.in/my-government/schemes" target="_blank" rel="noopener noreferrer">state/district/department page</a> for specific free skilling and scholarships.
                    </li>
                </ul>
                <p style={{marginTop:"1rem", color:"#1976d2", fontWeight:"bold"}}>
                  <span role="img" aria-label="lightbulb">💡</span> For regular updates, search “free India scholarships [your city/stream]” on YouTube, and join community WhatsApp groups from NGOs, Skill India, or Karyashala.
                </p>
            </div>   
          </div>       
        )}        
      </div>      
    </>
  );
}

export default App;