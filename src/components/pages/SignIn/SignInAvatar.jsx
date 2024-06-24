import { LockOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";

export default function SignInAvatar() {
  return (
    <Avatar sx={{ bgcolor: "secondary.main" }}>
      <LockOutlined />
    </Avatar>
  );
}
