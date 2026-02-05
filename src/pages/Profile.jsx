import { useState } from "react";
import "./Profile.css";
function Profile() {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      bvn: "",
      nin: "",
      homeAddress: "",
      city: "",
      state: "",
      country: "Nigeria",
      occupation: "",
      monthlyIncome: "",
      emergencyContact: "",
      emergencyPhone: "",
      accountType: "Personal",
      profilePicture: null
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage
    localStorage.setItem("userProfile", JSON.stringify(profile));
    setMessage("Profile updated successfully!");
    setIsEditing(false);
    setTimeout(() => setMessage(""), 3000);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-header">
          <h1>Profile Setup</h1>
        </div>
        {message && (
          <div className="message-container success">
            {message}
          </div>
        )}

        <div className="profile-picture-section">
          <div className="profile-picture-container">
            {profile.profilePicture ? (
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
            ) : (
              <span className="profile-picture-placeholder">👤</span>
            )}
          </div>
          {isEditing && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="profile-picture-upload"
            />
          )}
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          {!isEditing && (
            <div className="read-only-notice">
              <div className="notice-icon">🔒</div>
              <p>Profile is in read-only mode. Click "Edit Profile" to make changes.</p>
            </div>
          )}
          <div className="form-grid">
            {/* Personal Information */}
            <div className="section-header">
              <h3>Personal Information</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                required
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                required
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                value={profile.phoneNumber}
                onChange={handleChange}
                disabled={!isEditing}
                required
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={profile.dateOfBirth}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-select"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Identification */}
            <div className="section-header">
              <h3>Identification</h3>
            </div>

            <div className="form-group">
              <label className="form-label">BVN (Bank Verification Number)</label>
              <input
                type="text"
                name="bvn"
                value={profile.bvn}
                onChange={handleChange}
                disabled={!isEditing}
                maxLength="11"
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">NIN (National Identification Number)</label>
              <input
                type="text"
                name="nin"
                value={profile.nin}
                onChange={handleChange}
                disabled={!isEditing}
                maxLength="11"
                className="profile-input"
              />
            </div>

            {/* Address */}
            <div className="section-header">
              <h3>Address Information</h3>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Home Address</label>
              <textarea
                name="homeAddress"
                value={profile.homeAddress}
                onChange={handleChange}
                disabled={!isEditing}
                rows="3"
                className="profile-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={profile.city}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                value={profile.state}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                name="country"
                value={profile.country}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            {/* Financial Information */}
            <div className="section-header">
              <h3>Financial Information</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Occupation</label>
              <input
                type="text"
                name="occupation"
                value={profile.occupation}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Monthly Income (₦)</label>
              <input
                type="number"
                name="monthlyIncome"
                value={profile.monthlyIncome}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Account Type</label>
              <select
                name="accountType"
                value={profile.accountType}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-select"
              >
                <option value="Personal">Personal</option>
                <option value="Business">Business</option>
                <option value="Student">Student</option>
              </select>
            </div>

            {/* Emergency Contact */}
            <div className="section-header">
              <h3>Emergency Contact</h3>
            </div>

            <div className="form-group">
              <label className="form-label">Emergency Contact Name</label>
              <input
                type="text"
                name="emergencyContact"
                value={profile.emergencyContact}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Emergency Contact Phone</label>
              <input
                type="tel"
                name="emergencyPhone"
                value={profile.emergencyPhone}
                onChange={handleChange}
                disabled={!isEditing}
                className="profile-input"
              />
            </div>
          </div>

          <div className="action-buttons">
            {!isEditing ? (
              <button
                type="button"
                onClick={toggleEdit}
                className="profile-btn primary"
              >
                Edit Profile
              </button>
            ) : (
              <div>
                <button
                  type="submit"
                  className="profile-btn success"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={toggleEdit}
                  className="profile-btn secondary"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;