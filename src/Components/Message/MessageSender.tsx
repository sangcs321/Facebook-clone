import React, { useState } from 'react';
import "./MessageSender.scss";
import { Avatar, IconButton } from '@mui/material';

import VideocamIcon from "@mui/icons-material/Videocam";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useSelector } from 'react-redux';
import { Button, Modal } from 'antd';
import CreatePost from './CreatePost';
import { motion, AnimatePresence } from "framer-motion";
import { RootState } from '@Store';


function MessageSender() {
    const user = useSelector((state: RootState) => state.user)
    const [showModal, setShowModal] = useState(false);
    const [input, setInput] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(0);
    const [open, setOpen] = useState(false);

    const goToStep = (newStep) => {
        setDirection(newStep > step ? 1 : -1); // xác định hướng
        setStep(newStep);
    };
    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            position: 'absolute'
        }),
        center: {
            x: 0,
            opacity: 1,
            position: 'relative'
        },
        exit: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            position: 'absolute'
        }),
    };
    const handleSubmit = (e) => {

    }
    return (
        <div className="messageSender">
            <div className="messageSender_top">
                <Avatar src={"https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"} />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} className="messageSender_input" placeholder={`What's on your mind`} onClick={() => setShowModal(true)} readOnly />
                </form>
            </div>


            <div className="messageSender_bottom">
                <div className="messageSender_option">
                    <VideocamIcon style={{ color: "red" }} />
                    <div className='messageSender_optionText'>Live Video</div>
                </div>

                <div className="messageSender_option">
                    <PhotoLibraryIcon style={{ color: "green" }} />
                    <div className='messageSender_optionText'>Photo/Video</div>
                </div>

                <div className="messageSender_option">
                    <InsertEmoticonIcon style={{ color: "orange" }} />
                    <div className='messageSender_optionText'>Feeling/Activity</div>
                </div>
            </div>
            <Modal title="Create post"
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={null}
                className="custom-modal-title"
            >
                <div style={{ minHeight: 100 }}>
                    <AnimatePresence mode="wait">
                        {step === 0 && (
                            <motion.div
                                key="step1"
                                custom={direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={variants}
                                transition={{ duration: 0.2 }}
                            >
                                <CreatePost goToStep={goToStep}/>
                                {/* <Button type="primary" onClick={() => goToStep(1)} >
                                    Next
                                </Button> */}
                            </motion.div>
                        )}

                        {step === 1 && (
                            <motion.div
                                key="step2"
                                custom={direction}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                variants={variants}
                                transition={{ duration: 0.2 }}
                            >
                                <p>This is the second step.</p>
                                <Button onClick={() => goToStep(0)} style={{ marginRight: 8 }}>
                                    Back
                                </Button>
                                <Button type="primary" onClick={() => setShowModal(false)}>
                                    Done
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Modal>
        </div>
    )
}

export default MessageSender;