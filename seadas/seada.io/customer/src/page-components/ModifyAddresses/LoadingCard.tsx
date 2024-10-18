import React from 'react';
import SeadaCard from '@seada.io/foundation-ui/components/SeadaCard';
import SeadaSkeleton from '@seada.io/foundation-ui/components/SeadaSkeleton';
import { CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import addressCardStyles from '@seada.io/customer/page-components/ModifyAddresses/AddressCard.styles';

const LoadingCard: React.FC = () => {
    const styles = addressCardStyles({ isLoading: true });

    return (
        <SeadaCard className={styles.base()} shadow={'sm'}>
            <CardHeader className={styles.header()}>
                <SeadaSkeleton>
                    <div className={'h-6 max-w-48 w-48 rounded-lg bg-default-200'}></div>
                </SeadaSkeleton>
            </CardHeader>
            <CardBody className={styles.body()}>
                <SeadaSkeleton>
                    <div className={'h-24 w-full rounded-lg bg-default-200'}></div>
                </SeadaSkeleton>
            </CardBody>
            <CardFooter className={styles.footer()}>
                <SeadaSkeleton>
                    <div className={'h-8 max-w-48 w-48 rounded-lg bg-default-200'}></div>
                </SeadaSkeleton>
            </CardFooter>
        </SeadaCard>
    );
};

export default LoadingCard;
