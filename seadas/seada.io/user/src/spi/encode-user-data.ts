import { IUserData } from '@seada.io/user/interface/user';
import { sign } from '@seada.io/core/spi/jwt';

const encodeUserData = (userData: IUserData): string | null => {
    return sign(userData);
};

export default encodeUserData;
