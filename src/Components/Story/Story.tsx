import { Avatar } from "@mui/material";
import "./Story.scss";

interface StoryProps {
  image: string;
  profileSrc: string;
  title: string;
}

export const Story: React.FC<StoryProps> = ({ image, profileSrc, title }) => {
  return (
    <div style={{ backgroundImage: `url(${image})` }} className="story">
      <Avatar className="story_avatar" src={profileSrc} />
      <h4>{title}</h4>
    </div>
  );
};
