import { useRef, useState } from 'react';
import { conexionAPI } from '../../service/conexionAPI';
import "./formContact.css";
import { AlertSave } from '../AlertSave';
import { AlertWrong } from '../AlertWrong';
import { LoaderSkeleton } from '../LoaderSkeleton'

export const FormContact = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const businessRef = useRef<HTMLInputElement>(null);
    const messageRef = useRef<HTMLTextAreaElement>(null);

    const [skeleton, setSkeleton] = useState(false);
    const [showForm, setShowForm] = useState(true);
    const [showMsgSave, setShowMsgSave] = useState(false);
    const [showMsgWrong, setShowMsgWrong] = useState(false);
    const [message, setMessage] = useState("");

    const sendData = async () => {
        if (isFormCompleted()) {
            setShowForm(false);
            setSkeleton(true);
            const formContact = {
                name: nameRef.current ? nameRef.current.value : null,
                email: emailRef.current ? emailRef.current.value : null,
                phone: phoneRef.current ? phoneRef.current.value : null,
                business: businessRef.current ? businessRef.current.value : null,
                message: messageRef.current ? messageRef.current.value : null,
            }
            const res = await conexionAPI(formContact);
            res.msg ? setShowMsgSave(true) : wrongMessage(true);
            setSkeleton(false);
            resetForm();
        } else {
            wrongMessage(false);
            resetForm();
        }
    }

    const wrongMessage = (isErrorAPI: boolean) => {
        setShowMsgWrong(true);
        isErrorAPI 
        ? setMessage("Hubo un error al enviar la información. Por favor intenta mas tarde.") 
        : setMessage("Por favor completa los campos obligatorios.")
    }

    const isFormCompleted = () => {
        return (nameRef.current ? nameRef.current.value !== "" : false)
            && (emailRef.current ? emailRef.current.value !== "" : false)
            && (businessRef.current ? businessRef.current.value !== "" : false)
            && (messageRef.current ? messageRef.current.value !== "" : false);
    }

    const resetForm = () => {
        setTimeout(() => {
            nameRef.current ? nameRef.current.value = "" : null;
            emailRef.current ? emailRef.current.value = "" : null;
            phoneRef.current ? phoneRef.current.value = "" : null;
            businessRef.current ? businessRef.current.value = "" : null;
            messageRef.current ? messageRef.current.value = "" : null;
            setSkeleton(false);
            setShowForm(true);
            setShowMsgSave(false);
            setShowMsgWrong(false);
        }, 4000)
    }

    const form = () => {
        return (
            <form>
                <p className="contact_form--p">
                    <label htmlFor="name">
                        Nombre
                        <span className="required contact_form--span">*</span>
                    </label>
                    <input className="contact_form--input"
                        type="text" name="name" required placeholder="Escribe tu nombre" ref={nameRef} />
                </p>

                <p className="contact_form--p">
                    <label htmlFor="email">
                        Email
                        <span className="required contact_form--span">*</span>
                    </label>
                    <input className="contact_form--input"
                        type="email" name="email" required placeholder="Escribe tu Email" ref={emailRef} />
                </p>

                <p className="contact_form--p">
                    <label htmlFor="telefone">
                        Teléfono
                    </label>
                    <input className="contact_form--input"
                        type="tel" name="telefone" placeholder="Escribe tu teléfono" ref={phoneRef} />
                </p>

                <p className="contact_form--p">
                    <label htmlFor="business">
                        Asunto
                        <span className="required contact_form--span">*</span>
                    </label>
                    <input className="contact_form--input"
                        type="text" name="business" required placeholder="Escribe un asunto" ref={businessRef} />
                </p>

                <p className="contact_form--p">
                    <label htmlFor="message">
                        Mensaje
                        <span className="required contact_form--span">*</span>
                    </label>
                    <textarea name="message" className="texto_mensaje"
                        required placeholder="Deja aquí tu comentario..."
                        ref={messageRef} />
                </p>

                <button className="contact_form--button" type="button" name="sendForm" onClick={sendData}>
                    Enviar
                </button>
                <p className="warning">
                    <span className="required contact_form--span"> * </span>los campos son obligatorios.
                </p>
            </form>
        )
    }

    return (
        <section className="contact_form">
            <div className="form animate__animated animate__bounceInUp">
                <h4>Deja un mensaje para contactarte</h4>
                {skeleton && <LoaderSkeleton />}
                {showForm && form()}
                {showMsgSave && <AlertSave />}
                {showMsgWrong && <AlertWrong message={message} />}

            </div>
        </section>
    )
}