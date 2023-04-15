import { useLocation, useNavigate } from 'react-router-dom';
import React, { useLayoutEffect, useRef } from 'react';
import { Button } from '@mui/material';

function NavbarSmartButton({ path, pathName }: { path: string, pathName: string }) {
    const navigate = useNavigate();
    const location = useLocation();
    const navButton = useRef<HTMLButtonElement | null>(null);

    useLayoutEffect(() => {
        const buttonRef = navButton.current;
        if (location.pathname === path) {
            buttonRef?.classList.add('active');
        }
        return (() => {
            buttonRef?.classList.remove('active')
        });
    },[location.pathname, path]);

    return (
        <Button 
            ref={navButton}
            className='nav-button'
            onClick={() => navigate(path)}>
                {pathName}
        </Button>
    )
}

export default NavbarSmartButton;
