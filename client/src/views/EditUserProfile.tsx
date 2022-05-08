import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Form from '../components/Form';
import InfoModal from '../components/InfoModal';
import Input from '../components/Input';
import { getLoggedInUser, updateUser } from '../services/userCalls';

export default function EditUserProfile() {
    const [nameFeedback, setNameFeedback] = useState("")
    const [usernameFeedback, setUsernameFeedback] = useState("")
    const [emailFeedback, setEmailFeedback] = useState("")
    const [phoneFeedback, setPhoneFeedback] = useState("")
    const [passwordFeedback, setPasswordFeedback] = useState("")
    const [confirmPasswordFeedback, setConfirmPasswordFeedback] = useState("")
    const [password1TextShow, setPassword1TextShow] = useState<boolean>(true)
    const [password2TextShow, setPassword2TextShow] = useState<boolean>(true)
    const [name, setName] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phoneNumber, setPhoneNumber] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [errMsg, setErrMsg] = useState<string>();

    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const loggedInUser : User = await getLoggedInUser();
                setName(loggedInUser.name);
                setUsername(loggedInUser.username);
                setEmail(loggedInUser.email);
                setPhoneNumber(loggedInUser.phoneNumber);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    const toggleShowPassword = (targetId: string) => { 
        const x : HTMLInputElement = document.getElementById(targetId) as HTMLInputElement;
        if (targetId === 'password') {
            setPassword1TextShow(!password1TextShow)
        } else {
            setPassword2TextShow(!password2TextShow)
        }
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    } 

    type UpdateUserQuery = {
        name?: string,
        username?: string,
        email?: string,
        phoneNumber?: string,
        password?: string,
        confirmPassword?: string
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            nombre: { value: string },
            usuario: { value: string },
            email: { value: string },
            password: { value: string },
            passwordCheck: { value: string },
            phoneNumber: { value: string }
        };
    
        let errorFound = false;
        const validateNames : RegExp = /^[a-zA-Z0-9.!#@$%&'*+/=?^_`{|}~-]{1}[a-zA-Z0-9.!#@$%&'*+/=?^_`{|}~-\s]*$/;
        const validateMexicanNames : RegExp = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
        if (!target.nombre.value || 
            (!validateNames.test(target.nombre.value) && !validateMexicanNames.test(target.nombre.value))) {
        setNameFeedback("Escribe tu nombre.")
        errorFound = true
        } else {
        setNameFeedback("")
        }
    
        if (!target.usuario.value || !validateNames.test(target.usuario.value)) {
        setUsernameFeedback("Escribe un nombre de usuario.")
        errorFound = true
        } else {
        setUsernameFeedback("")
        }
    
        // HTML5 Specification
        const emailPattern : RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!target.email.value || !emailPattern.test(target.email.value)) {
        setEmailFeedback("Escribe un correo electrónico válido.")
        errorFound = true
        } else {
        setEmailFeedback("")
        }
    
        const phonePattern : RegExp = /^[0-9]{10}$/;
        if (!target.phoneNumber.value || !phonePattern.test(target.phoneNumber.value)) {
        setPhoneFeedback("Deben ser 10 dígitos solamente.")
        errorFound = true
        } else {
        setPhoneFeedback("")
        }
        if (password || confirmPassword) {
            const passwordPattern : RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            if (!target.password.value || !passwordPattern.test(target.password.value)) {
            setPasswordFeedback("Esta contraseña no es válida.")
            errorFound = true
            } else {
            setPasswordFeedback("")
            }
        
            if (!target.passwordCheck.value) {
            setConfirmPasswordFeedback("Escribe la contraseña de nuevo.")
            errorFound = true
            } else if (target.password.value !== target.passwordCheck.value) {
            setConfirmPasswordFeedback("Las contraseñas no coinciden.")
            errorFound = true;
            } else {
            setConfirmPasswordFeedback("")
            }
        }
    
        if (errorFound) {
            return;
        }
        let updateUserQuery : UpdateUserQuery = {}
        console.log(name,email,username, phoneNumber, password, confirmPassword);
        if (name && name !== '') {
            updateUserQuery.name = name;
        }  
        if (email && email !== '') {
            updateUserQuery.email = email;
        }
        if (username && username !== '') {
            updateUserQuery.username = username;
        }
        if (phoneNumber && phoneNumber !== '') {
            updateUserQuery.phoneNumber = phoneNumber;
        }
        if (password && password !== '') {
            updateUserQuery.password = password;
        }
        if (confirmPassword && confirmPassword !== '') {
            updateUserQuery.confirmPassword = confirmPassword;
        }

        try {
            await updateUser(updateUserQuery);
            navigate("/user_profile")
          } catch (error) {
            const err = error as typeof error & ErrorResponse;
            console.error(err)
            if (err.msg) {
                setErrMsg(err.msg);
            }
        }
    }
    return (
        <div className='bg-dark full-page-with-nav'>
            <Form className={"container mt-5 pt-2"} onSubmit={onSubmit} noValidate={true}>
                    <div className="text-hint mb-1 small"><p><span className="text-danger">*</span> = requerido</p></div>
                    <div className="row">
                        <Input
                            placeholder="Nombre"
                            required={false} type="text" divClass="form-floating col-md-6 mb-4" inputClass="form-control rounded-pill"
                            inputId="nombre" value={name} labelClass="form-label ps-4" maxLength={40}
                            feedbackClass="px-3 pt-2 text-danger" feedbackText={nameFeedback}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                            placeholder="Usuario"
                            required={false} type="text" divClass="form-floating col-md-6 mb-4" inputClass="form-control rounded-pill"
                            inputId="usuario" value={username} labelClass="form-label ps-4" maxLength={40}
                            feedbackClass="px-3 pt-2 text-danger" feedbackText={usernameFeedback}
                        />
                    </div>
                    <div className="row">
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            placeholder="Correo electrónico"
                            required={false} type="email" divClass="form-floating col-md-6 mb-4" inputClass="form-control rounded-pill"
                            inputId="email" value={email} labelClass="form-label ps-4"
                            feedbackClass="px-3 pt-2 text-danger" feedbackText={emailFeedback}
                        />
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                            placeholder="Número de teléfono a 10 dígitos"
                            required={false} type="tel" divClass="form-floating col-md-6 mb-4" inputClass="form-control rounded-pill"
                            inputId="phoneNumber" value={phoneNumber} labelClass="form-label ps-4" maxLength={10}
                            feedbackClass="px-3 pt-2 text-danger" feedbackText={phoneFeedback}
                        />
                    </div>
                    <div className="row">
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            required={false} type="password" divClass="form-floating col-md-6 mb-4" inputClass="form-control rounded-pill"
                            inputId="password" value={password} placeholder="Contraseña" labelClass="form-label ps-4" maxLength={40}
                            feedbackClass="px-3 pt-2 text-danger" feedbackText={passwordFeedback} extras="Al menos 8 caracteres con: 1 mayúscula, 1 minúscula y 1 número."
                        />
                        <Input
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                            required={false} type="password" divClass="form-floating col-md-6 mb-4" inputClass="form-control rounded-pill"
                            inputId="passwordCheck" value={confirmPassword} placeholder="Contraseña de nuevo" labelClass="form-label ps-4" maxLength={40}
                            feedbackClass="px-3 pt-2 text-danger" feedbackText={confirmPasswordFeedback}
                        />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <input onClick={() =>toggleShowPassword('password')} type="checkbox" className="btn-check me-2" id="customCheck1" />
                            <label className="btn btn-outline-light rounded-pill" htmlFor="customCheck1">
                                {password1TextShow ? 'Mostrar contraseña' : 'Ocultar contraseña'}
                            </label>
                        </div>
                        <div className="col-md-6 mb-4">
                            <input onClick={() => toggleShowPassword('passwordCheck')} type="checkbox" className="btn-check me-2" id="customCheck2" />
                            <label className="btn btn-outline-light rounded-pill" htmlFor="customCheck2">
                                {password2TextShow ? 'Mostrar confirmación de contraseña' : 'Ocultar confirmación de contraseña'}
                            </label>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                        <Button 
                                className="btn-warning rounded-pill fw-bold w-100"
                                btnType="button"
                                onClick={() => navigate('/user_profile')}
                                btnText="Cancelar"
                                padding="py-3 px-5"/>
                        </div>
                        <div className="col-6">
                            <Button 
                                className="btn-primary rounded-pill fw-bold w-100"
                                btnType="submit"
                                btnText="Guardar mi información"
                                padding="py-3 px-5"/>
                        </div>
                    </div>
            </Form>
            <InfoModal show={showModal} modalTitle={'Lo sentimos'} 
            modalBody={errMsg ? errMsg : 'Ocurrió un error inesperado al actualizar tu perfil. Por favor, inténtalo más tarde'} 
            dismissButtonAction={() => setShowModal(false)} />
        </div>
    )
}