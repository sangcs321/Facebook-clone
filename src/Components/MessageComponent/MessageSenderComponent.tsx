import { Avatar } from "@mui/material";
import { useState } from "react";
import "./MessageSenderComponent.scss";
import { CreatePost } from "@Components";
import { RootState } from "@Store";
import { Button, Modal } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { EmojiHappy, Image, Video } from "iconsax-reactjs";
import { useSelector } from "react-redux";

interface MessageSenderProps {
  onSuccess: () => void;
}

export const MessageSender = ({ onSuccess }: MessageSenderProps) => {
  const { user } = useSelector((state: RootState) => state.user);
  const translate = useSelector(
    (state: RootState) => state.language.TranslateModel
  );
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [open, setOpen] = useState(false);

  const goToStep = (newStep: number) => {
    setDirection(newStep > step ? 1 : -1); // xác định hướng
    setStep(newStep);
  };
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    }),
  };
  return (
    <div className="messageSender">
      <div className="messageSender_top">
        <Avatar src={user.avatarUrl} />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="messageSender_input"
            placeholder={translate?.createPostTitle}
            onClick={() => setShowModal(true)}
            readOnly
          />
        </form>
      </div>

      <div className="messageSender_bottom">
        <div className="messageSender_option">
          <Video size="24" color="#FF0000" variant="Bold" />
          <div className="messageSender_optionText">
            {translate?.createPostOption1}
          </div>
        </div>

        <div className="messageSender_option">
          <Image size="24" color="#45bd62" variant="Bold" />
          <div className="messageSender_optionText">
            {translate?.createPostOption2}
          </div>
        </div>

        <div className="messageSender_option">
          <EmojiHappy size="24" color="#f7b928" />
          <div className="messageSender_optionText">
            {translate?.createPostOption3}
          </div>
        </div>
      </div>
      <Modal
        title="Create post"
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
                <CreatePost
                  goToStep={goToStep}
                  onSuccess={() => {
                    console.log("2222");
                    setShowModal(false);
                    onSuccess();
                  }}
                />
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
  );
};
