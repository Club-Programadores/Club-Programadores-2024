import './SignUpModal.css'
import React, { useState } from 'react';



const SignUpModal =({onClose}) => {

    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        bio: '',
        skills: [],
        intereses: [],
      });
    
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleCheckboxChange = (e, category) => {
        const { checked, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [category]: checked
            ? [...prevData[category], value]
            : prevData[category].filter((item) => item !== value),
        }));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Add logic to send the form data to the server or perform other actions
      };
    
    return(
        <div className='modal-container' id='sign-up-modal'>
            <button onClick={onClose} id='modal-close-btn'>x</button>
            <div className='form-container'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h3>Tus datos</h3>
                        <label for="nombre">Nombre/s</label>
                        <input type="text" className="form-control" id="nombre" name="nombres" value={formData.nombres} onChange={handleInputChange}/>

                        <label for="apellido">Apellido/s</label>
                        <input type="text" className="form-control" id="apellido" name="apellidos" value={formData.apellidos} onChange={handleInputChange}/>

                        <label for="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleInputChange}/>

                        <label for="bio">Bio</label>
                        <textarea className="form-control" id="bio" name="bio" value={formData.bio} onChange={handleInputChange} />
                    </div>
                    <div className='skills-interests-container'>
                        <div className='form-group'>
                            <h3>Tus Skills</h3>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="html" 
                                    value="HTML"
                                    checked={formData.skills.includes('HTML')}
                                    onChange={(e) => handleCheckboxChange(e, 'skills')}
                                    />
                                <label className="form-check-label" htmlFor="html">HTML</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="javascript" 
                                    value="JavaScript"
                                    checked={formData.skills.includes('JavaScript')}
                                    onChange={(e) => handleCheckboxChange(e, 'skills')}
                                    />
                                <label className="form-check-label" htmlFor="javascript">JavaScript</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="react" 
                                    value="React"
                                    checked={formData.skills.includes('React')}
                                    onChange={(e) => handleCheckboxChange(e, 'skills')}
                                    />
                                <label className="form-check-label" htmlFor="react">React</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="node" 
                                    value="NodeJS"
                                    checked={formData.skills.includes('NodeJS')}
                                    onChange={(e) => handleCheckboxChange(e, 'skills')}
                                    />
                                <label className="form-check-label" htmlFor="renodeact">NodeJS</label>
                            </div>
                        </div>

                        <div className='form-group'>
                            <h3>Tus Intereses</h3>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="ai" 
                                    value="AI"
                                    checked={formData.intereses.includes('AI')}
                                    onChange={(e) => handleCheckboxChange(e, 'intereses')}
                                    />
                                <label className="form-check-label" htmlFor="ai">AI</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    class="form-check-input" 
                                    id="agile" 
                                    value="Agile"
                                    checked={formData.intereses.includes('Agile')}
                                    onChange={(e) => handleCheckboxChange(e, 'intereses')}
                                    />
                                <label className="form-check-label" htmlFor="agile">Agile</label>
                            </div>
                        </div>
                    </div>
                    <button type='submit' id='sumame-btn'>Sumame!</button>
                </form>
            </div>
        </div>
    )
}

export default SignUpModal;