import React, { useState, useEffect } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './App.css';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

function PasswordGen() {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordLength, setPasswordLength] = useState(8);
    const [copied, setCopied] = useState(false);
    const [uppercase, setUpperCase] = useState(true);
    const [lowercase, setLowerCase] = useState(false);
    const [number, setNumber] = useState(false);
    const [specialchar, setSpecialChar] = useState(false);
    const [checkboxes, setCheckboxes] = useState([true, false, false, false]);

    const generatePassword = () => {
        let charset = "";
        let newPassword = "";
        if (specialchar) charset += "!@#$%^&*()";
        if (number) charset += "0123456789";
        if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        const selectedOptions = [uppercase, lowercase, number, specialchar].filter(Boolean);
        if (selectedOptions.length < 1) {
            setPassword("");
            return;
        }

        for (let i = 0; i < passwordLength; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        setPassword(newPassword);
    };

    const checkPasswordStrength = (password) => {
        const conditions = {
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialchar: /[@$!%*?&#]/.test(password)
        };

        const condition = Object.values(conditions).filter(Boolean).length;

        if (condition === 4 && password.length >= 8) return "Strong";
        if (condition === 3) return "Medium";
        return "Weak";
    };

    const passwordStrength = checkPasswordStrength(password);

    const handleCheckboxChange = (index) => {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index] = !newCheckboxes[index];

        if (newCheckboxes.filter(Boolean).length < 1) {
            return;
        }

        setCheckboxes(newCheckboxes);
        setUpperCase(newCheckboxes[0]);
        setLowerCase(newCheckboxes[1]);
        setNumber(newCheckboxes[2]);
        setSpecialChar(newCheckboxes[3]);
    };

    useEffect(() => {
        generatePassword();
    }, [uppercase, lowercase, number, specialchar, passwordLength]);

    useEffect(() => {
        const slider = document.querySelector('.slider');
        const updateSliderBackground = (slider) => {
            const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
            slider.style.background = `linear-gradient(to right, rgb(0, 0, 255) ${value}%, #ddd ${value}%)`;
        };
        if (slider) {
            updateSliderBackground(slider);
            slider.addEventListener('input', () => updateSliderBackground(slider));
        }
    }, [passwordLength]);

    return (
        <div className="main">
            <div className='container'>
                <div className='logo'>
                    <img src='https://gopostr.s3.amazonaws.com/favicon_url/vRZw4SjV4Tkm3p2UdRxJ5EZpwWLVQ2YnLjuxAn3u.png'
                        alt='logo'
                        width={150}
                        height={150} />
                    <h3>PASSWORD GENERATOR</h3>
                    <p>Create strong and secure password to keep your account safe online.</p>
                </div>
                <div>
                    <form>
                        <div className="mb-3 d-flex">
                            <div className="col-sm-10">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password"
                                    value={password}

                                />
                            </div>
                            <div>
                                <button
                                    type="button"
                                    aria-label="show password"
                                    className="btn btn-outline-dark"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                                </button>
                            </div>

                            <div className="reloadbtn">
                                <button type="button"
                                    className="btn btn-outline-light"
                                    onClick={generatePassword}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToj21Ha4K1q-BULzDPCHuHLLvCtgs-YGDVd-m0s8UhTw&s"
                                        alt="Icon"
                                        style={{ width: '20px', height: '20px', marginRight: '5px' }} />
                                </button>
                            </div>

                            <div className="copybtn">
                                <CopyToClipboard text={password} onCopy={() => setCopied(true)}>
                                    <button type="button" className="btn btn-outline-light">
                                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDYUBJCC_TiW33ms8P8GqNeILtjSuY89mpswcGjJnTCK_m67tBd7-4pWyT5qt2RjveYjY&usqp=CAU"
                                            alt="Icon"
                                            style={{ width: '20px', height: '20px', marginRight: '5px' }}
                                        />
                                    </button>
                                </CopyToClipboard>
                            </div>

                            {copied ? <span style={{ color: 'green', marginLeft: '10px' }}>Copied! </span> : null}
                        </div>

                        <h6 style={{ color: passwordStrength === 'Strong' ? 'green' : passwordStrength === 'Medium' ? 'orange' : 'red', marginLeft: '10px' }}>{passwordStrength}</h6>
                        <div className='subcontent'>
                            <p>Password length: {passwordLength}</p>

                            <div className="slider-container">
                                <input
                                    type="range"
                                    max={20}
                                    value={passwordLength}
                                    onChange={(e) => setPasswordLength(e.target.value)}
                                    className="slider"
                                />
                            </div>

                            <br />

                            <div className="checkbox-container">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="uppercase" checked={uppercase} onChange={() => handleCheckboxChange(0)} />
                                    <label className="form-check-label" htmlFor="uppercase">Uppercase</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="lowercase" checked={lowercase} onChange={() => handleCheckboxChange(1)} />
                                    <label className="form-check-label" htmlFor="lowercase">Lowercase</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="number" checked={number} onChange={() => handleCheckboxChange(2)} />
                                    <label className="form-check-label" htmlFor="number">Numbers</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="special" checked={specialchar} onChange={() => handleCheckboxChange(3)} />
                                    <label className="form-check-label" htmlFor="special">Special Characters</label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordGen;
