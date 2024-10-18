import React from 'react';
import { CgMathPlus } from 'react-icons/cg';
import { useTranslation } from 'react-i18next';
import SeadaCard from '@seada.io/foundation-ui/components/SeadaCard';
import { CardBody, CardFooter } from '@nextui-org/react';
import addressCardStyles from '@seada.io/customer/page-components/ModifyAddresses/AddressCard.styles';

export interface INewAddressCardProps {
    onAdd?: () => void;
}

const NewAddressCard: React.FC<INewAddressCardProps> = ({ onAdd }) => {
    const { t } = useTranslation();
    const styles = addressCardStyles({ isNew: true });

    return (
        <SeadaCard className={styles.base()} shadow={'sm'} onClick={onAdd}>
            <CardBody className={styles.body()} onClick={onAdd}>
                <div className={styles.addIcon()}>
                    <CgMathPlus size={72} />
                </div>
            </CardBody>
            <CardFooter onClick={onAdd} className={styles.footer()}>
                {t('customer.address.addNew')}
            </CardFooter>
        </SeadaCard>
    );
};

export default NewAddressCard;
