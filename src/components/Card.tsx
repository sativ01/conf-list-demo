import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red, blue } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));

export interface IPerson {
  fullName: string;
  profileImage: string;
}

export interface ICardProps {
  id: string;
  creator: IPerson;
  conference: {
    title: string;
    description: {
      long: string[];
      short: string;
    };
    startDate: Date;
    endDate: Date;
    image: string;
    speakers: IPerson[];
  };
}

const dateOptions = {
  month: "long",
  day: "numeric"
};

const ConferenceCard: React.FC<ICardProps> = ({ conference, creator }) => {
  const [expanded, setExpanded] = React.useState(false);
  const isConferenceInPast = new Date() > conference.endDate;
  const paragraphs = React.useMemo(
    () =>
      conference.description.long.map((p) => (
        <Typography paragraph>{p}</Typography>
      )),
    [conference.description.long]
  );
  const speakers = React.useMemo(
    () => (
      <AvatarGroup max={3}>
        {conference.speakers?.map((speaker) => (
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label={`creator ${speaker.fullName}`}
            src={speaker.profileImage}
          />
        ))}
      </AvatarGroup>
    ),
    [conference.speakers]
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        minWidth: 345,
        maxWidth: 645,
        ...(isConferenceInPast && { opacity: [0.9, 0.8, 0.7] })
      }}
    >
      <CardHeader
        onClick={handleExpandClick}
        sx={{
          "&:hover": {
            bgcolor: blue[200],
            opacity: [0.9, 0.8, 0.7]
          },
          "& .MuiCardHeader-title": {
            fontSize: "16px",
            fontWeight: "900",
            textTransform: "uppercase"
          }
        }}
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label={`creator ${creator?.fullName}`}
            src={creator?.profileImage}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={conference?.title}
        subheader={`Dates: from ${conference?.startDate.toLocaleDateString(
          "en-US",
          dateOptions
        )} untli ${conference?.endDate.toLocaleDateString(
          "en-US",
          dateOptions
        )}`}
      />
      <CardMedia
        component="img"
        height="94"
        image={conference?.image}
        alt={conference?.title}
      />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Short description:
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {conference.description.short}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Box ml={2}>{speakers}</Box>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h5">Agenda:</Typography>
          {paragraphs}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ConferenceCard;
