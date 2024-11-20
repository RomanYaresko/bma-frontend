import { User } from "@/models";
import { Avatar } from "@mui/material";

const AppAvatar = (params: { user: User | null }) => {
  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}`,
    };
  };

  if (params.user !== null) {
    if (params.user.profile_image) {
      return (
        <>
          <Avatar alt="avatar" src={params.user.profile_image} />
        </>
      );
    } else {
      return (
        <>
          <Avatar {...stringAvatar(params.user.given_name)} />
        </>
      );
    }
  } else {
    return <></>;
  }
};

export default AppAvatar;
