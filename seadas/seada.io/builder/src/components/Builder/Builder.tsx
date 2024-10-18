'use client';

import React, { useRef } from 'react';
import Preview from '@seada.io/builder/components/Preview';
import styles from '@seada.io/builder/components/Builder/Builder.module.css';
import Header from '@seada.io/builder/components/Header';
import { BuilderContextProvider } from '@seada.io/builder/contexts/BuilderContext/BuilderContext';
import ComponentsTree from '@seada.io/builder/components/ComponentsTree';
import PropsEditor from '@seada.io/builder/components/PropsEditor';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import getI18n from '@seada.io/core/service/get-i18n';
import { NextUIProvider, ScrollShadow, Tab, Tabs } from '@nextui-org/react';
import PreviewToolbar from '@seada.io/builder/components/PreviewToolbar';
import PageLayout from '@seada.io/builder/components/PageLayout';
import { CgNotes, CgWebsite } from 'react-icons/cg';
import LayoutTree from '@seada.io/builder/components/ComponentsTree/LayoutTree';
import PageType from '@seada.io/builder/components/PageType';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

interface IBuilderProps {
    builderTarget: string;
}

i18n.use(initReactI18next)
    .init({
        resources: getI18n(),
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })
    .then();

const Builder: React.FC<IBuilderProps> = ({ builderTarget }) => {
    const previewFrameRef = useRef<HTMLIFrameElement>(null);
    const { t } = useTranslation();

    return (
        <BuilderContextProvider previewFrameRef={previewFrameRef} builderTarget={builderTarget}>
            <NextUIProvider>
                <div className={styles.Builder}>
                    <div className={styles.Header}>
                        <Header />
                    </div>
                    <div className={styles.OperationalArea}>
                        <div className={styles.TreeArea}>
                            <ScrollShadow className={styles.ScrollShadow}>
                                <div className={styles.TreeTabsFlex}>
                                    <Tabs className={styles.TreeTabs} fullWidth={true}>
                                        <Tab
                                            title={
                                                <span className={styles.TreeTabTitle}>
                                                    <CgNotes size={18} /> {t('builder.tree.content')}
                                                </span>
                                            }
                                        >
                                            <PageType className={styles.PageType} />
                                            <ComponentsTree className={styles.ComponentsTree} />
                                        </Tab>
                                        <Tab
                                            title={
                                                <span className={styles.TreeTabTitle}>
                                                    <CgWebsite size={18} />
                                                    {t('builder.tree.layout')}
                                                </span>
                                            }
                                        >
                                            <PageLayout className={styles.PageLayout} />
                                            <LayoutTree className={styles.LayoutTree} />
                                        </Tab>
                                    </Tabs>
                                </div>
                            </ScrollShadow>
                        </div>
                        <div className={styles.PreviewArea}>
                            <PreviewToolbar className={styles.PreviewToolbar} previewFrameRef={previewFrameRef} />
                            <Preview className={styles.Preview} previewFrameRef={previewFrameRef} />
                        </div>
                        <div className={styles.PropsArea}>
                            <ScrollShadow className={styles.ScrollShadow}>
                                <PropsEditor />
                            </ScrollShadow>
                        </div>
                    </div>
                </div>
            </NextUIProvider>
            <ToastContainer />
        </BuilderContextProvider>
    );
};

export default Builder;
