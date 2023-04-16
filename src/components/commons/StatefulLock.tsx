import React from 'react';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

interface StatefulLockProps {
    isLocked: boolean;
    setIsLocked: (isLocked: boolean) => void;
}

const StatefulLock = ({ isLocked, setIsLocked }: StatefulLockProps) => {
    return (
        isLocked
            ?
                <LockIcon
                    onClick={() => setIsLocked(false)}
                    fontSize="large" 
                    className="lock-icon"
                />
            : 
                <LockOpenIcon 
                    onClick={() => setIsLocked(true)}
                    fontSize="large"
                    className="lock-icon open"
                />
    )
};

export default StatefulLock;