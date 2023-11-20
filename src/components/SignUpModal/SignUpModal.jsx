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
                        <input 
                            type="text" 
                            className="form-control" 
                            id="nombre" 
                            name="nombres" 
                            value={formData.nombres} 
                            onChange={handleInputChange}
                            required/>

                        <label for="apellido">Apellido/s</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="apellido" 
                            name="apellidos" 
                            value={formData.apellidos} 
                            onChange={handleInputChange}
                            required/>

                        <label for="email">Email</label>
                        <input 
                            type="email"
                            className="form-control" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange}
                            required
                        />

                        <label for="bio">Bio</label>
                        <textarea 
                            className="form-control" 
                            id="bio" 
                            name="bio" 
                            value={formData.bio} 
                            onChange={handleInputChange} 
                            />
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
                                <label className="form-check-label" htmlFor="node">NodeJS</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="blender" 
                                    value="Blender"
                                    checked={formData.skills.includes('Blender')}
                                    onChange={(e) => handleCheckboxChange(e, 'skills')}
                                    />
                                <label className="form-check-label" htmlFor="blender">Blender</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="godot" 
                                    value="godot"
                                    checked={formData.skills.includes('godot')}
                                    onChange={(e) => handleCheckboxChange(e, 'skills')}
                                    />
                                <label className="form-check-label" htmlFor="godot">godot</label>
                            </div>
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="unity" 
                                    value="unity"
                                    checked={formData.skills.includes('unity')}
                                    onChange={(e) => handleCheckboxChange(e, 'skills')}
                                    />
                                <label className="form-check-label" htmlFor="unity">unity</label>
                            </div>       
                            <div className="form-check">
                                <input 
                                    type="checkbox" 
                                    className="form-check-input" 
                                    id="sparql" 
                                    value="sparql"
                                    checked={formData.skills.includes('sparql')}
                                    onChange={(e) => handleCheckboxChange(e, 'skills')}
                                    />
                                <label className="form-check-label" htmlFor="sparql">SPARQL</label>
                            </div>                       
                        </div>

                        <div className='form-group'>
                            <h3>Tus Intereses</h3>
                            <label for="intereses">¿Qué te copa?</label>
                        <textarea 
                            className="form-control" 
                            id="intereses" 
                            name="intereses" 
                            placeholder='Backend;GameDev;WebDev...'
                            value={formData.intereses} 
                            onChange={handleInputChange} />
                        </div>
                    </div>
                    <button className='btn btn-success' type='submit' id='sumame-btn'>¡Sumarme!</button>
                </form>
            </div>
        </div>
    )
}

export default SignUpModal;