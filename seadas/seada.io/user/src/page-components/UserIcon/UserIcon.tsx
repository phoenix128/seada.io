import Box from '@seada.io/basic-ui/page-components/Box';
import styles from '@seada.io/user/page-components/UserIcon/UserIcon.styles';
import { IUserIconSchema } from '@seada.io/user/page-components/UserIcon/schema';
import { twMerge } from 'tailwind-merge';
import React from 'react';
import { CgHomeAlt, CgUser } from 'react-icons/cg';
import useUserIconModel from '@seada.io/user/page-components/UserIcon/UserIcon.model';
import { IPageComponentSchemaProps } from '@seada.io/core-schema/spi/components/interface';

const UserIcon: React.FC<IPageComponentSchemaProps<IUserIconSchema>> = (props) => {
    const {
        data: { userData },
        handlers: { handleClick },
    } = useUserIconModel(props);

    return (
        <Box {...props} className={twMerge(props.className, styles.IconWrapper)}>
            {!userData?.userId && <CgUser className={styles.Icon} onClick={handleClick} />}
            {userData?.userId && <CgHomeAlt className={styles.Icon} onClick={handleClick} />}
        </Box>
    );
};

export default UserIcon;
