import { IUserData } from '@seada.io/user/interface/user';
import { verify } from '@seada.io/core/spi/jwt';

const decodeUserToken = (userToken: string): IUserData | null => {
    try {
        return verify(userToken);
    } catch (e) {
        return null;
    }
};

export default decodeUserToken;
