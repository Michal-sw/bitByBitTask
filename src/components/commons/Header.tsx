import { Typography } from "@mui/material";
import { ReactNode } from "react";

const Header = ({ children }: {children:ReactNode}) => (
    <Typography
        sx={{ mt: 2 }}
        variant="h3"
    >
        {children}
    </Typography>
)

export default Header;
