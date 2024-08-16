import { useRef, useState } from 'react';
import { conexionAPI } from '../../service/conexionAPI';
import "./formContact.css";
import AlertSave from '../AlertSave.astro';
import AlertWrong from '../AlertWrong.astro';

export const FormContact = () => {
    const nameRef =  useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const businessRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const [skeleton, setSkeleton] = useState(false);

    const sendData = async () => {
        if (isFormCompleted()) {
            setSkeleton(true);
            const formContact = {
                name: nameRef.current ? nameRef.current.value : null,
                email: emailRef.current ? emailRef.current.value : null,
                phone: phoneRef.current ? phoneRef.current.value : null,
                business: businessRef.current ? businessRef.current.value : null,
                message: messageRef.current ? messageRef.current.value : null,
            }
            const res = await conexionAPI(formContact);
            if (res.msg) {
               console.info("Todo bien");
               
                resetForm();
                setSkeleton(false);                
            } else {
                console.error("Fallo API");
            }
        } else {
            console.log("Revisar información")
        }
    }

    const isFormCompleted = () => {
        return (nameRef.current ? nameRef.current.value !== "" : false)
            && (emailRef.current ? emailRef.current.value !== "" : false)
            && (businessRef.current ? businessRef.current.value !== "" : false)
            && (messageRef.current ? messageRef.current.value !== "" : false);
    }

    const resetForm = () => {
        nameRef.current ? nameRef.current.value = "" : null;
        emailRef.current ? emailRef.current.value = "" : null;
        phoneRef.current ? phoneRef.current.value = "" : null;
        businessRef.current ? businessRef.current.value = "" : null;
        messageRef.current ? messageRef.current.value = "" : null;
    }

    return (
        <section className="contact_form">
            <div className="form animate__animated animate__bounceInUp">
                <h4>Deja un mensaje para contactarte</h4>
                {/* {
                    skeleton ? <AlertSave/> : <AlertWrong/>
                } */}
                <form>
                    <p>
                        <label htmlFor="name">
                            Nombre
                            <span className="required">*</span>
                        </label>
                        <input type="text" name="name" required placeholder="Escribe tu nombre" ref={nameRef} />
                    </p>

                    <p>
                        <label htmlFor="email">
                            Email
                            <span className="required">*</span>
                        </label>
                        <input type="email" name="email" required placeholder="Escribe tu Email" ref={emailRef} />
                    </p>

                    <p>
                        <label htmlFor="telefone">
                            Teléfono
                        </label>
                        <input type="tel" name="telefone" placeholder="Escribe tu teléfono" ref={phoneRef} />
                    </p>

                    <p>
                        <label htmlFor="business">
                            Asunto
                            <span className="required">*</span>
                        </label>
                        <input type="text" name="business" required placeholder="Escribe un asunto" ref={businessRef} />
                    </p>

                    <p>
                        <label htmlFor="message">
                            Mensaje
                            <span className="required">*</span>
                        </label>
                        <textarea name="message" className="texto_mensaje"
                            required placeholder="Deja aquí tu comentario..."
                            ref={messageRef} />
                    </p>

                    <button type="button" name="sendForm" onClick={sendData}>
                        Enviar
                    </button>
                    <p className="warning">
                        <span className="required"> * </span>los campos son obligatorios.
                    </p>
                </form>
            </div>
        </section>
    )
}