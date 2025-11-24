import React, { useState } from 'react';

function ProfileForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: '', age: '', gender: '', education: '', city: '', career: ''
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(form); // safer in case onSubmit missing
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" required />
      <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" required />
      <input name="education" value={form.education} onChange={handleChange} placeholder="Education" required />
      <input name="city" value={form.city} onChange={handleChange} placeholder="City" required />
      <input name="career" value={form.career} onChange={handleChange} placeholder="Career Goal" required />
      <button type="submit">Analyze</button>
    </form>
  );
}

export default ProfileForm;
